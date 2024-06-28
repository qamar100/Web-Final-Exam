'use server'

import prisma from "@/lib/db";

export const deleteUser = async (id: number) => {
  
    await prisma.task.delete({
      where: { id },
    });
    return { success: true };

};