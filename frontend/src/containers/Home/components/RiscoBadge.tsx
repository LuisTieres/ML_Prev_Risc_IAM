export default function RiscoBadge({ risco, score }: { risco?: string; score?: number }) {
  if (!risco) {
    return <span style={{ color: "#aaa", fontSize: 12 }}>—</span>;
  }

  const styleMap: Record<string, React.CSSProperties> = {
    Baixo: { background: "#d1fae5", color: "#065f46", borderRadius: 12, padding: "2px 10px", fontWeight: 700, fontSize: 12 },
    Medio: { background: "#fef3c7", color: "#92400e", borderRadius: 12, padding: "2px 10px", fontWeight: 700, fontSize: 12 },
    Alto: { background: "#fee2e2", color: "#991b1b", borderRadius: 12, padding: "2px 10px", fontWeight: 700, fontSize: 12 }
  };

  return (
    <span style={styleMap[risco] ?? {}}>
      {risco}{score !== undefined ? ` (${score})` : ""}
    </span>
  );
}
