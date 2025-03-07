import Product from "./product.model.js";


export const addNewProduct = async (req, res) => {
    try {
        const productData = req.body;
        const admin = req.userJwt;


        const productCreated = await Product.create(productData);

        return res.status(201).json({
            message: "New Product created succesfully",
            admin: {
                completeName: admin.completeName,
                role: admin.role,
            },
            productCreated
        });
    } catch (err) {
        return res.status(500).json({
            message: "New product creation failed,check the information please",
            error: err.message
        });
    }
};

export const getSoldOutProductsForAdmin = async (req, res) => {
    try {
        const admin = req.userJwt;
        const { limit = 5, from = 0 } = req.query;
        const query = { totalProduct: 0 };

        const [total, productsFound] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        return res.status(200).json({
            success: true,
            message: "Sold out products got successfully",
            admin: {
                completeName: admin.completeName,
                role: admin.role,
            },
            total,
            productsFound
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get sold out products",
            error: err.message
        });
    }
};

export const editProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const newProductData = req.body;
        const admin = req.userJwt;

        const changedProduct = await Product.findByIdAndUpdate(pid, newProductData, { new: true });

        return res.status(201).json({
            message: "Product data updated succesfully",
            admin: {
                completeName: admin.completeName,
                role: admin.role,
            },
            changedProduct
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to update product data",
            error: err.message
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const admin = req.userJwt;

        const deleted = await Product.findByIdAndUpdate(pid, { name: "DELETED", status: false }, { new: true });

        return res.status(201).json({
            message: "Product deleted succesfully",
            admin: {
                completeName: admin.completeName,
                role: admin.role,
            },
            product: deleted
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to delete this product",
            error: err.message
        });
    }
};

/***************************************************************************** */
export const getProducts = async (req, res) => {
    try {
        const account = req.userJwt;
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };

        const [total, productsFound] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        if (account.role === "ADMIN") {
            return res.status(200).json({
                success: true,
                message: "Products got successfully",
                admin: {
                    completeName: account.completeName,
                    role: account.role,
                },
                total,
                productsFound
            });
        };

        const productsForClient = productsFound.map(product => ({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.totalProduct
        }));

        return res.status(200).json({
            success: true,
            message: "Products got successfully",
            total,
            productsFound: productsForClient
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get products",
            error: err.message
        });
    }
};

export const findProducts = async (req, res) => {
    try {
        const account = req.userJwt;
        const { limit = 5, from = 0 } = req.query;
        const query = { status: true };
        const { pid, mostSold, name, category } = req.body;

        let filterParameter = { ...query};

        if (pid) filterParameter.pid = pid;
        if (name) filterParameter.name = name;
        if (category) filterParameter.category = category;

        let sortParameter = {};

        if (mostSold) {
            sortParameter.sold = -1;
        }

        let productsFound = await Product.find(filterParameter).skip(Number(from)).limit(Number(limit)).sort(sortParameter);

        if (mostSold) {
            productsFound = productsFound.slice(0, 10);
        }

        const total = await Product.countDocuments(filterParameter);

        if (account.role === "ADMIN") {
            return res.status(200).json({
                success: true,
                message: "Products got successfully",
                admin: {
                    completeName: account.completeName,
                    role: account.role,
                },
                productsFound
            });
        };

        const productsForClient = productsFound.map(product => ({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.totalProduct,
            sold: product.sold
        }));

        return res.status(200).json({
            success: true,
            message: "Products got successfully",
            Products: productsForClient
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to find products",
            error: err.message,
        });
    }
};

