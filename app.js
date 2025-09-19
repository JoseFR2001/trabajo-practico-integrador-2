import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import starDB from "./src/config/db.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

starDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
