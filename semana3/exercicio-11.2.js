const readlineSync = require('readline-sync'); //npm install readline-sync

// --- 1. ESTRUTURA DE DADOS (VETORES GLOBAIS) ---
const clientes = [];
const produtos = [];
const pedidos = [];
const formasPagamento = [];

// --- 2. FUNÇÕES DE REGRAS DE NEGÓCIO ---

function calcularValorTotal(itens) {
  let soma = 0;
  for (let i = 0; i < itens.length; i++) {
    soma = soma + itens[i];
  }
  return soma;
}

const calcularPercentualDesconto = (clienteVIP) => {
    return clienteVIP ? 0.1 : 0; 
}

const calcularValorComDesconto = (valorTotal, percentualDesconto) => { 
    const valorDesconto = valorTotal * percentualDesconto;
    return valorTotal - valorDesconto;   
}

function classificarFaixaEtaria(idade) {
  if (idade < 18) {
    return "Adolescente";
  } else if (idade < 60) {
    return "Adulto(a)";
  } else {
    return "Idoso(a)";
  }
}

function traduzirStatusPagamento(status) {
  switch (status) {
    case 1: return "Em Processamento";
    case 2: return "Autorizado";
    case 3: return "Pago";
    case 4: return "Cancelado";
    default: return "Desconhecido";
  }
}

const montarMensagemFinal = (nome, faixaEtaria, subTotal, perDesconto, valorDesconto, valorTotal, statusTraduzido) => {
  return `
####################################
        RESUMO PEDIDO
####################################
Cliente......: ${nome}
Faixa Etária.: ${faixaEtaria}
Subtotal.....: R$ ${subTotal.toFixed(2)}
Desconto.....: ${(perDesconto * 100).toFixed(0)}% (R$ ${valorDesconto.toFixed(2)})
------------------------------------
VALOR TOTAL..: R$ ${valorTotal.toFixed(2)}
------------------------------------
Status Pedido: ${statusTraduzido}
####################################`;
};

function orquestrarResumoPedido(pedidoId) {
    const pedido = pedidos.find(p => p.id === pedidoId);
    if (!pedido) return "\n[ERRO]: Pedido não encontrado.";

    const cliente = clientes.find(c => c.id === pedido.id_cliente);
    if (!cliente) return "\n[ERRO]: Cliente não encontrado para este pedido.";

    const faixaEtaria = classificarFaixaEtaria(cliente.idade);
    const subTotal = calcularValorTotal(pedido.itensCarrinho);
    const perDesconto = calcularPercentualDesconto(cliente.clienteVIP);
    const valorDesconto = subTotal * perDesconto;
    const valorTotal = calcularValorComDesconto(subTotal, perDesconto);
    const statusPedido = traduzirStatusPagamento(pedido.statusPagamento);

    return montarMensagemFinal(cliente.nome, faixaEtaria, subTotal, perDesconto, valorDesconto, valorTotal, statusPedido);
}

// --- 3. FLUXO INTERATIVO DO MENU (SÍNCRONO) ---

function cadastrarCliente() {
    console.log("\n--- CADASTRO DE CLIENTE ---");
    const nome = readlineSync.question("Nome: ");
    const cpf = readlineSync.question("CPF: ");
    const idade = parseInt(readlineSync.question("Idade: "));
    const telefone = readlineSync.question("Telefone: ");
    const vipInput = readlineSync.question("E VIP? (s/n): ");
    const clienteVIP = vipInput.toLowerCase() === 's';

    const novoCliente = {
        id: clientes.length + 1,
        nome,
        cpf,
        idade,
        telefone,
        clienteVIP
    };

    clientes.push(novoCliente);
    console.log(`\nSucesso! Cliente ${nome} cadastrado com ID ${novoCliente.id}.`);
}

function cadastrarPedido() {
    if (clientes.length === 0) {
        console.log("\n[AVISO]: Voce precisa cadastrar ao menos um cliente antes de criar um pedido!");
        return;
    }

    console.log("\n--- REGISTRAR NOVO PEDIDO ---");
    console.table(clientes);
    const id_cliente = parseInt(readlineSync.question("Digite o ID do cliente: "));
    
    const clienteExiste = clientes.some(c => c.id === id_cliente);
    if (!clienteExiste) {
        console.log("\n[ERRO]: ID de cliente invalido.");
        return;
    }

    const itensStr = readlineSync.question("Digite os valores dos itens separados por virgula (ex: 120, 150, 50): ");
    const itensCarrinho = itensStr.split(',').map(item => parseFloat(item.trim()));

    console.log("\nStatus de Pagamento:\n1 - Em Processamento\n2 - Autorizado\n3 - Pago\n4 - Cancelado");
    const statusPagamento = parseInt(readlineSync.question("Escolha o numero do status: "));

    const novoPedido = {
        id: pedidos.length + 1,
        id_cliente,
        itensCarrinho,
        statusPagamento
    };

    pedidos.push(novoPedido);
    console.log(`\nSucesso! Pedido ID ${novoPedido.id} registrado.`);
}

function consultarPedido() {
    if (pedidos.length === 0) {
        console.log("\n[AVISO]: Nenhum pedido registrado no sistema.");
        return;
    }

    console.log("\n--- CONSULTAR PEDIDO ---");
    console.table(pedidos);
    const idBusca = parseInt(readlineSync.question("Digite o ID do pedido que deseja visualizar: "));
    
    const resultado = orquestrarResumoPedido(idBusca);
    console.log(resultado);
}

function iniciarSistema() {
    let rodando = true;

    while (rodando) {
        console.log(`
=====================================
      SISTEMA DE GESTAO - MENU
=====================================
1. Cadastrar Cliente
2. Registrar Pedido
3. Listar Clientes (Console Table)
4. Listar Pedidos (Console Table)
5. Exibir Resumo de um Pedido
S. Sair
-------------------------------------`);

        const opcao = readlineSync.question("Escolha uma opcao: ");

        switch (opcao.toUpperCase()) {
            case "1":
                cadastrarCliente();
                break;
            case "2":
                cadastrarPedido();
                break;
            case "3":
                console.log("\n--- LISTA DE CLIENTES ---");
                console.table(clientes);
                break;
            case "4":
                console.log("\n--- LISTA DE PEDIDOS ---");
                console.table(pedidos);
                break;
            case "5":
                consultarPedido();
                break;
            case "S":
                rodando = false;
                console.log("\nEncerrando o sistema. Ate logo!");
                break;
            default:
                console.log("\n[ERRO]: Opcao invalida. Tente novamente.");
        }
    }
}

// Iniciar a aplicação
iniciarSistema();