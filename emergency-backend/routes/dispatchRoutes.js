import express from "express";
import {
  createUnit,
  dispatchNearestUnit,
  resolveIncident,
  getAllUnits
} from "../controllers/dispatchController.js";

const router = express.Router();

// MOST SPECIFIC FIRST
router.get("/units", getAllUnits);
router.post("/units", createUnit);
router.post("/resolve/:incidentId", resolveIncident);

// LEAST SPECIFIC LAST
router.post("/:incidentId", dispatchNearestUnit);

export default router;
