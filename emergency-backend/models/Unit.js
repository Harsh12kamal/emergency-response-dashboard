import mongoose from "mongoose";

const UnitSchema = new mongoose.Schema({
  available: { type: Boolean, default: true },

  currentIncident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incident",
    default: null
  },

  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number]
  }
});

UnitSchema.index({ location: "2dsphere" });

export default mongoose.model("Unit", UnitSchema);
