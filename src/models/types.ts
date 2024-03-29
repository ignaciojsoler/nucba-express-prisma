export type User = {
  id: string,
  name: string,
  email: string,
  password: string;
  role: string;
}

export type Expense = {
  id: string;
  amount: number;
  categoryId: number;
  description?: string | null;
  userId: number;
};

export type Category = {
  name: string;
  userId: string;
}
