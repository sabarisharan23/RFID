// src/config/prisma.ts
import { PrismaClient } from "@prisma/client";

// Initialize the Prisma Client
const prisma = new PrismaClient();

// Optional: You can add a global error handler if needed
prisma.$use(async (params, next) => {
  // Log the query to the console (optional)
  console.log("Prisma Query: ", params);
  return next(params);
});

export default prisma; // Export it for use in other files
