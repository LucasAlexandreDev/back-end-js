# 🧱 Padrão de Projeto MVC (Model View Controller)

## Descrição

O padrão **MVC (Model - View - Controller)** organiza a aplicação separando responsabilidades:

**M - Model**

Responsável pela **modelagem dos dados**. 
- Representa a estrutura dos dados da aplicação 
- Pode estar ligado ao banco de dados 
- Pode conter regras básicas de consistência 
- Em POO, pode ser representado por classes

**V - View** 

Responsável pela **interface com o usuário (Front-End)**. 
- Exibe dados 
- Recebe interações do usuário 
- Não contém regra de negócio
- Não estará sendo incluído na estrutura, pois será desenvolvido separadamente em outro repositório

**C - Controller**

Responsável pela **regra de negócio da aplicação**. 
- Recebe requisições - Valida dados - Processa informações 
- Chama o Model / DAO 
- Retorna respostas (com status HTTP)

## 🏗️ Estrutura de Projeto (Back-End)
```
src/
├── 📂 controller/ → recebe requisições (HTTP)
├── 📂 model/ → regra de negócio
├── 📂 DAO/ → acesso ao banco (SQL)
├── 📂 database/ → scripts e modelagem
├── 📂 database_config/ → conexão com banco
├── 📂 module/ → utilitários
└── app.js → inicia o servidor
└── 📄 app.js
```

## 📂 Camadas

### (Controller)
- Recebe: `request`
- Faz: tratamento, validação e manipulação de dados 
- chama: Model
- Retorna: `response` (JSON + status)


### (Model)
- Recebe: dados do controller
- Faz: regra de négocio e organização
- Chama: DAO
- Retorna: dados tratados

### DAO/ (Banco)
- Recebe: dados do model
- Faz: recebe dados já validado o JSON e os utiliza para montar e executar queries SQL no DB
- Retorna: resultado do banco (dados)

### database/
- Scripts SQL
- Modelagem lógica do banco

### database_config/
- Configuração do banco de dados (Knex)

### module/
- Funções auxiliares
- Arquivo de validação
- Arquivo de retorno padrão de mensagem 

### app.js
- Sobe servidor
- Define rotas

## 📦 Dependências (Node.js + Banco de Dados)

| Dependência | O que é | Para que serve |
|------------|--------|----------------|
| express    | Framework web | Criar servidor HTTP, rotas (GET, POST, etc.) e APIs |
| cors       | Middleware | Permitir requisições de outros domínios (ex: front acessando API) |
| body-parser| Middleware | Ler e converter o corpo da requisição (JSON → objeto JS) |
| mysql2     | Driver de banco | Conectar o Node.js ao MySQL e executar queries |
| knex       | Query Builder | Construir queries SQL usando JavaScript (abstração do SQL) |

## 🔁 CRUD

| Operação | HTTP | Queries SQL   |
|----------|------|--------|
| Create   | POST | INSERT |
| Read     | GET  | SELECT |
| Update   | PUT  | UPDATE |
| Delete   | DELETE | DELETE |

## ⚙️ Funções por tabela

- DAO: insert, select, update, delete
- Model: inserir, listar, atualizar, excluir

mínimo: **8 funções**

**Motivo:** separar regra (model) de banco (DAO)

## 🔄 Fluxo da aplicação (Ida e Volta)

| Fluxo        | Camada     | Ação                          |
|-------------|-----------|-------------------------------|
| ↓ Requisição | Front     | Envia HTTP (JSON)            |
| ↓            | Controller| Recebe e válida o JSON               |
| ↓            | Model     | Aplica e válida a regra de négocio                  |
| ↓            | DAO       | Coloca o JSON validado nos values do query SQL                   |
| ↓            | Banco     | Processa dados                |
|              |           |                       |
| ↑ Resposta   | DAO       | Retorna resultado     |
| ↑            | Model     | Organiza dados                |
| ↑            | Controller| Retorna HTTP (JSON + status)  |
| ↑            | Front     | Recebe resposta               |