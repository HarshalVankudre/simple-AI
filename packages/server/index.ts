import express from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./route.ts";
import "reflect-metadata";
import AppDataSource from "./src/database.ts";

let dbStatus = "disconnected";

const app = express();
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    dbStatus = "connected";
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api/status", (req, res) => {
  res.json({ db: dbStatus });
});

app.use(express.json());
app.use(router);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});