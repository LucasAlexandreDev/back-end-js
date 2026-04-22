/* *********************************************************************
* Objective    : Arquivo responsável pela padronização das mensagens e status code do projeto de Filmes
* Date         : 2026-04-17  
* Development  : Lucas Alexandre Da Silva
* Version      : 1.0
* **********************************************************************/

// Função responsável por padronizar os retornos da API (Cabeçalho)
const DEFAULT_MESSAGE = 
{
    api_description: 'API para controlar o Projeto de Filmes',
    development    : 'Lucas Alexandre da Silva',
    version        : '1.0.4.26',
    status         :  Boolean,
    status_code    :  Number,
    response       :  {} 
}


// -------------- | VARIÁVEIS HTTP DE STATUS ERROR | -------------- 

const ERROR_400_BAD_REQUEST               = {status: false, status_code: 400, message: 'Não foi possivel processar a requisiçao, devido a erros de entrada de dados'}

const EROR_500_INTERNAL_SERVER_MODEL      = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, deviso a um erro interno no servidor [MODEL]'}

const EROR_500_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, deviso a um erro interno no servidor [CONTROLLER]'}

const ERROR_415_CONTENT_TYPE              = {status: false, status_code: 415, message: 'Não foi possivel processar a requisição, pois o formato de dados encaminhado não é suportado pelo servidor. Apenas deve ser utilzado o formato JSON'}


// -------------- | VARIÁVEIS HTTP DE STATUS SUCESS | -------------- 

const SUCESS_201_CREAT_ITEM               = {status: true, status_code: 201, message: 'item novo inserido com sucesso!'}


module.exports = {
    DEFAULT_MESSAGE,
    ERROR_400_BAD_REQUEST,
    EROR_500_INTERNAL_SERVER_MODEL,
    ERROR_415_CONTENT_TYPE,
    EROR_500_INTERNAL_SERVER_CONTROLLER,
    SUCESS_201_CREAT_ITEM,
}
