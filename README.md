# FechaFácil

Aplicação web desenvolvida como projeto final do **Programa Transforma Futuros**, com o objetivo de auxiliar trabalhadores na abertura, registro de movimentações, fechamento e conferência de caixa.

O sistema foi desenvolvido com **ReactJS** no frontend, **Java com Spring Boot** no backend e **MySQL** no banco de dados, utilizando uma API REST para a comunicação entre as camadas.

🌐 **Aplicação publicada:** https://fechafacil-nine.vercel.app

## Sobre o projeto

O FechaFácil surgiu da necessidade de tornar o processo de fechamento e conferência de caixa mais simples e organizado.

Durante uma rotina de trabalho com operação de caixa, é necessário acompanhar valores de abertura, entradas, saídas, reforços e sangrias, além de conferir o dinheiro disponível ao final do período. Quando esse processo é realizado manualmente, erros de cálculo e dificuldades na conferência podem tornar a atividade mais trabalhosa.

O FechaFácil centraliza essas informações em uma aplicação web e calcula automaticamente o valor esperado no fechamento do caixa.

O sistema também possui um **contador de notas e moedas**, que auxilia o trabalhador a calcular o valor contado antes de concluir o fechamento.

## Público-alvo

O projeto é voltado principalmente para trabalhadores adultos que realizam operações de caixa em estabelecimentos comerciais e precisam registrar movimentações e conferir valores ao final de um período de trabalho.

## Problema identificado

O processo de fechamento de caixa exige atenção na conferência de diferentes movimentações e valores.

Durante uma jornada de trabalho, o operador pode precisar acompanhar o valor inicial do caixa, entradas, saídas, reforços e sangrias. No encerramento, esses registros precisam ser considerados para determinar quanto dinheiro deveria estar disponível no caixa.

Quando esse controle é realizado manualmente ou utilizando ferramentas pouco específicas para essa atividade, o processo pode se tornar mais demorado e sujeito a erros de cálculo e conferência.

## Objetivo

O objetivo do FechaFácil é oferecer uma ferramenta simples para auxiliar no registro e na conferência das operações realizadas durante uma sessão de caixa.

A aplicação permite:

- cadastrar caixas;
- abrir uma sessão de caixa informando o valor inicial;
- registrar entradas, saídas, reforços e sangrias;
- calcular automaticamente o valor esperado no fechamento;
- informar o valor realmente contado;
- calcular a diferença entre o valor esperado e o valor contado;
- consultar o histórico das operações realizadas;
- utilizar um contador de notas e moedas para auxiliar na conferência do dinheiro.

A proposta desta primeira versão é manter o sistema simples e funcional, priorizando o fluxo principal de abertura, movimentação e fechamento de caixa.

## Relação com a ODS 8

O projeto está relacionado à **ODS 8 — Trabalho Decente e Crescimento Econômico**, um dos Objetivos de Desenvolvimento Sustentável da Organização das Nações Unidas.

O FechaFácil busca contribuir com essa temática ao utilizar tecnologia para apoiar uma atividade presente na rotina de diversos trabalhadores do comércio.

Ao organizar registros e automatizar parte dos cálculos envolvidos na conferência de caixa, a aplicação busca tornar essa tarefa mais clara e prática, auxiliando o trabalhador durante o processo de fechamento.

O projeto não pretende medir ou afirmar impacto econômico direto. Nesta versão acadêmica, sua relação com a ODS 8 está principalmente na aplicação da tecnologia como ferramenta de apoio à organização e às condições de execução de uma atividade de trabalho.

## Funcionalidades implementadas

A versão atual do FechaFácil possui as seguintes funcionalidades:

- cadastro, consulta, edição e exclusão de caixas;
- abertura de uma sessão de caixa;
- cadastro, consulta, edição e exclusão de movimentações;
- registro dos tipos de movimentação:
  - entrada;
  - saída;
  - reforço;
  - sangria;
