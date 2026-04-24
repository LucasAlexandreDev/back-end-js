/* *********************************************************************
* Objective    : Arquivo responsável pela (validação, tratamento, manipulação de dados) para realizar o CRUD de Filme
* Date         : 2026-04-16  
* Development  : Lucas Alexandre Da Silva
* Version      : 1.0
* **********************************************************************/


// -------------- | IMPORTS FROM THE FILES | -------------- 

// Import do arquivo 'configMessages.js' referente as configurações de mensagens do projeto
const configMessages = require('../module/configMessages.js')
    
// Import do arquivo 'filme.js' do DAO para manipular os dados de filme no DB
const filmeDAO       = require('../../model/DAO/filme/filme.js') 
    

// -------------- | FUNCTIONS OF CRUD | -------------- 


// Função responsável por inserir um novo filme 
const inserirNovoFilme = async function(objectFilme, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))   
    
    try {
        
        if(String(contentType).trim().toLowerCase() == 'application/json'){
        
            let validar = await validarDados(objectFilme)
    
            // Retorna um JSON de erro caso algum atributo seja inválido | senão return false (não houve erro)
            if(validar){
                return validar // error 400
            
            }else{
            
                // Encaminha os dados (JSON) do Filme para o DAO inserir no DB
                let result = await filmeDAO.insertFilme(objectFilme)
                
                if(result){ // 201 (item inserido com sucesso)
        
                    customMessage.DEFAULT_MESSAGE.status      = customMessage.SUCESS_201_CREAT_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_201_CREAT_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message     = customMessage.SUCESS_201_CREAT_ITEM.message
        
                    return customMessage.DEFAULT_MESSAGE // 201
        
                }else{ // 500 (error interno do servidor)
                    return customMessage.ERROR_500_INTERNAL_SERVER_MODEL // 500 (model - DAO)
                }
            }
        
        }else{
            return customMessage.ERROR_415_CONTENT_TYPE // 415
        }

    } catch (error) {
        return customMessage.ERROR_500_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}


// Função responsável para atualizar um filme existente
const atualizarFilme = async function(){

}


// Função responsável por retornar todos os filmes existentes
const listarFilme = async function(){

    let customMessage = JSON.parse(JSON.stringify(configMessages))   

    // Verifica se dentro do arquivo controller possui algum bug de digitação | erro (500 controller)
    try {

        // Chama a função do DAO para retornar a lista de filmes do DB
        let result = await filmeDAO.selectAllFilme()

        // Validação para verificar se o DAO conseguiu processar o scrpit no DB | return false -> erro (500 model)
        if(result){

            // Validação para verificar se o conteúdo do ARRAY possui dados de retorno | return false -> erro (404)
            if(result.length > 0){        
                customMessage.DEFAULT_MESSAGE.status         = customMessage.SUCESS_200_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code    = customMessage.SUCESS_200_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme = result

                return customMessage.DEFAULT_MESSAGE // 200
            
            }else{
                return customMessage.ERROR_404_NOT_FOUND // 404
            }
        
        }else{
            return customMessage.ERROR_500_INTERNAL_SERVER_MODEL // 500 (model - DAO)
        }


    } catch (error) {
        return customMessage.ERROR_500_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}


// Função responsável para retornar um filme | Filtro = ID
const buscarFilme = async function(id){    
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))   

    // Verifica se dentro do arquivo controller possui algum bug de digitação | erro (500 controller)
    try {
  
        // validação para garantir que o ID seja um número válido 
        //
        if(String(id).replaceAll(' ', '') == '' || id == null || id == undefined || isNaN(id)){
            customMessage.ERROR_400_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_400_BAD_REQUEST

            }else{

                // Chama a função do DAO para buscar o filme pelo ID
                let result = await filmeDAO.selectByIdfilme(id)

                // Validação para verificar se o DAO retornou dados | false -> erro 500 (model)
                if(result){

                    // Validação para veficiar se o DAO possui algum dado dentro do ARRAY | false -> erro 404 (dado não encontrado)
                    if(result.length > 0){

                        customMessage.DEFAULT_MESSAGE.status         = customMessage.SUCESS_200_RESPONSE.status
                        customMessage.DEFAULT_MESSAGE.status_code    = customMessage.SUCESS_200_RESPONSE.status_code
                        customMessage.DEFAULT_MESSAGE.response.filme = result

                        return customMessage.DEFAULT_MESSAGE // 200

                    }else{
                        return customMessage.ERROR_404_NOT_FOUND // 404 
                    }

                }else{
                    return customMessage.ERROR_500_INTERNAL_SERVER_MODEL // 500 (model - DAO)
                }
            }

    } catch (error) {
        return customMessage.ERROR_500_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
        
}


// Função responsável para excluir um filme
const excluirFilme = async function(){

}


// -------------- | DATA VALIDATIONS | -------------- 
 

// Função responsável por válidar os dados de cadastro do Filme
const validarDados = async function(objectFilme){

    /*  JSON.stringify(configMessages) => Cria uma cópia dos JSON do arquivo de configuração de mensagem
    
        stringify => Converte o objeto JSON  para String '(clonou)'
        parse     => Converte a String em objeto JSON, sendo aclopada na varável
    
    */
    let customMessage = JSON.parse(JSON.stringify(configMessages))    

    if(objectFilme.nome == '' || objectFilme.nome == null || objectFilme.nome == undefined || objectFilme.nome.length > 80){
        customMessage.ERROR_400_BAD_REQUEST.field = '[NOME] INVÁLIDO' // field (campo)
        return customMessage.ERROR_400_BAD_REQUEST

    }else if(objectFilme.sinopse == '' || objectFilme.sinopse == null || objectFilme.sinopse == undefined){
        customMessage.ERROR_400_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST

    }else if(objectFilme.capa == '' || objectFilme.capa == null || objectFilme.capa == undefined || objectFilme.capa.length > 255){
        customMessage.ERROR_400_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else if(objectFilme.data_lancamento == '' || objectFilme.data_lancamento == null || objectFilme.data_lancamento == undefined || objectFilme.data_lancamento.length != 10){
        customMessage.ERROR_400_BAD_REQUEST.field = '[DATA LANÇAMENTO] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else if(objectFilme.duracao == '' || objectFilme.duracao == null || objectFilme.duracao == undefined || objectFilme.duracao.length < 5){
        customMessage.ERROR_400_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else if(objectFilme.valor == undefined || isNaN(objectFilme.valor) || objectFilme.valor.length > 5){
        customMessage.ERROR_400_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else if(objectFilme.avaliacao == undefined || isNaN(objectFilme.avaliacao) || objectFilme.avaliacao.length > 3){
        customMessage.ERROR_400_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else{
        return false
    }
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}

listarFilme()