import{
  FooterContainer,
  FooterContent,
  LogoSection,
  Column,
  BottomBar,
  PrivacyLinks} from "../styles/global.styles";

export default function Footer() {
    return(
    <><FooterContainer>
        <FooterContent>

          <LogoSection>
            <div>
              <img src="/assets/logo.png" alt="Running training" />
              <h1>Gerenciamento de Acesso</h1>
            </div>
            <p>
              Controle de usuários, permissões e níveis de acesso.
            </p>
          </LogoSection>

          <Column>
            <strong>Contato</strong>
            <a href="#">contato@ritmo.com.br</a>
          </Column>

        </FooterContent>
      </FooterContainer>
      
      <BottomBar>
          <p>© 2026 Gerenciamento de Acesso. Todos os direitos reservados.</p>

          <PrivacyLinks>
            <a href="#">Termos de Uso</a>
            <a href="#">Privacidade</a>
          </PrivacyLinks>
        </BottomBar></>
    )
}