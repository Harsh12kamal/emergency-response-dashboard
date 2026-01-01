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

export default function App() {
  const [incidents, setIncidents] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    const [iRes, uRes] = await Promise.all([
      getIncidents(),
      getUnits(),
    ]);
    setIncidents(iRes.data);
    setUnits(uRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateIncident = async () => {
    setLoading(true);
    await createIncident({
      description: "Emergency reported",
      latitude: 19.076,
      longitude: 72.8777,
    });
    await loadData();
    setLoading(false);
  };

  const handleDispatch = async (id) => {
    setLoading(true);
    await dispatchUnit(id);
    await loadData();
    setLoading(false);
  };

  const handleResolve = async (id) => {
    setLoading(true);
    await resolveIncident(id);
    await loadData();
    setLoading(false);
  };

  return (
    <>
      {/* HEADER */}
      <header
        style={{
          padding: 15,
          fontSize: 20,
          fontWeight: "bold",
          background: "#0f172a",
          color: "white",
        }}
      >
        🚨 Emergency Response Coordination Dashboard
      </header>

      <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
        <div style={{ width: "30%", padding: 20, overflowY: "auto" }}>
          <button onClick={handleCreateIncident} disabled={loading}>
            ➕ Create Incident
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
