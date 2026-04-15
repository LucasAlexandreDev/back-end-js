/* *********************************************************************
* Objective    : Arquivo responsável pelo CRUD de  dados do Filme no banco de dados MySQL
* Date         : 2026-04-15  
* Development  : Lucas Alexandre Da Silva
* Version      : 1.0
* **********************************************************************/

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