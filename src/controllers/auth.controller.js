import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helpers.js";

export const register = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const passwordHash = await hashPassword(data.password);

    const user = await UserModel.create({
      username: data.username,
      email: data.email,
      password: passwordHash,
      profile: {
        first_name: data.profile.first_name,
        last_name: data.profile.last_name,
        biography: data.profile.biography,
        avatar_url: data.profile.avatar_url,
        birth_date: data.profile.birth_date,
      },
    });
    return res
      .status(201)
      .json({ ok: true, msg: "Usuario creado", data: user });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExiste = await UserModel.findOne({ username });
    if (!userExiste)
      return res.status(404).json({ ok: false, msg: "Credenciales inválidas" });

    const passwordExiste = await comparePassword(password);
    if (!passwordExiste)
      return res.status(404).json({ ok: false, msg: "Credenciales inválidas" });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({ ok: true, msg: "Login exitoso", data: user });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ ok: true, msg: "Logout exitoso" });
};
