import express from "express";
import { authUser } from "../middleware/userMiddleware";
import * as userController from "../controller/userController";
// const { validateRequest } = require("../middleware/validationMiddleware");
import { loginV, registerV, updateV, deleteV } from "../validators";
import { response } from "../helper/callBack";
const router = express.Router();

// POST /api/user/register
router.post(
  "/register",
  registerV.registerValidators,
  response(userController.registerUserController)
);
router.post(
  "/login",
  loginV.loginValidators,
  response(userController.loginUserController)
);
router.get("/profile", authUser, response(userController.getProfileController));
router.get("/all", authUser, response(userController.getAllProfileController));
router.get(
  "/c",
  authUser,
  response(userController.getAllProfileAlphabeticOrderController)
);
router.put(
  "/update",
  authUser,
  updateV.updateValidators,
  response(userController.updateUserController)
);
router.delete(
  "/delete",
  authUser,
  deleteV.deleteValidators,
  response(userController.deleteUserController)
);

export default router;
