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
}
