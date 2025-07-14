import { body } from "express-validator";

const registerValidator = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6+ chars"),
  ];
};

const loginValidator = () => {
  return [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};
const updateValidator = () => {
  return [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("email").optional().isEmail().withMessage("Valid email is required"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be 6+ chars"),
  ];
};
const deleteValidator = () => {
  return [body("userId").notEmpty().withMessage("User ID is required")];
};

export const loginValidators = (errorFormatter: any) => ({
  loginValidators: [loginValidator(), errorFormatter],
});
export const registerValidators = (errorFormatter: any) => ({
  registerValidators: [registerValidator(), errorFormatter],
});
export const updateValidators = (errorFormatter: any) => ({
  updateValidators: [updateValidator(), errorFormatter],
});
export const deleteValidators = (errorFormatter: any) => ({
  deleteValidators: [deleteValidator(), errorFormatter],
});


