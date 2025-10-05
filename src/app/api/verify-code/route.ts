import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {

    dbConnect();

    try {
        const { username, code } = await request.json();
        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({ username: decodedUsername });
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        const isCodeValid = user.verifyCode == code;
        const isCodeNotExpird = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpird) {
            user.isVerified = true;
            await user.save();
            return Response.json({
                success: true,
                message: "User verified successfully"
            }, { status: 201 })

        } else if (!isCodeNotExpird) {
            return Response.json({
                success: false,
                message: "Verificarion code expired. Please signup again to get a new code"
            }, { status: 400 })
        }
        else {
            return Response.json({
                success: false,
                message: "Invalid verification code"
            }, { status: 400 })
        }



    } catch (error) {
        console.error("Error while verifying code: ", error);
        return Response.json({
            success: false,
            message: "Error while verifying code"
        }, {
            status: 500
        })
    }
}