import { ArticleModel } from "../models/article.model.js";

export const ownerOrAdminMiddleware = async (req, res, next) => {
  const user = req.user;
  const { id } = req.data;
  try {
    const isOwer = await ArticleModel.findOne({ _id: id, user: user._id });
    if (!isOwer || user.role !== "admin") {
      return res.status(403).json({
        ok: false,
        msg: "No tienes permisos para realizar esta acción",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};
