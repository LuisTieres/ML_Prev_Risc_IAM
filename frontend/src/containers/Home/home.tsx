import Header from "../Head/Head";
import Footer from "../Footer/Footer";
import { HomeContainer, HeroSection, FeatureGrid, FeatureCard } from "./home.styles";

export default function HomePage() {
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

        <FeatureGrid>
          <FeatureCard>
            <h3>Gerenciar usuários</h3>
            <p>Cadastre e controle usuários, atribua papéis e defina níveis de acesso.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Políticas de acesso</h3>
            <p>Regule autorizações e crie regras de segurança para proteger recursos sensíveis.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Auditoria</h3>
            <p>Monitore atividades e mantenha um histórico de sessões e alterações de acesso.</p>
          </FeatureCard>
        </FeatureGrid>
      </HomeContainer>
      <Footer />
    </main>
  );
}
