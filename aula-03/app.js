/*************************************************************************** 

* Objetivo: Criar uma aplicação que realiza calculos de Juros utilizando funções para modularizar o código
* Dev: Lucas Alexandre da Silva
* Data: 11/02/26
* Versão: 1.0

****************************************************************************/

// import da biblioteca readline
const readline = require('readline')

// import da biblioteca de calculos financeiros
const calculos = require('./modulo/calculos')

// criando objeto de entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// entrada do nome cliente
entradaDeDados.question('Digite o nome do cliente:', function (nome){
    let nomeCliente = nome

    // entrada do nome do produto
    entradaDeDados.question('Digite o nome do produto:', function(produto){
        let nomeProduto = produto
        
        // entrada do valor da compra
        entradaDeDados.question('Digite o valor da compra:', function (valor){
            let valorCompra = valor
            
            // entrada da taxa de juros
            entradaDeDados.question('Digite o valor da taxa de juros:', function(taxa){
                let taxaJuros = taxa
                
                // entrada da qtde de parcelas
                entradaDeDados.question('Digite a quantidade de parcelas:', function(parcelas){
                    let qtdeParcelas = parcelas
                    
                    // chamo a função calcularJuroscompostos e passo os argumentos para ela
                    let montante = calculos.calcularJuroscompostos(valorCompra, taxaJuros, qtdeParcelas)

                    // validação para verificar se o calculo foi realizado
                    if(montante){
                        console.log(`O valor final é: ${montante}`)

                    }else{
                        console.log('ERRO: Não foi possivel processar o calculo.')
                        entradaDeDados.close()
                    }
                })
            })
        })
    })
})