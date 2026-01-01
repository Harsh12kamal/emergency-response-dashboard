import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import gpsIcon from "../assets/gps.png";

// 🔴 Incident Icon
const incidentIcon = new L.Icon({
  iconUrl: gpsIcon,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

// 🔵 Unit Icon
const unitIcon = new L.Icon({
  iconUrl: gpsIcon,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -25],
});

// 🔄 Auto-center map when incidents change
function AutoCenter({ incidents }) {
  const map = useMap();
  const prevCount = useRef(0);

  useEffect(() => {
    if (incidents.length > prevCount.current) {
      const latest = incidents[incidents.length - 1];
      map.flyTo(
        [latest.location.coordinates[1], latest.location.coordinates[0]],
        14,
        { duration: 1.5 }
      );
    }
    prevCount.current = incidents.length;
  }, [incidents, map]);

  return null;
}

export default function MapView({ units }) {
  const [incidents, setIncidents] = useState([]);

  // 🔄 HARD refresh fetch (no caching)
  const fetchIncidents = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/incidents",
        { cache: "no-store" } // IMPORTANT
      );

      const data = await res.json();

      // Only active incidents
      const active = data.filter(i => i.status !== "Resolved");

      // 🔥 FORCE STATE UPDATE (new reference)
      setIncidents([...active]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[19.076, 72.8777]}
      zoom={11}
      style={{ height: "85vh", borderRadius: 10 }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <AutoCenter incidents={incidents} />

      {/* INCIDENTS */}
      {incidents.map((i) => (
        <Marker
          key={i._id}
          icon={incidentIcon}
          position={[
            i.location.coordinates[1],
            i.location.coordinates[0],
          ]}
        >
          <Popup>
            <b>Incident</b><br />
            Severity: {i.severity}<br />
            Status: {i.status}
          </Popup>
        </Marker>
      ))}

      {/* UNITS */}
      {units.map((u) => (
        <Marker
          key={u._id}
          icon={unitIcon}
          position={[
            u.location.coordinates[1],
            u.location.coordinates[0],
          ]}
        >
          <Popup>
            <b>Unit</b><br />
            Status: {u.available ? "Available" : "Busy"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
