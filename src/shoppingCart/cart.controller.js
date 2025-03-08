import Cart from "./cart.model.js"
import User from "../user/user.model.js";
import Product from "../product/product.model.js";


export const newShoopingCart = async (req, res) => {
    try {
        const client = req.userJwt;
        const { products } = req.body;

        let cartReceived = await Cart.findOne({ client: client, status: { $ne: "BOUGHT" } });

        let totalC = 0;

        for (let product of products) {
            const productPrice = await Product.findById(product.product);
            if (productPrice) {
                const totalP = (productPrice.price * product.quantity);
                product.purchased = totalP;
                totalC += totalP;
            }
        }

        if (cartReceived) {
            cartReceived.products.push(...products);
            cartReceived.total = totalC;
            cartReceived.status = "HOLD";
            cartReceived.expiresAt = new Date(Date.now() + 5 * 60 * 1000);

            const cartSaved = await cartReceived.save();
            return res.status(200).json({
                message: "Shopping cart updated successfully",
                client: {
                    completeName: client.completeName,
                    username: client.username
                },
                shoppingCart: cartSaved
            });
        }

        const newCart = new Cart({
            client: client,
            products: products,
            total: totalC,
            status: "HOLD",
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        const cartCreated = await newCart.save();

        return res.status(201).json({
            message: "Shopping Cart created succesfully",
            client: {
                completeName: client.completeName,
                username: client.username
            },
            shoppingCart: cartCreated
        });

    } catch (err) {
        return res.status(500).json({
            message: "New shopping cart creation failed,check the information please",
            error: err.message
        });
    }
};


export const shoppingCartBought = async (req, res) => {
    try {
        const client = req.userJwt;

        const shoppingCart = await Cart.findOne({ client: client, status: "HOLD" }).populate('products.product');


        if (!shoppingCart) {
            return res.status(500).json({
                message: "You dont have a shopping cart to buy",
                error: "Shopping cart not found"
            });
        }

        const boughtCart = await Cart.findByIdAndUpdate(shoppingCart._id, { status: "BOUGHT" }, { new: true });

        const purchaseDetails = boughtCart.products.map(product => {
            const productPrice = product.product.price;
            const productTotal = (product.quantity * productPrice);
            return {
                productName: product.product.name, 
                quantity: product.quantity,
                pricePerUnit: productPrice,
                total: productTotal
            };
        });

        return res.status(201).json({
            message: "Shopping cart bought succesfully",
            bill: {
                Client: {
                    completeName: client.completeName,
                    username: client.username
                },
                Purchase: {
                    products: purchaseDetails,
                    total: boughtCart.total,
                    status: boughtCart.status
                }
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to process buy in of your shopping cart",
            error: err.message
        });
    }
};