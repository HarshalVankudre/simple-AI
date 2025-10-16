import express from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./route.ts";
const app = express();

app.use(express.json());
app.use(router);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});