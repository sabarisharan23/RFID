// src/index.ts
import express from 'express';
import router from "./Routers/assetRou"; // Import the router

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the router
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
