import express from "express";
import {
  createIncident,
  getAllIncidents,
} from "../controllers/incidentController.js";

const router = express.Router();

router.post("/", createIncident);
router.get("/", getAllIncidents);

export default router;
