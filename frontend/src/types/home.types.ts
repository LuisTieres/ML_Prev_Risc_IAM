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
  // ── Campos adicionados para SoD automático ──
  usuarioSelecionado: string;  // id do usuário selecionado no formulário
  conflito_sod: string;        // "0" ou "1" — calculado automaticamente
  motivo_sod: string;          // descrição do conflito, se houver
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
