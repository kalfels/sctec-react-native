const { Usuario } = require('./Usuario');

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

module.exports = { Entregador };
