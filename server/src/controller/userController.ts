// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { UserService } from "../service/userService";
import { addUserSchema } from "../contract/userContract"; // Ensure this import is correct
import { z } from "zod";

export async function createUser1(req: Request, res: Response) {
  try {
    // Validate the request body using Zod
    const validatedBody = addUserSchema.parse(req.body);
    const newUser = await UserService.createUser(validatedBody);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users." });
  }
}

export async function updateUser(req: Request, res: Response) {
  const userId = Number(req.params.id);
  try {
    const validatedBody = addUserSchema.partial().parse(req.body);
    const updatedUser = await UserService.updateUser(userId, validatedBody);
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors });
      return;
    }
    res.status(404).json({ message: "User not found." });
  }
}


