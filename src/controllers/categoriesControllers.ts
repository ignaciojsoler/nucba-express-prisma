import { Request, Response } from "express";
import { PrismaClient, ExpenseCategory } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();
const uuid = v4();

//Get all
export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await prisma.expenseCategory.findMany({
      where: {
        deleted: false,
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({
      error: "No se han podido obtener las categorías.",
    });
  }
};

//Get by name
export const getCategoryByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const result = await prisma.expenseCategory.findUnique({
      where: {
        name: name.toLocaleUpperCase(),
      },
    });
    res.json(result ?? "No existe ninguna categoría con ese nombre.");
  } catch (e) {
    res.status(400).json({
      error: "No se han podido obtener las categorías.",
    });
  }
};

//Create
export const createCategory = async (req: Request, res: Response) => {
  const newCategory: ExpenseCategory = req.body;
  try {
    const categoryDB = await prisma.expenseCategory.findUnique({
      where: {
        name: newCategory.name.toLocaleUpperCase(),
      },
    });

    if (categoryDB)
      return res.status(400).json({
        error: `La categoría ${categoryDB.name} ya existe.`,
      });

    const result = await prisma.expenseCategory.create({
      data: {
        id: uuid,
        name: newCategory.name.toLocaleUpperCase(),
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({
      error: "No se ha podido agregar la categoría.",
    });
  }
};

//Update
export const updateCateogry = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category: ExpenseCategory = req.body;
  if (!id) return res.status(400).json({error: 'Ingresar un ID es obligatorio'});
  try {
    const result = await prisma.expenseCategory.update({
      where: {
        id: id,
      },
      data: {
        name: category.name.toLocaleUpperCase(),
        deleted: category.deleted
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({
      error: "No se ha podido actualizar la categoría. Es posible que el ID proporcionado sea incorrecto.",
    });
  }
};

//Delete
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({error: 'Ingresar un ID es obligatorio'});
  try {
    const result = await prisma.expenseCategory.update({
      where: {
        id: id,
      },
      data: {
        deleted: true,
      },
    });
    res.json({
      error: "Categoría eliminada.",
      result,
    });
  } catch (e) {
    res.status(400).json({
      error: "No existe ninguna categoría con ese id.",
    });
  }
};
