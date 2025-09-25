import { Router } from "express";

import {
  createComment,
  deletedComment,
  getAllComments,
  getCommentById,
  updateComment,
  getCommentArticle,
  getComentLoged,
} from "../controllers/comment.controller.js";

export const routerComment = Router();

// Crear comentario
routerComment.post("/comments", createComment);
// Listar todos los comentarios
routerComment.get("/comments", getAllComments);
// Listar comentarios de un artículo
routerComment.get("/comments/article/:articleId", getCommentArticle);
// Listar comentarios del usuario logueado
routerComment.get("/comments/my", getComentLoged);
// Obtener comentario por id
routerComment.get("/comments/:id", getCommentById);
// Actualizar comentario
routerComment.put("/comments/:id", updateComment);
// Eliminar comentario
routerComment.delete("/comments/:id", deletedComment);
