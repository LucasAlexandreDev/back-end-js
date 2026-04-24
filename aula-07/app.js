/*************************************************************************** 
* Objetivo: Arquivo responsável pela criação da API do projeto Filmes
* Data: 2026-17-06
* Desenvolvedor: Lucas Alexandre da Silva
* Versão: 1.0
****************************************************************************/

// Import das dependências para estar criando a API
const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

// Import das controllers do Projeto de Filme
const controllerFilme = require('./controller/filme/controller_filme.js')

//

// Permite a utilização do JSON no body das requisições 
const bodyParserJSON = bodyParser.json()


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


//ENDPOINTS:

/*
    Endpoint 1 - Adiciona cadastro de um novo filme
    Método: POST 
*/
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function(request, response){

    let dados       = request.body // Rebendo o body da requisição
    
    // Recebendo o tipo de dados da requisição para validar se é JSON
    let contentType = request.headers['content-type']

    let result = await controllerFilme.inserirNovoFilme(dados, contentType) //chama a função de inserir novo filme e passa os dados recebidos do bory

    response.status(result.status_code)
    response.json(result)
})


app.get('/v1/senai/locadora/filme', async function(request, response){

    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})


app.get('/v1/senai/locadora/filme/:id', async function(request, response){

    let numberID = request.params.id
    let result   = await controllerFilme.buscarFilme(numberID)

    response.status(result.status_code)
    response.json(result)
})


// Faz o start da APi (aguardando as requisições)
app.listen(8080, function(){
    console.log('APi aguardando novas requisições ..., http://localhost:8080')
})