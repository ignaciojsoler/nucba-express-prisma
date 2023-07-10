import { Request, Response } from "express";
import { Expense, PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import { User } from "../models/types";

const prisma = new PrismaClient();

//Get all
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const user: User = res.locals.authenticatedUser;
    console.log(user);
    const result = await prisma.expense.findMany({
      where: {
        userId: user.id,
      },
    });
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
  const { amount, description, categoryId }: Expense = req.body;

  const expenseId = v4();

  const user: User = res.locals.authenticatedUser;

  try {
    const result = await prisma.expense.create({
      data: {
        id: expenseId,
        amount: amount,
        description: description,
        categoryId: categoryId,
        userId: user.id,
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
export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.expense.update({
      where: {
        id: id,
      },
      data: {
        deleted: true,
      },
    });
    res.json({ msg: "Gasto eliminado", result });
  } catch (error) {
    res.status(404).json({
      error: "No se encontró ningún gasto con el ID proporcionado.",
    });
  }
};
