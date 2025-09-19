import { Router } from "express";
import { routerArticle } from "./article.routes.js";
import { routerComment } from "./comment.routes.js";
import { routerTag } from "./tag.routes.js";
import { routerUser } from "./user.routes.js";

const router = Router();

router.use(routerArticle);
router.use(routerComment);
router.use(routerTag);
router.use(routerUser);

export default router;
