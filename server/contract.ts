import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const userSchema = z.object({
  id: z.number(),
  username: z.string().min(1, { message: "Name is required" }),
  createdAt: z.date(),
  updatedAt: z.date(),
  // Password removed from response schema for security reasons
});

export const contract = c.router({
  createUser: {
    method: "POST",
    path: "/createUser",
    body: z.object({
      username: z.string().min(1, { message: "Name is required" }),
      password: z.string(),
    }),
    responses: {
      201: userSchema, // Password is not returned
    },
  },

  getUser: {
    method: "GET",
    path: "/user",
    responses: {
      200: z.array(userSchema), // Password is not returned
    },
  },
});
