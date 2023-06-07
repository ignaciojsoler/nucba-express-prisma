import { Request, Response } from 'express';
import { PrismaClient, ExpenseCategory } from '@prisma/client';
import { Category } from '../models/types';

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
    try {
        const result = await prisma.expenseCategory.findMany()
        res.json(result);
    }
    catch(e) {
        throw new Error('No se han podido obtener las categorías');
    }
}

export const getCategoryById = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    try {
        const result = await prisma.expenseCategory.findUnique({
            where: {
                id: categoryId
            }
        })
        res.json(result);
    }
    catch(e) {
        throw new Error('No se han podido obtener las categorías');
    }
}

export const createCategory = async (req: Request, res: Response) => {
    const newCategory: Category = req.body;
    try {
        const result = await prisma.expenseCategory.create({
            data: {
                name: newCategory.name
            }
        })
        res.json(result);
    }
    catch(e) {
        throw new Error('No se ha podido agregar la categoría');
    }
}