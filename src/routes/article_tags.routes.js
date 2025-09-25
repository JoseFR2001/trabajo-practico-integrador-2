import { Router } from "express";
import {
  extraTag,
  deleteTagFromArticle,
} from "../controllers/article_tags.controller.js";

const router = Router();

router.post("article/:articleId/tags/:tagId", extraTag);

router.delete("article/:articleId/tags/:tagId", deleteTagFromArticle);

export default router;
