/* *********************************************************************
* Objective    : Arquivo responsável pelo CRUD de dados em relação da tablea de film e genero MySQL
* Date         : 2026-05-26  
* Development  : Lucas Alexandre Da Silva
* Version      : 1.0
* **********************************************************************/

// Import da biblioteca 'knex' para manipular dados no DB MySQL
const knex = require('knex')

// Import do arquivo 'knexConfig.js' de configuração para acesso ao DB
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Cria uma conecção com o Banco de Dados MySLQ, conforme o arquivo de configuração 'knexDatabaseConfig'
const kenexConection     = knex(knexDatabaseConfig.development)

// Função responsável por Inserir um novo Filme Gênero no Banco de Dados
const insertFilmeGenero = async function(objectFilmeGenero){

    try {

        let sql = ` insert into tbl_filme_genero (
            id_filme
            id_genero
        )values(
            ${objectFilmeGenero.id_filme},
            ${objectFilmeGenero.id_genero}
        ); `
    
         /* 
            kenexConection.raw(sql) => Encaminha para o DB o ScriptSQL
    
            await   => Serve para fazer com que o sistema 'pare' e aguarde o retorno dos dados do DB
            async   => Serve para declarar uma função assíncrona que retorna uma promessa (Promise)
            Promise => Serve para representar um valor futuro
        */
        let result = await kenexConection.raw(sql) 
        
        if(result){
            return result[0].insertId // Retorna o ID gerado pelo Insert
        
        }else{
            return false
        }

    } catch (error) {
        return false
    } 
}


// Função responsável para Atualizar um Filme Gênero existente no Banco de Dados
const updateFilmeGenero = async function(objectFilmeGenero){

    try {
        
        let slq = `
            update tbl_filme_genero set
                id_filme   = ${objectFilmeGenero.id_filme},
                id_genero  = ${objectFilmeGenero.id_genero},
            where id       = ${objectFilmeGenero.id}`

        let result = await kenexConection.raw(slq)

        if(result){
            return true
        
        }else{
            return false
        }
    
    } catch (error) {
        return false
    }
}


// Função responsável por Retornar todos os dados de Filme Gênero do Banco de Dados
const selectAllFilmeGenero = async function(){

    try {
        
        // Script SQL para listar todos os filmes
        let sql    = 'select * from tbl_filme_genero order by id desc'
        
        /* 
            Execulta no DB o scrpit e guarda o retorno do DB
            Pode ser um ERRO (false) ou um ARRAY com os dados
        */
        let result = await kenexConection.raw(sql)

        // Array.isArray -> Validação para verificar se o retorno do DB é um ARRAY ou Boolean (false)
        if(Array.isArray(result)){
            return result[0] // Retornar somente o índice com a lista de filmes

        }else{
            return false
        }

    } catch (error) {
        return false
    }
}


// Função responsável por Retornar um Filme Gênero | filtro = ID
const selectByIdfilmeGenero = async function(id){

    try {
        
        let sql    = `select * from tbl_filme_genero where id=${id}`

        let result = await kenexConection.raw(sql)
        
        if(Array.isArray(result)){
            return result[0]
        
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

// -------------- | Funções adicionais para o relacionamento N:N | -------------- 


// Função para retornar os dados do gênero | filtro = ID Filme
const selectGenerosByIdFilme = async function (idFilme) {
    
    try {
                    /* 
                        vamos no select pesquisar o que queremos retornar
                        (.*) vai retornar todos os dados dentro da tbl_genero (ID + atributos)
                        Usamos o inner join para fazer a relação de N:N 
                        Os nomes da tabela não pode se repetir no from  
                    */

        let sql    = `select tbl_genero.*
                      from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                      where tbl_filme.id= ${idFilme};` // Pode ser usado a PK da tbl_filme ou a FK de tbl_filme_genero | Para performece melhor usar a PK

        let result = await kenexConection.raw(sql)
        
        if(Array.isArray(result)){
            return result[0]
        
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}


// Função para retornar os dados do filme | filtro = ID Gênero
const selectFilmesByIdGenero = async function (idGenero) {
    
    try {
                    /* 
                        vamos no select pesquisar o que queremos retornar
                        (.*) vai retornar todos os dados dentro da tbl_filme (ID + atributos)
                        Usamos o inner join para fazer a relação de N:N 
                        Os nomes da tabela não pode se repetir no from  
                    */

        let sql    = `select tbl_filme.*
                      from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                      where tbl_genero.id= ${idGenero};` // Pode ser usado a PK da tbl_filme ou a FK de tbl_filme_genero | Para performece melhor usar a PK

        let result = await kenexConection.raw(sql)
        
        if(Array.isArray(result)){
            return result[0]
        
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}


// Função responsável por Excluir um Filme Gênero | filtro = ID
const deleteFilmeGenero = async function(id){

    try {
        
        let slq = `delete from tbl_filme_genero where id = ${id};`

        let result = await kenexConection.raw(slq)

        if(result){
            return true
        
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

// Função responsável por Excluir os Gêneros relacionados com um Filme | filtro = ID Filme
// Essa função será utilizada no PUT do filme 
const deleteGenerosByIdFilme = async function(idFilme){

    try {
        
        let slq = `delete from tbl_filme_genero where id_filme = ${idFilme};`

        let result = await kenexConection.raw(slq)

        if(result){
            return true
        
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdfilmeGenero,
    selectGenerosByIdFilme,
    selectFilmesByIdGenero,
    deleteFilmeGenero,
    deleteGenerosByIdFilme
}