import Category from "./category.model.js";
import Product from "../product/product.model.js";


export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const admin = req.userJwt;

        const upperCaseName = name.toUpperCase();

        const category = new Category({
            name: upperCaseName
        });

        await Category.create(category);

        return res.status(201).json({
            message: "New category created succesfully",
            admin: {
                completeName: admin.completeName,
                role: admin.role,
            },
            category: {
                category_Name: category.name,
                created_At: category.createdAt,
                updated_At: category.updatedAt,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: "New category creation failed,check the information please",
            error: err.message
        });
    }
};


export const getCategorys = async (req, res) => {
    try {
        const account = req.userJwt;
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };

        const [total, categoriesFound] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
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
                categoriesFound
            });
        };

        const categoriesForClient = categoriesFound.map(category => ({
            category_Name: category.name
        }));

        return res.status(200).json({
            success: true,
            message: "Categories found successfully",
            total,
            categories: categoriesForClient
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get categories",
            error: err.message
        });
    }
};

export const editCategory = async (req, res) => {
    try {
        const { cid } = req.params;
        const { newCategoryName } = req.body;
        const admin = req.userJwt;

        const changedCategory = await Category.findByIdAndUpdate(cid, { name: newCategoryName }, { new: true });

        return res.status(201).json({
            message: "Categorys changes updated succesfully",
            admin: {
                completeName: admin.completeName,
                role: admin.role,
            },
            category: {
                categoryName: changedCategory.name,
                updatedAt: changedCategory.updatedAt,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to update category changes",
            error: err.message
        });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const { cid } = req.params;
        const admin = req.userJwt;

        const deleted = await Category.findByIdAndDelete(cid);

        const defaultCategory = await Category.findOne({ name: "GENERAL" });

        await Product.updateMany(
            { category: cid },
            { category: defaultCategory._id }
        );

        return res.status(201).json({
            message: "Category deleted succesfully",
            admin: {
                completeName: admin.completeName,
                role: admin.role,
            },
            category: deleted
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to delete the category",
            error: err.message
        });
    }
};
