const prompt = require("prompt-sync")();

for (let i = 0; i < 10; i++) {
    let response = prompt(`Permitir a entrada do ${i + 1}? (S/N): `);
    
    if (response.toUpperCase() === 'S') {
        console.log(`Participante ${i + 1} autorizado a entrar.`);
    } else {
        console.log(`Participante ${i + 1} não autorizado a entrar.`);
    }
}

// Esta linha será executada sempre que o loop terminar
console.log(`Verificação de todos os participantes concluída.`);