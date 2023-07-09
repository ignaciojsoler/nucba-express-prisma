import { Request, Response } from "express";
import { User } from "../models/types";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;

    if (!user) return res.json("Ingresar correo y contraseña.");

    const userExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!userExists)
      return res
        .status(400)
        .json({ msg: `No se ha encontrado ningún usuario con ese correo` });

    const validPassword = await bcrypt.compare(
      user.password,
      userExists.password
    );

    if (!validPassword)
      return res.status(400).json({
        msg: "La contraseña es incorrecta",
      });

    res.json(userExists);
  } catch (err) {
    return res.status(500).json({ msg: "Algo ha salido mal" });
  }
};
