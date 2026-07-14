const prompt = require("prompt-sync")();

//Função para calculo do valor de cada produto
function valorProduto(precoUnitario, qde){
    return Number(precoUnitario) * qde
}

//Função para verificar se o cupom é valido
function cupomValido(codigo) {
    return codigo === "PROMO10";
}

//Função para calcular o desconto caso haja cupom valido
function aplicarDesconto(valor, codigo) {
    if (cupomValido(codigo)) {
        return valor - (valor * 0.1);
    }
    return valor;
}

//Função para calcular e retornar o carrinho, frete e cupom
function calcularCarrinho(
  precoItem1,
  qdeItem1,
  precoItem2,
  qdeItem2,
  cupomDesconto
) {
  let total = valorProduto(precoItem1,qdeItem1) + valorProduto(precoItem2,qdeItem2);
  let qdeTotal = Number(qdeItem1) + Number(qdeItem2)

  total = aplicarDesconto(total, cupomDesconto);

  let freteGratis = (qdeTotal > 0) && (total >= 100) ? "Sim, você ganhou 10%" : "Não";
  
  return `Total: R$ ${total.toFixed(2)} | Frete grátis: ${ freteGratis }`;
}

const precoItem1Input = prompt("Preço do item 1: ");
const qdeItem1Input = prompt("Quantidade item 1: ")
const precoItem2Input = prompt("Preço do item 2: ");
const qdeItem2Input = prompt("Quantidade item 2: ")
const cupomInput = prompt("Cupom de desconto (ou deixe vazio): ");

console.log(
  calcularCarrinho(
    precoItem1Input,
    qdeItem1Input,
    precoItem2Input,
    qdeItem2Input,
    cupomInput
  ),
);