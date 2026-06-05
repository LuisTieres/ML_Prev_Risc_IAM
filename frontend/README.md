# IAM Risk Predictor — Frontend

Interface web para predição de risco em solicitações de acesso (IAM). O usuário preenche um formulário com os dados da solicitação, o frontend envia para a API de ML e exibe o resultado — nível de risco, score e recomendação de aprovação ou rejeição — antes de confirmar o registro.

**Demo em produção:** [iam-luis-tieres.vercel.app](https://iam-luis-tieres.vercel.app)
**Repositório da API / ML:** [github.com/LuisTieres/ML_IAM](https://github.com/LuisTieres/ML_IAM)

---

## Tecnologias

- **React** + **TypeScript**
- **Vite**
- **Styled Components**
- Deploy via **Vercel**

---

## Como rodar localmente

**Pré-requisitos:** Node.js 18+ e npm.

```bash
# 1. Clone o repositório
git clone https://github.com/LuisTieres/ML_Prev_Risc_IAM.git
cd ML_Prev_Risc_IAM/frontend

# 2. Instale as dependências
npm install

# 3. Configure a URL da API
# Crie um arquivo .env na raiz do projeto /frontend com:
VITE_API_URL=https://luistieres-iam-risk-predictor.hf.space

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## Estrutura do projeto

```
frontend/
├── src/
│   ├── components/       # Componentes reutilizáveis (formulário, modal de resultado)
│   ├── services/         # Chamadas à API de predição
│   ├── types/            # Tipagens TypeScript
│   └── App.tsx
├── .env.example
└── vite.config.ts
```

---

## Fluxo de uso

1. O usuário preenche o formulário com: cargo, departamento, sistema solicitado, tipo de acesso, criticidade, tempo de empresa, conflito de SoD e status de conformidade.
2. O frontend envia um `POST` para a API com esses dados.
3. A API retorna o nível de risco (`Alto`, `Médio` ou `Baixo`), o score (0–100) e a recomendação (`APROVAR` / `REVISAR` / `REJEITAR`).
4. O resultado é exibido em um modal antes de o usuário confirmar o registro.

**Exemplo de resposta da API:**
```json
{
  "risco": "Baixo",
  "score": 94,
  "recomendacao": "APROVAR",
  "probabilidades": {
    "Alto": 0.006,
    "Baixo": 0.938,
    "Medio": 0.056
  }
}
```

---

## API

A API está hospedada no Hugging Face Spaces e é pública:

```
https://luistieres-iam-risk-predictor.hf.space
```

Documentação interativa (Swagger): [`/docs`](https://luistieres-iam-risk-predictor.hf.space/docs)

Repositório da API + modelo: [github.com/LuisTieres/ML_IAM](https://github.com/LuisTieres/ML_IAM)

---

## Considerações

Os resultados de performance do modelo (F2 > 0.98) foram obtidos em dados sintéticos gerados pelas mesmas regras usadas no treinamento. Em dados reais, o desempenho tende a ser menor, especialmente em casos intermediários ou em situações fora da distribuição de treino.

O modelo atual não possui explicabilidade por solicitação — retorna o risco, mas não detalha quais variáveis mais influenciaram aquela predição específica. Implementar SHAP values seria o próximo passo natural.

---

## Autor

**Luis Tieres** — [github.com/LuisTieres](https://github.com/LuisTieres)
