import { z } from "zod";
import prisma from "../prisma";
import { addUserSchema } from "../contract/userContract";
import { Optional } from "@prisma/client/runtime/library";

type CreateUserInput = z.infer<typeof addUserSchema>;

export async function createUser(data: CreateUserInput) {
  const { username, email, hashedPassword, isAdmin } = data;

  return await prisma.user.create({
    data: {
      username,
      email,
      hashedPassword,
      isActive: true,
      isAdmin: isAdmin || false,
    },
  });
}

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function updateUser(
  id: number,
  data: Optional<typeof addUserSchema>
) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export const UserService = {
  createUser,
  getAllUsers,
  updateUser,
};
