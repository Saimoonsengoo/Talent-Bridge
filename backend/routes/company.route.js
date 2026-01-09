import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteCompany, getAllCompany, getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
// GET company
router.route("/get").get(isAuthenticated,getCompany);
// GET ALL companies
router.route("/getall").get(isAuthenticated,getAllCompany);
// GET by ID
router.route("/get/:id").get(isAuthenticated,getCompanyById);
// UPDATE company
router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);
// DELETE company
router.delete("/:id", deleteCompany);

export default router;

