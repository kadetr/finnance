import { NextFunction, Request, Response, Router } from "express";
import { createUser, login } from "../services/auth.service";
import { protect } from "../utils/token.util";

const router = Router();

/**
 * Create an user
 * @route {POST} /users
 * @returns user
 */
router.post(
  "/users/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = await createUser({ email, password });
      res.json({ user });
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Login
 * @route {POST} /users/login
 * @returns user
 */
router.post(
  "/users/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await login(req.body);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
