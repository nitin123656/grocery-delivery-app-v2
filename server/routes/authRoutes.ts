import express from "express";
import { login, register } from "../controllers/authController.js";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import { sendOTP, verifyOTP } from "../controllers/otpController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

// OTP Routes
authRouter.post("/send-otp", sendOTP);
authRouter.post("/verify-otp", verifyOTP);

// Google Auth Routes
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

authRouter.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    (req, res) => {
        const user = req.user as any;
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );
        res.redirect(`https://grocery-delivery-app-v2.vercel.app/auth/google?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }))}`);
    }
);

export default authRouter;