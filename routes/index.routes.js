import { Router } from "express";
import usersRouter from "./users.routes.js";
import urlsRouter from "./urls.routes.js";
import rankingRouter from "./ranking.routes.js";

const router = Router();
router.use(usersRouter);
router.use(urlsRouter);
router.use(rankingRouter);

export default router;