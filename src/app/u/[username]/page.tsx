'use client'
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { messageSchema } from '@/schemas/schema';
import { ApiResponse } from '@/types/apiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import  axios, { AxiosError } from 'axios';
import { Loader2, Send } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const page = () => {
  const { username } = useParams();

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => { 
    setIsLoading(true);
    try {

      const res = await axios.post('/api/send-message',{username, content: data.content});
      toast.success(res.data.message);
      setMessage('');
    } catch (error) {
      console.error("Error while sending message", error);
      let axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError?.response?.data.message ?? "Failed to send message")
    }finally{
      setIsLoading(false)
    }
  }


  return (

    <>
      {/* Navbar */}
      <nav className='p-4 md:p-6 shadow-md'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
          <a href="#" className='text-lg md:text-xl font-bold mb-2 md:mb-0'>
            💬 Anonify
          </a>
        </div>
      </nav>

      {/* form to send message */}
      <div className='px-8 md:px-14 py-8 m-auto'>
        <h3 className='text-lg py-4 mb-5 font-semibold text-gray-800'>Send Message to {username}:</h3>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">

              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <Input
                      {...field}
                      name="content"
                      onChange={(e) => {
                        field.onChange(e);
                        const newValue = e.target.value;
                        field.onChange(newValue);
                        setMessage(newValue);
                      }}
                      value={message}
                      placeholder='Enter your message...' />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className='w-full' disabled={isLoading}>
                {
                  isLoading ? (
                    <>
                      <Loader2 className='w-4 h-4 mr-1 animate-spin' />
                      Sending....
                    </>
                  ) : (
                    <>
                      <Send className='w-4 h-4 mr-1' />
                      Send
                    </>
                  )
                }
              </Button>
            </form>
          </Form>
        </div>
      </div>

    </>

  )
}

export default page