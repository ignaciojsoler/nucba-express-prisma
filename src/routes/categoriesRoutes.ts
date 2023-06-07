import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
} from "../controllers/categoriesControllers";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";

export const categoriesRouter = Router();

categoriesRouter.get("/", getCategories);

categoriesRouter.get("/:id", getCategoryById);

categoriesRouter.post(
  "/",
  [
    check("name", "El nombre de la categoría es obligatorio")
      .isString()
      .notEmpty(),
    validateFields,
  ],
  createCategory
);

//Pendiente
categoriesRouter.put("/:id", [
  check("id", "El id noes válido").isUUID(),
  check("id"),
]);
