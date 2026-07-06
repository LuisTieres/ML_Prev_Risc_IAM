import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  FormGroup, FormSection, ModalBody,
  ModalContent, ModalFooter, ModalHeader, ModalOverlay
} from "../../styles/home.styles";
import type { HomeFormData, HomeMLResult } from "../../types/home.types";
import MLResultBox from "./MLResultBox";
import { usersData } from "../../../../data/users";
import { verificarConflito } from "../../../../data/sodMatrix";

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

export default function HomeModal({
  isOpen, formData, setFormData, onClose, onSubmit, isLoading, mlResult
}: Props) {

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ── Calcula SoD automaticamente quando muda usuário ou tipo de acesso ──
  useEffect(() => {
    if (!formData.usuarioSelecionado || !formData.tipoAcesso) {
      setFormData(prev => ({ ...prev, conflito_sod: "0", motivo_sod: "" }));
      return;
    }

    const usuario = usersData.find(u => String(u.id) === formData.usuarioSelecionado);
    if (!usuario) return;

    const resultado = verificarConflito(usuario.permissions, formData.tipoAcesso);

    setFormData(prev => ({
      ...prev,
      conflito_sod: resultado.temConflito ? "1" : "0",
      motivo_sod:   resultado.motivo ?? "",
      // Preenche cargo e departamento automaticamente pelo usuário selecionado
      cargo:        prev.cargo || usuario.role,
    }));
  }, [formData.usuarioSelecionado, formData.tipoAcesso]);

  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent isOpen={isOpen}>
        <ModalHeader>
          <h2>Nova Solicitação</h2>
          <button onClick={onClose}>&times;</button>
        </ModalHeader>

        <ModalBody>
          {mlResult && <MLResultBox {...mlResult} />}

          <FormSection>
            <h3>Dados da solicitação</h3>

            {/* ── Usuário Solicitante ── */}
            <FormGroup>
              <label>Usuário Solicitante</label>
              <select
                value={formData.usuarioSelecionado ?? ""}
                onChange={e => handleChange("usuarioSelecionado", e.target.value)}
              >
                <option value="">Selecione o usuário</option>
                {usersData.map(u => (
                  <option key={u.id} value={String(u.id)}>
                    {u.name} — {u.role}
                    {u.permissions.length > 0
                      ? ` (possui: ${u.permissions.join(", ")})`
                      : " (sem acessos)"}
                  </option>
                ))}
              </select>
            </FormGroup>

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
              <select value={formData.tipoAcesso} onChange={e => handleChange("tipoAcesso", e.target.value)}>
                <option value="">Selecione</option>
                <option value="Leitura">Leitura</option>
                <option value="Escrita">Escrita</option>
                <option value="Aprovador">Aprovador</option>
                <option value="Auditor">Auditor</option>
                <option value="Administrador">Administrador</option>
                <option value="Super Usuário">Super Usuário</option>
              </select>
            </FormGroup>

            {/* ── Badge de SoD — aparece automaticamente ── */}
            {formData.tipoAcesso && formData.usuarioSelecionado && (
              formData.conflito_sod === "1" ? (
                <div style={{
                  padding: "10px 14px",
                  background: "#fee2e2",
                  border: "1px solid #f87171",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "#991b1b",
                  marginBottom: "8px"
                }}>
                  ⚠ Conflito de SoD detectado: {formData.motivo_sod}
                </div>
              ) : (
                <div style={{
                  padding: "10px 14px",
                  background: "#d1fae5",
                  border: "1px solid #34d399",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "#065f46",
                  marginBottom: "8px"
                }}>
                  ✓ Sem conflito de SoD
                </div>
              )
            )}

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
                <option value="Crítica">Crítica</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Justificativa</label>
              <textarea
                value={formData.justificativa}
                onChange={e => handleChange("justificativa", e.target.value)}
                placeholder="Descreva a justificativa da solicitação"
              />
            </FormGroup>
          </FormSection>
        </ModalBody>

        <ModalFooter>
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          {mlResult ? (
            <button className="btn-submit" onClick={onClose}>Fechar</button>
          ) : (
            <button className="btn-submit" onClick={onSubmit} disabled={isLoading}>
              {isLoading ? "⏳ Analisando risco..." : "Enviar Solicitação"}
            </button>
          )}
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}
