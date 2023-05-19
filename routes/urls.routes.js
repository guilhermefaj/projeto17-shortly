import { Router } from "express";
import { deleteUrl, getUrl, openUrl, postUrl } from "../controllers/urls.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { postUrlSchema } from "../schemas/urls.schemas.js";
import { authValidation } from "../middlewares/auth.middlewares.js";
import { deleteUrlValidation, openUrlValidation, shortUrlValidation } from "../middlewares/urls.middlewares.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", authValidation, validateSchema(postUrlSchema), postUrl);
urlsRouter.get("/urls/:id", shortUrlValidation, getUrl);
urlsRouter.get("/urls/open/:shortUrl", openUrlValidation, openUrl);
urlsRouter.delete("/urls/:id", authValidation, deleteUrlValidation, deleteUrl);


export default urlsRouter;