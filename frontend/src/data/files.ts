import type { File } from "./types";

export const filesData: File[] = [
  {
    id: 1,
    name: "Documentação_IAM.pdf",
    size: "2.4 MB",
    type: "PDF",
    uploadedBy: "João Silva",
    date: "15/05/2026",
    permission: "Leitura",
    shared: true
  },
  {
    id: 2,
    name: "Relatório_Acesso.xlsx",
    size: "1.1 MB",
    type: "XLSX",
    uploadedBy: "Maria Santos",
    date: "14/05/2026",
    permission: "Leitura/Escrita",
    shared: false
  },
  {
    id: 3,
    name: "Configurações_Sistema.json",
    size: "356 KB",
    type: "JSON",
    uploadedBy: "Pedro Oliveira",
    date: "12/05/2026",
    permission: "Leitura",
    shared: true
  }
];
