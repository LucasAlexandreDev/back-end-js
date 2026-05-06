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
const kenexConection     = knex(knexDatabaseConfig.development)

// Função responsável por Inserir um novo Filme no Banco de Dados
const insertFilme = async function(objectFilme){

    try {

        let sql = ` insert into tbl_filme (
            nome, 			
            sinopse, 		
            capa,			
            data_lancamento, 
            duracao,
            valor,		
            avaliacao
        )values(
            '${objectFilme.nome}',
            '${objectFilme.sinopse}',
            '${objectFilme.capa}',
            '${objectFilme.data_lancamento}',
            '${objectFilme.duracao}',
            '${objectFilme.valor}',
            if('${objectFilme.avaliacao}' = '', null, '${objectFilme.avaliacao}')
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


// Função responsável para Atualizar um Filme existente no Banco de Dados
const updateFilme = async function(objeticFilme){

    try {
        
        let slq = `
            update tbl_filme set
                nome            = '${objeticFilme.nome}',
                sinopse         = '${objeticFilme.sinopse}',
                capa            = '${objeticFilme.capa}',
                data_lancamento = '${objeticFilme.data_lancamento}',
                duracao         = '${objeticFilme.duracao}',
                valor           = '${objeticFilme.valor}',
                avaliacao       = if('${objeticFilme.avaliacao}' = '', null, '${objeticFilme.avaliacao}')
	        where id            =  ${objeticFilme.id}`

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


// Função responsável por Retornar todos os dados de Filme do Banco de Dados
const selectAllFilme = async function(){

    try {
        
        // Script SQL para listar todos os filmes
        let sql    = 'select * from tbl_filme order by id desc'
        
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


// Função responsável por Retornar um Filme | filtro = ID
const selectByIdfilme = async function(id){

    try {
        
        let sql    = `select * from tbl_filme where id=${id}`

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


// Função responsável por Excluir um Filme | filtro = ID
const deleteFilme = async function(id){

    try {
        
        let slq = `delete from tbl_filme where id = ${id};`

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
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdfilme,
    deleteFilme
}