import bcrypt from "bcryptjs";
import { createUser, login } from "../../src/services/auth.service";
import prismaMock from "../prisma-mock";
import jwt from "jsonwebtoken";
jest.mock("jsonwebtoken");

describe("AuthService", () => {
  describe("createUser", () => {
    test("should create new user ", async () => {
      const user = {
        id: "007",
        email: "james@me",
        password: "bond",
      };

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const mockedResponse = {
        id: "007",
        email: "james@me",
        password: hashedPassword,
        token: jwt.sign(user, process.env.JWT_SECRET as string),
      };

      // When
      prismaMock.user.create.mockResolvedValue(mockedResponse);

      await expect(createUser(user)).resolves.toHaveProperty("token");
    });

    test("should throw an error when creating new user with empty email ", async () => {
      const user = {
        id: "007",
        email: "  ",
        password: "bond",
      };

      const error = String({ errors: { email: ["can't be blank"] } });
      await expect(createUser(user)).rejects.toThrow(error);
    });

    test("should throw an error when creating new user with empty password ", async () => {
      const user = {
        id: "007",
        email: "james@me",
        password: " ",
      };

      const error = String({ errors: { password: ["can't be blank"] } });
      await expect(createUser(user)).rejects.toThrow(error);
    });

    test("should throw an exception when creating a new user with already existing user on same email ", async () => {
      const user = {
        id: "007",
        email: "james@me",
        password: "bond",
      };

      const mockedExistingUser = {
        id: "007",
        email: "james@me",
        password: "bond",
      };

      // When
      prismaMock.user.findUnique.mockResolvedValue(mockedExistingUser);

      const error = { email: ["has already been taken"] }.toString();
      await expect(createUser(user)).rejects.toThrow(error);
    });
  });

  describe("login", () => {
    test("should return a token", async () => {
      const user = {
        email: "james@me",
        password: "bond",
      };

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const mockedResponse = {
        id: "007",
        email: "james@me",
        password: hashedPassword,
        token: jwt.sign(user, process.env.JWT_SECRET as string),
      };

      prismaMock.user.findUnique.mockResolvedValue(mockedResponse);

      await expect(login(user)).resolves.toHaveProperty("token");
    });

    test("should throw an error when the email is empty", async () => {
      const user = {
        email: " ",
        password: "bond",
      };

      const error = String({ errors: { email: ["can't be blank"] } });
      await expect(login(user)).rejects.toThrow(error);
    });

    test("should throw an error when the password is empty", async () => {
      const user = {
        email: "james@me",
        password: " ",
      };

      const error = String({ errors: { password: ["can't be blank"] } });
      await expect(login(user)).rejects.toThrow(error);
    });

    test("should throw an error when no user is found", async () => {
      const user = {
        email: "james@me",
        password: "bond",
      };

      // When
      prismaMock.user.findUnique.mockResolvedValue(null);

      const error = String({ errors: { "email or password": ["is invalid"] } });
      await expect(login(user)).rejects.toThrow(error);
    });

    test("should throw an error if the password is wrong", async () => {
      const user = {
        email: "james@me",
        password: "bond",
      };

      const hashedPassword = await bcrypt.hash("4321", 10);

      const mockedResponse = {
        id: "007",
        email: "james@me",
        password: hashedPassword,
      };

      prismaMock.user.findUnique.mockResolvedValue(mockedResponse);

      const error = String({ errors: { "email or password": ["is invalid"] } });
      await expect(login(user)).rejects.toThrow(error);
    });
  });
});
