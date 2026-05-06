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

const ERROR_400_BAD_REQUEST                = {status: false, status_code: 400, message: 'Não foi possivel processar a requisiçao, devido a erros de entrada de dados'}

const ERROR_404_NOT_FOUND                  = {status: false, status_code: 404, message: 'Não foram encontrados dados para retorno'}

const ERROR_415_CONTENT_TYPE               = {status: false, status_code: 415, message: 'Não foi possivel processar a requisição, pois o formato de dados encaminhado não é suportado pelo servidor. Apenas deve ser utilzado o formato JSON'}

const ERROR_500_INTERNAL_SERVER_MODEL      = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, deviso a um erro interno no servidor [MODEL]'}

const ERROR_500_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, deviso a um erro interno no servidor [CONTROLLER]'}

// -------------- | VARIÁVEIS HTTP DE STATUS SUCESS | -------------- 

const SUCESS_201_CREAT_ITEM                = {status: true, status_code: 201, message: 'item novo inserido com sucesso!'}

const SUCESS_200_RESPONSE                  = {status: true, status_code: 200}

const SUCESS_200_UPDATED_ITEM              = {status: true, status_code: 200, message: 'item atualizado com sucesso!'} 

//const SUCESS_204_DELETE_ITEM               = {status: true, status_code: 204} 

const SUCESS_200_DELETE_ITEM               = {status: true, status_code: 200, message: 'item deletado com sucesso!'} 


module.exports = {
    DEFAULT_MESSAGE,
    ERROR_400_BAD_REQUEST,
    ERROR_404_NOT_FOUND,
    ERROR_415_CONTENT_TYPE,
    ERROR_500_INTERNAL_SERVER_MODEL,
    ERROR_500_INTERNAL_SERVER_CONTROLLER,
    SUCESS_200_RESPONSE,
    SUCESS_200_UPDATED_ITEM,
    SUCESS_201_CREAT_ITEM,
    //SUCESS_204_DELETE_ITEM
    SUCESS_200_DELETE_ITEM
}
