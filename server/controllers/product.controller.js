import Product from "../models/product.models";
import { v2 as cloudinary } from 'cloudinary';

export const addProduct = async (req, res) => {

    try {
        const { name, description, price, offeredPrice, category, inStock } = req.body;
        const images = req.files;

        let imageUrl = await Promise.all(images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path, {
                resource_type: "image",
            });
            return result.secure_url;
        })
        );
        await Product.create({
            name,
            description,
            price,
            offeredPrice,
            image: imageUrl,
            category,
            inStock
        });
        res.status(201).json({ message: "Product added successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Get all products :/api/product/get
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.status(200).json({ products, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


// get single product : /api/product/id

export const getProductById = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

//chnage stock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;

        const product = await Product.findByIdAndUpdate(id, { inStock }, { new: true });

        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        res.status(200).json({ message: "Product stock updated successfully", success: true });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}       
