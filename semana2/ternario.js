let valorCompra = 180;
let clienteVIP = false;

// 1. Refatoração com operador ternário
// A lógica (valorCompra >= 200 || clienteVIP) continua no teste do ternário
let frete = (valorCompra >= 200 || clienteVIP) ? 0 : 15.90;

// 2. Refatoração com template literal
// Utilizamos crases (`) e a sintaxe ${} para interpolar o valor
let mensagem = `Valor do frete: R$ ${frete.toFixed(2)}`;

console.log(mensagem);