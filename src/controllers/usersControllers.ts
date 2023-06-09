import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();

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
      return res
        .status(400)
        .json({
          msg: `El correo ${newUser.email} ya se encuentra registrado.`,
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
    res.status(500).json({msg: "No se ha podido agregar el usuario correctamente"});
  }
};
