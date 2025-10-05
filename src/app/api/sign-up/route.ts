import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import UserModel from "@/model/user.model";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();

    try {

        const { username, email, password } = await request.json();
        const existingUserVerifiedByEmail = await UserModel.findOne({
            email,
            isVerified: true
        });

        if (existingUserVerifiedByEmail) {
            return Response.json({
                success: false,
                message: "Username not available"
            }, { status: 400 })
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
           if (existingUserByEmail.isVerified) {
            return Response.json({
                success: false,
                message: "User already existed with this email."
            }, { status: 500 })
           }
           else{
            const hashPassword = await bcrypt.hash(password, 10);
            existingUserByEmail.password = hashPassword;
            existingUserByEmail.verifyCode = verifyCode;
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
            await existingUserByEmail.save();
           }
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                message: []
            })

            await newUser.save();
        }

        // send verification email code

        const emailResponse = await sendVerificationEmail(email, username, verifyCode)

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 })
        }

        return Response.json({
            success: true,
            message: "User registered successfully. Please verify your email"
        }, { status: 201 })

    } catch (error) {

        console.error("Error while registering user: ", error);
        return Response.json(
            {
                success: false,
                message: "Error while registering user"
            },
            {
                status: 500
            })

    }
}