const { Usuario } = require('./Usuario');

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

module.exports = { Cliente };
