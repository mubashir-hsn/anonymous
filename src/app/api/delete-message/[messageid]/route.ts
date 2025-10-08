import { getServerSession } from "next-auth"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/user.model"
import {User} from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"

export async function DELETE(request:Request, {params}: {params:{messageid: string}}){
    const messageId = params.messageid;
  await dbConnect()

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session?.user) {
    return Response.json({
        success: false,
        message:"Not Authenticated"
    },{status:401})
  }

 try {
    const updateResult = await UserModel.updateOne(
        { _id: user._id },
        {$pull: { messages: messageId }});
    if (updateResult.modifiedCount == 0) {
        return Response.json({
            success: false,
            message: "Message not found or already deleted"
        },{status: 404})
    }

    return Response.json({
        success: true,
        message: "Message Deleted"
    },{status: 202})

 } catch (error) {
    console.log("Error while delete message", error);
    return Response.json({
        success: false,
        message: "Failed to delete message"
    },{status: 500})
 }

}


