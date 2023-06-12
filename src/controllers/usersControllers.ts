import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();

//Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.findMany({
      where: {
        deleted: false,
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: "No se han podido obtener los usuarios" });
  }
};

//Get user by id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: "No existe ningún usuario con ese id" });
  }
};

//Create
export const createUser = async (req: Request, res: Response) => {
  const uuid = v4();
  const newUser: User = req.body;
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    });

    if (userExists)
      return res.status(400).json({
        error: `El correo ${newUser.email} ya se encuentra registrado.`,
      });

    const result = await prisma.user.create({
      data: {
        id: uuid,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      },
    });
    res.json(result);
  } catch (e) {
    res
      .status(400)
      .json({ error: "No se ha podido agregar el usuario correctamente" });
  }
};

//Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData: User = req.body;
    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: userData,
    });
    res.json({ msg: "Usuario actualizado", result });
  } catch (e) {
    res.status(400).json({ error: "No existe ningún usuario con ese id" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        deleted: true,
      },
    });
    res.json({ msg: "Usuario eliminado", result });
  } catch (error) {
    res.status(400).json({ error: "No existe ningún usuario con ese id" });
  }
};
