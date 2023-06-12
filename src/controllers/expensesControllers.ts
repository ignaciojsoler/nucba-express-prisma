import { Request, Response } from "express";
import { Expense, PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();

//Get all
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const result = await prisma.expense.findMany();
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "No se pudo obtener la lista de gastos." });
  }
};

//Get by id
export const getExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await prisma.expense.findUnique({
      where: {
        id: id,
      },
    });
    if (!result)
      return res.status(404).json({
        error: "No se encontró ningún gasto con el ID proporcionado.",
      });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "No se ha podido obtener el gasto" });
  }
};

//Create
export const createExpense = async (req: Request, res: Response) => {
  const { amount, description, categoryId, userId }: Expense = req.body;
  const uuid = v4();
  try {
    const result = await prisma.expense.create({
      data: {
        id: uuid,
        amount: amount,
        description: description,
        categoryId: categoryId,
        userId: userId,
      },
    });
    res.json({
      msg: "Gasto agregado",
      result,
    });
  } catch (e) {
    res.status(500).json({ error: "No se pudo crear el gasto correctamente." });
  }
};

//Update
export const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, description, categoryId, userId }: Expense = req.body;
  try {
    const result = await prisma.expense.update({
      where: {
        id: id,
      },
      data: {
        amount,
        description,
        categoryId,
        userId,
        updatedAt: new Date(),
      },
    });
    res.json({ msg: "Gasto actualizado", result });
  } catch (e) {
    res.status(404).json({
        error: "No se encontró ningún gasto con el ID proporcionado.",
      });
  }
};

//Delete
