import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";

export const idArticleValidations = [
  param("id")
    .isMongoId()
    .withMessage("El ID debe ser un ID válido")
    .custom(async (id) => {
      const article = await ArticleModel.findById(id);
      if (!article) {
        throw new Error("El article no existe");
      }
      return true;
    }),
];

export const createArticleValidations = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El extracto no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser 'published' o 'archived'"),

  body("author")
    .isMongoId()
    .withMessage("El autor debe ser un ID válido")
    .custom(async (author, { req }) => {
      if (author !== req.user._id.toString() || req.user.role !== "admin") {
        throw new Error("No puedes asignar un artículo a otro autor");
      }
      return true;
    }),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Las etiquetas deben ser un array de IDs"),

  body("tags.*").isMongoId().withMessage("Cada etiqueta debe ser un ID válido"),
];

export const updateArticleValidations = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .optional()
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El extracto no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser 'published' o 'archived'"),

  body("author")
    .optional()

    .isMongoId()
    .withMessage("El autor debe ser un ID válido")
    .custom(async (author, { req }) => {
      if (author !== req.user._id.toString() || req.user.role !== "admin") {
        throw new Error("No puedes asignar un artículo a otro autor");
      }
      return true;
    }),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Las etiquetas deben ser un array de IDs"),

  body("tags.*")
    .optional()
    .isMongoId()
    .withMessage("Cada etiqueta debe ser un ID válido"),
];
