import express from "express";
import { login, logout, register, updateProfile, toggleUserLock, getAllUsers, deleteUser } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

router.route("/get").get(isAuthenticated, isAdmin, getAllUsers);
router.put("/admin/user/:userId/lock", isAuthenticated, isAdmin, toggleUserLock);
router.delete("/admin/user/:userId", isAuthenticated, isAdmin, deleteUser);

export default router;

