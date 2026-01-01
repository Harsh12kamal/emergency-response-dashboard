import Incident from "../models/Incident.js";
import classifySeverity from "../services/aiService.js";

export const createIncident = async (req, res) => {
  try {
    const { description, latitude, longitude } = req.body;

    if (
      latitude === undefined ||
      longitude === undefined ||
      isNaN(latitude) ||
      isNaN(longitude)
    ) {
      return res.status(400).json({
        error: "Valid latitude and longitude are required",
      });
    }

    const severity = await classifySeverity(description);

    const incident = await Incident.create({
      severity,
      status: "pending",
      location: {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)],
      },
    });

    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
