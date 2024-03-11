import express, { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || "Internal Server Error";
  const stack = err.stack || null;
  res.status(statusCode).json({
    statusCode,
    message,
    stack,
  });
};
