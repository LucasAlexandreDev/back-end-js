/* *********************************************************************
* Objective    : Arquivo responsável pela (validação, tratamento, manipulação de dados) para realizar o CRUD de Filme Gênero
* Date         : 2026-05-22
* Development  : Lucas Alexandre Da Silva
* Version      : 1.0
* **********************************************************************/

// As Tabelas Associativa 'Que não contem endpoints' vai ser controlada pelo file da tabela que gerou a Associativa | nesse contexto o file 'Filme'


// -------------- | IMPORTS FROM THE FILES | -------------- 

// Import do arquivo 'configMessages.js' referente as configurações de mensagens do projeto
const configMessages = require('../module/configMessages.js')
    
// Import do arquivo 'filme.js' do DAO para manipular os dados de filme no DB
const filmeGeneroDAO       = require('../../model/DAO/filme_genero/filme_genero.js') 


// -------------- | IMPORTS FROM THE CONTROLLERS | -------------- 

const controllerClassificacao = require('../classificacao_teste/controller_classificacao_teste.js')


// -------------- | FUNCTIONS OF CRUD | -------------- 


// Função responsável por inserir um novo filme gênero
const inserirNovoFilmeGenero = async function(objectFilmeGenero){

    let customMessage = JSON.parse(JSON.stringify(configMessages))   
    
    try {        
            let validar = await validarDados(objectFilmeGenero)
    
            // Retorna um JSON de erro caso algum atributo seja inválido | se não return false (não houve erro)
            if(validar){
                return validar // error 400
            
            }else{
                
                // Encaminha os dados (JSON) do Filme para o DAO inserir no DB
                let result = await filmeGeneroDAO.insertFilmeGenero(objectFilmeGenero)
                
                if(result){ // 201 (item inserido com sucesso)
                    
                    // Cria o Id no JSON do objetic Filme e adiciona o ID gerado no DAO
                    objectFilmeGenero.id = result 

                    customMessage.DEFAULT_MESSAGE.status      = customMessage.SUCESS_201_CREAT_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_201_CREAT_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message     = customMessage.SUCESS_201_CREAT_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response    = objectFilmeGenero
        
                    return customMessage.DEFAULT_MESSAGE // 201
        
                }else{ // 500 (error interno do servidor)
                    return customMessage.ERROR_500_INTERNAL_SERVER_MODEL // 500 (model - DAO)
                }
            }

    } catch (error) {
        return customMessage.ERROR_500_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}


// Função responsável para atualizar um filme gênero existente
const atualizarFilmeGenero = async function(objectFilmeGenero, id){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

            // Chama a função para buscar o filme e validar se o ID está correto | Se o ID existe no DB | Se o filme existe 
            let resultBuscarFilmeGenero = await buscarFilmeGenero(id)

            if(resultBuscarFilmeGenero.status){
                
                // Chama a função para validar os dados do body (JSON) da requisição para alteração do filme
                let validar = await validarDados(objectFilmeGenero)

                if(!validar){

                    // Adiciona um atributo ID no JSON de filme, para enviar ao DAO um único objeto
                    objectFilmeGenero.id = Number(id)

                    // Chama a função para atualizar o filme no DB
                    let result = await filmeGeneroDAO.updateFilmeGenero(objectFilmeGenero)
                    
                    // Se o DAO me retornou um true, eu conseguir atualizar no DB e fazemos um 200 dentro de if(result) | Se o DAO me retornou um false, entra no else (com erro 500 na model - DAO) 
                    if(result){ 
                        customMessage.DEFAULT_MESSAGE.status      = customMessage.SUCESS_200_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_200_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message     = customMessage.SUCESS_200_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response    = objectFilmeGenero // adiciona dentro do response o object filme (dados + ID)

                        return customMessage.DEFAULT_MESSAGE // 200 (item atualizado com sucesso)

                    }else{
                        return customMessage.ERROR_500_INTERNAL_SERVER_MODEL // 500 (model - DAO)
                    }

                }else{
                    return validar // 400 de validação dos campos do DB
                }

            }else{
                return resultBuscarFilmeGenero // 400 (ID inválido), 404 (Não encontrado) ou 500 (Controller ou Model - DAO)
            }
    
    } catch (error) {
        return configMessages.ERROR_500_INTERNAL_SERVER_CONTROLLER // 500 (controller) - Erro de Sintaxe
    }
}


