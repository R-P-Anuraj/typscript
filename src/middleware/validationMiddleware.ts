
// import { Request, Response, NextFunction } from "express";
// import { validationResult } from "express-validator";
// import { statusCode } from "../helper/statusCode";
// import { ControllerResponse } from "../interface/userInterface";
// export const validateRequest = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): ControllerResponse | void => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//      res.status(statusCode.BAD_REQUEST).json({
//       success: false,
//       message: "Validation errors",
//       data: errors.array(),
//     });
//     return;
//   }
//   next();
// };