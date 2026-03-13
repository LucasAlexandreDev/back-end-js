/*************************************************************************** 
 * 
* Objetivo: Manipular dados em ARRAY e JSON 
* Dev: Lucas Alexandre da Silva
* Data: 05/03/26
* Versão: 1.0

****************************************************************************/

const { validarDados } = require("../../aula-04/exercicio-02-correcao-4-operacoes/module/calculo")

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

    // adicionando elementos de forma manual pelo índice
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

    // para adicionar no FINAL novos elementos dentro do objeto ARRAY, usamos  o 'push' 
    listaDeFornecedores.push('Wendel', 'Luiz', 'Leonid')
    listaDeFornecedores.push('Antônio')
    listaDeFornecedores.push('Maria')
    listaDeFornecedores.push('Caio')

    console.table(listaDeFornecedores)
    
    // para ADICIONAR no COMEÇO novos elementos dentro do objeto ARRAY, usamos  o 'unshift' 
    // após adicionar o elemento, ele reorganiza todos os outros itens
    listaDeFornecedores.unshift('Luciano')
    console.table(listaDeFornecedores)

    // para ADICIONAR em uma DETERMINADA POSIÇÃO do do objeto ARRAY, usamos  o 'splice' 
                    //splice(índice, qtde de elementos (sempre zero), 'Novo conteúdo') 
    listaDeFornecedores.splice(3,0,'Bernado')
    console.table(listaDeFornecedores)

    // para REMOVER um DETERMINADO CONTEÚDO com base no índice do do objeto ARRAY, usamos  o 'splice'
                       //splice(índice, qtde de elementos a ser removidos') 
    listaDeFornecedores.splice(6,1)
    console.table(listaDeFornecedores)

    // para REMOVER o ÚLTIMO conteúdo do objeto ARRAY, usamos  o 'pop'
    listaDeFornecedores.pop()
    console.table(listaDeFornecedores)

    // para REMOVER o PRIMEIRO conteúdo do objeto ARRAY, usamos  o 'shift'
    // após remover, ele reorganiza todos os outros itens
    listaDeFornecedores.shift()
    console.table(listaDeFornecedores)
}


//exibirDados()
//manipularDados()

// função utilizando FOR IN
const removerAlunoForIn = function(nomeAluno){

    for(indice in listaDeAlunos){
        
        if(listaDeAlunos[indice] == nomeAluno){
            listaDeAlunos.splice(indice, 1)
        }
    }
}

// função utilizando WHILE
const removerAlunoWhile = function(nomeAluno){

    let contadorInicial = 0
    let qntdIndice = listaDeAlunos.length

    while(contadorInicial < qntdIndice){

        if(nomeAluno == listaDeAlunos[contadorInicial]){
            listaDeAlunos.splice(contadorInicial, 1)
        }

        contadorInicial ++
    }
}

// função utilizando FOR
const removerAlunoFor = function(nomeAluno){

    for(let contadorInicial = 0; contadorInicial < listaDeAlunos.length; contadorInicial++){
        
        if(nomeAluno == listaDeAlunos[contadorInicial]){
            listaDeAlunos.splice(contadorInicial, 1)
        }
    }
}

// função utilizando INDEXOF
const removerAlunoIndexOf = function(nomeAluno){

    let indice = listaDeAlunos.indexOf(nomeAluno)
    listaDeAlunos.splice(indice, 1)

    // ou //

    //listaDeAlunos.splice(listaDeAlunos.indexOf(nomeAluno), 1) 
}

// função capaz de verificar se o item dentro do objeto existe ou não
const verificarItem = function(nomeAluno){

    // includes -> verifica e devolve um boleano
    console.log(listaDeAlunos.includes(nomeAluno))

}


// ---------------

// função responsável por criar o objeto JSON 
const manipularDadosJson = function(){

    // criação de um objeto JSON
    // a estrutura do JSON é a Chave (atributo): Valor(conteúdo)
    let aluno = {
    "id": 1,
    "ra": 123456, 
    "nome": 'Lucas',
    "idade": 17,
    "email": 'lucas@gmail.com'
    }

    console.log(aluno)
    console.table(aluno)

    // EXIBI o CONTEÚDO de um ATRIBUTO JSON
    console.log(aluno.nome)

    // ADICIONA um NOVO ATRIBUTO no JSON já existente 
    aluno.telefone = '11-123456'
    aluno.data_nascimento = '04/06/2008'

    console.log(aluno)

    // REMOVE um ATRIBUTO no JSON já existente 
    delete aluno.email 

    // SUBSTITUI o VALOR de um ATRIBUTO no JSON já existente
    aluno.ra = 123456789

    // ADICIONA um NOVO ATRIBUTO sem VALOR no JSON já existente 
    aluno.nota = null

    console.log(aluno)
}


