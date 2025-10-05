import { getServerSession } from "next-auth"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/user.model"
import {User} from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
import mongoose from "mongoose"

export async function GET (request:Request){
    await dbConnect()

    const session = await getServerSession(authOptions);
    const user: User = session?.user;
  
    if (!session || !session?.user) {
      return Response.json({
          success: false,
          message:"Not Authenticated"
      },{status:401})
    }
  
    const userId = new mongoose.Types.ObjectId(user._id);

    try {
         
        const messages = await UserModel.aggregate([
            { $match: { _id: userId } },                                // Match by _id, not id
            { $unwind: '$messages' },                                  //  Unwind the messages array
            { $sort: { 'messages.createdAt': -1 } },                   //  Correct sorting syntax
            { $group: { _id: '$_id', messages: { $push: '$messages' } } } //  Group messages back
          ]);

          if (!messages || messages.length==0) {
            return Response.json({
                success: false,
                message:"Messages not found",
            },{status:401})
          }

          return Response.json({
            success: true,
            messages: messages[0].messages,
        },{status:201})
          


        
    } catch (error) {
        return Response.json({
            success: false,
            message:"Failed to get user messages",
        },{status:500})
    }
}