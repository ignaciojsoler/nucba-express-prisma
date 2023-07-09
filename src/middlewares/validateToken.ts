import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(400).json({ msg: "El token es obligatorio" });

    const validUser = jwt.verify(token, process.env.SECRET_KEY || "");

    res.locals.authenticatedUser = validUser;

    next();
  } catch (err) {
    res.status(400).json({'msg': 'Token inválido'})
  }
};
