import { Router } from "express";
import { createCategory,getCategorys, editCategory, deleteCategory } from "./category.controller.js";
import { createCategoryValidator,getCategorysValidator, editCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

router.post("/newCategory", createCategoryValidator, createCategory);

router.get("/getCategorys",getCategorysValidator,getCategorys);

router.patch("/updateCategory/:cid", editCategoryValidator, editCategory);

router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;
