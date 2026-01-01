export default function UnitsPanel({ units }) {
  return (
    <>
      <h3>🚓 Units</h3>
      <ul>
        {units.map((u) => (
          <li key={u._id}>
            {u.available ? "🟢 Available" : "🔴 Busy"}
          </li>
        ))}
      </ul>
    </>
  );
}
