async function buscarProdutos() {
  const response = await fetch("https://dummyjson.com/products");
  const dados = await response.json();

  const produtos = dados.products.map((item) => item.price);
  const filter = produtos.filter((item) => item > 400);

  console.log(produtos);
}

buscarProdutos();