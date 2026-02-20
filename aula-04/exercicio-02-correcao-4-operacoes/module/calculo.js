/*

* Objetivo: Arquivo responsável pelo processamento de calculos matematicos: somar, subtrair, dividir e multiplicar
* Dev: Lucas Alexandre da Silva
* Data: 20/01/26
* Versão: 1.0.1.26

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
            resultado = valor1 + valor2
            break;
            
        case 'SUBTRAIR':
            resultado = valor1 - valor2
            break;
        
        case 'DIVIDIR':
            resultado = valor1 / valor2
            break;

        
        case 'MULTIPLICAR':
            resultado = valor1 * valor2
            break;
    }
}

// chamando a funçao calcular afim de teste
let teste = calcular(20,10, 'divisao')
console.log(teste)

