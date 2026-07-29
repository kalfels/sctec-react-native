class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }

  apresentar() {
    console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
  }
}

class Aluno extends Pessoa {
  constructor(nome, idade, matricula) {
    super(nome, idade);
    this.matricula = matricula;
  }

  apresentar() {
    console.log(`Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e minha matrícula é ${this.matricula}.`);
  }
}

class Professor extends Pessoa {
  constructor(nome, idade, matricula, disciplina) {
    super(nome, idade);
    this.matricula = matricula;
    this.disciplina = disciplina;
  }

  apresentar() {
    console.log(`Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e leciono a disciplina de ${this.disciplina}.`);
  }
}

const professor1 = new Professor("Dr. Silva", 45, "Matemática");
professor1.apresentar(); // Saída: "Olá, meu nome é Dr. Silva, tenho 45 anos e leciono a disciplina de Matemática."

const aluno1 = new Aluno("Carlos", 20, "2024001");
aluno1.apresentar(); // Saída: "Olá, meu nome é Carlos, tenho 20 anos e minha matrícula é 2024001."

const aluno2 = new Aluno("Ana", 22, "2024002");
aluno2.apresentar(); // Saída: "Olá, meu nome é Ana, tenho 22 anos e minha matrícula é 2024002."

const pessoa1 = new Pessoa("João", 30);
pessoa1.apresentar(); // Saída: "Olá, meu nome é João e tenho 30 anos."

const pessoa2 = new Pessoa("Maria", 25);
pessoa2.apresentar(); // Saída: "Olá, meu nome é Maria e tenho 25 anos."