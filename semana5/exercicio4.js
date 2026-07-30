class Animal {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }

  comer() {
    console.log(`${this.nome} está comendo.`);
  }
}

class Cachorro extends Animal {
    constructor(nome, idade, raca) {
        super(nome, idade);
        this.raca = raca;
    }
    latir() {
        console.log(`${this.nome} está latindo. Idade: ${this.idade}, Raça: ${this.raca}`);
    }
}

const dog = new Cachorro("Rex",5,"Labrador");
dog.latir(); // Saída: "Rex está latindo."