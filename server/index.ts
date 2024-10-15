import express from 'express';
import cors from 'cors';
import { initServer, createExpressEndpoints } from '@ts-rest/express';
import { contract } from './contract';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';  // Import bcrypt for password hashing

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

const s = initServer();

const router = s.router(contract, {
  createUser: async ({ body }) => {
    try {
      // Destructure username and password from the body
      const { username, password } = body;

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user in the database with the hashed password
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword, // Store the hashed password
        },
      });

      // Don't include the password in the response
      const { password: _, ...safeUser } = user;

      return { status: 201, body: safeUser as User };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 400, body: { message: error.message } };
      }
      return { status: 400, body: { message: 'An unknown error occurred' } };
    }
  },

  getUser: async () => {
    try {
      // Fetch all users, excluding password from the result
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          createdAt: true,
          updatedAt: true,
          // Password is excluded here to ensure it isn't returned
        },
      });

      return { status: 200, body: users as User[] };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 400, body: { message: error.message } };
      }
      return { status: 400, body: { message: 'An unknown error occurred' } };
    }
  },
});

// Link the contract endpoints to Express
createExpressEndpoints(contract, router, app);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
