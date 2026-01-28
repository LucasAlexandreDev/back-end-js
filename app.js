// comentário em linha

/* 
comentário em bloco
*/

// Mostra no terminal o desejado
console.log('imprime na tela')

// Cria uma variável//
var nome = 'lucas'
var idade = 17

//Concatenação de dados (texto e variável)
console.log('O nome do usuário é: ' + nome)

console.log(`O nome do usuário é: ${nome}`)


console.log(nome + ' possui ' + idade + ' anos')

const { endianness } = require('os')
/* Importe da biblioteca readline
   readline -> Serve para permitir a entrada de dados via terminal */

var readline = require('readline')

// Cria um objeto especialista em entrada de dados pelo terminal 
var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/* Permite a entrada de dados do nome usuário
   question -> Utiliza uma função de CALLBACK para devolver o valor digitado 
   CALLBACK -> O método chama a função e a váriavel que está dento da função retorna o conteúdo do método */

    
entradaDeDados.question('Digite o seu nome: ',function(nomeUsuario){

    if (nomeUsuario == 'lucas'){
        console.log('Parabéns, sou eu mesmo')
    }else{
        console.log('O seu nome é: ' + nomeUsuario)
    }

    entradaDeDados.question('Digite o seu e-mail: ', function(emailUsuario){
        console.log(`O email do usuário ${nomeUsuario} é:  ${emailUsuario}`)
    })

    entradaDeDados.question('digite o seu número de telefone: ', function(telUsuario){
        console.log(`O número de telefone do nome`)
    })

})

