import {  UnAuthorizedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const authenticatedUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthorizedError(
      "You are not authorized to access this endpoint"
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      industryId: payload.industryId,
      name: payload.name,
      role: payload.role,
    };

    next();
  } catch (error) {
    throw new UnAuthorizedError("Authentication Invalid");
  }
};

const authorizePermissions = (...role) => {
  return (req, res, next) => {
    if (!req.user.role.includes(role)) {
      throw new UnAuthorizedError("UnAuthorized to access this route");
    }

    next();
  };
};

export { authenticatedUser, authorizePermissions };
