import { useState } from "react";
import Header from "../Head/Head";
import Footer from "../Footer/Footer";
import { 
  HomeContainer, 
  HeroSection,
  NavTabs,
  TabButton,
  DashboardContent,
  StatsGrid,
  StatCard,
  TableContainer,
  Table,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormSection,
  FormGroup,
  ModalFooter
} from "./home.styles";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Ativo" | "Pendente";
  lastAccess: string;
}

interface File {
  id: number;
  name: string;
  size: string;
  type: string;
  uploadedBy: string;
  date: string;
  permission: string;
  shared: boolean;
}

interface AccessRequest {
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

const usersData: User[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@example.com",
    role: "Admin",
    status: "Ativo",
    lastAccess: "2 minutos atrás"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@example.com",
    role: "Gerente",
    status: "Ativo",
    lastAccess: "15 minutos atrás"
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@example.com",
    role: "Usuário",
    status: "Pendente",
    lastAccess: "Nunca"
  }
];

const filesData: File[] = [
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

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"usuarios" | "fileserver" | "solicitacoes">("usuarios");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>(() => {
    const saved = localStorage.getItem("accessRequests");
    return saved ? JSON.parse(saved) : [];
  });
  const [formData, setFormData] = useState({
    requestType: "",
    cargo: "",
    departamento: "",
    unidade: "",
    tempoEmpresa: "",
    gestor: "",
    sistemaSolicitado: "",
    tipoAcesso: "",
    nivelPrivilegio: "",
    criticidadeSistema: "",
    justificativa: ""
  });

  // Calculate user statistics
  const totalUsers = usersData.length;
  const activeUsers = usersData.filter(u => u.status === "Ativo").length;
  const pendingUsers = usersData.filter(u => u.status === "Pendente").length;

  // Calculate file statistics
  const totalFolders = 12;
  const totalFiles = filesData.length;
  const totalStorage = "4.5 GB";
  const sharedFiles = filesData.filter(f => f.shared).length;

  return (
    <main style={{ marginTop: "80px" }}>
      <Header 
        head_type="home" 
        onOpenModal={() => setIsModalOpen(true)}
      />
      <HomeContainer>
        <HeroSection>
          <h2>IAM para seu negócio</h2>
          <p>
            Centralize o gerenciamento de usuários, permissões e acessos em uma plataforma segura e fácil de usar.
          </p>
        </HeroSection>

        <NavTabs>
          <TabButton 
            active={activeTab === "usuarios"} 
            onClick={() => setActiveTab("usuarios")}
          >
            Usuários
          </TabButton>
          <TabButton 
            active={activeTab === "fileserver"} 
            onClick={() => setActiveTab("fileserver")}
          >
            File Server
          </TabButton>
          <TabButton 
            active={activeTab === "solicitacoes"} 
            onClick={() => setActiveTab("solicitacoes")}
          >
            Solicitações ({accessRequests.length})
          </TabButton>
        </NavTabs>

        <DashboardContent>
          {activeTab === "usuarios" ? (
            <>
              <StatsGrid>
                <StatCard>
                  <h4>Total de Usuários</h4>
                  <p className="stat-value">{totalUsers}</p>
                </StatCard>
                <StatCard>
                  <h4>Usuários Ativos</h4>
                  <p className="stat-value">{activeUsers}</p>
                </StatCard>
                <StatCard>
                  <h4>Aguardando Aprovação</h4>
                  <p className="stat-value">{pendingUsers}</p>
                </StatCard>
              </StatsGrid>

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
                          <span className={user.status === "Ativo" ? "badge-active" : "badge-pending"}>
                            {user.status}
                          </span>
                        </td>
                        <td>{user.lastAccess}</td>
                        <td><button className="btn-action">Editar</button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            </>
          ) : activeTab === "fileserver" ? (
            <>
              <StatsGrid>
                <StatCard>
                  <h4>Pastas</h4>
                  <p className="stat-value">{totalFolders}</p>
                </StatCard>
                <StatCard>
                  <h4>Arquivos</h4>
                  <p className="stat-value">{totalFiles}</p>
                </StatCard>
                <StatCard>
                  <h4>Armazenamento</h4>
                  <p className="stat-value">{totalStorage}</p>
                </StatCard>
                <StatCard>
                  <h4>Compartilhados</h4>
                  <p className="stat-value">{sharedFiles}</p>
                </StatCard>
              </StatsGrid>

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
                        <td><button className="btn-action">Editar</button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <>
              <StatsGrid>
                <StatCard>
                  <h4>Total de Solicitações</h4>
                  <p className="stat-value">{accessRequests.length}</p>
                </StatCard>
                <StatCard>
                  <h4>Pendentes</h4>
                  <p className="stat-value">{accessRequests.filter(r => r.status === "Pendente").length}</p>
                </StatCard>
                <StatCard>
                  <h4>Aprovadas</h4>
                  <p className="stat-value">{accessRequests.filter(r => r.status === "Aprovada").length}</p>
                </StatCard>
                <StatCard>
                  <h4>Rejeitadas</h4>
                  <p className="stat-value">{accessRequests.filter(r => r.status === "Rejeitada").length}</p>
                </StatCard>
              </StatsGrid>

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
                      <th>Data</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accessRequests.length === 0 ? (
                      <tr>
                        <td colSpan={9} style={{ textAlign: "center", padding: "32px" }}>
                          Nenhuma solicitação ainda
                        </td>
                      </tr>
                    ) : (
                      accessRequests.map(request => (
                        <tr key={request.id}>
                          <td>#{request.id}</td>
                          <td>{request.cargo || "-"}</td>
                          <td>{request.departamento || "-"}</td>
                          <td>{request.sistemaSolicitado || "-"}</td>
                          <td>{request.tipoAcesso || "-"}</td>
                          <td>{request.criticidadeSistema || "-"}</td>
                          <td>{request.dataSubmissao}</td>
                          <td>
                            <span className={request.status === "Aprovada" ? "badge-active" : request.status === "Rejeitada" ? "badge-not-shared" : "badge-pending"}>
                              {request.status}
                            </span>
                          </td>
                          <td><button className="btn-action">Visualizar</button></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </TableContainer>
            </>
          )}
        </DashboardContent>
      </HomeContainer>

      {/* Modal */}
      <ModalOverlay isOpen={isModalOpen} onClick={() => setIsModalOpen(false)} />
      <ModalContent isOpen={isModalOpen}>
        <ModalHeader>
          <h2>Solicitar Acesso</h2>
          <button onClick={() => setIsModalOpen(false)}>✕</button>
        </ModalHeader>

        <ModalBody>
          {/* Tipo de Solicitação */}
          <FormSection>
            <h3>Tipo de Solicitação</h3>
            <FormGroup>
              <select 
                value={formData.requestType} 
                onChange={(e) => setFormData({...formData, requestType: e.target.value})}
              >
                <option value="">Selecione...</option>
                <option value="sistema">Sistema</option>
                <option value="pasta">Pasta</option>
                <option value="arquivo">Arquivo</option>
              </select>
            </FormGroup>
          </FormSection>

          {/* Dados do Usuário */}
          <FormSection>
            <h3>Dados do Usuário</h3>
            <FormGroup>
              <label>Cargo</label>
              <select 
                value={formData.cargo}
                onChange={(e) => setFormData({...formData, cargo: e.target.value})}
              >
                <option value="">Selecione...</option>
                <option value="analista-jr">Analista Jr</option>
                <option value="analista-pl">Analista Pl</option>
                <option value="analista-sr">Analista Sr</option>
                <option value="coordenador">Coordenador</option>
                <option value="gerente">Gerente</option>
                <option value="diretor">Diretor</option>
                <option value="estagiario">Estagiário</option>
                <option value="consultor">Consultor</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Departamento</label>
              <select 
                value={formData.departamento}
                onChange={(e) => setFormData({...formData, departamento: e.target.value})}
              >
                <option value="">Selecione...</option>
                <option value="ti">TI</option>
                <option value="fin">Financeiro</option>
                <option value="rh">RH</option>
                <option value="jur">Jurídico</option>
                <option value="op">Operações</option>
                <option value="com">Comercial</option>
                <option value="aud">Auditoria</option>
                <option value="comp">Compliance</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Unidade Organizacional</label>
              <select 
                value={formData.unidade}
                onChange={(e) => setFormData({...formData, unidade: e.target.value})}
              >
                <option value="">Selecione...</option>
                <option value="matriz">Matriz</option>
                <option value="sp">São Paulo</option>
                <option value="rj">Rio de Janeiro</option>
                <option value="mg">Minas Gerais</option>
                <option value="rs">Rio Grande do Sul</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Tempo de Empresa</label>
              <select 
                value={formData.tempoEmpresa}
                onChange={(e) => setFormData({...formData, tempoEmpresa: e.target.value})}
              >
                <option value="">Selecione...</option>
                <option value="menos-1">Menos de 1 ano</option>
                <option value="1-2">1-2 anos</option>
                <option value="2-5">2-5 anos</option>
                <option value="mais-5">Mais de 5 anos</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Gestor Responsável</label>
              <select 
                value={formData.gestor}
                onChange={(e) => setFormData({...formData, gestor: e.target.value})}
              >
                <option value="">Selecione...</option>
                <option value="joao-silva">João Silva</option>
                <option value="maria-santos">Maria Santos</option>
                <option value="pedro-oliveira">Pedro Oliveira</option>
                <option value="ana-costa">Ana Costa</option>
                <option value="carlos-ferreira">Carlos Ferreira</option>
              </select>
            </FormGroup>
          </FormSection>

          {/* Dados da Solicitação */}
          <FormSection>
            <h3>Dados da Solicitação</h3>
            <FormGroup>
              <label>Sistema Solicitado</label>
              <select 
                value={formData.sistemaSolicitado}
                onChange={(e) => setFormData({...formData, sistemaSolicitado: e.target.value})}
              >
                <option value="">Selecione...</option>
                <option value="erp-sap">ERP SAP</option>
                <option value="core-bancario">Core Bancário</option>
                <option value="crm-salesforce">CRM Salesforce</option>
                <option value="bi-tableau">BI Tableau</option>
                <option value="active-directory">Active Directory</option>
                <option value="aws-console">AWS Console</option>
                <option value="folha-pagamento">Folha de Pagamento</option>
                <option value="sistema-fiscal">Sistema Fiscal</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Tipo de Acesso</label>
              <select 
                value={formData.tipoAcesso}
                onChange={(e) => setFormData({...formData, tipoAcesso: e.target.value})}
              >
                <option value="">Selecione...</option>
                <option value="leitura">Leitura</option>
                <option value="escrita">Escrita</option>
                <option value="admin">Administrador</option>
                <option value="aprovador">Aprovador</option>
                <option value="auditor">Auditor</option>
                <option value="super-usuario">Super Usuário</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Nível de Privilégio</label>
              <select 
                value={formData.nivelPrivilegio}
                onChange={(e) => setFormData({...formData, nivelPrivilegio: e.target.value})}
              >
                <option value="">Selecione...</option>
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="admin">Administrador</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Criticidade do Sistema</label>
              <select 
                value={formData.criticidadeSistema}
                onChange={(e) => setFormData({...formData, criticidadeSistema: e.target.value})}
              >
                <option value="">Selecione...</option>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Justificativa</label>
              <textarea 
                value={formData.justificativa}
                onChange={(e) => setFormData({...formData, justificativa: e.target.value})}
                placeholder="Descreva a justificativa da solicitação"
              />
            </FormGroup>
          </FormSection>
        </ModalBody>

        <ModalFooter>
          <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </button>
          <button className="btn-submit" onClick={() => {
            const newRequest: AccessRequest = {
              id: accessRequests.length + 1,
              ...formData,
              dataSubmissao: new Date().toLocaleDateString('pt-BR'),
              status: "Pendente"
            };
            const updatedRequests = [...accessRequests, newRequest];
            setAccessRequests(updatedRequests);
            localStorage.setItem("accessRequests", JSON.stringify(updatedRequests));
            console.log("Solicitação salva:", newRequest);
            setFormData({
              requestType: "",
              cargo: "",
              departamento: "",
              unidade: "",
              tempoEmpresa: "",
              gestor: "",
              sistemaSolicitado: "",
              tipoAcesso: "",
              nivelPrivilegio: "",
              criticidadeSistema: "",
              justificativa: ""
            });
            setIsModalOpen(false);
          }}>
            Enviar Solicitação
          </button>
        </ModalFooter>
      </ModalContent>

      <Footer />
    </main>
  );
}
