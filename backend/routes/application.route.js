import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

// apply job
router.route("/apply/:id").get(isAuthenticated, applyJob);
// get applied jobs for logged in user
router.route("/get").get(isAuthenticated, getAppliedJobs);
// get applicants for a job
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
// update application status
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default router;

