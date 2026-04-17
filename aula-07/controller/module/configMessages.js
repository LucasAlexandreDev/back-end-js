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


// -------------- | VARIÁVEIS DE STATUS ERROR | -------------- 

const ERROR_400_BAD_REQUEST          = {status: false, status_code: 400, message: 'Não foi possivel processar a requisiçao, devido a erros de entrada de dados'}

const EROR_500_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, deviso a um erro interno no servidor [MODEL]'}


// -------------- | VARIÁVEIS DE STATUS SUCESS | -------------- 

const SUCESS_201_CREAT_ITEM  = {status: true, status_code: 201, message: 'item novo inserido com sucesso!'}




module.exports = {
    DEFAULT_MESSAGE,
    ERROR_400_BAD_REQUEST,
    EROR_500_INTERNAL_SERVER_MODEL,
    SUCESS_201_CREAT_ITEM
}
