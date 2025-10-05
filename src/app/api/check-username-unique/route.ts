import UserModel from "@/model/user.model";
import {z} from 'zod'
import { usernameValidation } from "@/schemas/schema";
import dbConnect from "@/lib/dbConnect";

const usernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET (request: Request){
     await dbConnect();
    try {
       const {searchParams} = new URL(request.url);
       const queryParams = {
        username: searchParams.get('username')
       }

       const result = usernameQuerySchema.safeParse(queryParams);

       if (!result.success) {
         const usernameErrors = result.error.format().username?._errors || [];

         return Response.json({
            success: false,
            message: usernameErrors?.length > 0 ? usernameErrors.join(', ') : "Invlaid Query Parameters"
         },{status:400})
       }
 
       const {username} = result.data;
       const existingVerifiedUsername = await UserModel.findOne({username,isVerified:true})

    if (existingVerifiedUsername) {
        return Response.json({
            success:false,
            message:"Username not available"
        },{
            status:401
        })
    }

    return Response.json({
        success:true,
        message:"Username is available"
    },{
        status:201
    })

        
    } catch (error) {
        console.error("Username checking Error: " , error);
        return Response.json({
            success:false,
            message:"Username checking error"
        },{
            status:500
        })
    }
}