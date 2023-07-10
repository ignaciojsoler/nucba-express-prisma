import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";

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
    res.status(500).json({ error: "No se pudo obtener la lista de usuarios." });
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
    if (!result)
      return res.status(404).json({
        error: "No se encontró ningún usuario con el ID proporcionado.",
      });
    res.json(result);
  } catch (e) {
    res.status(500).json({
      error: "No se pudo obtener el usuario.",
    });
  }
};

//Create
export const createUser = async (req: Request, res: Response) => {
  const uuid = v4();

  const newUser: User = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(newUser.password, salt);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

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
        password: hashPassword,
        role: "USER",
      },
    });

    const msg = {
      to: newUser.email,
      from: "ignaciojsoler@gmail.com",
      subject: `Bienvenido ${newUser.name}`,
      text: "Te registraste correctamente en la aplicación de gastos.",
    };

    sgMail.send(msg)
      .then(() => {
        console.log('Email enviado correctamente');
      })
      .catch(err => console.log(err));

    res.json(result);
  } catch (e) {
    res
      .status(500)
      .json({ error: "No se pudo crear el usuario correctamente." });
  }
};

//Update user
export const updateUser = async (req: Request, res: Response) => {

  const user: User = res.locals.authenticatedUser;

  try {
    const { id } = req.params;
    const userData: User = req.body;

    const userExists = await prisma.user.findUnique({
      where: {
        id: id
      },
    });
   
    if (userExists?.id !== user.id && user.role !== "ADMIN") {
      return res.status(403).json({ error: "Acceso no autorizado" });
    }

    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: userData,
    });

    res.json({ msg: "Usuario actualizado", result });
  } catch (e) {
    res.status(404).json({
      error: "No se encontró ningún usuario con el ID proporcionado.",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {

  const user: User = res.locals.authenticatedUser;

  try {
    const { id } = req.params;

    const userExists = await prisma.user.findUnique({
      where: {
        id: id
      },
    });

    if (userExists?.id !== user.id && user.role !== "ADMIN") {
      return res.status(403).json({ error: "Acceso no autorizado" });
    }

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
    res.status(404).json({
      error: "No se encontró ningún usuario con el ID proporcionado.",
    });
  }
};
