import type { Heads } from "../../types/Head";
import { HeaderContainer } from "../styles/global.styles";

export default function Header({ onOpenModal }: Heads) {
  return (
    <HeaderContainer>
      <div className="logo-name">
        <img src="/assets/logo.png" alt="Gerenciamento de Acesso" />
        <h1>Gerenciamento de Acesso</h1>
      </div>
      <div className="entra-cadastro">
        <button className="btn-entrar" onClick={onOpenModal}>
          Solicitar Acesso
        </button>
      </div>
    </HeaderContainer>
  );
}
