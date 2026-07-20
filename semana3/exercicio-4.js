function abrirChamado(numero, solicitante, categoria) {
    return {
        numero: numero,
        solicitante: solicitante,
        categoria: categoria,
        status: "Aberto"
    };
}

function atualizarStatus(chamado, novoStatus) {
    chamado.status = novoStatus;

    return chamado;
}

function gerarMensagem(chamado) {
    return `Chamado #${chamado.numero} está ${chamado.status}.`;
}

const chamado = abrirChamado(
    102,
    "Maria Oliveira",
    "Rede"
);

console.log(chamado);

const chamadoAtualizado = atualizarStatus(
    chamado,
    "Em atendimento"
);

console.log(chamadoAtualizado);

console.log(gerarMensagem(chamadoAtualizado));