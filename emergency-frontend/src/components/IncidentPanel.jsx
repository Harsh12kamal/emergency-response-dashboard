export default function IncidentPanel({
  incidents,
  onDispatch,
  onResolve,
  loading,
}) {
  return (
    <div style={{ marginTop: 20 }}>
      {incidents.map((i) => (
        <div
          key={i._id}
          style={{
            background: "#f9f9f9",
            padding: 10,
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <strong>{i.severity}</strong> — {i.status}

          <div style={{ marginTop: 6 }}>
            {i.status === "pending" && (
              <button
                onClick={() => onDispatch(i._id)}
                disabled={loading}
              >
                🚑 Dispatch Unit
              </button>
            )}

            {i.status === "dispatched" && (
              <button
                onClick={() => onResolve(i._id)}
                disabled={loading}
                style={{ marginLeft: 8 }}
              >
                ✅ Resolve Incident
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
