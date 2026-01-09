import express from "express";
import { login, logout, register, updateProfile, toggleUserLock, getAllUsers, deleteUser } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

// User Registration and Login
router.route("/register").post(singleUpload,register);
// User Login
router.route("/login").post(login);
// User Logout
router.route("/logout").get(logout);
// Update Profile
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

// ================= Super ADMIN =================
router.route("/get").get(isAuthenticated, isAdmin, getAllUsers);
// Lock/Unlock User
router.put("/admin/user/:userId/lock", isAuthenticated, isAdmin, toggleUserLock);
// Delete User
router.delete("/admin/user/:userId", isAuthenticated, isAdmin, deleteUser);

export default router;

