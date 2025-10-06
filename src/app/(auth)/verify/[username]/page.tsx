"use client"
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { verifyCodeSchema } from '@/schemas/schema';
import { ApiResponse } from '@/types/apiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const VerifyCodePage = () => {
    const router = useRouter();
    const params = useParams<{username: string}>();

    const form = useForm<z.infer<typeof verifyCodeSchema>>({
        resolver: zodResolver(verifyCodeSchema)
    })

    const onSubmit = async(data: z.infer<typeof verifyCodeSchema>)=>{
        try {
            const response = await axios.post('/api/verify-code',{username: params.username, code: data.code});
            toast.success(response?.data.message)
            router.replace('/sign-in')
        } catch (error) {
            console.error("Error while user signup", error)
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError?.response?.data?.message ?? "Error while verifying code")
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold mb-5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent ">
          Verify Your Account
        </h1>
        <p className="mb-4 text-muted-foreground">Enter the verification code sent to your email</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='w-full font-semibold'>Verify Code</Button>
        </form>
      </Form>
    </div>
  </div>
  )
}

export default VerifyCodePage