/*
Você está desenvolvendo novas funcionalidades para o sistema da loja ainda

O sistema possui a seguinte lista de preços dos produtos:   const precos = [80, 150, 950, 4200, 320];

Desafio 1 – every()
O gerente deseja verificar se todos os produtos custam mais de R$ 50,00.
Utilize o método every() para responder essa verificação.

Desafio 2 – some()
O gerente deseja saber se existe pelo menos um produto que custa mais de R$ 4.000,00.
Utilize o método some() para realizar essa verificação.

Desafio 3 – reduce()
O setor financeiro precisa calcular o valor total de todos os produtos cadastrados.
Utilize o método reduce() para somar todos os preços
*/

const precos = [80, 150, 950, 4200, 320];
let tela = texto => console.log(texto);

const produtos = precos.every((preco) => preco > 50) 
    ? `Os produtos verificados custam mais que R$ 50,00` 
    : `Os produtos verificados possuem um ou mais com valor abaixo de R$ 50,00`;
tela(produtos);

const produtosAcima = precos.some((preco) => preco > 4000);
const resposta2 = (produtosAcima === true) ? `Um ou mais produtos foram encontrados acima de R$ 4.000,00` : `Nenhum produto foi encontrado acima de R$ 4.000,00`;
console.log(resposta2);

const somaProdutos = precos.reduce((acumulador, preco) => acumulador + preco, 0);
console.log(`O valor total de todos os produtos é R$ ${somaProdutos},00`);