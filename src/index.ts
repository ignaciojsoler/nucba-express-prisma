import express from "express";
import dotenv from "dotenv";
import { expensesRouter } from "./routes/expensesRoutes";
import { usersRouter } from "./routes/usersRoutes";
import { categoriesRouter } from "./routes/categoriesRoutes";
import { authRouter } from "./routes/authRoutes";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.use("/api/expenses", expensesRouter);
app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log("Servidor iniciado en el puerto", PORT);
});
