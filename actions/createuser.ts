'use server'

import prisma from "@/lib/db"
import { formSchema } from "@/schemas/taskschema"
import { z } from "zod"





export const createUser = async (values:z.infer<typeof formSchema>) => {
    const user = await prisma.task.create({
        data: {
        Task: values.Task,
        createdAt: new Date(),
        updatedAt: new Date(),
        
        },
      })
}
