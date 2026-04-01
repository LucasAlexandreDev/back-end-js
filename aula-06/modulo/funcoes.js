/* *********************************************************************
* Objetivo: Gerar novos retornos de dados, com base na manipulação dos dados do 'banco de dados' estado_cidades.js
* Data: 18/03/2026  
* Autor: Lucas Alexandre Da Silva
* **********************************************************************/

// Import do arquivo com os dados de estados e cidades
const dadosEstadoCidade = require('./estados_cidades')

// Crio uma variável para acessar os dados de todos os estados
const listaBrasil = dadosEstadoCidade.listaDeEstados.estados


// -------------- | FUNÇÕES AUXILIARES | -------------- 

// Retorna true se dois valores forem iguais, ignorando espaços e maiúsculas/minúsculas
const compararValoresIguais = function(item1, item2){

    let resultado = String(item1).trim().toLowerCase() === String(item2).trim().toLowerCase()
    
    if(resultado){
        return resultado
    }

    return false
}


// Função que retorna todas as informações do atributo estado, através da sigla (UF)
const buscarEstadoPorSigla = function(siglaEstado){

    let listaRespostaEstado = null

    listaBrasil.forEach(function(itemEstado){

        if(compararValoresIguais(itemEstado.sigla, siglaEstado)){     
            listaRespostaEstado = itemEstado
        }   
    })

    if(listaRespostaEstado == null){
        return false
    }

    return listaRespostaEstado
}


// -------------- | FUNÇÕES DO PROJETO | -------------- 

// Função que retorna todas as siglas dos estados (UF)
const getListaDeEstados = function () {
    
    let listaResposta = null
    let listaUfArray  = []     

    listaBrasil.forEach(function(itemEstado){
        listaUfArray.push(itemEstado.sigla)
    })

    if(listaUfArray.length == 0) {
        return false
    }
    
    listaResposta = {
        uf        : listaUfArray, 
        quantidade: listaUfArray.length
    }
    
    return listaResposta
}


// Função que retorna os dados de um estado
const getDadosEstado = function (siglaEstado) {

    let listaResposta = null
    let listaEstado   = buscarEstadoPorSigla(siglaEstado)

    if(!listaEstado){
        return false
    }

    listaResposta = {
        uf        : listaEstado.sigla,
        descricao : listaEstado.nome,
        capital   : listaEstado.capital,
        regiao    : listaEstado.regiao
    }    
    
    return listaResposta
}


// Função que retorna apenas a capital e descrição de um estado
const getCapitalEstado = function(siglaEstado){

    let listaResposta = null
    let listaEstado   = buscarEstadoPorSigla(siglaEstado)

    if(!listaEstado){
        return false
    }

    listaResposta = {
        uf        : listaEstado.sigla,
        descricao : listaEstado.nome,
        capital   : listaEstado.capital
    }
    
    return listaResposta
}


// Função que retorna todos os estados de uma região
const getEstadosRegiao = function(regiao){

    let listaResposta  = null
    let estadosArray   = []

    listaBrasil.forEach(function(itemEstado){
        
        if(compararValoresIguais(itemEstado.regiao, regiao)){
            
            estadosArray.push(
                {
                    uf       : itemEstado.sigla,
                    descricao: itemEstado.nome 
                }
            )

            listaResposta = {
                regiao: itemEstado.regiao
            }
        }
    })

    if(listaResposta == null || estadosArray.length == 0){
        return false
    }

    listaResposta.estados = estadosArray

    return listaResposta
}


// Função que retorna as cidades que já foram ou são capitais do Brasil
const getCapitalPais = function(){

    let listaResposta = null
    let capitaisArray = []

    listaBrasil.forEach(function(itemEstado){
        
        if(itemEstado.capital_pais){

            capitaisArray.push(
                {
                    capital_atual            : itemEstado.capital_pais.capital, 
                    uf                       : itemEstado.sigla,  
                    descricao                : itemEstado.nome, 
                    capital                  : itemEstado.capital,              
                    regiao                   : itemEstado.regiao, 
                    capital_pais_ano_inicio  : itemEstado.capital_pais.ano_inicio,
                    capital_pais_ano_terminio: itemEstado.capital_pais.ano_fim
                }
            )
        }
    })

    if(capitaisArray.length == 0){
        return false
    }

    listaResposta = {
        capitais : capitaisArray
    }

    return listaResposta
}


// Função que retorna todas as cidades de um estado
const getCidades = function(siglaEstado){

    let listaResposta = null
    let cidadesArray  = []
    let listaEstado   = buscarEstadoPorSigla(siglaEstado) 

    if(!listaEstado || listaEstado.cidades.length == 0){
        return false
    }    
    
    listaResposta = {
        uf                 : listaEstado.sigla,
        descricao          : listaEstado.nome,
        quantidade_cidades : listaEstado.cidades.length
    }

    listaEstado.cidades.forEach(function(itemCidade){
        cidadesArray.push(itemCidade.nome)
    })             

    listaResposta.cidades = cidadesArray

    return listaResposta    
}  

/*
  Na validação fazemos da seguinte forma:

  Objeto (JSON)  -> validar com null
  Array  (lista) -> validar com .length
*/

module.exports={
    getListaDeEstados,
    getDadosEstado,
    getCapitalEstado,
    getEstadosRegiao,
    getCapitalPais,
    getCidades
}