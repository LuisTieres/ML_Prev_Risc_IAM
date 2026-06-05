import { useState } from "react";
import Header from "../Head/Head";
import Footer from "../Footer/Footer";
import HomeTabs from "./components/Tabs/HomeTabs";
import HomeStats from "./components/Stats/HomeStats";
import HomeTables from "./components/Tables/HomeTables";
import HomeModal from "./components/Modal/HomeModal";
import { HomeContainer, HeroSection, DashboardContent } from "./styles/home.styles";
import type { AccessRequest } from "../../data/types";
import type { HomeFormData, HomeMLResult, HomeTab, StatItem } from "./types/home.types";
import { usersData } from "../../data/users";
import { filesData } from "../../data/files";
import { avaliarRiscoML } from "../../data/iamService";

const initialFormData: HomeFormData = {
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
  justificativa: "",
};

const initialRequests = (): AccessRequest[] => {
  if (typeof window === "undefined") return [];
  const saved = window.localStorage.getItem("accessRequests");
  return saved ? JSON.parse(saved) : [];
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<HomeTab>("usuarios");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mlResult, setMlResult] = useState<HomeMLResult>(null);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>(initialRequests);
  const [formData, setFormData] = useState<HomeFormData>(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
    setMlResult(null);
  };

  const totalUsers = usersData.length;
  const activeUsers = usersData.filter((user) => user.status === "Ativo").length;
  const pendingUsers = usersData.filter((user) => user.status === "Pendente").length;
  const totalFolders = 12;
  const totalFiles = filesData.length;
  const totalStorage = "4.5 GB";
  const sharedFiles = filesData.filter((file) => file.shared).length;

  const statsByTab: Record<HomeTab, StatItem[]> = {
    usuarios: [
      { label: "Total de Usuários", value: totalUsers },
      { label: "Usuários Ativos", value: activeUsers },
      { label: "Aguardando Aprovação", value: pendingUsers },
    ],
    fileserver: [
      { label: "Pastas", value: totalFolders },
      { label: "Arquivos", value: totalFiles },
      { label: "Armazenamento", value: totalStorage },
      { label: "Compartilhados", value: sharedFiles },
    ],
    solicitacoes: [
      { label: "Total de Solicitações", value: accessRequests.length },
      { label: "Pendentes", value: accessRequests.filter((r) => r.status === "Pendente").length },
      { label: "Aprovadas", value: accessRequests.filter((r) => r.status === "Aprovada").length },
      { label: "Rejeitadas", value: accessRequests.filter((r) => r.status === "Rejeitada").length },
    ],
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setMlResult(null);

    const resultado = await avaliarRiscoML(formData);

    const newRequest: AccessRequest = {
      id: accessRequests.length + 1,
      ...formData,
      dataSubmissao: new Date().toLocaleDateString("pt-BR"),
      status: "Pendente",
      ...(resultado && {
        risco: resultado.risco,
        scoreRisco: resultado.score,
        recomendacaoML: resultado.recomendacao,
      }),
    };

    const updatedRequests = [...accessRequests, newRequest];
    setAccessRequests(updatedRequests);
    window.localStorage.setItem("accessRequests", JSON.stringify(updatedRequests));

    setIsLoading(false);

    if (resultado) {
      setMlResult({
        risco: resultado.risco,
        score: resultado.score,
        recomendacao: resultado.recomendacao,
      });
    } else {
      resetForm();
      setIsModalOpen(false);
    }
  };

  return (
    <main style={{ marginTop: "80px" }}>
      <Header head_type="home" onOpenModal={() => setIsModalOpen(true)} />
      <HomeContainer>
        <HeroSection>
          <h2>IAM para seu negócio</h2>
          <p>
            Centralize o gerenciamento de usuários, permissões e acessos em uma plataforma segura e fácil de usar.
          </p>
        </HeroSection>

        <HomeTabs activeTab={activeTab} setActiveTab={setActiveTab} requestsCount={accessRequests.length} />

        <DashboardContent>
          <HomeStats items={statsByTab[activeTab]} />
          <HomeTables activeTab={activeTab} usersData={usersData} filesData={filesData} accessRequests={accessRequests} />
        </DashboardContent>
      </HomeContainer>

      <HomeModal
        isOpen={isModalOpen}
        formData={formData}
        setFormData={setFormData}
        onClose={() => {
          resetForm();
          setIsModalOpen(false);
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        mlResult={mlResult}
      />

      <Footer />
    </main>
  );
}
