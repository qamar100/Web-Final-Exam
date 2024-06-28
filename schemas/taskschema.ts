"use client"
 
import { z } from "zod"
 
export const formSchema = z.object({
  Task: z.string().min(2).max(100),
})