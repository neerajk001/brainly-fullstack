import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";

import { UserModel, contentModel, linkModel } from "./db";
import { jwt_password } from "./config";
import { userMiddleware, AuthenticatedRequest } from "./middleWare";
import { random } from "./utils";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  await UserModel.create({ username, password });

  res.json({ message: "you signed up" });
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingUser = await UserModel.findOne({ username, password });

  if (existingUser) {
    const token = jwt.sign({ id: existingUser._id }, jwt_password);
    res.json({ token });
  } else {
    res.status(403).json({ message: "incorrect credentials" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { link, type, title } = req.body;

  await contentModel.create({
    link,
    type,
    title,
    userId: req.userId,
    tags: []
  });

  res.json({ message: "Content added" });
});

app.get("/api/v1/content", userMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const content = await contentModel.find({ userId: req.userId }).populate("userId", "username");
  res.json({ content });
});

app.delete("/api/v1/content/:id", userMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const contentId = req.params.id;
  await contentModel.findOneAndDelete({ _id: contentId, userId: req.userId });
  res.json({ message: "deleted" });
});

app.post("/api/v1/brain/share", userMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { share } = req.body;

  if (share) {
    const existingLink = await linkModel.findOne({ userId: req.userId });

    if (existingLink) {
      res.json({ hash: existingLink.hash });
      return;
    }

    const hash = random(10);
    await linkModel.create({ userId: req.userId, hash });
    res.json({ hash });
  } else {
    await linkModel.deleteOne({ userId: req.userId });
    res.json({ message: "Removed link" });
  }
});

app.get("/api/v1/brain/:shareLink", async (req: Request, res: Response) => {
  const hash = req.params.shareLink;
  const link = await linkModel.findOne({ hash });

  if (!link) {
    res.status(411).json({ message: "Sorry incorrect input" });
    return;
  }

  const content = await contentModel.find({ userId: link.userId });
  const user = await UserModel.findById(link.userId);

  if (!user) {
    res.status(411).json({ message: "user not found, error should ideally not happen" });
    return;
  }

  res.json({ username: user.username, content });
});

async function main() {
  await mongoose.connect("mongodb+srv://neeraj001:heyramheyram001@cluster0.rlawr.mongodb.net/third-brain");
  console.log("Database connected");

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

main();
