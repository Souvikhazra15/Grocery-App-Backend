import express from 'express';
import { authSeller } from '../middlewares/authSeller.js';
import { upload } from '../config/multer.js';   
import { addProduct, changeStock, getProductById, getProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/add-product', upload.array('images'), authSeller, addProduct)
router.post('/list', getProducts);
router.get("/id", getProductById);
router.get("/stock", authSeller, changeStock);


export default router;
