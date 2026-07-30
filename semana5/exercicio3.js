/**
 * SISTEMA - CONTA BANCÁRIA (NUBANK SIMPLIFICADO)
 * ---------------------------------------------
 * Implementação da classe ContaBancaria com métodos de depósito e saque.
 */

class ContaBancaria {
  constructor(titular, saldo) {
    this.titular = titular;
    this.saldo = saldo;
  }

  depositar(valor) {
    this.saldo += valor;
  }

  sacar(valor) {
    this.saldo -= valor;
  }

  saldoAtual() {
    return `Saldo atual: R$ ${this.saldo.toFixed(2)}`;
  }
}

let minhaConta = new ContaBancaria("Ana", 1000);

console.log(`Titular: ${minhaConta.titular}`);
console.log(`Saldo inicial: R$ ${minhaConta.saldo.toFixed(2)}`);
console.log('-----------------------------');

minhaConta.depositar(500);
console.log(`${minhaConta.titular} realizou um depósito de R$ 500,00.`);
console.log(minhaConta.saldoAtual());
console.log('-----------------------------');

minhaConta.sacar(200);
console.log(`${minhaConta.titular} realizou um saque de R$ 200,00.`);
console.log(minhaConta.saldoAtual());