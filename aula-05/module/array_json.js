/*************************************************************************** 
 * 
* Objetivo: Manipular dados em ARRAY e JSON 
* Dev: Lucas Alexandre da Silva
* Data: 05/03/26
* Versão: 1.0

****************************************************************************/

/*

    [] -> representa um objeto do tipo ARRAY 
    {} -> representa um objeto do tipo JSON

    ARRAY -> É um espaço na memória para armazenar dados sem a necessidade de criar outros objetos 
        Ex: lista de nomes

            let nome  = 'Lucas'
            let nome2 = 'Eduarda'
            let nome3 = 'João' 

                indices     0         1        2                             
            let nomes = ['Lucas', 'Eduarda', 'João']

    JSON -> É um espaço para armazenar dados com CHAVE e VALOR
        Ex: armazamento de dados de cadastro   

            let nome     = 'Lucas'
            let telefone = '123456789'
            let email    = 'jose@gmail.com'

                           chave      valor     chave        valor      chave         valor
            let cliente = {"nome" : "Lucas", "telefone" : "123456789", "email" : "jose@gmail.com"}

            chave pode ser chamada de atributo

    ARRAY - linha -> lucas
                     Eduarda
                     José

    -> Trabalha na vertical

    JSON  - clouna -> Lucas, Eduarda, José 

    -> Trabalha na horizontal
*/

// criandos objetos do tipo ARRAY
const listaDeAlunos = ['Lucas', 'Marcel', 'Yuri', 'Leonid', 'Celso', 'Luiz', 'Wendel']
const listaDeClientes = []
const listaDeFornecedores = []

const exibirDados = function(){
    // exibi o objeto ARRAY com um todo - [conteúdo]
    console.log(listaDeAlunos) 

    // exibi o objeto ARRAY em formato de uma tabela, mostrando o índice e coteúdo 
    console.table(listaDeAlunos)
    
    // exibi um tipo de dados de um índice
    console.log(typeof(listaDeAlunos[2]))

    // usamos o [] para chamar o índice
    console.log(listaDeAlunos[3])
    console.log(listaDeAlunos[0])

    // // adicionando elementos de forma manual pelo índice
    console.log(`O nome do aluno(a) é: ${listaDeAlunos[0]}`)
    console.log(`O nome do aluno(a) é: ${listaDeAlunos[1]}`)
    console.log(`O nome do aluno(a) é: ${listaDeAlunos[2]}`)
    console.log(`O nome do aluno(a) é: ${listaDeAlunos[3]}`)
    console.log(`O nome do aluno(a) é: ${listaDeAlunos[4]}`)
    console.log(`O nome do aluno(a) é: ${listaDeAlunos[5]}`)
    console.log(`O nome do aluno(a) é: ${listaDeAlunos[6]}`)

    // estrutura de repetição usando o WHILE
    console.log()
    console.log('--> Exemplo com While <--')

    let contadorWhile = 0

    while(contadorWhile < listaDeAlunos.length){
        console.log(`O nome do aluno(a) é: ${listaDeAlunos[contadorWhile]}`)
        contadorWhile ++
    }

    // estrutura de repetição usando o FOR
    console.log()
    console.log('--> Exemplo com o For <--')
    
    for(let contadorFor = 0; contadorFor < listaDeAlunos.length; contadorFor++){
        console.log(`O nome do aluno(a) é: ${listaDeAlunos[contadorFor]}`)
    }

    // estrutura de repetição usando FOR EACH 
    console.log()
    console.log('--> Exemplo com o FOR EACH <--')
    
    // para cada item do objeto ele pega e entrega o conteúdo através do argumento de callback 
    listaDeAlunos.forEach(function(aluno){
        console.log(`O nome do aluno(a) é: ${aluno}`)
    })
   
    // estrutura de repetição usando FOR OF 
    console.log()
    console.log('--> Exemplo com o FOR OF <--')

    // pega o objeto principal e de cada item que tiver, ele adiciona um item na variável
    for(aluno of listaDeAlunos){
        console.log(`O nome do aluno(a) é: ${aluno}`)    
    }

    // estrutura de repetição usando FOR IN 
    console.log()
    console.log('--> Exemplo com o FOR IN <--')
    
    // pega o objeto principal e de cada item que tiver, ele retorna o número do índice do item na variável
    for(aluno in listaDeAlunos){
        console.log(`O nome do aluno(a) é: ${aluno}`)    
    }

    // retorna a quantidade de itens dentro do ARRAY
    console.log(listaDeAlunos.length)
}

const manipularDados = function(){
    
    // adicionando elementos de forma manual pelo índice
    listaDeClientes[0] = 'Lucas Alexandre'
    listaDeClientes[1] = 'Marcel Teixeira'
    listaDeClientes[2] = 'Yuri Komuta'
    listaDeClientes[5] = 'Celso Furtado'

    console.log(listaDeClientes)
    console.table(listaDeClientes)

    // para adicionar no final novos itens dentro do objeto ARRAY, usamos  o 'push' 
    listaDeFornecedores.push('Wendel', 'Luiz', 'Leonid')
    listaDeFornecedores.push('Antônio')
    listaDeFornecedores.push('Maria')
    listaDeFornecedores.push('Caio')

    console.log(listaDeFornecedores)


}


//exibirDados()
manipularDados()