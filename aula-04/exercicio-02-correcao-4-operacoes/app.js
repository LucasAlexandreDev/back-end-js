/*

* Objetivo: Arquivo responsável somente da entrada e saida de dados
* Dev: Lucas Alexandre da Silva
* Data: 29/02/26
* Versão: 1.0

*/

// import da biblioteca de calculos
const calculoMatematico = require('./module/calculo.js')

// let teste1 = calculoMatematico.calcular(80,50, 'somar')
// let teste2 = calculoMatematico.operacaoDivisao(80,50, 'dividir')

let operador = 'somar'
let n1 = 10
let n2 = 10

let validar = calculoMatematico.validarDados(n1, n2, operador)

if(validar){

    let result = calculoMatematico.calcular(n1, n2, operador)
    
    if(result)
        console.log(result)
    else
        console.log('ERRO: Operação Inválida')
}else{
    console.log('ERRO: Validação de dados errada')
}   