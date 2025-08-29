import Order from '../models/order.model.js';

//place order COD: /api/order/place

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user;
        const { items, address } = req.body;

        if (!items || !address) {
            return res.status(400).json({ message: 'Items and Address are required', success: false });
        }

        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);


        //add tax charge 2%
        amount += Math.floor((amount * 2) / 100);
        await Order.create({ user: userId, items, address, amount, paymentMethod: 'COD', isPaid: false });
        res.status().json({
            message: 'Order Placed Successfully',
            success: true,

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

//order details for individual: /api/order/user

export const userOrders = async (req, res) => {
    try {
        const userId = req.user;

        const orders = await Order.find({
            user: userId,
            $or: [{ paymentMethod: 'COD' }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1});

        res.status(200).json({
            success: true,
            orders
    });

    } catch (error) {
        console.error("Error fetching user orders", error);
        res.status(500).json({ message: 'Server Error' });
    }
}

//get all orders for admin :/api/order/all

export const getAllOrders = async(req,res) =>{
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'})
    }
};

