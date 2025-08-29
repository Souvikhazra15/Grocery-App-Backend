import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Number, required: true },
    price: { type: Number, required: true },
    offeredPrice: { type: Number, required: true },
    image: {type: Array, required: true},
    category: { type: String, required: true },
    inStock: { type: Boolean, required: true },
})

const Product = mongoose.model('Product', productSchema);

export default Product;