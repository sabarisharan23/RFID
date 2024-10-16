import express, { Application } from "express";
import cors from "cors";
import assetRout from "./Routers/assetRou";

const app: Application = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());



app.get("/", assetRout);



app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});

export default app;
