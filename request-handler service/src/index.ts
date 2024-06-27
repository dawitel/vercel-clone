import express from "express";
import { requestHandler } from "./controllers/request-handler-controller";
import { config } from "dotenv";

config();
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/*", requestHandler);

app.listen(PORT, () => {
  console.log("✔ REQUEST_HANDLER_SERVICE is running at http://localhost:3001");
});
