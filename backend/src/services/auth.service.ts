import bcrypt from "bcryptjs";
import {
  LoggedInUser,
  LoginInput,
  RegisterInput,
  RegisteredUser,
  User,
  UserProfile,
} from "../models/user.model";
import prisma from "../../prisma/prisma-client";
import HttpException from "../models/http-exception.model";
import { generateToken } from "../utils/token.util";

const checkUserUniqueness = async (email: string) => {
  const existingUserByEmail = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (existingUserByEmail) {
    throw new HttpException(422, {
      errors: {
        ...(existingUserByEmail ? { email: ["has already been taken"] } : {}),
      },
    });
  }
};

export const createUser = async (
  input: RegisterInput,
): Promise<RegisteredUser> => {
  const email = input.email?.trim();
  const password = input.password?.trim();
  if (!email) {
    throw new HttpException(422, { errors: { email: ["can't be blank"] } });
  }

  if (!password) {
    throw new HttpException(422, { errors: { password: ["can't be blank"] } });
  }

  await checkUserUniqueness(email);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user: RegisteredUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return {
    email,
    token: generateToken(user),
  };
};

export const login = async (userPayload: LoginInput): Promise<LoggedInUser> => {
  const email = userPayload.email?.trim();
  const password = userPayload.password?.trim();

  if (!email) {
    throw new HttpException(422, { errors: { email: ["can't be blank"] } });
  }

  if (!password) {
    throw new HttpException(422, { errors: { password: ["can't be blank"] } });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      password: true,
    },
  });

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return {
        email: user.email,
        token: generateToken(user),
      };
    }
  }

  throw new HttpException(403, {
    errors: {
      "email or password": ["is invalid"],
    },
  });
};
