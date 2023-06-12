import { Router } from "express";
import { createExpense, getExpenseById, getExpenses } from "../controllers/expensesControllers";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { categoryExists, userExists } from "../helpers/dbValidators";

export const expensesRouter = Router();

expensesRouter.get("/", getExpenses);

expensesRouter.get("/:id", [
    check("id", "El ID proporcionado no es válido").isUUID(),
    validateFields
], getExpenseById);

expensesRouter.post(
  "/",
  [
    check("amount", "Es necesario ingresar un importe numérico")
      .isNumeric()
      .notEmpty(),
    check(
      "description",
      "La descripción debe ser una cadena de texto"
    ).isString(),
    check("categoryId", "Es necesario ingresar una categoría").notEmpty(),
    check("categoryId", "La categoría ingresada no existe").custom(
      categoryExists
    ),
    check("userId", "Es necesario ingresar un usuario").notEmpty(),
    check("userId", "El usuario ingresado no existe").custom(userExists),
    validateFields,
  ],
  createExpense
);
