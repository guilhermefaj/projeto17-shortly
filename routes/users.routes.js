import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/users.schemas.js";
import { SignInEmailValidation, SignUpEmailValidation } from "../middlewares/users.middlewares.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), SignUpEmailValidation, signUp);
usersRouter.post("/signin", validateSchema(signInSchema), SignInEmailValidation, signIn);

export default usersRouter;