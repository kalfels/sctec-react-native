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

module.exports = { Usuario };
