import express from "express";
import { random } from "./utils";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { config } from "./config";
import { authMiddleware } from "./middleware";
import { connectDB } from "./db";
import cors from "cors";
import zod from "zod";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.post("/api/v1/signup", async (req, res) => {
  const requireBody = zod.object({
    email: zod.string().email().min(5),
    password: zod.string().min(5),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3),
  });

  const parseDataWithSuccess = requireBody.safeParse(req.body);
  if (!parseDataWithSuccess.success) {
    return res.json({
      message: "Incorrect data format",
      error: parseDataWithSuccess.error,
    });
  }


  const { email, password, firstName, lastName } = req.body;
  const hashpassword = await bcrypt.hash(password, 10);

  try {
    const user = await UserModel.create({
      username: email,
      password: hashpassword,
      firstName,
      lastName,
    });
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  } catch (error) {
    return res.json({ message: "User already exists" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const requireBody = zod.object({
    email: zod.string().email().min(5),
    password: zod.string().min(5),
  });

  const parseDataWithSuccess = requireBody.safeParse(req.body);
  if (!parseDataWithSuccess.success) {
    return res.json({
      message: "Incorrect data format",
      error: parseDataWithSuccess.error,
    });
  }

  const { email, password } = req.body;

  const user = await UserModel.findOne({ username: email });
  if (!user) {
    return res.json({ message: "User not found" });
  }

  // FIX 2: Use bcrypt.compare to verify password instead of a plain DB lookup
  const isMatch = await bcrypt.compare(password, user.password as string);
  if (isMatch) {
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(403).json({ message: "Incorrect credentials" });
  }
});

app.post("/api/v1/content", authMiddleware, async (req, res) => {
  const { link, type, title } = req.body;
  await ContentModel.create({
    link,
    type,
    title,
    userId: req.userId,
    tags: [],
  });
  res.json({ message: "Content added" });
});

app.get("/api/v1/content", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const content = await ContentModel.find({ userId }).populate("userId", "username");
  res.json(content);
});

app.delete("/api/v1/content", authMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({ _id: contentId, userId: req.userId });
  res.json({ message: "Deleted" });
});

app.post("/api/v1/brain/share", authMiddleware, async (req, res) => {
  const { share } = req.body;
  if (share) {
    const existingLink = await LinkModel.findOne({ userId: req.userId });
    if (existingLink) {
      res.json({ hash: existingLink.hash });
      return;
    }
    const hash = random(10);
    await LinkModel.create({ userId: req.userId, hash });
    res.json({ hash });
  } else {
    await LinkModel.deleteOne({ userId: req.userId });
    res.json({ message: "Removed link" });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({ hash });
  if (!link) {
    res.status(404).json({ message: "Invalid share link" });
    return;
  }

  const content = await ContentModel.find({ userId: link.userId });
  const user = await UserModel.findOne({ _id: link.userId });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({ username: user.username, content });
});


connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});