// Função responsável por retornar todos os filmes gêneros existentes
const listarFilmeGenero = async function(){

    let customMessage = JSON.parse(JSON.stringify(configMessages))   

    // Verifica se dentro do arquivo controller possui algum bug de digitação | erro (500 controller)
    try {

        // Chama a função do DAO para retornar a lista de filmes do DB
        let result = await filmeGeneroDAO.selectAllFilmeGenero()

        // Validação para verificar se o DAO conseguiu processar o scrpit no DB | return false -> erro (500 model)
        if(result){

            // Validação para verificar se o conteúdo do ARRAY possui dados de retorno | return false -> erro (404)
            if(result.length > 0){        

                customMessage.DEFAULT_MESSAGE.status                = customMessage.SUCESS_200_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code           = customMessage.SUCESS_200_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count        = result.length
                customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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
const buscarFilmeGenero = async function(id){    
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))   

    // Verifica se dentro do arquivo controller possui algum bug de digitação | erro (500 controller)
    try {
  
        // validação para garantir que o ID seja um número válido 
        //
        if(id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0){
            customMessage.ERROR_400_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_400_BAD_REQUEST

            }else{

                // Chama a função do DAO para buscar o filme pelo ID
                let result = await filmeGeneroDAO.selectByIdfilmeGenero(id)

                // Validação para verificar se o DAO retornou dados | false -> erro 500 (model)
                if(result){

                    // Validação para veficiar se o DAO possui algum dado dentro do ARRAY | false -> erro 404 (dado não encontrado)
                    if(result.length > 0){

                        customMessage.DEFAULT_MESSAGE.status                = customMessage.SUCESS_200_RESPONSE.status
                        customMessage.DEFAULT_MESSAGE.status_code           = customMessage.SUCESS_200_RESPONSE.status_code
                        customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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
const excluirFilmeGenero = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMessages))   

    try {
        
        // Chama a função de buscar filme para validar se o id é válido ou se não foi encontrado
        let resultBuscarFilme = await buscarFilmeGenero(id)

        // Validação 
        if(resultBuscarFilme.status){

            // Chama a função do DAO do delete e passa o id
            let result = filmeGeneroDAO.deleteFilmeGenero(id)

            if(result){
                
                /*

                Contexto: Utilizado na aula o status code de 200, envés de 204 | ambos corretos, apenas para manter o padrão do projeto, vamos utilizar o 200

                customMessage.DEFAULT_MESSAGE.status         = customMessage.SUCESS_204_DELETE_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code    = customMessage.SUCESS_204_DELETE_ITEM.status_code

                return customMessage.DEFAULT_MESSAGE // 204
                */
                
                return customMessage.SUCESS_200_DELETE_ITEM
            
            }else{
                return customMessage.ERROR_500_INTERNAL_SERVER_MODEL // 500 (model)
            }
    
        }else{
            return resultBuscarFilme // 400 (ID inválido) e 404 (ID não encontrado)
        }

    } catch (error) {
        return customMessage.ERROR_500_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}



// Função responsável para excluir a relação de Gêneros com o filme 
const excluirGenerosIdFilme = async function(idFilme){

    let customMessage = JSON.parse(JSON.stringify(configMessages))   

    try {

            // Chama a função do DAO do delete e passa o id
            let result = filmeGeneroDAO.deleteGenerosByIdFilme(idFilme)

            if(result){
                return customMessage.SUCESS_200_DELETE_ITEM // 200
            
            }else{
                return customMessage.ERROR_500_INTERNAL_SERVER_MODEL // 500 (model)
            }

    } catch (error) {
        return customMessage.ERROR_500_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

// -------------- | FUNCTIONS INNER JOINS | -------------- 


// Função responsável para retornar os gêneros | Filtro = ID Filme
const buscarGenerosIdFilme = async function(idFilme){    
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))   

    // Verifica se dentro do arquivo controller possui algum bug de digitação | erro (500 controller)
    try {
  
        // validação para garantir que o ID seja um número válido 
        //
        if(idFilme == undefined || String(idFilme).replaceAll(' ', '') == '' || idFilme == null || isNaN(idFilme) || idFilme <= 0){
            customMessage.ERROR_400_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
            return customMessage.ERROR_400_BAD_REQUEST

            }else{

                // Chama a função do DAO para buscar o filme pelo ID
                let result = await filmeGeneroDAO.selectGenerosByIdFilme(idFilme)

                // Validação para verificar se o DAO retornou dados | false -> erro 500 (model)
                if(result){

                    // Validação para veficiar se o DAO possui algum dado dentro do ARRAY | false -> erro 404 (dado não encontrado)
                    if(result.length > 0){

                        customMessage.DEFAULT_MESSAGE.status                = customMessage.SUCESS_200_RESPONSE.status
                        customMessage.DEFAULT_MESSAGE.status_code           = customMessage.SUCESS_200_RESPONSE.status_code
                        customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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


// Função responsável para retornar os filmes | Filtro = ID Gênero
const buscarFilmesIdGenero = async function(idGenero){    
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))   

    // Verifica se dentro do arquivo controller possui algum bug de digitação | erro (500 controller)
    try {
  
        // validação para garantir que o ID seja um número válido 
        //
        if(idGenero == undefined || String(idGenero).replaceAll(' ', '') == '' || idGenero == null || isNaN(idGenero) || idGenero <= 0){
            customMessage.ERROR_400_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
            return customMessage.ERROR_400_BAD_REQUEST

            }else{

                // Chama a função do DAO para buscar o filme pelo ID
                let result = await filmeGeneroDAO.selectFilmesByIdGenero(idGenero)

                // Validação para verificar se o DAO retornou dados | false -> erro 500 (model)
                if(result){

                    // Validação para veficiar se o DAO possui algum dado dentro do ARRAY | false -> erro 404 (dado não encontrado)
                    if(result.length > 0){

                        customMessage.DEFAULT_MESSAGE.status                = customMessage.SUCESS_200_RESPONSE.status
                        customMessage.DEFAULT_MESSAGE.status_code           = customMessage.SUCESS_200_RESPONSE.status_code
                        customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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

// -------------- | DATA VALIDATIONS | -------------- 
 

// Função responsável por válidar os dados de cadastro do Filme
const validarDados = async function(objectFilmeGenero){

    /*  JSON.stringify(configMessages) => Cria uma cópia dos JSON do arquivo de configuração de mensagem
    
        stringify => Converte o objeto JSON  para String '(clonou)'
        parse     => Converte a String em objeto JSON, sendo aclopada na varável
    
    */
    let customMessage = JSON.parse(JSON.stringify(configMessages))    

    /*
        Integração de um relacionamento 1:N (TABELA DE FILME X GÊNERO)
        Validação para a FK de classificação
    */

    if(objectFilmeGenero.id_filme == undefined || objectFilmeGenero.id_filme == null || objectFilmeGenero.id_filme == '' || isNaN(objectFilmeGenero.id_filme) || objectFilmeGenero.id_filme <= 0){
        customMessage.ERROR_400_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else if(objectFilmeGenero.id_genero == undefined || objectFilmeGenero.id_genero == null || objectFilmeGenero.id_genero == '' || isNaN(objectFilmeGenero.id_genero) || objectFilmeGenero.id_genero <= 0){
        customMessage.ERROR_400_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else{
        return false
    }
}

module.exports = {
    inserirNovoFilmeGenero,
    atualizarFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    buscarGenerosIdFilme,
    buscarFilmesIdGenero,
    excluirFilmeGenero,
    excluirGenerosIdFilme
}