const cadastroDeProdutos = function(){
    
    let cores = [ 
        {"id": 1, "cor": "white","hexadecimal": "#ffff"},       // índice 0
        {"id": 2, "cor": "black","hexadecimal": "#0000"},       // índice 1
        {"id": 3, "cor": "blue","hexadecimal": "#0000ff"},      // índice 2
        {"id": 4, "cor": "amarelo","hexadecimal": "#ffff00"},   // índice 3
        {"id": 5, "cor": "rosa","hexadecimal": "#ffb5c0"}       // índice 4
    ]

    let marcas = [
        {"id": 1,"marca": "dell","telefone": "11-123456", "email": "dell@gmail.com"},                   // índice 0
        {"id": 2,"marca": "positivo","telefone": "11-123456", "email": "positivo@gmail.com"},           // índice 1
        {"id": 3,"marca": "multilaser","telefone": "11-123456", "email": "multilaser@gmail.com"},       // índice 2
        {"id": 4,"marca": "nvidia","telefone": "11-123456", "email": "nvidia@gmail.com"},               // índice 3
        {"id": 5,"marca": "apple","telefone": "11-123456", "email": "apple@gmail.com"}                  // índice 4

    ]

    let produtos = [
        {   "id": 1,
            "nome": "Monitor", 
            "descricao": "Monitor de 27 Polegadas",
            "valor": 1500,
            "quantidade": 20,
            "cor": [
                cores[0],
                cores[1]
            ],
            "marca": [
                marcas[0]
            ]
        },

        {
            "id": 2,
            "nome": "Teclado", 
            "descricao": "Teclado Mecânico RBG",
            "valor": 250,
            "quantidade": 500,
            "cor": cores,
            "marca": [
                marcas[2].marca,
                marcas[3].marca,
                marcas[4].marca
            ],
        },

        {
            "id": 3,
            "nome": "Mouse", 
            "descricao": "Mouse sem fio",
            "valor": 80,
            "quantidade": 160,
            "cor": [
                cores[0],
                cores[2],
                cores[4]
            ],
            "marca": [
                marcas[1].marca,
                marcas[3].marca,
                marcas[4].marca,
               
            ],
        },
    ]

    // extrai o produto
produtos.forEach(function(itemProduto){
    console.log(`Produto: ${itemProduto.nome}`)
        
    // extrai a cor
    itemProduto.cor.forEach(function(itemCor){
        console.log(`Cor: ${itemCor.cor}`)
    })

    // extrai a marca
    itemProduto.marca.forEach(function(itemMarca){
        console.log(`Marca: ${itemMarca}`)
    }) 

    // extrai o valor
    itemProduto.valor.forEach(function(itemValor){
        console.log(`Valor: ${itemValor}`)
    })  
})           
    

    //console.log(produtos[0].cor)

    // exibindo todas as cores referente ao produto ´monitor´
    // produtos[0].cor.forEach(function(itemCor){
    //     console.log(itemCor.cor)
    // })

    //console.log(produtos)
    //console.table(produtos)

    //console.log(cores)
    //console.table(cores)

    // como exibir somente um cor específica
    // chamo a variável cores e atrevés do [], passo o índice, e após eu chamo através do . o atributo que quero 
    
    //console.log(cores[2].cor)

    // como exibir todas as cores de uma vez
    
    // cores.forEach(function(todasCores){
    //     console.log(todasCores.cor)
    // })

    // for(let contadorInicial = 0; contadorInicial < cores.length; contadorInicial++){
    //     console.log(cores[contadorInicial].cor)
    // }  
}

   



cadastroDeProdutos()




//console.table(listaDeAlunos)
//removerAlunoForIn('Lucas')
//removerAlunoWhile('Lucas')
//removerAlunoFor('Marcel')
//removerAlunoFor('Marcel')
//removerAlunoIndexOf('Yuri')
//console.table(listaDeAlunos)
//verificarItem('Banana')
//manipularDadosJson()

