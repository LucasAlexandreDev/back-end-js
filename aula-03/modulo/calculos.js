/*************************************************************************** 

* Objetivo: Arquivo responsável pelas funções de calculos financeiros
* Dev: Lucas Alexandre da Silva
* Data: 11/02/26
* Versão: 1.0

****************************************************************************/

// função para retornar o percentual de um número 
function calcularPercentual (numero){

    // recebe o número encaminhado
    let numeroPercentual = Number(numero)

    // validação de entradas: vazia, menor ou igual a 0 e de carcter
    if(numero == '' || numero <= 0 || isNaN(numero)){
        return false

    }else{
        // calcula o percentual do número
        let percentual = numeroPercentual / 100

        return Number(percentual.toFixed(2))
    }
}


// função para retornar o montante referente a juros compostos 
function calcularJuroscompostos(valor, taxa, parcelas){
    
    // recebe os valores dos argumentos e converte em número
    let valorPrincipal  = Number(valor)
    let taxaJuros       = Number(taxa)
    let qtdeParcelas    = Number(parcelas)

    // validação de entrada: vazia, menor ou igual a 0 e de carcter
    if (valor == '' || isNaN(valor) || valor <= 0 || parcelas <= 0 || parcelas == '' || isNaN(parcelas)){
        return false

    }else{
        // chama a função para retornar o percentual da taxa
        let percentual = calcularPercentual(taxaJuros)

        if (percentual){
        //calculo   
        let montante = valorPrincipal * ((1 + percentual) ** qtdeParcelas)
        
        return Number(montante.toFixed(2))

        }else{
            return false
        }
    }
}

// tornando as funções públicas, para que outros arquivos possam utilizar
module.exports = {
    calcularPercentual, 
    calcularJuroscompostos
}