import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ message: "Access denied" });
    return;
  }

  try {
    // Decode jwt token data
    const decoded = jwt.verify(token, "your_jwt_secret");

    if (typeof decoded !== "object" || !decoded?.userId) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Access denied" });
  }
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
  const role = req.role;

  if (role !== "seller") {
    res.status(401).json({ message: "Access denied" });
    return;
  }
  next();
}
