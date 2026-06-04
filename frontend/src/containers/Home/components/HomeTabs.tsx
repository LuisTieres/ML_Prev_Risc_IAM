import { NavTabs, TabButton } from "../home.styles";

type HomeTab = "usuarios" | "fileserver" | "solicitacoes";

type Props = {
  activeTab: HomeTab;
  setActiveTab: (tab: HomeTab) => void;
  requestsCount: number;
};

export default function HomeTabs({ activeTab, setActiveTab, requestsCount }: Props) {
  return (
    <NavTabs>
      <TabButton active={activeTab === "usuarios"} onClick={() => setActiveTab("usuarios")}>Usuários</TabButton>
      <TabButton active={activeTab === "fileserver"} onClick={() => setActiveTab("fileserver")}>File Server</TabButton>
      <TabButton active={activeTab === "solicitacoes"} onClick={() => setActiveTab("solicitacoes")}>Solicitações ({requestsCount})</TabButton>
    </NavTabs>
  );
}
