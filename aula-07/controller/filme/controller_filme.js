/* *********************************************************************
* Objective    : Arquivo responsável pela (validação, tratamento, manipulação de dados) para realizar o CRUD de Filme
* Date         : 2026-04-16  
* Development  : Lucas Alexandre Da Silva
* Version      : 1.0
* **********************************************************************/


// Import do arquivo 'configMessages.js' referente as configurações de mensagens do projeto
const configMessages = require('../module/configMessages.js')

// Import do arquivo 'filme.js' do DAO para manipular os dados de filme no DB
const filmeDAO       = require('../../model/DAO/filme/filme.js') 


// Função responsável por inserir um novo filme 
const inserirNovoFilme = async function(objeticFilme){

    /*  JSON.stringify(configMessages) => Cria uma cópia dos JSON do arquivo de configuração de mensagem

        stringify => Converte o objeto JSON  para String '(clonou)'
        parse     => Converte a String em objeto JSON, sendo aclopada na varável

    */
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    if(objeticFilme.nome == '' || objeticFilme.nome == null || objeticFilme.nome == undefined || objeticFilme.nome.length > 80){
        customMessage.ERROR_400_BAD_REQUEST.field = '[NOME] INVÁLIDO' // field (campo)
        return customMessage.ERROR_400_BAD_REQUEST

    }else if(objeticFilme.sinopse == '' || objeticFilme.sinopse == null || objeticFilme.sinopse == undefined){
        customMessage.ERROR_400_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST

    }else if(objeticFilme.capa == '' || objeticFilme.capa == null || objeticFilme.capa == undefined || objeticFilme.capa.length > 255){
        customMessage.ERROR_400_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else if(objeticFilme.data_lancamento == '' || objeticFilme.data_lancamento == null || objeticFilme.data_lancamento == undefined || objeticFilme.data_lancamento.length != 10){
        customMessage.ERROR_400_BAD_REQUEST.field = '[DATA LANÇAMENTO] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else if(objeticFilme.duracao == '' || objeticFilme.duracao == null || objeticFilme.duracao == undefined || objeticFilme.duracao.length < 5){
        customMessage.ERROR_400_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else if(objeticFilme.valor == undefined || isNaN(objeticFilme.valor) || objeticFilme.valor.length > 5){
        customMessage.ERROR_400_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else if(objeticFilme.avaliacao == undefined || isNaN(objeticFilme.avaliacao) || objeticFilme.avaliacao.length > 3){
        customMessage.ERROR_400_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST

    }else{

        let result = await filmeDAO.insertFilme(objeticFilme)

        if(result){

            customMessage.DEFAULT_MESSAGE.status      = customMessage.SUCESS_201_CREAT_ITEM.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_201_CREAT_ITEM.status_code
            customMessage.DEFAULT_MESSAGE.message     = customMessage.SUCESS_201_CREAT_ITEM

        }else{
            customMessage.DEFAULT_MESSAGE.status      = customMessage.EROR_500_INTERNAL_SERVER_MODEL.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.EROR_500_INTERNAL_SERVER_MODEL.status_code
            customMessage.DEFAULT_MESSAGE.message     = customMessage.EROR_500_INTERNAL_SERVER_MODEL.message
        }
    }

    return customMessage.DEFAULT_MESSAGE
}



// Função responsável para atualizar um filme existente
const atualizarFilme = async function(){

}


// Função responsável por retornar todos os filmes existentes
const listarFilme = async function(){

}


// Função responsável para retornar um filme | Filtro = ID
const buscarFilme = async function(){

}


// Função responsável para excluir um filme
const excluirFilme = async function(){

}


module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}