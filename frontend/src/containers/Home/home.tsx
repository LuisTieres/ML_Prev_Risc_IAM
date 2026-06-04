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

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"usuarios" | "fileserver">("usuarios");

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
                  <p className="stat-value">42</p>
                </StatCard>
                <StatCard>
                  <h4>Usuários Ativos</h4>
                  <p className="stat-value">38</p>
                </StatCard>
                <StatCard>
                  <h4>Aguardando Aprovação</h4>
                  <p className="stat-value">4</p>
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
                    <tr>
                      <td>João Silva</td>
                      <td>joao.silva@example.com</td>
                      <td>Admin</td>
                      <td><span className="badge-active">Ativo</span></td>
                      <td>2 minutos atrás</td>
                      <td><button className="btn-action">Editar</button></td>
                    </tr>
                    <tr>
                      <td>Maria Santos</td>
                      <td>maria.santos@example.com</td>
                      <td>Gerente</td>
                      <td><span className="badge-active">Ativo</span></td>
                      <td>15 minutos atrás</td>
                      <td><button className="btn-action">Editar</button></td>
                    </tr>
                    <tr>
                      <td>Pedro Oliveira</td>
                      <td>pedro.oliveira@example.com</td>
                      <td>Usuário</td>
                      <td><span className="badge-pending">Pendente</span></td>
                      <td>Nunca</td>
                      <td><button className="btn-action">Editar</button></td>
                    </tr>
                  </tbody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <>
              <StatsGrid>
                <StatCard>
                  <h4>Pastas</h4>
                  <p className="stat-value">12</p>
                </StatCard>
                <StatCard>
                  <h4>Arquivos</h4>
                  <p className="stat-value">156</p>
                </StatCard>
                <StatCard>
                  <h4>Armazenamento</h4>
                  <p className="stat-value">4.5 GB</p>
                </StatCard>
                <StatCard>
                  <h4>Compartilhados</h4>
                  <p className="stat-value">28</p>
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
                    <tr>
                      <td>Documentação_IAM.pdf</td>
                      <td>2.4 MB</td>
                      <td>PDF</td>
                      <td>João Silva</td>
                      <td>15/05/2026</td>
                      <td>Leitura</td>
                      <td><span className="badge-shared">Sim</span></td>
                      <td><button className="btn-action">Editar</button></td>
                    </tr>
                    <tr>
                      <td>Relatório_Acesso.xlsx</td>
                      <td>1.1 MB</td>
                      <td>XLSX</td>
                      <td>Maria Santos</td>
                      <td>14/05/2026</td>
                      <td>Leitura/Escrita</td>
                      <td><span className="badge-not-shared">Não</span></td>
                      <td><button className="btn-action">Editar</button></td>
                    </tr>
                    <tr>
                      <td>Configurações_Sistema.json</td>
                      <td>356 KB</td>
                      <td>JSON</td>
                      <td>Pedro Oliveira</td>
                      <td>12/05/2026</td>
                      <td>Leitura</td>
                      <td><span className="badge-shared">Sim</span></td>
                      <td><button className="btn-action">Editar</button></td>
                    </tr>
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
