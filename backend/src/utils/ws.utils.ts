import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticated = (token: string): boolean => {
  let tkn: string, auth;
  if (token.startsWith("Bearer")) {
    try {
      tkn = token.split(" ")[1];

      auth = jwt.verify(tkn, process.env.JWT_SECRET as string) as JwtPayload;
    } catch (error) {
      console.error(error);
    }
  }

  return auth ? true : false;
};

export interface WSRequest {
  token: string;
  type: string;
  symbol?: string;
}
