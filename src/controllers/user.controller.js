import { UserModel } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ deleted_at: null })
      .populate("articles")
      .lean();
    if (!users || users.length === 0) {
      return res.status(404).json({ ok: false, msg: "No hay usuarios" });
    }
    return res.status(200).json({ ok: true, data: users });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};
export const getUserById = async (req, res) => {
  const { id } = req.data;
  try {
    const user = await UserModel.findOne({ id, deleted_at: null })
      .populate("articles")
      .populate("comments");
    return res.status(200).json({ ok: true, data: user });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};
export const updateUser = async (req, res) => {
  const data = req.data;
  try {
    const user = await UserModel.findByIdAndUpdate(
      data.id,
      {
        ...data,
      },
      { new: true }
    );
    return res.status(200).json({ ok: true, data: user });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};
export const deletedUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { deleted_at: new Date() },
      { new: true }
    );
    return res
      .status(200)
      .json({ ok: true, msg: "Usuario eliminado", data: user });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
  w;
};
