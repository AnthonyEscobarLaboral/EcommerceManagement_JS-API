import { Router } from "express";
import { addNewProduct, getSoldOutProductsForAdmin,editProduct,deleteProduct, getProducts, findProducts} from "./product.controller.js";
import { addNewProductValidator, getSoldOutProductsForAdminValidator,editProductValidator,deleteProductValidator,
    getProductsValidator, findProductsValidator} from "../middlewares/product-validators.js";

const router = Router();

router.post("/newProduct", addNewProductValidator, addNewProduct);

router.get("/getSoldOuts",getSoldOutProductsForAdminValidator,getSoldOutProductsForAdmin);

router.put("/editProduct/:pid", editProductValidator, editProduct);

router.delete("/deleteProduct/:pid", deleteProductValidator, deleteProduct);


router.get("/products",getProductsValidator,getProducts);

router.get("/findProducts",findProductsValidator,findProducts);

export default router;
