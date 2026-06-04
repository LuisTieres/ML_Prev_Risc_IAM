export default function MLResultBox({
  risco,
  score,
  recomendacao
}: {
  risco: string;
  score: number;
  recomendacao: string;
}) {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    Baixo: { bg: "#d1fae5", border: "#34d399", text: "#065f46" },
    Medio: { bg: "#fef3c7", border: "#fbbf24", text: "#92400e" },
    Alto: { bg: "#fee2e2", border: "#f87171", text: "#991b1b" }
  };

  const current = colors[risco] ?? colors.Medio;
  const icon = risco === "Baixo" ? "✅" : risco === "Alto" ? "🚫" : "⚠️";

  return (
    <div style={{
      border: `2px solid ${current.border}`,
      background: current.bg,
      borderRadius: 12,
      padding: "16px 20px",
      margin: "16px 0",
      display: "flex",
      alignItems: "center",
      gap: 16
    }}>
      <span style={{ fontSize: 32 }}>{icon}</span>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, color: current.text }}>
          Análise de Risco: {risco} — Score {score}/100
        </div>
        <div style={{ fontSize: 13, color: current.text, marginTop: 4 }}>
          Recomendação do modelo: <strong>{recomendacao}</strong>
        </div>
      </div>
    </div>
  );
}
