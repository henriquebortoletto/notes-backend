import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";

export function ensureAuthenticated(request, response, next) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new AppError("Token not provided", 401);
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub: user_id } = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
