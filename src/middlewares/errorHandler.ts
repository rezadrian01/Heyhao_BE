import { Request, Response, NextFunction } from "express";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  console.error(error.stack);
  return res.status(500).json({ message: "Something went wrong!" });
};

export default errorHandler;
