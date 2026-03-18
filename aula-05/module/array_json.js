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

const listaDeAlunos = ['Lucas', 'Marcel', 'Yuri', 'Leonid', 'Celso', 'Luiz', 'Wendel']
const listaDeClientes = []
const listaDeFornecedores = []

/* -------- EXIBIÇÃO E PERCURSO DE DADOS EM ARRAY -------- */

const exibirDados = function(){

    // exibe o array completo
    console.log(listaDeAlunos) 

    // exibe em formato de tabela (índice + conteúdo)
    console.table(listaDeAlunos)
    
    // exibe o tipo de dado de um índice específico
    console.log(typeof(listaDeAlunos[2]))

    // acessando valores pelo índice
    console.log(listaDeAlunos[3])
    console.log(listaDeAlunos[0])

    // acesso direto ao valor pelo índice do aluno
    console.log(`O nome do aluno(a) é: ${listaDeAlunos[0]}`)

    // estrutura WHILE (controle manual)
    console.log('\n--> While <--')

    let contadorWhile = 0

    while(contadorWhile < listaDeAlunos.length){
        console.log(`Aluno: ${listaDeAlunos[contadorWhile]}`)
        contadorWhile++
    }

    // estrutura FOR (controle por contador)
    console.log('\n--> For <--')
    
    for(let contadorFor = 0; contadorFor < listaDeAlunos.length; contadorFor++){
        console.log(`Aluno: ${listaDeAlunos[contadorFor]}`)
    }

    // FOR EACH (percorre direto os valores)
    console.log('\n--> ForEach <--')
    
    // recebe cada item do array automaticamente
    listaDeAlunos.forEach(function(aluno){
        console.log(`Aluno: ${aluno}`)
    })
   
    // FOR OF (percorre valores diretamente)
    console.log('\n--> For Of <--')

    for(let aluno of listaDeAlunos){
        console.log(`Aluno: ${aluno}`)    
    }

    // FOR IN (percorre índices)
    console.log('\n--> For In (índice) <--')
    
    for(let indice in listaDeAlunos){
        console.log(`Índice: ${indice}`)    
    }

    // exibe a quantidade de itens totais no array
    console.log(listaDeAlunos.length)
}

/* -------- ACRÉSCIMO E REMOÇÃO DE DADOS EM ARRAY -------- */

const manipularDados = function(){
    
    // adicionando manualmente por índice (pode gerar espaços vazios caso algum índice for pulado)
    listaDeClientes[0] = 'Lucas Alexandre'
    listaDeClientes[1] = 'Marcel Teixeira'
    listaDeClientes[2] = 'Yuri Komuta'
    listaDeClientes[5] = 'Celso Furtado'

    console.table(listaDeClientes)

    // adiciona no FINAL do array (push)
    listaDeFornecedores.push('Wendel', 'Luiz', 'Leonid')
    listaDeFornecedores.push('Antônio', 'Maria', 'Caio')

    console.table(listaDeFornecedores)
    
    // adiciona no INÍCIO do array (unshift)
    // reorganiza todos os índices automaticamente
    listaDeFornecedores.unshift('Luciano')
    console.table(listaDeFornecedores)

    // adiciona em posição específica (splice)
    // splice(índice, quantidadeRemover, novoValor)
    listaDeFornecedores.splice(3, 0, 'Bernardo')
    console.table(listaDeFornecedores)

    // remove por índice (splice)
    listaDeFornecedores.splice(6, 1)
    console.table(listaDeFornecedores)

    // remove último elemento (pop)
    listaDeFornecedores.pop()
    console.table(listaDeFornecedores)

    // remove primeiro elemento (shift)
    listaDeFornecedores.shift()
    console.table(listaDeFornecedores)
}

/* -------- REMOÇÃO DE ELEMENTOS DO ARRAY -------- */

// usando FOR IN (percorre índices)
const removerAlunoForIn = function(nomeAluno){
    
    for(let indice in listaDeAlunos){
        if(listaDeAlunos[indice] == nomeAluno){
            listaDeAlunos.splice(indice, 1)
        }
    }
}

// usando WHILE
const removerAlunoWhile = function(nomeAluno){
    let contadorInicial = 0

    while(contadorInicial < listaDeAlunos.length){
        if(nomeAluno == listaDeAlunos[contadorInicial]){
            listaDeAlunos.splice(contadorInicial, 1)
        }
        contadorInicial++
    }
}

// usando FOR
const removerAlunoFor = function(nomeAluno){
   
    for(let i = 0; i < listaDeAlunos.length; i++){
        if(nomeAluno == listaDeAlunos[i]){
            listaDeAlunos.splice(i, 1)
        }
    }
}

// usando INDEXOF (busca direta)
const removerAlunoIndexOf = function(nomeAluno){

    let indice = listaDeAlunos.indexOf(nomeAluno)

    if(indice != -1){
        listaDeAlunos.splice(indice, 1)
    }
}

/* -------- VERIFICAÇÃO DE EXISTÊNCIA DO ELEMENTO NO ARRAY -------- */

