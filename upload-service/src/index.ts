import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { deployRouter, setFlag } from "./controllers";

config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", deployRouter);

app.get("/status", setFlag);

app.listen(PORT, () => {
  console.log("✔ UPLOAD SERVICE IS RUNNING at http://localhost:3000");
});
