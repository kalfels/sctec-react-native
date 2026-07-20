// =========================================
// DESAFIO - Sistema de Controle de Estacionamento
// =========================================

// =========================================
// FUNCIONALIDADE 1
// Registrar as vagas disponíveis
// =========================================

console.log(`\n\n=== VAGAS DISPONÍVEIS ===\n`);

for (let i = 1; i <= 20; i++) {
    console.log(`Vaga ${i} disponível.`);
}


// =========================================
// FUNCIONALIDADE 2
// Entrada de veículos
// =========================================

console.log(`\n\n=== ENTRADA DE VEÍCULOS ===\n`);

let vagasDisponiveis = 20;

while (vagasDisponiveis > 0) {
    console.log(`Veículo estacionado.`);
    vagasDisponiveis--;
    console.log(`Vagas restantes: ${vagasDisponiveis}`);
}

console.log(`Estacionamento lotado!`);



// =========================================
// FUNCIONALIDADE 3
// Menu do sistema
// =========================================

let continuar = "S";
const prompt = require('prompt-sync')();

do {
    console.log(`\n\nMENU\n`);
    console.log(`1 - Consultar vagas`);
    console.log(`2 - Registrar entrada`);
    console.log(`3 - Registrar saída`);

    continuar = prompt(`Deseja realizar outra operação? (S/N): `).toUpperCase();

} while (continuar === "S");

console.log(`Sistema encerrado.`);