/*

* Objetivo: Arquivo responsável pelo processamento de calculos matematicos: somar, subtrair, dividir e multiplicar
* Dev: Lucas Alexandre da Silva
* Data: 20/02/26
* Versão: 1.0

*/ 

// toLowerCase() -> retorna uma String em minusculo
// toUpperCase() -> retorna uma String em MAISCULO

// exemplo de função anonima
// função para calcular as 4 operações matematicas
const calcular = function(numero1, numero2, operador){
    // entrada
    let valor1              = Number(numero1)
    let valor2              = Number(numero2)
    let operadorMatematico  = String(operador).toUpperCase()

    let resultado = false

    /*
    processamento - 1 forma 
    
    if(operadorMatematico == 'SOMAR')
        resultado = valor1 + valor2

    else if(operadorMatematico == 'SUBTRAIR')
        resultado = valor1 - valor2

    else if (operadorMatematico == 'DIVIDIR')
        resultado = valor1 / valor2

    else if(operadorMatematico == 'MULTIPLICAR')
        resultado = valor1 * valor2
    */

    /*
    saida - 1 forma
        return resultado
    */ 

    /*
    saida - 2 forma

    if(resultado != undefined){
        return resultado
    }else{
        return false
    }
    */

// processamento - 2 forma
    switch (operadorMatematico) {
        case 'SOMAR':
            resultado = operacaoSoma(valor1,valor2)
            break;
            
        case 'SUBTRAIR':
            resultado = operacaoSubtracao(valor1,valor2)
            break;
        
        case 'DIVIDIR':
            resultado = operacaoDivisao(valor1,valor2)
            break;

        
        case 'MULTIPLICAR':
            resultado = operacaoMultiplicacao(valor1,valor2)
            break;

        default:
            return false
            break;
    }

    return resultado
}

// exemplo de função baseada em formato de seta (arrow function)
const operacaoSoma          =   (numero1, numero2)  => Number(numero1) + Number(numero2)
const operacaoSubtracao     =   (numero1, numero2)  => Number(numero1) - Number(numero2)
const operacaoDivisao       =   (numero1, numero2)  => Number(numero1) / Number(numero2)
const operacaoMultiplicacao =   (numero1, numero2)  => Number(numero1) * Number(numero2)

// // chamando a funçao calcular afim de teste
// let teste = calcular(40,50, 'subtrair')
// console.log(teste)


const validarDados = (numero1, numero2, operacao) =>{    
    if(operacao == '' || numero1 == '' || numero2 == '' || isNaN(numero1) || isNaN(numero2)){
        return false
    }else{
        return true
    }
}

module.exports = {
    calcular,
    operacaoDivisao,
    validarDados,
    operacaoSoma,
    operacaoMultiplicacao,
    operacaoSubtracao
}
