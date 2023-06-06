import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();
const uuid = v4();

export const createUser = async (req: Request, res: Response) => {
  const newUser: User = req.body;
  try {
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
    throw new Error("No se ha podido agregar el usuario correctamente");
  }
};
