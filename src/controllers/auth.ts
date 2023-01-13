import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import prismaClient from "../prisma/prisma-client";

const router = express.Router();

router.post("/api/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync();

  let user;
  try {
    user = await prismaClient.user.create({
      data: {
        email: email,
        password: bcrypt.hashSync(password, salt),
      },
    });
    req.session.userId = user.id;
    res.status(200).send(user);
  } catch (error) {
    res.status(403).send("Email must be unique");
  }
});

router.post("/api/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (!result) throw new Error();
      req.session.userId = user.id;
      res.status(200).send({ email: user.email });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).send("Incorrect email or password");
  }
});

router.get("/api/logout", (req: Request, res: Response) => {
  req.session.userId = null;
  req.session.save((err) => {
    console.log(err);
  });

  // Regenerate session good practice
  req.session.regenerate((err) => {
    console.log(err);
  });
  res.status(200).send("Logout successfully");
});

export { router };
