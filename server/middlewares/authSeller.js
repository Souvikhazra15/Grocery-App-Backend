import jwt from 'jsonwebtoken';

export const authSeller = (req, res, next) => {

    try {
        const { sellertoken } = req.cookies;

        if(!sellertoken) {
            return res.status(401).json({ message: 'No token, authorization denied', success: false });
        }   
        const decoded = jwt.verify(sellertoken, process.env.JWT_SECRET);
   
        if(decoded.email === process.env.SELLER_EMAIL) {  

            next();
        }
        

    } catch (error) {
        console.error("authentication error:", error);
        return res.status(401).json({ message: 'Unauthorized', success: false });
    }

}