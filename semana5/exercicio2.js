/** * SISTEMA DE ESTOQUE - LOJA "TECH STORE" * --------------------------------------- * Ticket #482 (Revisão de Code Review): * * Refatorado utilizando a classe `Produto` para padronizar a criação dos itens. */

// 1. Definição da classe Produto
class Produto {
  constructor(nome, preco, quantidadeEstoque, categoria) {
    this.nome = nome;
    this.preco = preco;
    this.quantidadeEstoque = quantidadeEstoque;
    this.categoria = categoria;
  }
}

// 2. Substituição dos objetos soltos por instâncias da classe
const produtosEstoque = [
  new Produto("Mouse Gamer RGB", 89.9, 42, "Periféricos"), 
  new Produto("Teclado Mecânico", 249.9, 18, "Periféricos"),
  new Produto('Monitor 24"', 799.0, 7, "Monitores"),
  new Produto("Cadeira Gamer", 1199.9, 3, "Móveis"), 
  new Produto("Headset Bluetooth", 159.5, 25, "Periféricos")
];

// ---------------------------------------------------------
// Funções que consomem os produtos
// ---------------------------------------------------------

// Soma preco * quantidadeEstoque de todos os produtos
function calcularValorTotalEstoque(produtos) {
  return produtos.reduce(
    (total, produto) => total + produto.preco * produto.quantidadeEstoque,
    0,
  );
}

// Retorna apenas os produtos de uma determinada categoria
function listarProdutosPorCategoria(produtos, categoria) {
  return produtos.filter((produto) => produto.categoria === categoria);
}

// Encontra o produto com menor quantidade em estoque (alerta de reposição)
function encontrarProdutoComMenorEstoque(produtos) {
  let menorProduto = produtos[0];
  for (let i = 1; i < produtos.length; i++) {
    if (produtos[i].quantidadeEstoque < menorProduto.quantidadeEstoque) {
      menorProduto = produtos[i];
    }
  }
  return menorProduto;
}

// Monta um relatório em texto com os dados de cada produto
function gerarRelatorioEstoque(produtos) {
  const linhasProdutos = produtos
    .map(
      (produto) =>
        `- ${produto.nome} (${produto.categoria}): ${produto.quantidadeEstoque} un. x R$ ${produto.preco.toFixed(2)}`,
    )
    .join("\n");
  const valorTotal = calcularValorTotalEstoque(produtos);
  const produtoCritico = encontrarProdutoComMenorEstoque(produtos);
  return `=== RELATÓRIO DE ESTOQUE ===\n${linhasProdutos}\nValor total em estoque: R$ ${valorTotal.toFixed(2)}\nAtenção, repor com urgência: ${produtoCritico.nome} (restam ${produtoCritico.quantidadeEstoque})`;
}

console.log(gerarRelatorioEstoque(produtosEstoque));