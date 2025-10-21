import mongoose , { Schema, Document } from "mongoose";

export interface Message extends Document{
    _id: string;  
    content: string;
    createdAt: Date;
}

const MessagesSchema : Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    messages: Message[]
}

const userSchema : Schema<User> = new Schema({
   username:{
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true
   },
   email:{
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, "Use a valid email address"]
},
   password:{
    type: String,
    required: [true, "password is required"],
   },
   verifyCode:{
    type: String,
    required: [true, "verify code is required"],
   },
   verifyCodeExpiry:{
    type: Date,
    required: [true, "verify Code Expiry is required"],
   },
   isVerified:{
    type: Boolean,
    default: false
   },
   isAcceptingMessage:{
    type: Boolean,
    default: true
   },
   messages: [MessagesSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', userSchema)

export default UserModel
