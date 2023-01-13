import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/", (req: Request, res: Response) => {
  if (!req.session.userId) res.status(401).send("Not authenticated");
  else res.status(200).send("Hello World");
});

export { router };
