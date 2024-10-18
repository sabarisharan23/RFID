import { initContract } from "@ts-rest/core";
import { response } from "express";
import { z } from "zod";

const c = initContract();

// export const userSchema = z.object({
//   username: z.string().min(1, "Username is required"), // Username must be at least 1 character
//   email: z.string().email("Invalid email format"), // Email must be in valid format
//   hashedPassword: z
//     .string()
//     .min(8, "Password must be at least 8 characters long"), // Password must be at least 6 chars
//   isActive: z.boolean().default(true), // Default to true if not provided
//   isAdmin: z.boolean().default(false), // Default to false if not provided
// });
export const addUserSchema = z.object({
  username: z.string().min(1, "Username is required"), // Username must be at least 1 character
  email: z.string().email("Invalid email format"), // Email must be in valid format
  hashedPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long"), // Password must be at least 6 chars
  isActive: z.boolean().default(true), // Default to true if not provided
  isAdmin: z.boolean().default(false), // Default to false if not provided
});
// export const contract = c.router({
//   createUser: {
//     method: "POST",
//     path: "/user",
//     body: addUserSchema,
//     responses: {
//       201: addUserSchema,
//     },
//   },

//   getUser: {
//     method: "GET",
//     path: "/user",
//     responses: {
//       200: z.array(addUserSchema),
//     },
//   },
//   updateUser: {
//     method: "PUT",
//     path: "/user",
//     body: addUserSchema,
//     responses: {
//       201: addUserSchema,
//     },
//   },
// });
