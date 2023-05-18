import { Router } from "express";
import { deleteUrl, getUrl, openUrl, postUrl } from "../controllers/urls.controlles.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { postUrlSchema } from "../schemas/urls.schemas.js";
import { authValidation } from "../middlewares/auth.middleware.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", authValidation, validateSchema(postUrlSchema), postUrl);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", openUrl);
urlsRouter.delete("/urls/:id", authValidation, deleteUrl)


export default urlsRouter;