- associação das movimentações a um fechamento de caixa aberto;
- cálculo automático do valor esperado no fechamento;
- registro do valor contado;
- cálculo automático da diferença entre valor esperado e valor contado;
- histórico de fechamentos;
- formatação de valores monetários e datas;
- contador de notas e moedas integrado ao fechamento;
- indicação visual da diferença do caixa:
  - vermelho para diferença negativa;
  - verde para diferença igual a zero;
  - laranja para diferença positiva.

## CRUDs do sistema

Um dos requisitos principais do projeto é possuir pelo menos três CRUDs completos acessíveis pelo frontend.

O FechaFácil possui três módulos principais:

### 1. Caixas

Permite gerenciar os caixas disponíveis no sistema.

Operações implementadas:

- **Create:** cadastrar um novo caixa;
- **Read:** listar os caixas cadastrados;
- **Update:** editar o nome de um caixa;
- **Delete:** excluir um caixa quando não existem registros relacionados que impeçam a operação.

Endpoint principal da API:

```text
/caixas
```

### 2. Movimentações

Permite registrar as operações financeiras realizadas durante uma sessão de caixa aberta.

Tipos disponíveis:

```text
ENTRADA
SAIDA
SANGRIA
REFORCO
```

Operações implementadas:

- **Create:** cadastrar uma nova movimentação;
- **Read:** consultar o histórico de movimentações;
- **Update:** editar uma movimentação enquanto a operação estiver disponível no fluxo da aplicação;
- **Delete:** excluir movimentações quando permitido pelas regras e relacionamentos do sistema.

Endpoint principal da API:

```text
/movimentacoes
```

### 3. Fechamentos

Representa uma sessão de utilização de um caixa, desde a abertura até a conferência final.

O fechamento registra informações como:

- caixa utilizado;
- data e hora de abertura;
- valor de abertura;
- data e hora de fechamento;
- valor esperado;
- valor contado;
- diferença encontrada.

Operações disponíveis no módulo incluem criação e consulta das sessões, atualização durante o processo de fechamento e exclusão quando permitida pelos relacionamentos existentes.

Endpoint principal da API:

```text
/fechamentos
```

## Fluxo principal de utilização

O fluxo básico da aplicação é:

```text
Cadastrar caixa
      ↓
Abrir caixa
      ↓
Informar valor de abertura
      ↓
Registrar movimentações
      ↓
Solicitar fechamento
      ↓
Calcular valor esperado
      ↓
Contar o dinheiro
      ↓
Informar valor contado
      ↓
Calcular diferença
      ↓
Finalizar fechamento
```

As informações são enviadas pelo frontend React para a API REST desenvolvida em Spring Boot e persistidas no banco de dados MySQL.

## Contador de notas e moedas

Para auxiliar no momento da conferência, o FechaFácil possui um contador de dinheiro integrado ao processo de fechamento.

O usuário pode informar a quantidade de cada cédula ou moeda disponível, e a aplicação calcula automaticamente o total contado.

Esse valor pode ser utilizado diretamente no campo de valor contado do fechamento.

O objetivo dessa funcionalidade é reduzir a necessidade de realizar somas manualmente durante a conferência do caixa.

Após informar o valor contado, o sistema compara esse total com o valor esperado e calcula automaticamente a diferença.

## Tecnologias utilizadas

### Frontend

- ReactJS
- Vite
- JavaScript
- HTML
- CSS
- Fetch API

O frontend é responsável pela interface do usuário, pelos formulários dos três módulos, pela exibição dos históricos e pela comunicação com a API REST.

### Backend

- Java 21
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- Maven
- MySQL Connector/J

O backend disponibiliza a API REST responsável por receber as requisições do frontend, executar as operações do sistema e acessar o banco de dados.

### Banco de dados

- MySQL

O banco de dados armazena os registros de:

- caixas;
- fechamentos;
- movimentações.

Os relacionamentos entre as tabelas são definidos por chaves estrangeiras, preservando a ligação entre uma sessão de fechamento, seu caixa e suas movimentações.

### Deploy

Na versão publicada do projeto foram utilizados:

- **Vercel** para o frontend;
- **Render** para o backend;
- **Aiven** para o banco de dados MySQL.

## Arquitetura do sistema

O FechaFácil utiliza uma arquitetura dividida em três camadas principais:

