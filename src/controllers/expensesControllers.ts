import { Request, Response } from 'express'
import { Expense, PrismaClient } from "@prisma/client";
import { v4 } from 'uuid';

const prisma = new PrismaClient();

export const createExpense = async (req: Request, res: Response) => {
    const {amount, description, categoryId, userId}: Expense = req.body;
    const uuid = v4();
    try {
        const result = await prisma.expense.create({
            data: {
                id: uuid,
                amount: amount,
                description: description,
                categoryId: categoryId,
                userId: userId
            }
        });
        res.json({
            msg: 'Gasto agregado',
            result
        })
    }
    catch(e) {
        res.status(400).json({error: 'Error al crear el gasto.'})
    }
}