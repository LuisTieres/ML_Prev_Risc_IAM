export type HomeTab = "usuarios" | "fileserver" | "solicitacoes";

export interface HomeFormData {
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
}

export type HomeMLResult = {
  risco: string;
  score: number;
  recomendacao: string;
} | null;

export interface StatItem {
  label: string;
  value: string | number;
}
