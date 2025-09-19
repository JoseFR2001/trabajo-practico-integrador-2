import { Router } from "express";
import {
  createUser,
  deletedUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

export const routerUser = Router();

routerUser.post("/users", createUser);
routerUser.get("/users", getAllUsers);
routerUser.get("/users/:id", getUserById);
routerUser.put("/users/:id", updateUser);
routerUser.delete("/users/:id", deletedUser);
