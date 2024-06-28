'use server'

import prisma from "@/lib/db"

export const getUser = async () => {
    return await prisma.task.findMany()
}
