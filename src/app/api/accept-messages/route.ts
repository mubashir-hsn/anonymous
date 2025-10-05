import { getServerSession } from "next-auth"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/user.model"
import {User} from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"

export async function POST(request:Request){
  await dbConnect()

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session?.user) {
    return Response.json({
        success: false,
        message:"Not Authenticated"
    },{status:401})
  }

  const userId = user._id

  try {

    const {acceptingMessages} = await request.json();

    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {isAcceptingMessage: acceptingMessages},
        {new: true}
    )

    if (!updatedUser) {
        return Response.json({
            success: false,
            message:"Failed to change user status for accepting messages"
        },{status:401})
    }

    return Response.json({
        success: true,
        message:"Status chsnges successfully",
        updatedUser
    },{status:201})
    
  } catch (error) {
    console.error("Failed to change user status for accepting messages",error)
    return Response.json({
        success: false,
        message:"Failed to change user status for accepting messages",
    },{status:500})
  }

}


export async function GET(request: Request){
    await dbConnect()

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session?.user) {
    return Response.json({
        success: false,
        message:"Not Authenticated"
    },{status:401})
  }

  const userId = user._id

  try {

    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
        return Response.json({
            success: false,
            message:"User not found"
        },{status:404})
    }

    return Response.json({
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessage
    },{status:201})
    
  } catch (error) {
    console.error("Failed to get status: " , error)
    return Response.json({
        success: false,
        message:"Failed to get status.",
    },{status:500})
  }
}


