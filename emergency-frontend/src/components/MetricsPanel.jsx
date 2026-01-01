export default function MetricsPanel({ incidents, units }) {
  const total = incidents.length;
  const pending = incidents.filter(i => i.status === "pending").length;
  const dispatched = incidents.filter(i => i.status === "dispatched").length;
  const availableUnits = units.filter(u => u.available).length;

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>📊 Dashboard</h3>
      <p>Total Incidents: {total}</p>
      <p>Pending: {pending}</p>
      <p>Dispatched: {dispatched}</p>
      <p>Available Units: {availableUnits}</p>
    </div>
  );
}
