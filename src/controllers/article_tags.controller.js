import { ArticleModel } from "../models/article.model.js";

export const extraTag = async (req, res) => {
  const { articleId, tagId } = req.params;
  try {
    await ArticleModel.findByIdAndUpdate(articleId, {
      $addToSet: { tags: tagId },
    });
    return res
      .status(200)
      .json({ ok: true, msg: "Etiqueta agregada al artículo" });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteTagFromArticle = async (req, res) => {
  const { articleId, tagId } = req.params;
  try {
    await ArticleModel.findByIdAndUpdate(articleId, {
      $pull: { tags: tagId },
    });
    return res
      .status(200)
      .json({ ok: true, msg: "Etiqueta eliminada del artículo" });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
