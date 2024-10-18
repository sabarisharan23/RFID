// src/modules/user/user.service.ts
import { z } from "zod";
import prisma from "../prisma";
import { addUserSchema } from "../contract/userContract";
import { Optional } from "@prisma/client/runtime/library";

type CreateUserInput = z.infer<typeof addUserSchema>;
export class UserService {
  static async createUser(data: CreateUserInput) {
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

  static async getAllUsers() {
    return await prisma.user.findMany();
  }

  static async updateUser(id: number, data: Optional<typeof addUserSchema>) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }
}
