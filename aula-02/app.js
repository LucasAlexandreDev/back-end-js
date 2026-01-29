/*************************************************************************** 

* Objetivo: Projeto para realizar o calculo de média de escola
* Dev: Lucas Alexandre da Silva
* Data: 29/01/26
* Versão: 1.0.1.26

****************************************************************************/

/* 

Tipo de Criação Variáveis:

var -> Permite criar um espaço em memória do tipo variável.
       Essa forma de criação hoje é considerada antiga, é provavel que seja encontrada apenas em proejtos mais antigos
       
       Dica: Caso eu precise utilizar o var. é recomendado que seja utilizado apenas em espoco global 


let -> Permite criar um espaço em memória do tipo variável.
       Essa forma de criação é realizada somente no escopo local, ou seja, dentro de bloco de programação { }
       Essa vaiável deixa de existe ao término do bloco


const -> Permite criar um espaço em memória do tipo constante.
         ou seja, esse conteúdo não poderá sofrer mudanças durante o projeto  

         Dica: Se possível, eu posso criar essa const escrita em MAIUSCULO para facilitar lembrar que é uma const
               Pode ser usada de forma local ou global 


Operadores de Comparação:

==   -> Permite a comparação de dois conteúdos
!=   -> Permite comparar a diferença de dois conteúdos
<    -> Permite validar o valor menor
>    -> Permite validar o valor maior
<=   -> Permite validar se o valor é menor ou igual
>=   -> Permite validar se o valor é maior ou igual
===  -> Permite comparar a igualdade dos conteúdos e a igualdade da tipagem de dados
!==  -> Permite comparar a diferneça de conteúdos e a igualdade da tipagem de dados
==!  -> Permite comparar a igualdade de conteúdos e a diferença de tipagem de dados 


Tipos de operadores Lógicos:

E -> AND -> &&
OU -> OR -> ||
NAO -> NOT -> !

*/


// Importe da biblioteca de entrada de dados
const { ifError } = require('assert')
const readline = require('readline')

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout

})

// Entrada de dados do nome do Aluno(a) 
entradaDeDados.question('Digite o nome do aluno: ', function (nome) {

    let nomeAluno = nome

    // Entrada de dados da nota1
    entradaDeDados.question('Digite a nota1: ', function (valor1) {

        let nota1 = valor1

        // Entrada de dados da nota2
        entradaDeDados.question('Digite a nota2: ', function (valor2) {

            let nota2 = valor2

            // Entrada de dados da nota3
            entradaDeDados.question('digite a nota3: ', function (valor3) {

                let nota3 = valor3

                // Entrada de dados da nota4
                entradaDeDados.question('Digite a nota4: ', function (valor4) {

                    let nota4 = valor4

                    // validação de entradas vazias
                    if(nomeAluno == '' || nota1 == ('') || nota2 == ('') || nota3 == ('') || nota4 == ('')){

                        console.log('ERRO: Existem campos obrigatórios que não foram preenchidos !!!')

                    // validação de entradas de números apenas entre 0 até 100
                    }else if(nota1 < 0 || nota1 > 100 || nota2 <0 || nota2 > 100 || nota3 < 0 || nota3 > 100 || nota4 < 0 || nota4 > 100 ){
                        
                        console.log('ERRO: Somente são possiveis valores entre 0 até 100')

                        /* Validação de entradas somente de números
                           isNaN - Permite a validação de números ou letras - Não é um número? true || false
                        */ 
                    }else if(isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)){

                        console.log('ERRO: Somente números são permitidos na entada das notas')
                    }

                })
            })
        })
    })
})