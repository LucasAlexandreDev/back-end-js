## Permite criar um database
create database db_filmes_20261_b;

## Permite visualizar todos os databases existentes na máquina local
show databases;

## Permite escolher o database a ser utilizado
use db_filmes_20261_b;

## Permite visualizar toda as tabelas existentes dentro do database
show tables;

## Permite a criação da tabela de filme
create table tbl_filme (
	id 	 			int not null auto_increment primary key,
    nome 			varchar(80) not null, 
    sinopse 		text not null,
    capa			varchar(255) not null,
    data_lancamento date not null,
    duracao			time not null,
    valor 			decimal(5,2) default 0,
    avaliacao		decimal(3,2) default null
);

## Permite deletar a tabela 
#drop table tbl_filme

## Permite deletar o database
#drop database db_filmes_20261_b;

## Permite Inserir dados em uma tabela
insert into tbl_filme (
    nome, 			
    sinopse, 		
    capa,			
    data_lancamento, 
    duracao,
    valor,		
    avaliacao
)values(
	'Super Mario Galaxy: O Filme',
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e 
    momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02',
    '01:39:00',
    '50.60',
    '3'
);

## Permite Visualizar os conteúdos dentro da tabela
select * from tbl_filme;

## Permite inverter a ordem dos conteúdos dentro da tabela | o último passa a ser o primeiro | método get - all
select * from tbl_filme order by id desc;

## Permite localizar os dados pelo id
select * from tbl_filme where id = 38;

## Permite remover todos os dados do id específico 
delete from tbl_filme where id = 39;

## Permite remover todos os dados onde o id é maior que 0  
delete from tbl_filme where id > 0;

## Permite fazer alterações de um dado já cadastrado na tabela | especificar qual ID com o (where)
update tbl_filme set 
	nome = 'Filme 01 - Teste de Atualização'
	where  id = 40;
    
## Permite ser realizado mais de uma altereação de um campo | utilizando a (,)
##update tbl_filme set
	##nome = 'Filme 02',
    ##sinopse = ' Teste de Atualização'
##where id = 40

## Permite atualizar todos os dados registrado na tabela | esse modelo é o utilizado para atualizar os dados
update tbl_filme set
	nome = 'Filme 02',
    sinopse = ' Teste de Atualização',
    capa = 'teste',
    data_lancamento = '2026-04-29',
    duracao = '01:39:00',
    valor = '10',
    avaliacao = '2'
where id = 39;

## Permite bloquar a entrada das (') no scrpit | removendo-o por vázio

##insert into tbl_filme (
    ##nome, 			
    ##sinopse, 		
    ##capa,			
    ##data_lancamento, 
    ##duracao,
    ##valor,		
    ##avaliacao
##)values(
	##replace("Super Mari'o Galaxy: O Filme", "'", ""),
    ##'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e 
    ##momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    ##'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    ##'2026-04-02',
    ##'01:39:00',
    ##'50.60',
    ##'3'
##);
