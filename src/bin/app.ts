import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV == "test" ? ".env.test" : ".env",
});

import express from "express";
import UserRoutes from "@routes/UserRoutes";
import AuthRoutes from "@routes/AuthRoutes";

const app = express();

app.use(express.json());
app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);

export default app;
