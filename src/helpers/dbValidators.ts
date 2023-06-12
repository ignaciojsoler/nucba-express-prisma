import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userExists = async (id: string) => {
  const userExists = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!userExists) throw new Error("El usuario ingresado no existe");
};

export const categoryExists = async (id: string) => {
    const userExists = await prisma.expenseCategory.findUnique({
      where: {
        id: id,
      },
    });
    if (!userExists) throw new Error("La categoría ingresada no existe");
  };
