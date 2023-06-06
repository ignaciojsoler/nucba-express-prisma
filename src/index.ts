import express from 'express';
import { expensesRouter } from './routes/expensesRoutes';

const PORT = process.env.PORT || 8000
const app = express();

app.use(express.json());

app.use('/api/expenses', expensesRouter);

app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto', PORT);
})