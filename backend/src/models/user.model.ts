export interface User {
  id?: string;
  email: string;
  password?: string;
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisteredUser {
  email?: string;
  token?: string;
}

export interface LoggedInUser {
  email: string;
  token: string;
}

export interface UserProfile {
  email?: string;
  token?: string;
}

