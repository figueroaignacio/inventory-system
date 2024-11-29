import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../lib/constants";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Authorization header missing" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Token missing" });
    return;
  }

  try {
    let payload: { userId: number };
    payload = jwt.verify(token, JWT_SECRET) as { userId: number };
    // @ts-ignore
    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