```text
Usuário
  ↓
ReactJS
Frontend
  ↓
requisições HTTP
  ↓
API REST
Spring Boot
  ↓
Spring Data JPA
  ↓
MySQL
```

O frontend React envia requisições HTTP para os endpoints disponibilizados pelo backend.

No backend, os principais componentes estão organizados em:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
JPA
    ↓
MySQL
```

### Controller

Recebe as requisições HTTP enviadas pelo frontend e disponibiliza os endpoints da API REST.

### Service

Centraliza as operações utilizadas pelos controllers e faz a comunicação com a camada de persistência.

### Repository

Utiliza o Spring Data JPA para executar as operações de acesso aos dados armazenados no MySQL.

### Entity

Representa as entidades do sistema e realiza o mapeamento entre os objetos Java e as tabelas do banco de dados.

## Estrutura principal do repositório

```text
fechafacil/
│
├── backend/
│   ├── src/
│   ├── Dockerfile
│   ├── start.sh
│   └── pom.xml
│
├── database/
│   ├── modelagem/
│   └── scripts/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

### `backend/`

Contém a API REST desenvolvida em Java com Spring Boot.

### `frontend/`

Contém a aplicação React responsável pela interface do sistema.

### `database/`

Contém os scripts SQL utilizados para criação do banco e das tabelas, além dos arquivos de modelagem do banco de dados.

## Banco de dados

O banco de dados do FechaFácil é composto por três tabelas principais:

```text
caixa
  ↓
fechamento
  ↓
movimentacao
```

### Tabela `caixa`

Armazena os caixas cadastrados no sistema.

Principais campos:

- `id`;
- `nome`.

### Tabela `fechamento`

Representa uma sessão de utilização de um caixa.

Principais campos:

- `id`;
- `data_hora_abertura`;
- `valor_abertura`;
- `data_hora_fechamento`;
- `valor_esperado`;
- `valor_contado`;
- `diferenca`;
- `caixa_id`.

Cada fechamento pertence a um caixa.

### Tabela `movimentacao`

Armazena as movimentações realizadas durante uma sessão de caixa.

Principais campos:

- `id`;
- `tipo`;
- `valor`;
- `descricao`;
- `data_hora`;
- `fechamento_id`.

Cada movimentação pertence a um fechamento.

Os scripts utilizados para criação da estrutura estão disponíveis em:

```text
database/scripts/
├── 01-criar-banco.sql
└── 02-criar-tabelas.sql
```

Os arquivos de modelagem conceitual e lógica também estão versionados em:

```text
database/modelagem/
```

## API REST

O backend disponibiliza três grupos principais de endpoints.

### Caixas

| Método | Endpoint | Operação |
|---|---|---|
| GET | `/caixas` | Listar caixas |
| GET | `/caixas/{id}` | Buscar caixa por ID |
| POST | `/caixas` | Cadastrar caixa |
| PUT | `/caixas/{id}` | Atualizar caixa |
| DELETE | `/caixas/{id}` | Excluir caixa |

### Movimentações

| Método | Endpoint | Operação |
|---|---|---|
| GET | `/movimentacoes` | Listar movimentações |
| GET | `/movimentacoes/{id}` | Buscar movimentação por ID |
| POST | `/movimentacoes` | Cadastrar movimentação |
| PUT | `/movimentacoes/{id}` | Atualizar movimentação |
| DELETE | `/movimentacoes/{id}` | Excluir movimentação |

### Fechamentos

| Método | Endpoint | Operação |
|---|---|---|
| GET | `/fechamentos` | Listar fechamentos |
| GET | `/fechamentos/{id}` | Buscar fechamento por ID |
| POST | `/fechamentos` | Abrir uma sessão de caixa |
| PUT | `/fechamentos/{id}` | Atualizar/finalizar fechamento |
| DELETE | `/fechamentos/{id}` | Excluir fechamento quando permitido |

## Como executar o projeto localmente

### Pré-requisitos

Para executar o FechaFácil localmente, é necessário possuir:

- Java 21;
- Node.js e npm;
- MySQL;
- Git.

### 1. Clonar o repositório

