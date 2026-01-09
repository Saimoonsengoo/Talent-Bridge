import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteJob, getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

// post a job
router.route("/post").post(isAuthenticated, postJob);
// get all jobs
router.route("/get").get(isAuthenticated, getAllJobs);
// get jobs posted by logged in admin
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
// get job by ID
router.route("/get/:id").get(isAuthenticated, getJobById);
// delete job
router.delete("/:id", deleteJob);

export default router;

