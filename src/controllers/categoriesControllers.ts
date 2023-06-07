import { Request, Response } from "express";
import { PrismaClient, ExpenseCategory } from "@prisma/client";
import { Category } from "../models/types";
import { v4 } from "uuid";

const prisma = new PrismaClient();
const uuid = v4();

//Get all
export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await prisma.expenseCategory.findMany({
        where: {
            deleted: false
        }
    });
    res.json(result);
  } catch (e) {
    throw new Error("No se han podido obtener las categorías");
  }
};

//Get by id
export const getCategoryById = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  try {
    const result = await prisma.expenseCategory.findUnique({
      where: {
        id: categoryId,
      },
    });
    res.json(result ?? 'No existe ninguna catoegoría con ese id');
  } catch (e) {
    throw new Error("No se han podido obtener las categorías");
  }
};

//Create
export const createCategory = async (req: Request, res: Response) => {
  const newCategory: Category = req.body;
  try {
    const categoryDB = await prisma.expenseCategory.findUnique({
      where: {
        name: newCategory.name,
      },
    });

    if (categoryDB)
      return res.status(400).json({
        msg: `La categoría ${categoryDB.name} ya existe`,
      });

    const result = await prisma.expenseCategory.create({
      data: {
        id: uuid,
        name: newCategory.name,
      },
    });
    res.json(result);
  } catch (e) {
    throw new Error("No se ha podido agregar la categoría");
  }
};

//Update
export const updateCateogry = () => {};

//Delete
export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  try {
    const categoryDB = await prisma.expenseCategory.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!categoryDB)
      return res.status(400).json({
        msg: `El id ${categoryId} no existe para ninguna categoría`,
    });

    const result = await prisma.expenseCategory.update({
        where: {
            id: categoryId
        },
        data: {
            deleted: true
        }
    });
    res.json({
        msg: 'Categoría eliminada',
        result
    });
  } catch (e) {
    throw new Error("No se han podido obtener las categorías");
  }
};
