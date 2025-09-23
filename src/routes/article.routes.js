import { Router } from "express";
import {
  createArticle,
  deletedArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
} from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createTagValidations } from "../middlewares/validations/tag.validations.js";
import { applyValidation } from "../middlewares/validator.js";
import { matchedDataMiddleware } from "../middlewares/matched_data.middleware.js";

export const routerArticle = Router();

routerArticle.post(
  "/articles",
  authMiddleware,
  createTagValidations,
  applyValidation,
  matchedDataMiddleware,
  createArticle
);

routerArticle.get("/articles", getAllArticles);

routerArticle.get("/articles/:id", getArticleById);

routerArticle.put("/articles/:id", updateArticle);

routerArticle.delete("/articles/:id", deletedArticle);
