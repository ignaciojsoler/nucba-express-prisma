import { Request, Response } from 'express'
import { Expense, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addExpense = async (req: Request, res: Response) => {
    const newExpense: Expense = req.body;
    try {
        
        
    }
    catch(e) {
        throw new Error('No se pudo agregar el gasto')
    }
}