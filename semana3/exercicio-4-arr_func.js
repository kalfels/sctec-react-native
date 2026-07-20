const abrirChamado = (numero, solicitante, categoria) => {
    let chamado = {
        numero,
        solicitante,
        categoria,
        status: "Aberto"
    };

    // Função que retorna um novo estado do objeto para garantir a persistência dos métodos
    const atualizarStatus = (novoStatus) => {
        chamado = { ...chamado, status: novoStatus };
        return {
            ...chamado,
            atualizarStatus,
            gerarMensagem
        };
    };

    const gerarMensagem = () => `Chamado #${chamado.numero} está ${chamado.status}.`;

    return {
        ...chamado,
        atualizarStatus,
        gerarMensagem
    };
};

//---------- CONSTANTES
const chamado = abrirChamado(102, "Maria Oliveira", "Rede");
const chamadoAtualizado = chamado.atualizarStatus("Em atendimento");

//---------- SAIDAS
console.log(chamado);
console.log(chamadoAtualizado);
console.log(chamadoAtualizado.gerarMensagem());