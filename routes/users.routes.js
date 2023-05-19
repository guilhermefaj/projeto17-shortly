import { Router } from "express";
import { getUserProfile, signIn, signUp } from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { signInSchema, signUpSchema } from "../schemas/users.schemas.js";
import { SignInEmailValidation, SignUpEmailValidation, passwordValidation } from "../middlewares/users.middlewares.js";
import { authValidation } from "../middlewares/auth.middlewares.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), SignUpEmailValidation, signUp);
usersRouter.post("/signin", validateSchema(signInSchema), SignInEmailValidation, passwordValidation, signIn);
usersRouter.get("/users/me", authValidation, getUserProfile);


export default usersRouter;