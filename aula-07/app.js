/*************************************************************************** 
* Objetivo: Arquivo responsável pela criação da API do projeto Filmes
* Data: 2026-17-06
* Desenvolvedor: Lucas Alexandre da Silva
* Versão: 1.0
****************************************************************************/

// Import das dependências para estar criando a API
const express    = require('express')
const cors       = require('cors')
const boryParser = require('body-parser')


// Import das controllers do Projeto de Filme
const controllerFilme = require('./controller/filme/controller_filme.js')


// Permite a utilização do JSON no body das requisições 
const boryParserJSON = boryParser.json()


// Criando uma instância do framework Express para criar a API
const app = express()

const corsOptions = 
{
    origin        : ['*'], // acesso público para o cliente e Front-End
    methods       : 'GET, POST, PUT, DELETE, OPTIONS',                                    
    allowedHeaders: ['Content-type', 'Authorization']         
}

// Aplica as configurações do cors no app (express)
app.use(cors(corsOptions))


//ENDPOINTS
app.post('/v1/senai/locadora/filme', boryParserJSON, async function(request, response){

    let dados  = request.body // Rebendo o body da requisição
    let result = await controllerFilme.inserirNovoFilme(dados) //chama a função de inserir novo filme e passa os dados recebidos do bory 

    response.status(result.status_code)
    response.json(result)
})


// Faz o start da APi (aguardando as requisições)
app.listen(8080, function(){
    console.log('APi aguardando novas requisições ..., http://localhost:8080')
})