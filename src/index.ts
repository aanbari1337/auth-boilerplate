import express from "express";
import cors from "cors";
import { session } from "./auth/session";
import { router as auth } from "./controllers/auth";
import { router as hello } from "./controllers/hello";
import bodyParser from "body-parser";

declare module "express-session" {
  interface SessionData {
    userId: number | null;
  }
}

const app = express();
const PORT = process.env.PORT || 3000;
app.set("trust proxy", 1); // trust first proxy
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173", // client
    credentials: true,
  })
);

app.use(session);

app.use(auth); // auth controller
app.use(hello); // hello controller

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
