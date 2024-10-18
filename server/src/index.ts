// src/app.ts
import express from "express";
import cors from "cors";
import userRoutes from "./router/userRouter"; // Import user routes

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Use user routes with a prefix (optional)
app.use("/api", userRoutes); // Prefix all user routes with /api
// app.use("/api1", userRoutes); // Prefix all user routes with /api

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
