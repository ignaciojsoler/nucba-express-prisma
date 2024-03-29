import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../controllers/expensesControllers";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { categoryExists, userExists } from "../helpers/dbValidators";
import { validateToken } from "../middlewares/validateToken";

export const expensesRouter = Router();

expensesRouter.get("/", validateToken, getExpenses);

expensesRouter.get(
  "/:id",
  [
    validateToken,
    check("id", "El ID proporcionado no es válido").isUUID(),
    validateFields,
  ],
  getExpenseById
);

expensesRouter.post(
  "/",
  [
    validateToken,
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
    validateFields,
  ],
  createExpense
);

expensesRouter.put(
  "/:id",
  [
    validateToken,
    check("id", "El ID proporcionado no es válido").isUUID(),
    validateFields,
  ],
  updateExpense
);

expensesRouter.delete(
  "/:id",
  [
    validateToken,
    check("id", "El id ingresado no es válido").isUUID(),
    validateFields,
  ],
  deleteExpense
);
