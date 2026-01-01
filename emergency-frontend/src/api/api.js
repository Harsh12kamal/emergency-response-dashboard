import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// INCIDENTS
export const getIncidents = () => API.get("/incidents");
export const createIncident = (data) => API.post("/incidents", data);

// DISPATCH
export const dispatchUnit = (incidentId) =>
  API.post(`/dispatch/${incidentId}`);

export const resolveIncident = (incidentId) =>
  API.post(`/dispatch/resolve/${incidentId}`);

// UNITS
export const getUnits = () => API.get("/dispatch/units");
