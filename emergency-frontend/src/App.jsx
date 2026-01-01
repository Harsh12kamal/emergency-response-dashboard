import { useEffect, useState } from "react";
import {
  getIncidents,
  createIncident,
  dispatchUnit,
  resolveIncident,
  getUnits,
} from "./api/api";

import IncidentPanel from "./components/IncidentPanel";
import UnitsPanel from "./components/UnitsPanel";
import MapView from "./components/MapView";
import MetricsPanel from "./components/MetricsPanel";

const INCIDENT_DESCRIPTIONS = [
  "Fire reported in residential building",
  "Road accident with multiple vehicles",
  "Medical emergency – cardiac arrest",
  "Gas leak detected",
  "Flooding due to heavy rain",
  "Building collapse reported",
  "Electrical short circuit fire",
  "Chemical spill incident",
];

const getRandomIncidentData = () => {
  // Mumbai base coordinates
  const BASE_LAT = 19.076;
  const BASE_LNG = 72.8777;

  // Random offset
  const latOffset = (Math.random() - 0.5) * 0.04;
  const lngOffset = (Math.random() - 0.5) * 0.04;

  return {
    description:
      INCIDENT_DESCRIPTIONS[
        Math.floor(Math.random() * INCIDENT_DESCRIPTIONS.length)
      ],
    latitude: BASE_LAT + latOffset,
    longitude: BASE_LNG + lngOffset,
    severity: ["low", "medium", "high"][
      Math.floor(Math.random() * 3)
    ],
  };
};


export default function App() {
  const [incidents, setIncidents] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);

  /* LOAD DATA */
  const loadData = async () => {
    try {
      const [iRes, uRes] = await Promise.all([
        getIncidents(),
        getUnits(),
      ]);
      setIncidents(iRes.data);
      setUnits(uRes.data);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* CREATE INCIDENT */
  const handleCreateIncident = async () => {
    setLoading(true);
    try {
      const incidentData = getRandomIncidentData();
      await createIncident(incidentData);
      await loadData();
    } catch (err) {
      console.error("Create incident failed", err);
    }
    setLoading(false);
  };

  /* DISPATCH UNIT */
  const handleDispatch = async (incidentId) => {
    setLoading(true);
    try {
      await dispatchUnit(incidentId);
      await loadData();
    } catch (err) {
      console.error("Dispatch failed", err);
    }
    setLoading(false);
  };

  /* RESOLVE INCIDENT */
  const handleResolve = async (incidentId) => {
    setLoading(true);
    try {
      await resolveIncident(incidentId);
      await loadData();
    } catch (err) {
      console.error("Resolve failed", err);
    }
    setLoading(false);
  };


  return (
    <>
    
      <header
        style={{
          padding: "16px 24px",
          fontSize: 22,
          fontWeight: "bold",
          background: "#0f172a",
          color: "white",
          letterSpacing: 0.5,
        }}
      >
        🚨 Emergency Response Coordination Dashboard
      </header>

      <div style={{ display: "flex", height: "calc(100vh - 64px)" }}>
    
        <div
          style={{
            width: "30%",
            padding: 20,
            overflowY: "auto",
            borderRight: "1px solid #e5e7eb",
          }}
        >
          <button
            onClick={handleCreateIncident}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: 15,
              fontSize: 16,
              fontWeight: "bold",
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {loading ? "Creating Incident..." : "➕ Create Incident"}
          </button>

          <IncidentPanel
            incidents={incidents}
            onDispatch={handleDispatch}
            onResolve={handleResolve}
            loading={loading}
          />

          <UnitsPanel units={units} />
        </div>
        <div style={{ flex: 1, padding: 20 }}>
          <MapView incidents={incidents} units={units} />
        </div>
        <MetricsPanel incidents={incidents} units={units} />
      </div>
    </>
  );
}
