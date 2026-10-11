import type { NextFunction, Request, Response } from "express";

type ErrorWithCode = Error & { code?: string; name: string };

const globalErrorHandler = (
  err: ErrorWithCode,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!";

  if (err?.name === "ZodError") {
    statusCode = 400;
    message = "Invalid request data.";
  } else if (err?.code === "P2002") {
    statusCode = 409;
    message = "A record with this unique value already exists.";
  } else if (err?.code === "P2025") {
    statusCode = 404;
    message = "The requested record was not found.";
  } else if (err?.code === "P2023") {
    statusCode = 400;
    message = "The supplied ID is invalid.";
  }

  if (statusCode === 500) console.error("Unhandled request error:", err);
  res.status(statusCode).json({ success: false, message });
};

export default globalErrorHandler;