const verificarItem = function(nomeAluno){

    // includes -> retorna true ou false
    console.log(listaDeAlunos.includes(nomeAluno))
}

/* -------- MANIPULAÇÃO DE OBJETOS JSON -------- */

const manipularDadosJson = function(){

    // criação de objeto JSON (chave : valor)
    let aluno = {
        "id": 1,
        "ra": 123456, 
        "nome": "Lucas",
        "idade": 17,
        "email": "lucas@gmail.com"
    }

    console.table(aluno)

    // acesso direto ao atributo
    console.log(aluno.nome)

    // adiciona novos atributos
    aluno.telefone = '11-123456'
    aluno.data_nascimento = '04/06/2008'

    // remove atributo
    delete aluno.email 

    // altera valor existente
    aluno.ra = 123456789

    // atributo sem valor definido
    aluno.nota = null

    console.table(aluno)
}

/* -------- ESTRUTURA DE DADOS COMPLETA (ARRAY + JSON) -------- */

const cadastroDeProdutos = function(){
    
    // lista de cores disponíveis no sistema
    let cores = [ 
        {"id": 1, "cor": "white",   "hexadecimal": "#ffff"},
        {"id": 2, "cor": "black",   "hexadecimal": "#0000"},
        {"id": 3, "cor": "blue",    "hexadecimal": "#0000ff"},
        {"id": 4, "cor": "amarelo", "hexadecimal": "#ffff00"},
        {"id": 5, "cor": "rosa",    "hexadecimal": "#ffb5c0"}
    ]

    // lista de marcas disponíveis no sistema
    let marcas = [
        {"id": 1,"marca": "dell"},
        {"id": 2,"marca": "positivo"},
        {"id": 3,"marca": "multilaser"},
        {"id": 4,"marca": "nvidia"},
        {"id": 5,"marca": "apple"}
    ]

    // lista de produtos disponíveis no sistema
    let produtos = [
        {
            "id": 1,
            "nome": "Monitor",
            "descricao": "Monitor de 27 Polegadas",
            "valor": 1500,
            "quantidade": 20,
            "cor":   [cores[0], cores[1]],
            "marca": [marcas[0].marca]
        },

        {
            "id": 2,
            "nome": "Teclado",
            "descricao": "Teclado Mecânico RGB",
            "valor": 250,
            "quantidade": 500,
            "cor": cores,
            "marca": [marcas[2].marca, marcas[3].marca, marcas[4].marca]
        },
        
        {
            "id": 3,
            "nome": "Mouse",
            "descricao": "Mouse sem fio",
            "valor": 80,
            "quantidade": 160,
            "cor":   [cores[0], cores[2], cores[4]],
            "marca": [marcas[1].marca, marcas[3].marca, marcas[4].marca]
        }
    ]

    // percorre os produtos
    produtos.forEach(function(itemProduto){
        
    console.log('\n----------------------------')
        
 console.log(`
 Produto:    ${itemProduto.nome}
 Valor:      ${itemProduto.valor}
 Quantidade: ${itemProduto.quantidade}
 `)
        
         // percorre cores do produto
         itemProduto.cor.forEach(function(itemCor){
             console.log(`Cor: ${itemCor.cor}`)
         })

         // percorre marcas do produto
         itemProduto.marca.forEach(function(itemMarca){
             console.log(`Marca: ${itemMarca}`)
         }) 
    })

    // usando FOR  

    // for(let i = 0; i < produtos.length; i++){
    //     let itemProduto = produtos[i]
    //     console.log(itemProduto.nome)

    //     for(let i = 0; i < itemProduto.marca.length; i++){
    //         nomeMarca = itemProduto.marca[i]
    //         console.log(nomeMarca)
    //     }

    //     for(let i = 0; i < itemProduto.cor.length; i++){
    //         nomeCor = itemProduto.cor[i].cor
    //         console.log(nomeCor)
    //     }
    // }

    // -------- FILTRANDO PRODUTOS PELO NOME --------
    
    console.log('\n Exemplo de como pesquisar um produto pelo nome')

    let nomeProduto = 'Mouse'
    produtos.forEach(function(itemProduto){

        if(String(nomeProduto).toLowerCase() == String(itemProduto.nome).toLowerCase()){
            console.log(itemProduto)
        }
    })

    // -------- FILTRANDO PRODUTOS PELA COR --------

    console.log('\n Exemplo de como pesquisar a cor do produto pelo nome')

    let nomeCor = 'amarelo'
    produtos.forEach(function(itemProduto){
        itemProduto.cor.forEach(function(itemCor){
            
            if(String(nomeCor).toLowerCase() == String(itemCor.cor).toLowerCase()){
                console.log(itemProduto)
            }
        })
    })

    // usando FOR   

    // let nomeCor = 'amarelo'
    //   for(let i = 0; i < produtos.length; i++){
    //     let itemProduto = produtos[i]

    //     for(let i = 0; i < itemProduto.cor.length; i++){
            
    //         if(nomeCor == itemProduto.cor[i].cor){
    //             console.log(itemProduto)
    //         }
    //     }
    // }
}


// chamado de funções
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