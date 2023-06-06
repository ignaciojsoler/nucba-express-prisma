import express from 'express';
import { expensesRouter } from './routes/expensesRoutes';
import { usersRouter } from './routes/usersRoutes';
import { categoriesRouter } from './routes/categoriesRoutes';

const PORT = process.env.PORT || 8000
const app = express();

app.use(express.json());

app.use('/api/expenses', expensesRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);

app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto', PORT);
})