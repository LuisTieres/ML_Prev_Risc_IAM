export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Ativo" | "Pendente";
  lastAccess: string;
}

export interface File {
  id: number;
  name: string;
  size: string;
  type: string;
  uploadedBy: string;
  date: string;
  permission: string;
  shared: boolean;
}

export interface AccessRequest {
  id: number;
  requestType: string;
  cargo: string;
  departamento: string;
  unidade: string;
  tempoEmpresa: string;
  gestor: string;
  sistemaSolicitado: string;
  tipoAcesso: string;
  nivelPrivilegio: string;
  criticidadeSistema: string;
  justificativa: string;
  dataSubmissao: string;
  status: "Pendente" | "Aprovada" | "Rejeitada";
  // ── Campos adicionados pelo ML ──────────────────
  risco?: "Baixo" | "Medio" | "Alto";
  scoreRisco?: number;
  recomendacaoML?: "APROVAR" | "REVISAR" | "REJEITAR";
}

// Payload enviado para a API do ML
export interface MLPayload {
  cargo: string;
  departamento: string;
  sistema: string;
  tipo_acesso: string;
  criticidade: string;
  tempo_empresa_meses: number;
  acessos_ativos: number;
  aprovacoes_anteriores: number;
  revogacoes_anteriores: number;
  violacoes_historicas: number;
  conflito_sod: number;
  conformidade_ok: number;
}

// Resposta da API do ML
export interface MLResponse {
  risco: "Baixo" | "Medio" | "Alto";
  score: number;
  probabilidades: Record<string, number>;
  recomendacao: "APROVAR" | "REVISAR" | "REJEITAR";
}
