import { Request, Response } from 'express'
import { Expense } from "@prisma/client";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addExpense = async (req: Request, res: Response) => {
    const newExpense: Expense = req.body;
    try {
        const result = await prisma.expense.create({
            data: {
                amount: newExpense.amount,
                category: newExpense.category,
                userId: newExpense.userId
            }
        })
        res.json(result);
    }
    catch(e) {
        throw new Error('No se pudo agregar el gasto')
    }
}