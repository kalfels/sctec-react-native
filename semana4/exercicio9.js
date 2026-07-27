/*
1. Crie uma classe chamada `Produto` com um construtor que recebe:
     nome, preco, quantidadeEstoque e categoria — e define esses valores
     como atributos do objeto (this.nome, this.preco, ...).

  2. Substitua os 5 objetos soltos abaixo (produto1 a produto5) por
     instâncias da classe, usando `new Produto(...)`.

  3. NÃO crie métodos dentro da classe (isso é assunto da próxima aula).
     As funções que já existem no arquivo (calcularValorTotalEstoque,
     listarProdutosPorCategoria, etc.)

  4. NÃO se preocupe com herança — ainda não vimos esse conteúdo.

  5. No final, o console.log(gerarRelatorioEstoque(produtosEstoque))
     precisa continuar funcionando exatamente igual a antes.
*/

/**
 * SISTEMA DE ESTOQUE - LOJA "TECH STORE"
 * ---------------------------------------
 * Ticket #482 (Revisão de Code Review):
 *
 * "Esse arquivo foi crescendo rápido e cada produto novo virou um objeto
 * solto, copiado e colado do anterior. Já temos 5 produtos e todos com a
 * MESMA estrutura repetida. Se amanhã precisarmos adicionar um novo campo
 * (ex: fornecedor), vamos ter que alterar objeto por objeto, um por um.
 *
 * Precisamos padronizar a criação de produtos usando CLASSE, para
 * garantir que todo produto novo nasça com os mesmos atributos."
 *   - Comentário do Tech Lead no Pull Request
 *
 * SUA TAREFA:
 * 1. Crie uma classe chamada `Produto` com um construtor que recebe:
 *    nome, preco, quantidadeEstoque e categoria — e define esses valores
 *    como atributos do objeto (this.nome, this.preco, ...).
 * 2. Substitua os 5 objetos soltos abaixo (produto1 a produto5) por
 *    instâncias da classe, usando `new Produto(...)`.
 * 3. NÃO crie métodos dentro da classe (isso é assunto da próxima aula).
 *    As funções que já existem no arquivo (calcularValorTotalEstoque,
 *    listarProdutosPorCategoria, etc.) devem continuar sendo funções
 *    soltas, só que agora recebendo instâncias de Produto no lugar dos
 *    objetos comuns.
 * 4. NÃO se preocupe com herança — ainda não vimos esse conteúdo.
 * 5. No final, o console.log(gerarRelatorioEstoque(produtosEstoque))
 *    precisa continuar funcionando exatamente igual a antes.
 */

// ---------------------------------------------------------
// CÓDIGO ATUAL (legado) — refatore estes objetos usando `new Produto(...)`
// ---------------------------------------------------------

class Produto {
  constructor(nome, preco, quantidadeEstoque, categoria) {
    this.nome = nome;
    this.preco = preco;
    this.quantidadeEstoque = quantidadeEstoque;
    this.categoria = categoria;
  }
}

const produto1 = new Produto("Mouse Gamer RGB", 89.9, 42, "Periféricos");
const produto2 = new Produto("Teclado Mecânico", 249.9, 18, "Periféricos");
const produto3 = new Produto('Monitor 24"', 799.0, 7, "Monitores");
const produto4 = new Produto("Cadeira Gamer", 1199.9, 3, "Móveis");
const produto5 = new Produto("Headset Bluetooth", 159.5, 25, "Periféricos");
const produtosEstoque = [produto1, produto2, produto3, produto4, produto5];

// ---------------------------------------------------------
// Funções que consomem os produtos (não mexer na lógica, só nos dados)
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
// function encontrarProdutoComMenorEstoque(produtos) {
//   return produtos.reduce((menorProduto, produtoAtual) => {
//     if (produtoAtual.quantidadeEstoque < menorProduto.quantidadeEstoque) {
//       return produtoAtual;
//     }
//     return menorProduto;
//   });
// }

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

  return `=== RELATÓRIO DE ESTOQUE ===
${linhasProdutos}

Valor total em estoque: R$ ${valorTotal.toFixed(2)}
Atenção, repor com urgência: ${produtoCritico.nome} (restam ${produtoCritico.quantidadeEstoque})`;
}

console.log(gerarRelatorioEstoque(produtosEstoque));