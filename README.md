# **Aplicativo de Gerenciamento de Postagens**

Este é um aplicativo **ReactJS** que permite o gerenciamento de postagens (*CRUD*) consumindo uma **API REST**.

## **Recursos**

- Listagem de postagens paginadas com opção de filtro por título.
- Formulário de cadastro de postagens com campos específicos.
- Visualização de detalhes de uma postagem.
- Edição de postagens existentes.
- Exclusão de postagens.
- Interface de usuário **responsiva** e **agradável**.
- Consumo da API no front-end com tratamento adequado de erros.

## **API de Autenticação**

O aplicativo se autentica na API da seguinte maneira:

- Envia um token de autenticação da API no header chamado "Api-Authorization" com valor `Bearer $2y$10$x3wqNWc4ZonF6dVWKAPnMuU1A258mgKbGWziVPdL5mhzqQwlhQEqK`.
- Envia um token de usuário no header chamado "Authorization" com valor `Bearer 35|bkdTKk4t5WoNeApCMkVwWLBhmkjtarmeULMfwKiW`.

## **Requisitos de Desenvolvimento**

- **ReactJS** é a base do projeto.
- Utilização de ferramentas de gerenciamento de estado, como **Redux**, é encorajada.
- Utilização de ferramentas de roteamento, como **React Router**, é encorajada.
- Pode-se utilizar bibliotecas e frameworks de terceiros.

## **Como Iniciar o Projeto**

1. Clone este repositório.
2. Instale as dependências usando `npm install` ou `yarn install`.
3. Execute o aplicativo usando `npm start` ou `yarn start`.

## **Contribuindo**

Contribuições são bem-vindas! Se você encontrar problemas ou tiver melhorias para sugerir, sinta-se à vontade para abrir uma "issue" ou enviar um "pull request".

## **Autor**

*Patrick Zumach thomaz*

## **Bibliotecas**

Aqui estão algumas das bibliotecas importantes utilizadas neste projeto:

- **@reduxjs/toolkit**: Uma ferramenta para gerenciar o estado da aplicação em conjunto com o Redux.
- **axios**: Uma biblioteca para fazer requisições HTTP para a API.
- **moment**: Uma biblioteca para formatação de datas.
- - **react-paginate**: Uma biblioteca para adicionar componentes de paginação.
- **react-redux**: Uma biblioteca para integrar o React com o Redux para gerenciamento de estado.
- **react-router-dom**: Uma biblioteca para criação de rotas na aplicação.
-- **web-vitals**: Uma biblioteca para monitoramento de métricas de desempenho web.

Observe que esta lista inclui apenas algumas das bibliotecas utilizadas no projeto. Dependendo das necessidades específicas do seu projeto, outras bibliotecas ou dependências podem ter sido utilizadas.



