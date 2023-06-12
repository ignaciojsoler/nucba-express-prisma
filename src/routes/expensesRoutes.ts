import { Router } from 'express';
import { createExpense } from '../controllers/expensesControllers';

export const expensesRouter = Router();

expensesRouter.post('/', createExpense);
