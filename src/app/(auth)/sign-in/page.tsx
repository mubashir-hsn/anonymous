"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from 'next/link'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { signInSchema } from '@/schemas/schema'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

const SignInPage = () => {

    const router = useRouter();

    // zod implementation
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: '',
            password: ''
        }
    })


    const onSubmit = async (data: z.infer<typeof signInSchema>) => {

        if (!data.identifier || !data.password) {
            toast.error("All fields are required")
            return;
        }
        const result = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password
        })
        if (result?.error) {
            toast.error("Invalid Credentials")
        }
        if (result?.url) {
            router.replace('/dashboard')
        }

    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50">
            <div className="w-full max-w-md rounded shadow-md p-8 space-y-8 bg-white">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                        Join Anonymous Feedback
                    </h1>
                    <p className="mb-3 text-muted-foreground">Sign In to start your anonymous adventure</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            name="identifier"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username/Email</FormLabel>
                                    <Input {...field} name="identifier" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" {...field} name="password" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full'>Sign In</Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Don't have an account?{' '}
                        <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignInPage