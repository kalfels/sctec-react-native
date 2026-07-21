//Instanciamento de Array

//Mapeamento
const produtos = ["Mouse", "Teclado", "Monitor", "Notebook"];
const produtosMaiusculos = produtos.map((produto) => {
    return produto.toUpperCase();
});

console.log(produtosMaiusculos);


//Filtros
const idades = [12, 18, 25, 15, 30];

const maioresDeIdade = idades.filter((idade) => {
  return idade >= 18;
});

console.log(maioresDeIdade);
// retorno [18, 25, 30]


//Find
const alunos = ["João", "Maria", "Pedro", "Ana"];

// Buscar o aluno "Pedro"
const resultado = alunos.find((aluno) => {
  return aluno === "Pedro";
});

console.log(resultado); // Pedro (encontrou o aluno)

const busca = alunos.find((aluno) => aluno === "Luis");
console.log(busca); // Quebrou

const indice = alunos.findIndex((aluno) => aluno === "Ana");
console.log(indice);
