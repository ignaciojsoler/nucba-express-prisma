import { Router } from "express";
import {
  createUser,
  getUserById,
  getUsers,
} from "../controllers/usersControllers";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";

export const usersRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.get(
  "/:id",
  [check("id", "El ID ingresado no es válido").isMongoId(), validateFields],
  getUserById
);

usersRouter.post(
  "/",
  [
    check("name", "El nombre es obligatorio").isString().notEmpty(),
    check("email", "El email no es válido").isEmail().notEmpty(),
    check("password", "El password debe tener más de 8 caracteres").isLength({
      min: 8,
    }),
    validateFields,
  ],
  createUser
);
