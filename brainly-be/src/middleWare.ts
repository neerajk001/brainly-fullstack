import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwt_password } from './config';

// Extend Request to include userId
export interface AuthenticatedRequest extends Request {
  userId?: string;
}

// ✅ Add return type `void` to make TS happy
export const userMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1]; // Bearer <token>
    const decoded = jwt.verify(token, jwt_password) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
