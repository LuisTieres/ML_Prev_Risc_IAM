import type { Dispatch, SetStateAction } from "react";
import { FormGroup, FormSection, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "../../styles/home.styles";
import type { HomeFormData, HomeMLResult } from "../../types/home.types";
import MLResultBox from "./MLResultBox";

type FormData = HomeFormData;

type Props = {
  isOpen: boolean;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  mlResult: HomeMLResult;
};

export default function HomeModal({ isOpen, formData, setFormData, onClose, onSubmit, isLoading, mlResult }: Props) {
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent isOpen={isOpen}>
        <ModalHeader>
          <h2>Nova Solicitação</h2>
          <button onClick={onClose}>&times;</button>
        </ModalHeader>
        <ModalBody>
          <FormSection>
            <h3>Dados da solicitação</h3>
            <FormGroup>
              <label>Tipo de Solicitação</label>
              <select value={formData.requestType} onChange={e => handleChange("requestType", e.target.value)}>
                <option value="">Selecione</option>
                <option value="Acesso">Acesso</option>
                <option value="Permissão">Permissão</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Cargo</label>
              <input value={formData.cargo} onChange={e => handleChange("cargo", e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>Departamento</label>
              <input value={formData.departamento} onChange={e => handleChange("departamento", e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>Unidade</label>
              <input value={formData.unidade} onChange={e => handleChange("unidade", e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>Tempo de Empresa</label>
              <input value={formData.tempoEmpresa} onChange={e => handleChange("tempoEmpresa", e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>Gestor</label>
              <input value={formData.gestor} onChange={e => handleChange("gestor", e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>Sistema Solicitado</label>
              <input value={formData.sistemaSolicitado} onChange={e => handleChange("sistemaSolicitado", e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>Tipo de Acesso</label>
              <input value={formData.tipoAcesso} onChange={e => handleChange("tipoAcesso", e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>Nível de Privilégio</label>
              <input value={formData.nivelPrivilegio} onChange={e => handleChange("nivelPrivilegio", e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>Criticidade do Sistema</label>
              <select value={formData.criticidadeSistema} onChange={e => handleChange("criticidadeSistema", e.target.value)}>
                <option value="">Selecione</option>
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Justificativa</label>
              <textarea value={formData.justificativa} onChange={e => handleChange("justificativa", e.target.value)} />
            </FormGroup>
          </FormSection>
          {mlResult && <MLResultBox risco={mlResult.risco} score={mlResult.score} recomendacao={mlResult.recomendacao} />}
        </ModalBody>
        <ModalFooter>
          <button className="btn-cancel" type="button" onClick={onClose}>Cancelar</button>
          <button className="btn-submit" type="button" onClick={onSubmit} disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar solicitação"}
          </button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}
