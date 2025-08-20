import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router/user.route.js";

import { PORT } from "./env.js";

dotenv.config();
const app = express();

//CORS setup
app.use(cors());

//Enable JSON parsing (Middleware)
app.use(express.json());

//Database Connection
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is Running at PORT ${PORT}`);
});
