import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryByName,
  updateCateogry,
} from "../controllers/categoriesControllers";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";

export const categoriesRouter = Router();

categoriesRouter.get("/", getCategories);

categoriesRouter.get("/:name", getCategoryByName);

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

categoriesRouter.put("/:id", updateCateogry);

categoriesRouter.delete('/:id', deleteCategory)