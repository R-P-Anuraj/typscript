import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { statusCode } from "../helper/statusCode";
import {
  loginValidators,
  registerValidators,
  updateValidators,
  deleteValidators,
} from "./userValidator";

const errorFormatter = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(statusCode.BAD_REQUEST).json({
      success: false,
      message: "Validation errors",
      data: errors.array(),
    });
    return;
  }
  next();
};
export const loginV = loginValidators(errorFormatter);
export const registerV = registerValidators(errorFormatter);
export const updateV = updateValidators(errorFormatter);
export const deleteV = deleteValidators(errorFormatter);
