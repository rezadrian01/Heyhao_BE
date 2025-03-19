import type { NextFunction, Request, Response } from "express";
import {
  resetPasswordSchema,
  signinSchema,
  signupSchema,
} from "../utils/schema/user";
import fs from "node:fs";
import * as userService from "../services/userService";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Upload photo is required",
      });
    }

    const parse = signupSchema.safeParse(req.body);
    if (!parse.success) {
      fs.unlinkSync(req.file.path);
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        detail: errorMessage,
      });
    }

    const newUser = await userService.signup(parse.data, req.file);
    return res.json({
      success: true,
      message: "Create user success",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parse = signinSchema.safeParse(req.body);
    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        detail: errorMessage,
      });
    }
    const user = await userService.signin(parse.data);
    return res.json({
      success: true,
      message: "Login Success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmailReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parse = signinSchema.pick({ email: true }).safeParse(req.body);
    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        detail: errorMessage,
      });
    }
    const email = parse.data.email;
    await userService.getEmailReset(email);
    return res.json({
      success: true,
      message: "Email reset password has been sent",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parse = resetPasswordSchema.safeParse(req.body);
    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        detail: errorMessage,
      });
    }

    const { token } = req.params;
    await userService.resetPassword(parse.data, token);
    return res.json({
      success: true,
      message: "Password has been updated",
    });
  } catch (error) {
    next(error);
  }
};
