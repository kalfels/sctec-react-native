//https://gist.github.com/MatheusNadai/3c25aef79f724ac39542d9ce02f24367

// 1. Clientes (9 registros)
const clientes = [
    { id: 1, cpf: "123.456.789-01", nome: "Ana Silva", idade: 28, telefone: "1199999-0001" },
    { id: 2, cpf: "234.567.890-12", nome: "Bruno Costa", idade: 35, telefone: "1199999-0002" },
    { id: 3, cpf: "345.678.901-23", nome: "Carla Dias", idade: 42, telefone: "1199999-0003" },
    { id: 4, cpf: "456.789.012-34", nome: "Daniel Alves", idade: 22, telefone: "1199999-0004" },
    { id: 5, cpf: "567.890.123-45", nome: "Elisa Faria", idade: 50, telefone: "1199999-0005" },
    { id: 6, cpf: "678.901.234-56", nome: "Fabio Gomes", idade: 31, telefone: "1199999-0006" },
    { id: 7, cpf: "789.012.345-67", nome: "Gisele H.", idade: 29, telefone: "1199999-0007" },
    { id: 8, cpf: "890.123.456-78", nome: "Hugo Lima", idade: 45, telefone: "1199999-0008" },
    { id: 9, cpf: "901.234.567-89", nome: "Iara Melo", idade: 38, telefone: "1199999-0009" }
];

// 2. Endereços (Relacionados pelo id_cliente)
const enderecos = [
    { id: 1, id_cliente: 1, cep: "01001-000", rua: "Av. Paulista", numero: 100, bairro: "Bela Vista", cidade: "São Paulo", uf: "SP", ponto_referencia: "Próximo ao MASP" },
    { id: 2, id_cliente: 2, cep: "20000-000", rua: "Rua das Flores", numero: 50, bairro: "Centro", cidade: "Rio de Janeiro", uf: "RJ", ponto_referencia: "Ao lado da padaria" }
];

// 3. Produtos
const produtos = [
    { id: 1, nome: "Mouse Gamer", complemento: "RGB 16000dpi", estoque: 50, valor: 150.00 },
    { id: 4, nome: "Teclado Mecânico", complemento: "Switch Blue", estoque: 30, valor: 250.00 },
    { id: 7, nome: "Monitor", complemento: "24 polegadas 144Hz", estoque: 15, valor: 1200.00 }
];

// 4. Formas de Pagamento
const formasPagamento = [
    { id: 1, descricao: "Pix", percentual_desconto: 0.05 },
    { id: 2, descricao: "Cartão de Crédito", percentual_desconto: 0.00 },
    { id: 3, descricao: "Boleto", percentual_desconto: 0.02 }
];

// 5. Pedidos (Contendo array de produtos interno)
const pedidos = [
    {
        id: 1,
        id_cliente: 1,
        produtos: [
            { id: 1, quantidade: 2, valor: 150.00 },
            { id: 4, quantidade: 1, valor: 250.00 }
        ],
        id_pagamento: 1,
        status: "Em processamento",
        id_endereco: 1,
        observacao: "Entregar em horário comercial"
    }
];

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
    soma = soma + itens[i];
  }
  
  return soma;
}

// 2. Calcule o percentual de desconto usando ternário
// TODO: const calcularPercentualDesconto = (valorTotal, clienteVIP) => { ... }

const calcularPercentualDesconto = (clienteVIP) => {
    const percentual = clienteVIP ? 0.1 : 0; //VIP = 10%, Não VIP = 0%
    return percentual;
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
    return "Adolescente";
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