import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import UserModel from "@/model/user.model";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return Response.json(
        {
          success: false,
          message: "All fields (username, email, password) are required.",
        },
        { status: 400 }
      );
    }

    // Check if user with verified email already exists
    const existingUserVerifiedByEmail = await UserModel.findOne({
      email,
      isVerified: true,
    });

    if (existingUserVerifiedByEmail) {
      return Response.json(
        {
          success: false,
          message: "An account with this email already exists and is verified.",
        },
        { status: 400 }
      );
    }

    // Generate a 6-digit verification code
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Check if user exists but not verified
    let user = await UserModel.findOne({ email });

    if (user) {
      // Update existing unverified user
      const hashedPassword = await bcrypt.hash(password, 10);
      user.username = username;
      user.password = hashedPassword;
      user.verifyCode = verifyCode;
      user.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      await user.save();
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

      user = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await user.save();
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(email, username, verifyCode);

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message:
            "Account created, but failed to send verification email. Please try again later.",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message:
          "User registered successfully. A verification code has been sent to your email.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error while registering user:", error);

    return Response.json(
      {
        success: false,
        message:
          "An unexpected error occurred while registering the user. Please try again.",
      },
      { status: 500 }
    );
  }
}
