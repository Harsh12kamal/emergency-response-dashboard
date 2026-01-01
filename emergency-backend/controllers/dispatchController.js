import mongoose from "mongoose";
import Incident from "../models/Incident.js";
import Unit from "../models/Unit.js";

// ✅ CREATE UNIT
export const createUnit = async (req, res) => {
  try {
    const { name, coordinates } = req.body;

    const unit = await Unit.create({
      name,
      available: true,
      location: {
        type: "Point",
        coordinates,
      },
    });

    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ RESOLVE INCIDENT & FREE UNIT
export const resolveIncident = async (req, res) => {
  try {
    const { incidentId } = req.params;

    const unit = await Unit.findOne({ currentIncident: incidentId });
    if (!unit) {
      return res.status(404).json({ error: "Unit not found" });
    }

    unit.available = true;
    unit.currentIncident = null;
    await unit.save();

    const incident = await Incident.findById(incidentId);
    incident.status = "resolved";
    incident.resolvedAt = new Date();
    await incident.save();

    res.json({ message: "Incident resolved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ GET ALL UNITS
export const getAllUnits = async (req, res) => {
  try {
    const units = await Unit.find();
    res.json(units);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ DISPATCH NEAREST UNIT
export const dispatchNearestUnit = async (req, res) => {
  try {
    const { incidentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(incidentId)) {
      return res.status(400).json({ error: "Invalid incident ID" });
    }

    const incident = await Incident.findById(incidentId);
    if (!incident) {
      return res.status(404).json({ error: "Incident not found" });
    }

    const unit = await Unit.findOne({
      available: true,
      location: {
        $near: {
          $geometry: incident.location,
        },
      },
    });

    if (!unit) {
      return res.status(404).json({ error: "No available units" });
    }

    unit.available = false;
    unit.currentIncident = incident._id;
    await unit.save();

    incident.status = "dispatched";
    incident.dispatchedAt = new Date();
    await incident.save();

    res.json({
      message: "Unit dispatched",
      unit,
      incident,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
