'use client'

import React, { useEffect, useState } from 'react'

 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchema } from '@/schemas/taskschema'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUser } from '@/actions/createuser'
import { getUser } from '@/actions/getuser'
import { deleteUser } from '@/actions/deletetask'


const Home = () => {




const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    getUser().then((data) => {
      setUsers(data);
    })
  })


  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Task: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newUser = createUser(values);
    setUsers((prevUsers) => [...prevUsers, newUser])
  }
  const handleDelete = async (id: number) => {
        const responcse = await deleteUser(id);
        if (responcse.success) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        }
      }



  return (
    <div className=' px-4 py-4  bg-white h-screen items-center justify-center'>
      <div className=" items-center justify-center grid grid-cols-4 gap-10 px-8 py-8">
  <div className='flex flex-col px-4 py-4 gap-x-10 text-black items-center bg-sky-200 rounded-xl shadow-xl font-bold min-h-10'>  Total Task: 05 </div>
  
  <div className='flex flex-col px-4 py-4 gap-y-7 text-black items-center bg-green-300 rounded-xl shadow-xl font-bold min-h-10'>Completed: 02</div>

  <div className='flex flex-col px-4 py-4 gap-y-7 text-black items-center bg-orange-200 rounded-xl shadow-xl font-bold min-h-10'> Pending : 03</div>
</div>
<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 px-8">
        <FormField
          control={form.control}
          name="Task"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter Task here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Task</Button>
      </form>
    </Form>
 
    <div className='pt-8 px-8 grid grid-rows-3 gap-4'>
         {users.map((user) => (
          <div key={user.id} className='bg-white shadow-xl rounded min-h-[80px] text-center text-black '>
            <div>Taskname: {user.Task}</div>
            <div>Created At: {new Date(user.createdAt).toLocaleString()}</div>
            <div>Updated At: {new Date(user.updatedAt).toLocaleString()}</div>
            <div>Completed: {user.isCompleted ? "Yes" : "No"}</div>
            <Button className='flex flex-col bg-red-600' onClick={() => handleDelete(user.id)}>Delete</Button>
            <Button> Mark task as compeleted </Button>
          </div>
        ))}
      </div>

      <Button className=' '> 
       Previous 
      </Button>
      <Button className='flex flex-col gap-5'> 
       Next
      </Button>
    


    </div>
  )
}

export default Home
