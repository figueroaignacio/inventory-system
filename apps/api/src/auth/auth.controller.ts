import { Request, Response } from "express";

import { JWT_SECRET } from "../lib/constants";
import prisma from "../config/prisma-client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User registered successfully.", user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User logged in successfully.", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const protectedRoute = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res.json({ message: "You have access to this protected route" });
};
