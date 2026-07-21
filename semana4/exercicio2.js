const produtos = ["Mouse", "Teclado", "Monitor", "Notebook", "Headset"];

const precos = [80, 150, 950, 4200, 320];

const novosProdutos = produtos.map((produto) => produto.toUpperCase());
console.log(novosProdutos);

const valoresMaiores = precos.filter((valor) => valor > 300);
console.log(valoresMaiores);

const resultado = produtos.find((produto) => produto === "Notebook");
console.log(resultado);
console.log(typeof resultado);
