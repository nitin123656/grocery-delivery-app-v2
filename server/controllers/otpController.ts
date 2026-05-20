import { Request, Response } from "express";
import twilio from "twilio";

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// Send OTP
export const sendOTP = async (req: Request, res: Response) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        await client.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID as string)
            .verifications.create({
                to: phone,
                channel: "sms",
            });

        res.json({ message: "OTP sent successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Verify OTP
export const verifyOTP = async (req: Request, res: Response) => {
    try {
        const { phone, otp } = req.body;

        const result = await client.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID as string)
            .verificationChecks.create({
                to: phone,
                code: otp,
            });

        if (result.status !== "approved") {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Find or create user
        const { prisma } = await import("../config/prisma.js");
        const jwt = await import("jsonwebtoken");

        let user = await prisma.user.findFirst({ where: { phone } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    phone,
                    name: phone,
                    email: `${phone}@phone.user`,
                    password: "",
                },
            });
        }

        const token = jwt.default.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.json({ token, user });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};