class Animal {
    constructor(nome, idade, peso) {
        this.nome = nome;
        this.idade = idade;
        this.peso = peso;
    }

    comer() {
        console.log(`${this.nome} está comendo.`);
    }

    dormir() {
        console.log(`${this.nome} está dormindo.`);
    }
}
const cachorro1 = new Animal('Bob',5,10); //cria um novo objeto do tipo Animal
const cachorro2 = new Animal('Max',6,5); //cria um novo objeto do tipo Animal
const cachorro3 = new Animal('Luna',2,3); //cria um novo objeto do tipo Animal

//console.log(cachorro1, cachorro2, cachorro3);

cachorro1.comer(); //chama o método comer do objeto cachorro1
cachorro2.dormir(); //chama o método dormir do objeto cachorro2
