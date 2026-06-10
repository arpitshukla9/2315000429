import express from "express";
import { getSchedule } from "../controllers/scheduler.controller.js";

const router = express.Router();

router.get("/schedule", getSchedule);

export default router;