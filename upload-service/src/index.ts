import express from "express";
import cors from "cors";
import { deployRouter } from "./controllers/deploy-route.controller";
import { setFlag } from "./controllers/set-flag.costroller";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", deployRouter);

app.get("/status", setFlag);

app.listen(PORT, ()=> {
    console.log("✔ UPLOAD SERVICE IS RUNNING at http://localhost:3000")
});
