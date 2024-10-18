import express, { Application } from "express";
import cors from "cors";
import contract from "contract"; // Ensure the correct import path for your contract
import tsRestRouter from "./tsrout";
import { createExpressEndpoints } from "@ts-rest/express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Create express endpoints using the contract and the router
createExpressEndpoints(contract, tsRestRouter, app, {
  logInitialization: true,
  jsonQuery: true,
});

// Optionally, you can keep this route to test your server
// If getAllBug is defined in tsrout, you can remove this line if unnecessary
// const { getAllBug } = tsRestRouter; // Make sure to import correctly if needed

app.get("/", (req, res) => {
  res.send("Welcome to the Inventory Management System API!"); // Simple welcome message
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
