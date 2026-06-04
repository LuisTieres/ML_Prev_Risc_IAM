import { Table, TableContainer } from "../home.styles";
import type { AccessRequest, File, User } from "../../../data/types";
import RiscoBadge from "./RiscoBadge";

type HomeTab = "usuarios" | "fileserver" | "solicitacoes";

type Props = {
  activeTab: HomeTab;
  usersData: User[];
  filesData: File[];
  accessRequests: AccessRequest[];
};

export default function HomeTables({ activeTab, usersData, filesData, accessRequests }: Props) {
  if (activeTab === "usuarios") {
    return (
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Email</th>
              <th>Função</th>
              <th>Status</th>
              <th>Último Acesso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={user.status === "Ativo" ? "badge-active" : "badge-pending"}>{user.status}</span>
                </td>
                <td>{user.lastAccess}</td>
                <td>
                  <button className="btn-action">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    );
  }

  if (activeTab === "fileserver") {
    return (
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Arquivo</th>
              <th>Tamanho</th>
              <th>Tipo</th>
              <th>Enviado Por</th>
              <th>Data</th>
              <th>Permissão</th>
              <th>Compartilhado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filesData.map(file => (
              <tr key={file.id}>
                <td>{file.name}</td>
                <td>{file.size}</td>
                <td>{file.type}</td>
                <td>{file.uploadedBy}</td>
                <td>{file.date}</td>
                <td>{file.permission}</td>
                <td>
                  <span className={file.shared ? "badge-shared" : "badge-not-shared"}>
                    {file.shared ? "Sim" : "Não"}
                  </span>
                </td>
                <td>
                  <button className="btn-action">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cargo</th>
            <th>Departamento</th>
            <th>Sistema</th>
            <th>Tipo de Acesso</th>
            <th>Criticidade</th>
            <th>Risco ML</th>
            <th>Recomendação</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {accessRequests.length === 0 ? (
            <tr>
              <td colSpan={11} style={{ textAlign: "center", padding: "32px" }}>
                Nenhuma solicitação ainda
              </td>
            </tr>
          ) : (
            accessRequests.map(request => (
              <tr key={request.id}>
                <td>#{request.id}</td>
                <td>{request.cargo || "—"}</td>
                <td>{request.departamento || "—"}</td>
                <td>{request.sistemaSolicitado || "—"}</td>
                <td>{request.tipoAcesso || "—"}</td>
                <td>{request.criticidadeSistema || "—"}</td>
                <td>
                  <RiscoBadge risco={request.risco} score={request.scoreRisco} />
                </td>
                <td>{request.recomendacaoML || "—"}</td>
                <td>{request.dataSubmissao}</td>
                <td>{request.status}</td>
                <td>
                  <button className="btn-action">Editar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}
