/**
 * SISTEMA DE CADASTRO - APP DE DELIVERY (POO)
 * -------------------------------------------
 * Ticket #513 (Sprint Review):
 * 
 * Implementação de herança para as classes Usuario, Cliente e Entregador.
 */


class Usuario {
  constructor(nome, email, telefone) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone || "Não informado";
  }

  exibirDados() {
    console.log(`Nome: ${this.nome}`);
    console.log(`E-mail: ${this.email}`);
    console.log(`Telefone: ${this.telefone}`);
  }
}

class Cliente extends Usuario {
  constructor(nome, email, telefone, endereco, limiteCredito) {
    super(nome, email, telefone);
    this.endereco = endereco;
    this.limiteCredito = limiteCredito;
  }

  calcularDesconto(valorCompra) {
    if (valorCompra > 100) {
      return valorCompra * 0.10;
    }
    return 0;
  }

  exibirDadosCliente() {
    this.exibirDados();
    console.log(`Endereço: ${this.endereco}`);
    console.log(`Limite de Crédito: R$ ${this.limiteCredito.toFixed(2)}`);
  }
}

class Entregador extends Usuario {
  constructor(nome, email, telefone, veiculo, placa, valorPorEntrega) {
    super(nome, email, telefone);
    this.veiculo = veiculo;
    this.placa = placa;
    this.valorPorEntrega = valorPorEntrega;
  }

  calcularGanhoDia(qtdEntregas) {
    return qtdEntregas * this.valorPorEntrega;
  }

  exibirDadosEntregador() {
    this.exibirDados();
    console.log(`Veículo: ${this.veiculo}`);
    console.log(`Placa: ${this.placa}`);
    const ganhosEntregas = this.calcularGanhoDia(5);
    console.log(`Ganho do dia (5 entregas): R$ ${ganhosEntregas.toFixed(2)}`);
  }
}

console.log("=== DADOS DO CLIENTE 1 ===");
const cliente1 = new Cliente("Carlos Silva", "carlos@email.com", "(47) 99999-8888", "Rua das Flores, 123", 500.00);
cliente1.exibirDadosCliente();
console.log(`Desconto para compra de R$ 150,00: R$ ${cliente1.calcularDesconto(150).toFixed(2)}`);

console.log("\n=== DADOS DO CLIENTE 2 ===");
const cliente2 = new Cliente("Mariana Souza", "marisouza@gmail,.com", "(47) 98888-7777", "Av. Brasil, 456", 300.00);
cliente2.exibirDadosCliente();
console.log(`Desconto para compra de R$ 80,00: R$ ${cliente2.calcularDesconto(80).toFixed(2)}`);

console.log("\n=== DADOS DO ENTREGADOR 1 ===");
const entregador1 = new Entregador("João Santos", "joao@email.com", "", "Moto Honda", "ABC-1234", 12.50);
entregador1.exibirDadosEntregador();

console.log("\n=== DADOS DO ENTREGADOR 2 ===");
const entregador2 = new Entregador("Fernanda Lima", "fernanda@gmail.com", "(47) 97777-6666", "Carro Toyota", "XYZ-5678", 25.00);
entregador2.exibirDadosEntregador();