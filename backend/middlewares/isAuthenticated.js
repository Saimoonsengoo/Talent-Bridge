import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decode.userId;
        req.role = decode.role; // <-- important for isAdmin
        next();
    } catch (error) {
        console.error("AUTH ERROR:", error);
        return res.status(500).json({
            message: "Authentication error",
            success: false,
        });
    }
};

export default isAuthenticated;
