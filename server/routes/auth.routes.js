import { Router } from "express";
import { celebrate as validate } from "celebrate";
import paramsValidation from "../validations/auth.validation";
import userValidation from "../middleware/signup.middleware";
import userValidationLogin from "../middleware/signin.middleware";
import * as authController from "../controllers/auth.controller";

const router = Router();

router
  .route("/signup")
  .post(
    validate(paramsValidation.signUp, { abortEarly: false }),
    userValidation,
    authController.createUser
  );

  router
  .route("/signin")
  .post(
    validate(paramsValidation.signIn, { abortEarly: false }),
    userValidationLogin,
    authController.loginUser
  );

export default router;
