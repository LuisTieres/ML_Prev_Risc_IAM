// Matriz de SoD — define quais combinações de acesso conflitam
// Coloque em: src/data/sodMatrix.ts

export interface SoDRule {
  permissaoA: string;
  permissaoB: string;
  motivo: string;
}

export const SOD_RULES: SoDRule[] = [
  { permissaoA: "Aprovador",     permissaoB: "Escrita",       motivo: "Nao pode aprovar e criar registros no mesmo sistema" },
  { permissaoA: "Aprovador",     permissaoB: "Administrador", motivo: "Nao pode aprovar e ter controle total simultaneamente" },
  { permissaoA: "Escrita",       permissaoB: "Aprovador",     motivo: "Nao pode criar e aprovar os proprios registros" },
  { permissaoA: "Super Usuário", permissaoB: "Aprovador",     motivo: "Super usuario nao deve tambem aprovar solicitacoes" },
  { permissaoA: "Administrador", permissaoB: "Auditor",       motivo: "Administrador nao pode auditar a si mesmo" },
  { permissaoA: "Auditor",       permissaoB: "Escrita",       motivo: "Auditor nao pode alterar o que esta auditando" },
  { permissaoA: "Auditor",       permissaoB: "Administrador", motivo: "Auditor nao pode ter controle administrativo" },
];

export function verificarConflito(
  acessosAtuais: string[],
  novoAcesso: string
): { temConflito: boolean; motivo?: string } {
  for (const regra of SOD_RULES) {
    for (const acessoAtual of acessosAtuais) {
      const conflito1 = acessoAtual === regra.permissaoA && novoAcesso === regra.permissaoB;
      const conflito2 = acessoAtual === regra.permissaoB && novoAcesso === regra.permissaoA;
      if (conflito1 || conflito2) {
        return { temConflito: true, motivo: regra.motivo };
      }
    }
  }
  return { temConflito: false };
}
