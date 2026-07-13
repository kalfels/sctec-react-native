// Variável para testar os cenários (tente alterar para 3, 5, ou 9)
let statusPedido = 6; 

switch (statusPedido) {
    case 1:
        console.log("Pedido recebido");
        break;
    case 2:
        console.log("Em separação no estoque");
        break;
    case 3:
        console.log("Enviado para transportadora");
        break;
    case 4:
        console.log("Saiu para entrega");
        break;
    case 5:
        console.log("Entregue");
        break;
    case 6:
        console.log("Cancelado");
        break;
    
    // Desafio extra: Adicionar novo status aqui na próxima sprint
    // case 6:
    //     console.log("Pedido cancelado");
    //     break;

    default:
        console.log("Status desconhecido, entre em contato com o suporte");
        break;
}