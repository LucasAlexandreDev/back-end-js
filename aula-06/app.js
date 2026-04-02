/* 
-------------- | HTTP | -------------- 

HTTP (HyperText Transfer Protocol) -> É o protocolo base para troca de dados na Web, operando no modelo cliente-servidor (navegador e servidor)

O que o HTTP possui?  → Possui verbos/ métodos 

Verbos:

POST   -> Inserir Novos Dados da API
GET    -> Retornar dados da API
PUT    -> Alterar Dados Existentes da API
DELETE -> Remover Dados da API
*/


/*
-------------- | Dados do Arquivo | -------------- 

Objetivo: Arquivo responsável pela criação da API do projeto de Estados e Cidades
Data: 01/04/26
Desenvolvedor: Lucas Alexandre da Silva
Versão: 1.0

*/


/*
-------------- | Significado dos Dados | -------------- 

npm                 -> Repositório onde possui todas as dependências do node.js
--save              -> Para ficar registrado todos os dados do pacote 
"express": "^5.2.1" -> ^(superior) caso tiver uma atualização, as dependências que possui isso, irão atualzar | recomendação, usar no desenvolvimento e após concluir remover 
EXPRESS             -> Dependência para configurar e utilizar o protocolo HTPP para a criação da API 
CORS                -> Dependência para configurar as permissões de acesso da APi (para o front conseguir utilizar ela)

-------------- | Instalação das dependências | -------------- 

Para configurar a APi:

Instalar o EXPRESS -> nmp install express --save
Instalar o CORS    -> nmp install cors --save
*/

/*

-------------- | Boas práticas do Endpoint  na API Rest  | -------------- 

Endpoint:  versão -> nome do projeto ou empresa -> o que está retornando

Ex: /v1/senai/estados
Ex: /v2/senai/estados
Ex: /v2/senai/dados/estados
*/

// Import das dependências para criar a APi
const express = require('express')
const cors    = require('cors')

// Import do arquivo de funções 
const estadosCidades = require('./modulo/funcoes')

// Criando um objeto do express para criar a API (criando uma instância do framework Express)
const app = express()

// Configurações do CORS da API
const corsOptions = {

/*
    A origem da requisição   | Acesso a APi: ['*'] - pública  ou [' Endereço IP do serviodr ou aparelho'] - restrita
    header (cabeçalho) -> Responsável por armazenar os dados de origem, destino, verbo, tipo de dados,.. do pacote 
    body   (corpo)     -> conteúdo do pacote
    Configuração de origem da requisição ( IP ou domínio(URL) )
*/
    origin        : ['*'],
    methods       : 'GET',                                    // Configuração dos verbos que seram utilizados na API 
    allowedHeaders: ['Content-type', 'Authorization']         // Configurações de permissões | 
                    // tipo de dados, Autorização de acesso
}


/*
    Aplica as configurações do CORS no app (EXPRESS)
    app -> utilize o (cors) -> e utilize essas configurações que contém dentro da variável (corsOptions)
*/
app.use(cors(corsOptions))

/*
    Endepoint que retorna a listar os estados
    request  (requisição) -> chegada de dados na API || É o pedido que o navegador faz ao servidor
    response (resposta)   -> retorno de dados da API || É a resposta que o servidor envia ao cliente ou front após processar a requisição
*/


// Endepoint que retorna a listar os dados dos estados | com argumento (uf)
app.get('/v1/senai/lista/estados', function(request, response){

    let estado = estadosCidades.getListaDeEstados()
    
    if(estado){
        response.status(200) // Requisição bem sucedida 
        response.json(estado)

    }else{
        response.status(404)
        response.json({"message": "Nenhum Estado foi encontrado"})
    } 
})

// Faz o start da APi (aguardando as requisições)
app.listen(8080, function(){
    console.log('APi aguardando novas requisições ..., http://localhost:8080')
})


// Endepoint que retorna os dados dos estados | com o filtro (uf)
app.get('/v1/senai/dados/estado/:uf', function(request, response){
    
    let uf     = request.params.uf
    let estado = estadosCidades.getDadosEstado(uf)

    if(estado){
        response.status(200)
        response.json(estado)
    
    }else{
        response.status(404)
        response.json({"message": "Nenhum Estado foi encontrado"}) 
    }
})


// Endpoint que retorna a capital + dados do estado | com o filtro  (uf)
app.get('/v1/senai/capital/estado/:uf', function(request, response){
    
    let uf     = request.params.uf
    let estado = estadosCidades.getCapitalEstado(uf)

    if(estado){
        response.status(200)
        response.json({estado})

    }else{
        response.status(404)
        response.json({"message": "Nenhuma Capital foi encontrada"})
    }
})


// Endpoint que retorna todos os estados de uma região | com o filtro  (região)
app.get('/v1/senai/estados/regiao/:regiao', function(resquest, response){

    let regiao = resquest.params.regiao
    let estado = estadosCidades.getEstadosRegiao(regiao)

    if(estado){
        response.status(200)
        response.json(estado)
       
    }else{
        response.status(404)
        response.json({"message": "Nenhuma região foi encontrada"})
    }
})


// Endpoint que retorna todas as capitais que já foram ou são capitais do Brasil
app.get('/v1/senai/estados/capital/brasil', function(request, response){
    
    let estado = estadosCidades.getCapitalPais()

    if(estado){
        response.status(200)
        response.json(estado)
        
    }else{
        response .status(404)
        response.json({"message": "Nenhuma Capital que já foi ou é do Brasil, foi encontrada"})
       
    }
})


// Endepoint que retorna uma listar das cidades do estado | com o filtro  (uf)
app.get('/v1/senai/cidades/estado/:uf', function(request, response){
    
    let uf     = request.params.uf
    let estado = estadosCidades.getCidades(uf)
    
    if(estado){
        response.status(200) 
        response.json(estado)
        
    }else{
        response.status(404)
        response.json({"message": "Nenhuma cidade foi encontrado"})
    }
})


app.get('/v1/senai/help', function(request, response){

    let docAPI ={
        "api-description" : "API para manipular dados de Estado e Cidades",
        "date"            : "26/04/02",
        "development"     : "Lucas Alexandre da Silva",
        "version"         : 1.0,
        "endpoints"       : [
            {
                "router1"    : "/v1/senai/lista/estados",
                "description": "Retorna a Lista de todos os Estados",
            },

            {
                "router2"    : "/v1/senai/dados/estado/sp",
                "description": "Retorna Dados de um Estado, filtrando pela sigla",
            },

            {
                "router3"    : "/v1/senai/capital/estado/sp",
                "description": "Retorna Dados da Capital de um Estado, filtrando pela sigla",
            },

            {
                "router4"    : "/v1/senai/estados/regiao/sudeste",
                "description": "Retorna os Estados, filtrando pela região",
            },

            {
                "router5"    : "/v1/senai/estados/capital/brasil",
                "description": "Retorna os Estados que formaram ou foram Capitais do Brasil",
            },

            {
                "router6"    : "/v1/senai/cidades/estado/sp",
                "description": "Retorna as Cidades, filtrando pela sigla do Estado",
            }
        ]
    }

    if(docAPI){
        response.status(200)
        response.json(docAPI)
    }else{
        response.status(404)
        response.json("Erro ao tentar encontrar a Documentação da API")
    }
})