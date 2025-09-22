import { Router } from "express";
import {
  createTag,
  deletedTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  idTagValidations,
  updateTagValidations,
} from "../middlewares/validations/tag.validations.js";
import { matchedDataMiddleware } from "../middlewares/matched_data.middleware.js";
import { applyValidation } from "../middlewares/validator.js";

export const routerTag = Router();

routerTag.post("/tags", authMiddleware, adminMiddleware, createTag);

routerTag.get("/tags", authMiddleware, getAllTags);

routerTag.get(
  "/tags/:id",
  authMiddleware,
  idTagValidations,
  applyValidation,
  matchedDataMiddleware,
  getTagById
);

routerTag.put(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  idTagValidations,
  updateTagValidations,
  applyValidation,
  matchedDataMiddleware,
  updateTag
);

routerTag.delete(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  idTagValidations,
  applyValidation,
  matchedDataMiddleware,
  deletedTag
);
