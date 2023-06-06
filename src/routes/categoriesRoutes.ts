import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/categoriesControllers';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields';

export const categoriesRouter = Router();

categoriesRouter.get('/', getCategories)

categoriesRouter.post('/', [
    check('name', 'El nombre de la categoría es obligatorio').isString().notEmpty(),
    validateFields
], createCategory);

