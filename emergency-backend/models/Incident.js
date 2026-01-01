import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
  },
  { timestamps: true }
);

incidentSchema.index({ location: "2dsphere" });

export default mongoose.model("Incident", incidentSchema);
