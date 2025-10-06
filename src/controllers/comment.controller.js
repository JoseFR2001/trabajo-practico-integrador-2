import { CommentModel } from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const comment = await CommentModel.create(req.body);
    return res.status(201).json({ ok: true, data: comment });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await CommentModel.find()
      .populate("author", "username email profile")
      .populate("article", "title");
    return res.status(200).json({ ok: true, data: comments });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};

export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await CommentModel.findById(id)
      .populate("author", "username email profile")
      .populate("article", "title");
    return res.status(200).json({ ok: true, data: comment });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await CommentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ ok: true, data: comment });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};

export const deletedComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await CommentModel.findByIdAndDelete(id);
    return res.status(200).json({ ok: true, data: comment });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};

export const getCommentArticle = async (req, res) => {
  const { articleId } = req.params;
  try {
    const commentArticle = await CommentModel.find({
      article: articleId,
    }).populate("author");
    return res.status(200).json({
      data: commentArticle,
      ok: true,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getComentLoged = async (req, res) => {
  const { id } = req.user;
  try {
    const userComments = await CommentModel.find({ author: id })
      .populate("author", "username email profile")
      .populate("article", "title");
    return res.status(200).json({
      data: userComments,
      ok: true,
      msg: "operacion exitosa",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
