/**
 * SISTEMA DE CADASTRO - APP DE DELIVERY (POO)
 * -------------------------------------------
 * Ticket #513 (Sprint Review):
 * 
 * Implementação de herança para as classes Usuario, Cliente e Entregador.
 */

import { Cliente } from './classes/Cliente';
import { Entregador } from './classes/Entregador';

const usuariosCadastrados = [
  new Cliente("Carlos Silva", "carlos@email.com", "(47) 99999-8888", "Rua das Flores, 123", 500.00),
  new Cliente("Mariana Souza", "mariana@email.com", "", "Av. Brasil, 456", 800.00),
  new Entregador("João Santos", "joao@email.com", "(47) 98888-7777", "Moto Honda", "ABC-1234", 12.50),
  new Entregador("Lucas Oliveira", "lucas@email.com", "", "Yamaha Fazer", "XYZ-5678", 15.00)
];

console.log("\n=== LISTAGEM GERAL DE USUÁRIOS ===");
usuariosCadastrados.forEach((usuario) => {
  usuario.exibirDados();
  console.log("-----------------------------------");
});

console.log("\n=== DADOS DO CLIENTE 1 ===");
const cliente1 = new Cliente("Carlos Silva", "carlos@email.com", "(47) 99999-8888", "Rua das Flores, 123", 500.00);
cliente1.exibirDadosCliente();

console.log("\n=== DADOS ESPECÍFICOS DO CLIENTE ===");
usuariosCadastrados[1].exibirDadosCliente();

console.log("\n=== DADOS ESPECÍFICOS DO ENTREGADOR ===");
usuariosCadastrados[2].exibirDadosEntregador();


// DESAFIO EXTRA (opcional)
console.log("\n=== DESAFIO EXTRA ===");
const descontoCliente = usuariosCadastrados[0].calcularDesconto(250);
console.log(`Desconto do cliente para compra de R$ 250,00: R$ ${descontoCliente.toFixed(2)}`);

const ganhoEntregador = usuariosCadastrados[2].calcularGanhoDia(8);
console.log(`Ganho do entregador (8 entregas): R$ ${ganhoEntregador.toFixed(2)}`);