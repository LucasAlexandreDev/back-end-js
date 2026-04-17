/* *********************************************************************
* Objective    : Arquivo responsável pelo CRUD de  dados do Filme no banco de dados MySQL
* Date         : 2026-04-15  
* Development  : Lucas Alexandre Da Silva
* Version      : 1.0
* **********************************************************************/

// Import da biblioteca 'knex' para manipular dados no DB MySQL
const knex = require('knex')

// Import do arquivo 'knexConfig.js' de configuração para acesso ao DB
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Cria uma conecção com o Banco de Dados MySLQ, conforme o arquivo de configuração 'knexDatabaseConfig'
const kenexConection = knex(knexDatabaseConfig.development)

// Função responsável por Inserir um novo Filme no Banco de Dados
const insertFilme = async function(objeticFilme){

    let sql = `
    insert into tbl_filme (
        nome, 			
        sinopse, 		
        capa,			
        data_lancamento, 
        duracao,
        valor,		
        avaliacao
    )values(
        '${objeticFilme.nome}',
        '${objeticFilme.sinopse}',
        '${objeticFilme.capa}',
        '${objeticFilme.data_lancamento}',
        '${objeticFilme.duracao}',
        '${objeticFilme.valor}',
        '${objeticFilme.avaliacao}',
    );`

     /* 
        kenexConection.raw(sql) => Encaminha para o DB o ScriptSQL

        await   => Serve para fazer com que o sistema 'pare' e aguarde o retorno dos dados do DB
        async   => Serve para declarar uma função assíncrona que retorna uma promessa (Promise)
        Promise => Serve para representar um valor futuro
    */

    let result = await kenexConection.raw(sql) 
    
    if(result){
        return true
    
    }else{
        return false
    }
}


// Função responsável para Atualizar um Filme existente no Banco de Dados
const updateFilme = async function(objeticFilme){

}


// Função responsável por Retornar todos os dados de Filme do Banco de Dados
const selectAllFilme = async function(){

}


// Função responsável por Retornar um Filme | filtro = ID
const selectByIdfilme = async function(id){

}


// Função responsável por Excluir um Filme | filtro = ID
const deleteFilme = async function(id){

}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdfilme,
    deleteFilme
}