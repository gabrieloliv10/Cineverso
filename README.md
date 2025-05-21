
# 🍿 Cineverso

Bem-vindo ao **Cineverso**! Uma aplicação web moderna para explorar filmes, descobrir novidades e gerenciar sua lista de favoritos. Este projeto foi desenvolvido com o objetivo de demonstrar habilidades em desenvolvimento Front-end, utilizando React para criar uma interface dinâmica e responsiva, e interagindo com uma API real para dados de filmes.

✨ Destaques do Projeto

* **Exploração de Filmes:** Navegue por uma vasta coleção de filmes populares, bem avaliados, em cartaz e futuros lançamentos.
* **Filtragem Avançada:** Filtre filmes por categorias e gêneros para encontrar exatamente o que procura.
* **Funcionalidade de Busca:** Pesquise filmes específicos pelo título com uma busca dinâmica.
* **Detalhes do Filme:** Acesse informações detalhadas sobre cada filme, incluindo sinopse, data de lançamento e nota da crítica.
* **Gerenciamento de Favoritos (CRUD):** Adicione e remova filmes da sua lista de favoritos, demonstrando a aplicação de operações **C**reate, **R**ead e **D**elete (CRUD) de dados.
* **Design Moderno e Responsivo:** Uma experiência de usuário agradável em diferentes tamanhos de tela.
* **Carregamento Infinito:** Filmes são carregados dinamicamente conforme o usuário rola a página, otimizando a performance.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando um stack moderno de Front-end:

* **React:** Biblioteca JavaScript para construção de interfaces de usuário reativas e componentizadas.
* **Styled-Components:** Para escrever CSS-in-JS, garantindo estilização modular e de fácil manutenção.
* **React Router DOM:** Para gerenciamento de rotas e navegação entre as diferentes páginas da aplicação.
* **Axios:** Cliente HTTP baseado em Promises, utilizado para realizar requisições assíncronas à API do TMDB de forma eficiente e robusta.
* **The Movie Database (TMDB) API:** Uma API RESTful real e robusta que fornece dados abrangentes sobre filmes, séries de TV e elenco.

## 🎯 Habilidades Demonstradas

Neste projeto, busquei aplicar e aprimorar as seguintes habilidades:

* **Desenvolvimento de Single Page Applications (SPA):** Construção de uma aplicação fluida e reativa.
* **Consumo de API RESTful:** Realização de requisições GET para buscar dados de filmes e gêneros de uma **API real** ([The Movie Database - TMDB](https://www.themoviedb.org/documentation/api)).
* **Manipulação de Estado com React Hooks:** Utilização de `useState`, `useEffect`, `useRef` e `useCallback` para gerenciar o estado da aplicação de forma eficiente.
* **Estilização Avançada:** Criação de componentes estilizados e um design responsivo.
* **Gerenciamento de Dados Locais (CRUD):** Implementação de funcionalidades de Create, Read e Delete para a lista de favoritos, utilizando `localStorage` para persistência básica de dados.
* **Lógica de Negócio:** Aplicação de filtros, busca e carregamento infinito de dados.
* **Organização de Código:** Estrutura de pastas clara e modularização de componentes e serviços.

## 🛠️ Como Rodar o Projeto Localmente

Para ter uma cópia local do projeto rodando em sua máquina, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina.

* [Node.js](https://nodejs.org/) (que inclui o npm)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/gabrieloliv10/Cinveverso.git](https://github.com/gabrieloliv10/Cinveverso.git)
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd Cinveverso
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
4.  **Configure sua chave da API do TMDB:**
    * Crie uma conta em [The Movie Database (TMDB)](https://www.themoviedb.org/).
    * Obtenha sua chave da API v3.
    * Crie um arquivo `.env` na raiz do projeto (`Cinveverso/.env`) e adicione sua chave nele:
        ```
        REACT_APP_TMDB_API_KEY=SUA_CHAVE_AQUI
        ```
        (Substitua `SUA_CHAVE_AQUI` pela sua chave real).
        **Importante:** Nunca envie seu arquivo `.env` para repositórios públicos! Ele já está no `.gitignore`.

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    # ou
    yarn start
    ```
    O aplicativo será aberto automaticamente no seu navegador em [http://localhost:3000](http://localhost:3000).

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido por Gabriel Oliveira

![Imagem do WhatsApp de 2025-05-21 à(s) 11 33 07_3230bcd6](https://github.com/user-attachments/assets/4ab14c15-9615-42cb-ac82-213f62b607d7)

![Imagem do WhatsApp de 2025-05-21 à(s) 11 33 23_13c31e00](https://github.com/user-attachments/assets/2baf95e2-e39b-4287-ad56-ca8ddba2c006)


