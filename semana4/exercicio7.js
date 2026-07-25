import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// Função auxiliar para aguardar o Enter do usuário
async function pausar() {
  const rl = readline.createInterface({ input, output });
  await rl.question("\n--- Pressione ENTER para continuar ---");
  rl.close();
  console.clear(); // Opcional: limpa o terminal para o próximo exercício
}
async function buscarUsuarios() {
  const response = await fetch("https://dummyjson.com/users");
  const dados = await response.json();
  return dados.users;
}

async function main() {
  const usuarios = await buscarUsuarios();

  // 1. Informações dos usuários
  console.log("=== 1. Informações dos Usuários ===");
  usuarios.forEach((usuario) => {
    console.log(`Nome: ${usuario.firstName} ${usuario.lastName}`);
    console.log(`Idade: ${usuario.age} anos`);
    console.log(`E-mail: ${usuario.email}\n`);
  });
  await pausar();

  // 2. Nomes completos
  console.log("\n=== 2. Nomes Completos ===");
  const nomesCompletos = usuarios.map(
    (usuario) => `${usuario.firstName} ${usuario.lastName}`
  );
  console.log(nomesCompletos);
  await pausar();

  // 3. Usuários >= 30 anos
  console.log("\n=== 3. Usuários com 30 anos ou mais ===");
  const usuariosMaiores30 = usuarios.filter((usuario) => usuario.age >= 30);
  const nomesMaiores30 = usuariosMaiores30.map(
    (usuario) => `${usuario.firstName} - ${usuario.age} anos`
  );
  console.log(nomesMaiores30);
  await pausar();

  // 4. Usuário Emily
  console.log("\n=== 4. Usuário Emily ===");
  const usuarioEmily = usuarios.find(
    (usuario) => usuario.firstName === "Emily"
  );
  const nomeCompletoEmily = `${usuarioEmily.firstName} ${usuarioEmily.lastName}`;
  console.log(`Nome completo de Emily: ${nomeCompletoEmily}`);
  await pausar();

  // 5. Menor de idade
  console.log("\n=== 5. Existe menor de 18 anos? ===");
  const temMenorDeIdade = usuarios.some((usuario) => usuario.age < 18);
  console.log(temMenorDeIdade ? "Sim, existe pelo menos um menor de idade." : "Não, todos são maiores de idade.");
  await pausar();

  // 6. Validação de e-mails
  console.log("\n=== 6. Todos possuem e-mail? ===");
  const todosComEmail = usuarios.every(
    (usuario) => usuario.email && usuario.email.trim() !== ""
  );
  console.log(todosComEmail ? "Sim, todos possuem e-mail." : "Não, há usuários sem e-mail.");
  await pausar();

  // 7. Soma das idades
  console.log("\n=== 7. Soma das idades ===");
  const somaIdades = usuarios.reduce(
    (acumulador, usuario) => acumulador + usuario.age,
    0
  );
  console.log(somaIdades);
  await pausar();

  // 8. Idade média
  console.log("\n=== 8. Desafio: Idade Média ===");
  const idadeMedia = (somaIdades / usuarios.length).toFixed(1);
  console.log(`Idade média: ${idadeMedia} anos\n\n`);

}


main();


import promptSync from 'prompt-sync';
const prompt = promptSync();
const usuarios = await buscarUsuarios();

console.log("\n========== DESAFIO EXTRA ==========");

const busca = prompt("Digite parte do nome do usuário: ");

const usuariosEncontrados = usuarios.filter((usuario) => {
const nomeCompleto = `${usuario.firstName} ${usuario.lastName}`;

return nomeCompleto.toLowerCase().includes(busca.toLowerCase());
});

if (usuariosEncontrados.length > 0) {
console.log(
    `\nForam encontrados ${usuariosEncontrados.length} usuário(s):\n`,
);

usuariosEncontrados.forEach((usuario) => {
    console.log(`Nome: ${usuario.firstName} ${usuario.lastName}`);
    console.log(`Idade: ${usuario.age} anos`);
    console.log(`E-mail: ${usuario.email}`);
    console.log(`Cidade: ${usuario.address.city}`);
    console.log("-----------------------------");
});
} else {
console.log("\nNenhum usuário encontrado.");
}