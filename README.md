<div align="center">
  <img src="https://raw.githubusercontent.com/Nego90/Gerador-De-Danfe/main/public/logo.png" alt="Logo do Projeto" width="150"/>
  <h1>Gerador de DANFE com React</h1>
  <p>Uma aplicação web moderna para criar e visualizar Documentos Auxiliares da Nota Fiscal Eletrônica (DANFE) em tempo real.</p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>

</div>

---

## 🚀 Sobre o Projeto

Este projeto é uma ferramenta de estudo desenvolvida para simular a geração de um DANFE, a representação gráfica da Nota Fiscal Eletrônica (NF-e). A aplicação permite a edição de todos os campos do documento em tempo real, oferecendo uma pré-visualização fiel ao modelo oficial.

O objetivo é fornecer uma experiência interativa e educativa para programadores que desejam compreender a estrutura de um DANFE e praticar a manipulação de formulários complexos com React.

<br>

<div align="center">
  <img src="https://raw.githubusercontent.com/Nego90/Gerador-De-Danfe/main/public/demo.gif" alt="Demonstração da Aplicação" width="800"/>
</div>

<br>

---

## ✨ Funcionalidades Principais

-   **📝 Edição em Tempo Real:** Todos os campos do DANFE são editáveis e a pré-visualização é atualizada instantaneamente.
-   **🏢 Dados do Emitente e Destinatário:** Formulários completos para inserir as informações da sua empresa e do cliente.
-   **📦 Tabela de Produtos Dinâmica:** Adicione, edite e remova produtos da nota de forma simples e intuitiva.
-   **📊 Cálculo Automático de Totais:** Os valores totais da nota, impostos e produtos são calculados automaticamente.
-   **║█║ Barcode Funcional:** Geração automática do código de barras a partir da chave de acesso de 44 dígitos.
-   **📄 Exportação para PDF:** Exporte o DANFE gerado como um arquivo PDF de alta qualidade com um único clique.
-   **🖨️ Impressão Direta:** Otimizado para impressão, mantendo o layout A4 padrão.
-   **📱 Layout Responsivo:** A interface se adapta para uma boa experiência tanto no desktop quanto em dispositivos móveis.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

-   **Frontend:**
    -   [**React**](https://reactjs.org/) - Biblioteca para construir a interface de utilizador.
    -   [**Vite**](https://vitejs.dev/) - Ferramenta de build para um desenvolvimento frontend rápido.
-   **Bibliotecas JavaScript:**
    -   [**jsPDF**](https://github.com/parallax/jsPDF) - Para a geração de documentos PDF.
    -   [**html2canvas**](https://html2canvas.hertzen.com/) - Para capturar o layout do DANFE como uma imagem.
    -   [**JsBarcode**](https://github.com/lindell/JsBarcode) - Para a criação do código de barras.

---

## ⚙️ Como Executar o Projeto

Siga os passos abaixo para configurar e executar a aplicação no seu ambiente local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
-   [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Nego90/Gerador-De-Danfe.git](https://github.com/Nego90/Gerador-De-Danfe.git)
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd Gerador-De-Danfe
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    ou
    ```bash
    yarn dev
    ```

5.  Abra o seu navegador e aceda a `http://localhost:5173` (ou a porta indicada no seu terminal).

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](https://github.com/Nego90/Gerador-De-Danfe/blob/main/LICENSE) para mais detalhes.

<div align="center">
  Feito com ❤️ por <a href="https://github.com/Nego90">Luan Lima</a>
</div>
