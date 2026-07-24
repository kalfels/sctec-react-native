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
  console.log("=== 3. Usuários com 30 anos ou mais ===");
  const usuariosMaiores30 = usuarios.filter((usuario) => usuario.age >= 30);
  console.log(usuariosMaiores30);
  await pausar();

  // 4. Usuário Emily
  console.log("=== 4. Usuário Emily ===");
  const usuarioEmily = usuarios.find(
    (usuario) => usuario.firstName === "Emily"
  );
  console.log(usuarioEmily);
  await pausar();

  // 5. Menor de idade
  console.log("=== 5. Existe menor de 18 anos? ===");
  const temMenorDeIdade = usuarios.some((usuario) => usuario.age < 18);
  console.log(temMenorDeIdade);
  await pausar();

  // 6. Validação de e-mails
  console.log("=== 6. Todos possuem e-mail? ===");
  const todosComEmail = usuarios.every(
    (usuario) => usuario.email && usuario.email.trim() !== ""
  );
  console.log(todosComEmail);
  await pausar();

  // 7. Soma das idades
  console.log("=== 7. Soma das idades ===");
  const somaIdades = usuarios.reduce(
    (acumulador, usuario) => acumulador + usuario.age,
    0
  );
  console.log(somaIdades);
  await pausar();

  // 8. Idade média
  console.log("=== 8. Desafio: Idade Média ===");
  const idadeMedia = (somaIdades / usuarios.length).toFixed(1);
  console.log(`Idade média: ${idadeMedia} anos`);
}

main();