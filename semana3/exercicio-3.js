function saudacao() {
    return "Olá!";
}


const saudacao2 = () => { 
    return "Olá Arrow Function!";
};

function dobrar(numero) {
    return numero * 2;
}

const dobrar2 = (numero) => numero * 2;

function abrirChamado(numero, solicitante, categoria, prioridade) {
    return {
        numero: numero,
        solicitante: solicitante,
        categoria: categoria,
        prioridade: prioridade,
        status: "Aberto"
    };
}
const chamado = abrirChamado(101, "João Silva", "Computador", "Alta");

const abrirChamado2 = (numero, solicitante, categoria, prioridade) => ({
    numero,
    solicitante,
    categoria,
    prioridade,
    status: "Aberto"
});
console.log(abrirChamado2(101,"Luis","Phone","Media"))

//console.log(saudacao());
//console.log(saudacao2());
//console.log(`Vamos dobrar em Function: ${dobrar(2)}`)
//console.log(`Vamos dobrar em Arrow Function: ${dobrar2(2)}`)
//console.log(chamado);
