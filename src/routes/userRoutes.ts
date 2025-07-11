import express from "express";
import { authUser } from "../middleware/userMiddleware";
import {
  registerValidator,
  loginValidator,
  updateValidator,
  deleteValidator,
} from "../validators/userValidator";
import * as userController from "../controller/userController";
const {validateRequest} = require("../middleware/validationMiddleware");
import { response } from "../helper/callBack";
const router = express.Router();

// POST /api/user/register
router.post(
  "/register",
  registerValidator,
  validateRequest,
  response(userController.registerUserController)
);
router.post(
  "/login",
  loginValidator,
  validateRequest,
  response(userController.loginUserController)
);
router.get("/profile", authUser, response(userController.getProfileController));
router.get(
  "/all",
  authUser,
  response(userController.getAllProfileController)
);
router.get(
  "/c",
  authUser,
  response(userController.getAllProfileAlphabeticOrderController)
);
router.put(
  "/update",
  authUser,
  updateValidator,
  response(userController.updateUserController)
);
router.delete(
  "/delete",
  authUser,
  deleteValidator,
  validateRequest,
  response(userController.deleteUserController)
);

export default router;
