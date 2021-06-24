import jwt from "jsonwebtoken";

export const generateIdToken = (id) =>
  jwt.sign({ id }, "secret", { expiresIn: "30d" });

export const createActivationToken = (payload) =>
  jwt.sign(payload, "secret", { expiresIn: "5m" });

export const createAccessToken = (payload) =>
  jwt.sign(payload, "secret", { expiresIn: "15m" });
