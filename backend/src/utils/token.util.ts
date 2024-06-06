import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { RegisteredUser } from "../models/user.model";

const generateToken = (user: RegisteredUser): string =>
  jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: "60d" });

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export { generateToken, protect };
