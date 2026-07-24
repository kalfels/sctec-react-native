const notas = [8, 7, 10, 9];
notas.push(9.8);

let tela = texto => console.log(texto);

// Verificar se todas as notas são maiores ou iguais a 7
const resultado = notas.every((nota) => nota >= 7);
const retorno1  = resultado ? `Todos alunos passaram` : `Um ou mais alunos em recuperação`;
console.log(retorno1); // true (todas as notas atendem à condição)

// Verificar se todas as notas são maiores ou iguais a 9
const verificacao = notas.every((nota) => nota >= 9);
const retorno2    = verificacao ? `Todas as notas são maiores ou iguais a 9` : `Nem todas as notas atendem a condição`;
console.log(retorno2); // false (nem todas as notas atendem à condição)


//Reduce
const numeros = [10, 20, 30, 40];
// Somar todos os números do array -> 0 é valor inicial
const resultado2 = numeros.reduce((acumulador, numero) => acumulador + numero, 0);
console.log('Soma através do Reduce: ' + resultado2);

const nomes = ["Luis", "Fernando", "Kalfels"];
const resJoin = nomes.join(" ");
console.log(`Nome: ${resJoin}`);

// outro exemplo
const precos = [50, 80, 120];
// Somar o valor de todos os produtos
const total = precos.reduce((acumulador, preco) => acumulador + preco, 0);
console.log(total); // 250


//Some (Algum)
const precos2 = [80, 150, 950, 4200, 320];
const possuiProdutoCaro = precos2.some((preco) => preco > 1000);
console.log(possuiProdutoCaro); // true

const produtos = ["Mouse", "Teclado", "Monitor", "Notebook"];
const existeNotebook = produtos.some((produto) => produto === "Notebook");
console.log(existeNotebook); // true



// Exemplo 1
const pedidos = [1023, 1024];
pedidos.forEach((pedido) => {
  console.log(`Emitindo nota fiscal do pedido #${pedido}`);
});
// Emitindo nota fiscal do pedido #1023
// Emitindo nota fiscal do pedido #1024

// Exemplo 2
const clientes = ["Ana", "Carlos", "Julia"];
clientes.forEach((cliente) => {
    console.log(`Enviando e-mail para ${cliente}...`);
});
// Enviando e-mail para Ana...
// Enviando e-mail para Carlos...
// Enviando e-mail para Julia...


//push

const produtos2 = ["Mouse", "Teclado", "Monitor"];

produtos2.push("Notebook");

tela(produtos2); // ["Mouse", "Teclado", "Monitor", "Notebook"]

//Objetos

// Cadastro de um produto — cada informação é uma propriedade
const produtoObj = {
  nome: "Camiseta",
  preco: 49.9,
  estoque: 15,
  disponivel: true,
}

// Acessar propriedades — notação de ponto (mais comum)
console.log(produtoObj.nome); // "Camiseta"
console.log(produtoObj.preco); // 49.90

// Acessar propriedades — notação de colchetes (útil com variáveis)
console.log(produtoObj["preco"]); // 49.90

// Modificar um valor existente
produtoObj.preco = 4500;
console.log(produtoObj.preco); // 4500

// Adicionar uma nova propriedade
produtoObj.marca = "Dell";
console.log(produtoObj.marca); // "Dell"

// Remover uma propriedade
delete produtoObj.estoque;
console.log(produtoObj.estoque); // undefined

//Alterar uma propriedade existente
produtoObj.nome = "Notebook";
console.log(produtoObj.nome); // "Notebook"

// Métodos úteis para explorar o objeto
console.log(Object.keys(produtoObj));   // ["nome", "preco", "marca"]
console.log(Object.values(produtoObj)); // ["Notebook", 4500, "Dell"]


//Desestruturango objetos
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};

// Destructuring Assignment
let { firstName, age } = person;
console.log(`${firstName} possui ${age} anos.`); // John possui 50 anos.


//ARRAYS: Array de objetos

// Lista de produtos de uma loja
const produtos3 = [
  { nome: "Camiseta", preco: 49.9, estoque: 15 },
  { nome: "Calça", preco: 89.9, estoque: 8 },
  { nome: "Tênis", preco: 199.9, estoque: 3 },
  { nome: "Boné", preco: 29.9, estoque: 0 },
  { nome: "Meia", preco: 15.9, estoque: 25 },
];

// Acessar o primeiro produto e suas propriedades
console.log(produtos3[0]); // { nome: "Camiseta", preco: 49.90, estoque: 15 }
console.log(produtos3[0].nome); // "Camiseta"
console.log(produtos3[2].preco); // 199.90

