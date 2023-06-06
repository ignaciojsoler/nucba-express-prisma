import { Router } from 'express';
import { addExpense } from '../controllers/expensesControllers';

export const expensesRouter = Router();

expensesRouter.post('/', addExpense)
