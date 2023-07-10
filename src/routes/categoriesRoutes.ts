import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCateogry,
} from "../controllers/categoriesControllers";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { validateToken } from "../middlewares/validateToken";

export const categoriesRouter = Router();

categoriesRouter.get("/", validateToken, getCategories);

categoriesRouter.get("/:id", validateToken, getCategoryById);

categoriesRouter.post(
  "/",
  [
    validateToken,
    check("name", "El nombre de la categoría es obligatorio")
      .isString()
      .notEmpty(),
    validateFields,
  ],
  createCategory
);

categoriesRouter.put(
  "/:id",
  [
    validateToken,
    check("id", "El ID ingresado no es válido").isUUID(),
    validateFields,
  ],
  updateCateogry
);

categoriesRouter.delete(
  "/:id",
  [
    validateToken,
    check("id", "El ID ingresado no es válido").isUUID(),
    validateFields,
  ],
  deleteCategory
);
