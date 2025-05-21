import JWT from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "./error-handler";

const ALLOWED_SERVICES: string[] = [
  "message",
  "auth",
  "buyer",
  "seller",
  "search",
  "gig",
  "chat",
  "order",
  "review",
];

export function verifyGatewayToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader: string = request.headers?.gatewaytoken as string;
  if (!authHeader) {
    throw new NotAuthorizedError(
      "invalid request",
      "verifyGatewayToken() method: Missing auth header"
    );
  }

  const token: string = authHeader?.split(" ")?.[1];
  if (!token) {
    throw new NotAuthorizedError(
      "invalid request",
      "verifyGatewayToken() method: Missing token"
    );
  }

  try {
    const payload: { id: string; iat: number } = JWT.verify(token, "4141e9b1526b138160cfe71806ee4a95") as {
      id: string;
      iat: number;
    };

    if (!ALLOWED_SERVICES.includes(payload.id)) {
      throw new NotAuthorizedError(
        `Service "${payload.id}" is not allowed.`,
        "verifyGatewayToken() method: Invalid token"
      );
    }
    next();
  } catch (error) {
    throw new NotAuthorizedError(
      "invalid request",
      "verifyGatewayToken() method: Invalid token"
    );
  }
}
