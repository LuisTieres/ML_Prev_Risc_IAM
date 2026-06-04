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
  Table
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
  const [activeTab, setActiveTab] = useState<"usuarios" | "fileserver">("usuarios");

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
      <Header head_type="home" />
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
          ) : (
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
          )}
        </DashboardContent>
      </HomeContainer>
      <Footer />
    </main>
  );
}
