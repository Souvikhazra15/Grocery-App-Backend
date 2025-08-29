import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: "User" },
    items: [
        {
            productId: { type: String, required: true, ref: "Product" },
            quantity: { type: Number, required: true }
        }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true, ref: "Address" },
    status: { type: String, default: "ORDER PLACED" },
    paymentType: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },

},
    { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);
export default Order;   