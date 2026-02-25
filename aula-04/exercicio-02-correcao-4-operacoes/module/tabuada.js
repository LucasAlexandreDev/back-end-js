/*

* Objetivo: Arquivo responsável por gerar uma tabuada utilizando WHILE e FOR
* Dev: Lucas Alexandre da Silva
* Data: 25/02/26
* Versão: 1.0

*/

// import da biblioteca de calculos matematicos
const calculoMatematico = require('./calculo.js')


// Função para imprimir a tabuada
// gera a tabuada no fromato de repetição While
const gerarTabuadaWhile = function(tabuada){
    let tab = Number(tabuada)
    let contador = 0
    let resultado


    while(contador <= 10){

        // processamento
        resultado = calculoMatematico.operacaoMultiplicacao(tab, contador)
        console.log(`${tab} x ${contador} = ${resultado}`)

        //contador = contador + 1 contador ++
        // contador +=1
        contador ++
    }   
}

// chamando a função e passando o argumento como teste
//gerarTabuadaWhile(9)


// Função para imprimir a tabuada
// gera a tabuada no fromato de repetição for
const gerarTabuadaFor = function(tabuada){
    let tab = Number(tabuada)
    let resultado

    for(let contador = 0; contador <= 10; contador++){

        // processamento
        resultado = calculoMatematico.operacaoMultiplicacao(tab, contador)
        console.log(`${tab} x ${contador} = ${resultado}`)
    }   
}

gerarTabuadaFor(5)
