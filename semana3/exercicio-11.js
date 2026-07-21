//https://gist.github.com/MatheusNadai/3c25aef79f724ac39542d9ce02f24367

//Dados
const dadosCliente = {
  nome: "Fernanda Lima",
  idade: 34,
  clienteVIP: true,
  itensCarrinho: [120, 150, 50],
  statusPagamento: 2, // 1, 2, 3 ou qualquer outro valor para testar
};

// 1. Some os valores do carrinho usando um laço de repetição (for ou while)
// TODO: function calcularValorTotal(itens) { ... }
function calcularValorTotal(itens) {
  let soma = 0;
  
  for (let i = 0; i < itens.length; i++) {
    soma += itens[i];
  }
  
  return soma;
}

// 2. Calcule o percentual de desconto usando ternário
// TODO: const calcularPercentualDesconto = (valorTotal, clienteVIP) => { ... }

const calcularPercentualDesconto = (valorTotal, clienteVIP) => {
    return valorTotal >= 300 || clienteVIP ? 0.1 : 0;
}
 
// 3. Aplique o desconto e retorne o valor final
// TODO: const calcularValorComDesconto = (valorTotal, percentualDesconto) => { ... }

const calcularValorComDesconto = (valorTotal, percentualDesconto) => { 
    const valorDesconto = valorTotal * percentualDesconto;
    return valorTotal - valorDesconto;   
}

// 4. Classifique a faixa etária usando if/else if
// TODO: function classificarFaixaEtaria(idade) { ... }
function classificarFaixaEtaria(idade) {
  if (idade < 18) {
    return "Menor de Idade";
  } else if (idade < 60) {
    return "Adulto(a)";
  } else {
    return "Idoso(a)";
  }
}

// 5. Traduza o status do pagamento usando switch case
// TODO: function traduzirStatusPagamento(status) { ... }

function traduzirStatusPagamento(status) {
  switch (status) {
    case 1:
      return "Em Processamento";
    case 2:
      return "Autorizado";
    case 3:
      return "Pago";
    case 4:
      return "Cancelado";
    default:
      return "Desconhecido";
  }
}

// 6. Monte a mensagem final usando template literal
// TODO: const montarMensagemFinal = (nome, faixaEtaria, valorComDesconto, statusTraduzido) => { ... }

//Adicionei mais itens, para deixar mais completa a exibição
const montarMensagemFinal = (nome, faixaEtaria, subTotal, perDesconto, valorDesconto, valorTotal, statusTraduzido) => {

  return `
####################################
        RESUMO PEDIDO SCTEC
####################################
Cliente......: ${nome}
Faixa Etária.: ${faixaEtaria}
Subtotal.....: R$ ${subTotal.toFixed(2)}
Desconto.....: ${(perDesconto * 100).toFixed(0)}% (R$ ${valorDesconto.toFixed(2)})
VALOR TOTAL..: R$ ${valorTotal.toFixed(2)}
------------------------------------
Status Pedido: ${statusTraduzido}
------------------------------------`;
};

// 7. Orquestradora: chama tudo em ordem e devolve a mensagem pronta
// TODO: function orquestrarResumoPedido(dadosCliente) { ... }

function orquestrarResumoPedido(dados) {
    const nomeCliente = dados.nome;
    const faixaEtaria = classificarFaixaEtaria(dados.idade);
    const subTotal = calcularValorTotal(dados.itensCarrinho);
    const perDesconto = calcularPercentualDesconto(subTotal, dados.clienteVIP);
    const valorDesconto = subTotal * perDesconto;
    const valorTotal = calcularValorComDesconto(subTotal, perDesconto);
    const statusPedido = traduzirStatusPagamento(dados.statusPagamento);

    return montarMensagemFinal(nomeCliente,faixaEtaria,subTotal,perDesconto,valorDesconto,valorTotal,statusPedido);
}

console.log(orquestrarResumoPedido(dadosCliente));