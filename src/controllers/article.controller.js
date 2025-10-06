import { ArticleModel } from "../models/article.model.js";

export const createArticle = async (req, res) => {
  const data = req.data;
  const user = req.user;
  try {
    const article = await ArticleModel.create({
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      status: data.status,
      author: user._id,
      tags: data.tags,
    });
    return res.status(201).json({ ok: true, data: article });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find()
      .populate("author", "username email profile")
      .populate("tags", "name description");
    return res.status(200).json({ ok: true, data: articles });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};

export const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findById(id)
      .populate("author", "username email profile")
      .populate("tags", "name description");
    return res.status(200).json({ ok: true, data: article });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ ok: true, data: article });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};

export const deletedArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findByIdAndDelete(id);
    return res.status(200).json({ ok: true, data: article });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};
