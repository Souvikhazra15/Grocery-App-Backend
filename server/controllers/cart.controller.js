import User from "../models/user.model.js";

// update user cartData: /api/cart/update

export const updateCart = async (req, res) => {

    try {
        const userId = req.user;
        const { cartItems } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { cartData: cartItems }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}