```bash
git clone https://github.com/brunozamboti/fechafacil.git
cd fechafacil
```

### 2. Preparar o banco de dados

Inicie o MySQL e execute os scripts nesta ordem:

```text
database/scripts/01-criar-banco.sql
database/scripts/02-criar-tabelas.sql
```

O primeiro script cria e seleciona o banco:

```text
fechafacil
```

O segundo cria as tabelas e seus relacionamentos.

O backend utiliza `ddl-auto=validate`, portanto espera que a estrutura do banco já exista antes da inicialização da aplicação.

### 3. Executar o backend

Entre na pasta:

```bash
cd backend
```

No Windows:

```bash
.\mvnw.cmd spring-boot:run
```

No Linux ou macOS:

```bash
./mvnw spring-boot:run
```

Na configuração local padrão, a aplicação tenta acessar:

```text
jdbc:mysql://localhost:3306/fechafacil
```

com usuário:

```text
root
```

Caso o seu ambiente MySQL utilize outro usuário, senha ou endereço, configure as variáveis:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
```

Quando iniciado localmente, o backend utiliza por padrão:

```text
http://localhost:8080
```

### 4. Executar o frontend

Em outro terminal, entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite disponibiliza normalmente a aplicação em:

```text
http://localhost:5173
```

Quando `VITE_API_URL` não está definida, o frontend utiliza:

```text
http://localhost:8080
```

como endereço da API.

## Variáveis de ambiente

### Backend

A versão publicada utiliza as seguintes variáveis:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
FRONTEND_URL
PORT
```

`DB_URL`, `DB_USERNAME` e `DB_PASSWORD` configuram o acesso ao MySQL.

`FRONTEND_URL` informa ao backend qual origem pode acessar a API por meio da configuração de CORS.

`PORT` permite que a plataforma de hospedagem determine a porta utilizada pela aplicação.

### Frontend

O frontend utiliza:

```text
VITE_API_URL
```

Essa variável define o endereço da API REST que será utilizado pela aplicação.

## Deploy

A versão de demonstração do FechaFácil está publicada utilizando:

- **Frontend:** Vercel
- **Backend:** Render
- **Banco de dados:** MySQL na Aiven

### Aplicação

https://fechafacil-nine.vercel.app

### API

https://fechafacil-backend.onrender.com

### Repositório

https://github.com/brunozamboti/fechafacil

## Limitações atuais

O FechaFácil foi desenvolvido como um MVP acadêmico e ainda possui limitações que precisam ser consideradas antes de um uso real em produção.

A principal delas é a ausência de autenticação. Atualmente, todos os usuários que acessam a aplicação publicada utilizam os mesmos dados armazenados no banco.

Também existem pontos que podem ser fortalecidos, como:

- validações adicionais no frontend e backend;
- tratamento mais completo de erros e indisponibilidade da API;
- regras de negócio protegidas diretamente pelo backend;
- maior cobertura de testes automatizados.

Esses recursos não foram priorizados nesta versão porque o foco da entrega foi garantir primeiro os requisitos obrigatórios do projeto: os três CRUDs, integração entre React, Spring Boot e MySQL e uma aplicação funcional publicada.

## Melhorias futuras

Entre as principais evoluções planejadas estão:

- autenticação e cadastro de usuários;
- separação dos dados por usuário ou estabelecimento;
- fortalecimento das regras de negócio no backend;
- melhoria das mensagens de erro e estados de carregamento;
- ampliação das validações dos formulários;
- criação de testes automatizados.

Esses itens poderão ser registrados e acompanhados por meio das **Issues do GitHub**.

## Status do projeto

✅ Frontend React implementado  
✅ API REST com Spring Boot implementada  
✅ Banco de dados MySQL implementado  
✅ CRUD de Caixas  
✅ CRUD de Movimentações  
✅ CRUD de Fechamentos  
✅ Integração frontend, backend e banco  
✅ Contador de notas e moedas  
✅ Build e ESLint validados  
✅ Aplicação publicada

## Autor

**Bruno Donizete de Oliveira Zamboti**

Projeto desenvolvido como trabalho final do **Programa Transforma Futuros — 2026**.