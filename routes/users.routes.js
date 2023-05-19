import { Router } from "express";
import { getUserProfile, signIn, signUp } from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/users.schemas.js";
import { SignInEmailValidation, SignUpEmailValidation } from "../middlewares/users.middlewares.js";
import { authValidation } from "../middlewares/auth.middleware.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), SignUpEmailValidation, signUp);
usersRouter.post("/signin", validateSchema(signInSchema), SignInEmailValidation, signIn);
usersRouter.get("/users/me", authValidation, getUserProfile);


export default usersRouter;