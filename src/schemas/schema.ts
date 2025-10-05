import { z } from 'zod'

export const usernameValidation = z
                                  .string()
                                  .min(3, 'Username atleast 3 characters long')
                                  .max(20, 'Username cannot more than 20 characters')
                                  .regex(/^[a-zA-Z0-9_]+$/, 'Username cannot contain special characters');


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().min(6,{message: "Password must be atleast 6 characters long"})
})

export const verifyCodeSchema = z.object({
    code: z.string().length(6, "Verification code must be 6 digits")
})

export const signInSchema = z.object({
    identifier: z.string(), // identifier means username , email etc.....
    password: z.string()
})

export const acceptMessageSchema = z.object({
    acceptMessages: z.boolean()
})

export const messageSchema = z.object({
    content: z
              .string()
              .min(10, {message: 'Content must be atleast 10 characters long'})
              .max(200, {message: 'Content must be no longer than 200 characters'}),

})

