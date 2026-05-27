/* *********************************************************************
* Objective    : Arquivo responsável pela (validação, tratamento, manipulação de dados) para realizar o CRUD de Filme
* Date         : 2026-04-16  
* Development  : Lucas Alexandre Da Silva
* Version      : 1.0
* **********************************************************************/


// -------------- | IMPORTS FROM THE FILES | -------------- 

const configMessages = require('../module/configMessages.js')
    
const filmeDAO       = require('../../model/DAO/filme/filme.js') 


// -------------- | IMPORTS FROM THE CONTROLLERS | -------------- 

// const controllerClassificacao = require('../classificacao_teste/controller_classificacao_teste.js')

const controllerFilmeGenero = require('../filme/controller_filme_genero.js')


// -------------- | FUNCTIONS OF CRUD N:N | -------------- 


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
                let result = await filmeDAO.insertFilme(await tratarDados(objectFilme))
                
                if(result){ // 201 (item inserido com sucesso)
                    
                    // Cria o Id no JSON do objetic Filme e adiciona o ID gerado no DAO
                    objectFilme.id = result 


                    // Manipulação dos dados da tbl 'filme_genero' | Código base para ser aplicado em relacionamento de 1:N | Inserir os gêneros relacionados com o Filme 

                    // Percorre o ARRAY de generos | dados vão chegar na requisição pelo objeto filme | dentro do objeto filme vai haver um atributo 'genero' 
                    for(itemGenero of objectFilme.genero){

                        let objectFilmeGenero = 
                        {
                            'id_filme' : objectFilme.id, 
                            'id_genero': itemGenero.id
                        }

                        let resultFilmeGenero = await controllerFilmeGenero.inserirNovoFilmeGenero(objectFilmeGenero)
                        
                        // Validação para verificar se todos os itens de relacionamentos foram inseridos
                        if(!resultFilmeGenero.status){
                            return customMessage.SUCESS_201_CREAT_ITEM_WARNING // 201 com alerta de cadastro
                            
                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status      = customMessage.SUCESS_201_CREAT_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_201_CREAT_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message     = customMessage.SUCESS_201_CREAT_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response    = objectFilme
        
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
const atualizarFilme = async function(objectFilme, id, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        // Validação para verificar se o conteúdo fo Body é um JSON
        if(String(contentType).trim().toLocaleLowerCase() == 'application/json'){

            // Chama a função para buscar o filme e validar se o ID está correto | Se o ID existe no DB | Se o filme existe 
            let resultBuscarFilme = await buscarFilme(id)

            if(resultBuscarFilme.status){
                
                // Chama a função para validar os dados do body (JSON) da requisição para alteração do filme
                let validar = await validarDados(objectFilme)

                if(!validar){

                    // Adiciona um atributo ID no JSON de filme, para enviar ao DAO um único objeto
                    objectFilme.id = Number(id)

                    // Chama a função para atualizar o filme no DB
                    let result = filmeDAO.updateFilme(await tratarDados(objectFilme))
                    
                    // Se o DAO me retornou um true, eu conseguir atualizar no DB e fazemos um 200 dentro de if(result) | Se o DAO me retornou um false, entra no else (com erro 500 na model - DAO) 
                    if(result){ 

                        // Excluir as relações entre o filme e os gêneros (tabela de relação)
                        let resultDeleteGeneros = await controllerFilmeGenero.excluirGenerosIdFilme(objectFilme.id)

                        if(resultDeleteGeneros.status){

                            for(itemGenero of objectFilme.genero){

                                let objectFilmeGenero = 
                                {
                                    "id_filme" : objectFilme.id, 
                                    "id_genero": itemGenero.id
                                }
        
                                let resultFilmeGenero = await controllerFilmeGenero.inserirNovoFilmeGenero(objectFilmeGenero)
                                
                                // Validação para verificar se todos os itens de relacionamentos foram inseridos
                                if(!resultFilmeGenero.status){
                                    return customMessage.SUCESS_201_CREAT_ITEM_WARNING // 201 com alerta de cadastro
                                }
                            }
                        }
                        
                        customMessage.DEFAULT_MESSAGE.status      = customMessage.SUCESS_200_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_200_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message     = customMessage.SUCESS_200_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response    = objectFilme // adiciona dentro do response o object filme (dados + ID)

                        return customMessage.DEFAULT_MESSAGE // 200 (item atualizado com sucesso)

                    }else{
                        return customMessage.ERROR_500_INTERNAL_SERVER_MODEL // 500 (model - DAO)
                    }

                }else{
                    return validar // 400 de validação dos campos do DB
                }

            }else{
                return resultBuscarFilme // 400 (ID inválido), 404 (Não encontrado) ou 500 (Controller ou Model - DAO)
            }
        
        }else{
            return configMessages.ERROR_415_CONTENT_TYPE // 415 (tipo de dados inválido)
        }

    } catch (error) {
        return configMessages.ERROR_500_INTERNAL_SERVER_CONTROLLER // 500 (controller) - Erro de Sintaxe
    }
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

                /*
                    Manipulação dos dados da tbl 'Classificação' | Código base para ser aplicado em relacionamneto de 1:N
                
                    Para cada repetição percorrida no 'result' vai ser atribuido na variável filme
                    Percorre o ARRAY de Filmes
                */
                    
                    for(filme of result){

                    /*
                        Chama a função dentro da controller de classificacao
                        Passa o id_classificacao ID referente a FK de classificacao
                        A function 'buscarClassificacao' vai retornar um JSON referente aquele ID (FK) de classificacao
                    
                    */
                    let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)

                    // Se o status_code for true do retorno da function 'buscarClassificacao' | Se encontrar o ID
                    if(resultClassificacao.status){ 

                        // Adiciona um atributo de classificação no JSON de filme e colocar o resuktado com os dados da classificação
                        filme.classificacao = resultClassificacao.response.classificacao
                        
                        // Remove o atributo de 'id_classificacao' do JSON de filme
                        delete filme.id_classificacao 

                         // Manipulação de daods para retornar os Gêneros relacionados ao filme (Relacionamento filme x genero)

                        let resultGeneros = await controllerFilmeGenero.buscarGenerosIdFilme(filme.id)
                        
                        // Adciona dentro do atributo 'result.respose.filme_genero ' o resultado do filme.genero
                        if(resultGeneros.status){
                            filme.genero = result.respose.filme_genero 
                        }
                    }
                }

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
        if(id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0){
            customMessage.ERROR_400_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_400_BAD_REQUEST

            }else{

                // Chama a função do DAO para buscar o filme pelo ID
                let result = await filmeDAO.selectByIdfilme(id)

                // Validação para verificar se o DAO retornou dados | false -> erro 500 (model)
                if(result){

                    // Validação para veficiar se o DAO possui algum dado dentro do ARRAY | false -> erro 404 (dado não encontrado)
                    if(result.length > 0){

                        /*
                            Manipulação dos dados da tbl 'Classificação' | Código base para ser aplicado em relacionamneto de 1:N
                        
                            Para cada repetição percorrida no 'result' vai ser atribuido na variável filme
                            Percorre o ARRAY de Filmes
                        */
                        for(filme of result){

                            /*
                                Chama a função dentro da controller de classificacao
                                Passa o id_classificacao ID referente a FK de classificacao
                                A function 'buscarClassificacao' vai retornar um JSON referente aquele ID (FK) de classificacao
                            
                            */
                            let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)

                            // Se o status_code for true do retorno da function 'buscarClassificacao' | Se encontrar o ID
                            if(resultClassificacao.status){ 

                                // Adiciona um atributo de classificação no JSON de filme e colocar o resuktado com os dados da classificação
                                filme.classificacao = resultClassificacao.response.classificacao
                                
                                // Remove o atributo de 'id_classificacao' do JSON de filme
                                delete filme.id_classificacao 
                            }


                            // Manipulação de daods para retornar os Gêneros relacionados ao filme (Relacionamento N:N)

                            let resultGeneros = await controllerFilmeGenero.buscarGenerosIdFilme(filme.id)
                            
                            if(resultGeneros.status){
                                filme.genero = result.respose.filme_genero 
                            }
                        }

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
const excluirFilme = async function(id){

    let customMessage = JSON.parse(JSON.stringify(configMessages))   

    try {
        
        // Chama a função de buscar filme para validar se o id é válido ou se não foi encontrado
        let resultBuscarFilme = await buscarFilme(id)

        // Validação 
        if(resultBuscarFilme.status){

            // Chama a função do DAO do delete e passa o id
            let result = filmeDAO.deleteFilme(id)

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


// -------------- | DATA VALIDATIONS | -------------- 
 

// Função responsável por válidar os dados de cadastro do Filme
const validarDados = async function(objectFilme){

    /*  JSON.stringify(configMessages) => Cria uma cópia dos JSON do arquivo de configuração de mensagem
    
        stringify => Converte o objeto JSON  para String '(clonou)'
        parse     => Converte a String em objeto JSON, sendo aclopada na varável
    
    */
    let customMessage = JSON.parse(JSON.stringify(configMessages))    

    if(objectFilme.nome == undefined || objectFilme.nome == '' || objectFilme.nome == null || objectFilme.nome.length > 80){
        customMessage.ERROR_400_BAD_REQUEST.field = '[NOME] INVÁLIDO' // field (campo)
        return customMessage.ERROR_400_BAD_REQUEST

    }else if(objectFilme.sinopse == undefined || objectFilme.sinopse == '' || objectFilme.sinopse == null){
        customMessage.ERROR_400_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST

    }else if(objectFilme.capa == undefined || objectFilme.capa == '' || objectFilme.capa == null || objectFilme.capa.length > 255){
        customMessage.ERROR_400_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else if(objectFilme.data_lancamento == undefined || objectFilme.data_lancamento == '' || objectFilme.data_lancamento == null || objectFilme.data_lancamento.length != 10){
        customMessage.ERROR_400_BAD_REQUEST.field = '[DATA LANÇAMENTO] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else if(objectFilme.duracao == undefined || objectFilme.duracao == '' || objectFilme.duracao == null || objectFilme.duracao.length < 5){
        customMessage.ERROR_400_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else if(objectFilme.valor == undefined || isNaN(objectFilme.valor) || objectFilme.valor.length > 5){
        customMessage.ERROR_400_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST
    
    }else if(objectFilme.avaliacao == undefined || isNaN(objectFilme.avaliacao) || objectFilme.avaliacao.length > 3){
        customMessage.ERROR_400_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_400_BAD_REQUEST

    /*
        Integração de um relacionamento 1:N (TABELA DE FILME X CLASSIFICAÇÃO)
        Validação para a FK de classificação
    */
    // }else if(objectFilme.id_classificacao == undefined || objectFilme.id_classificacao == null || objectFilme.id_classificacao == '' || isNaN(objectFilme.id_classificacao) || objectFilme.id_classificacao <= 0){
    //     customMessage.ERROR_400_BAD_REQUEST.field = '[ID_CLASSIFICAÇÃO] INVÁLIDO'
    //     return customMessage.ERROR_400_BAD_REQUEST
    }else{
        return false
    }
}


// Função para tratar os dados a serem inseridos
const tratarDados = async function(objectFilme){

    // Tratamento para eliminar a chegada das (') como caracter inválido
     objectFilme.nome            = objectFilme.nome.replaceAll("'","")
     objectFilme.sinopse         = objectFilme.sinopse.replaceAll("'","")
     objectFilme.capa            = objectFilme.capa.replaceAll("'","")
     objectFilme.data_lancamento = objectFilme.data_lancamento.replaceAll("'","")
     objectFilme.duracao         = objectFilme.duracao.replaceAll("'","")
     objectFilme.valor           = objectFilme.valor.replaceAll("'","")
     objectFilme.avaliacao       = objectFilme.avaliacao.replaceAll("'","")

    return objectFilme
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}