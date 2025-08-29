import jwt from 'jsonwebtoken';

//seller login : /api/seller/login

export const sellerLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
            const token = jwt.sign(
                { id: email },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.cookie('sellertoken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(200).json({ message: "Login Succesfully", success: true });

        }

    } catch (error) {
        console.error("Error in sellerLogin", error);
        res.status(500).json({ message: 'Server error' });
    }
}

//logout seller : /api/seller/logout

export const sellerLogout = async (req, res) => {

    try {
        res.clearCookie('sellertoken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        res.status(200).json({ message: 'Logout successful', success: true });
    } catch (error) {
        console.error("Error in sellerLogout", error);
        res.status(500).json({ message: 'Server error', success: false });  
    }
}

//check auth seller : /api/seller/is-auth

export const isAuthSeller = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error', success: false });

    }
}
