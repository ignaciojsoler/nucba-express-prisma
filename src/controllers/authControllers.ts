import { Request, Response } from "express";
import { User } from "../models/types";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;

    const userExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!userExists)
      return res.status(400).json({ msg: `Correo electrónico inválido.` });

    const validPassword = await bcrypt.compare(
      user.password,
      userExists.password
    );

    if (!validPassword)
      return res.status(400).json({
        msg: "La contraseña es incorrecta",
      });

    const token = jwt.sign(user, process.env.SECRET_KEY || "", {
      expiresIn: "72h",
    });

    res.json({user: userExists.email, 'token': token});
  } catch (err) {
    return res.status(500).json({ msg: "Algo ha salido mal" });
  }
};
