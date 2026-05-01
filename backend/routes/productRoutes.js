import express from "express";
import { getProducts, addProduct } from "../controller/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
export default router;