import type { MLPayload, MLResponse } from "./types";

const ML_API_URL = import.meta.env.VITE_ML_API_URL ?? "http://localhost:8000";

const CARGO_MAP: Record<string, string> = {
  "analista-jr":  "Analista Jr",
  "analista-pl":  "Analista Pl",
  "analista-sr":  "Analista Sr",
  "coordenador":  "Coordenador",
  "gerente":      "Gerente",
  "diretor":      "Diretor",
  "estagiario":   "Estagiario",
  "consultor":    "Consultor",
};

const DEPARTAMENTO_MAP: Record<string, string> = {
  "ti":   "TI",
  "fin":  "Financeiro",
  "rh":   "RH",
  "jur":  "Juridico",
  "op":   "Operacoes",
  "com":  "Comercial",
  "aud":  "Auditoria",
  "comp": "Compliance",
};

const SISTEMA_MAP: Record<string, string> = {
  "erp-sap":          "ERP SAP",
  "core-bancario":    "Core Bancario",
  "crm-salesforce":   "CRM Salesforce",
  "bi-tableau":       "BI Tableau",
  "active-directory": "Active Directory",
  "aws-console":      "AWS Console",
  "folha-pagamento":  "Folha de Pagamento",
  "sistema-fiscal":   "Sistema Fiscal",
};

const ACESSO_MAP: Record<string, string> = {
  "leitura":       "Leitura",
  "escrita":       "Escrita",
  "admin":         "Administrador",
  "aprovador":     "Aprovador",
  "auditor":       "Auditor",
  "super-usuario": "Super Usuario",
};

const CRITICIDADE_MAP: Record<string, string> = {
  "baixa":  "Baixa",
  "media":  "Media",
  "alta":   "Alta",
  "critica":"Critica",
};

const TEMPO_MAP: Record<string, number> = {
  "menos-1": 6,
  "1-2":     18,
  "2-5":     42,
  "mais-5":  72,
};

/**
 * Converte o formData do front para o payload do ML e chama a API.
 * Retorna null se a API estiver fora do ar (não bloqueia o fluxo).
 */
export async function avaliarRiscoML(formData: {
  cargo: string;
  departamento: string;
  sistemaSolicitado: string;
  tipoAcesso: string;
  criticidadeSistema: string;
  tempoEmpresa: string;
}): Promise<MLResponse | null> {

  const payload: MLPayload = {
    cargo:                 CARGO_MAP[formData.cargo]               ?? formData.cargo,
    departamento:          DEPARTAMENTO_MAP[formData.departamento]  ?? formData.departamento,
    sistema:               SISTEMA_MAP[formData.sistemaSolicitado]  ?? formData.sistemaSolicitado,
    tipo_acesso:           ACESSO_MAP[formData.tipoAcesso]          ?? formData.tipoAcesso,
    criticidade:           CRITICIDADE_MAP[formData.criticidadeSistema] ?? formData.criticidadeSistema,
    tempo_empresa_meses:   TEMPO_MAP[formData.tempoEmpresa]         ?? 12,
    acessos_ativos:        5,
    aprovacoes_anteriores: 0,
    revogacoes_anteriores: 0,
    violacoes_historicas:  0,
    conflito_sod:          0,
    conformidade_ok:       1,
  };

  // Log do payload enviado
  console.log("═══════════════════════════════════");
  console.log("📤 IAM ML — Payload enviado");
  console.log("═══════════════════════════════════");
  console.table(payload);

  try {
    const res = await fetch(`${ML_API_URL}/prever-risco`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`API retornou ${res.status}`);

    const data = await res.json() as MLResponse;

    // Log do resultado
    console.log("═══════════════════════════════════");
    console.log("🤖 IAM ML — Resultado da Predição");
    console.log("═══════════════════════════════════");
    console.log(`🎯 Risco:        ${data.risco}`);
    console.log(`📊 Score:        ${data.score}/100`);
    console.log(`✅ Recomendação: ${data.recomendacao}`);
    console.log("📈 Probabilidades:");
    Object.entries(data.probabilidades).forEach(([classe, prob]) => {
      const barra = "█".repeat(Math.round((prob as number) * 20));
      console.log(`   ${classe.padEnd(6)} ${barra} ${((prob as number) * 100).toFixed(1)}%`);
    });
    console.log("═══════════════════════════════════");

    return data;

  } catch (err) {
    console.warn("[IAM ML] API indisponível, seguindo sem score:", err);
    return null;
  }
}