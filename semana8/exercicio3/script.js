// CineMatch — createElement + appendChild + remove
// Abra o index.html no navegador e complete os passos abaixo.

// const catalogo = [
//   { titulo: "Fronteira Digital", tipo: "Série" },
//   { titulo: "Risadas de Sábado", tipo: "Filme" },
//   { titulo: "Sombras do Porão", tipo: "Filme" },
//   { titulo: "Universo Perdido", tipo: "Filme" },
// ];

// 1. Selecione #catalogo
// Dica: getElementById
// 2. Percorra catalogo com forEach
// Dica: item.titulo e item.tipo
// 3. Para cada item: crie article, span e button
//    - article com classe filme-card
//    - span com "Titulo (Tipo)"
//    - button com texto "Excluir"
//    - appendChild: span e botão no card, card no container
//
// Exemplo do botão Excluir:
// const botaoExcluir = document.createElement("button")
// botaoExcluir.textContent = "Excluir"
// botaoExcluir.classList.add("botao-excluir")
// 4. No clique do Excluir: card.remove()
// Dica: addEventListener("click", ...)

class Conteudo {
  constructor(id, titulo, tipo, duracao, generos) {
    this.id = id
    this.titulo = titulo
    this.tipo = tipo
    this.duracao = duracao
    this.generos = generos
  }
}

class Serie extends Conteudo {
  constructor(id, titulo, duracao, generos, temporadas) {
    super(id, titulo, "Série", duracao, generos)
    this.temporadas = temporadas
  }
}

const catalogo = [
    new Conteudo(1, "Vingadores: Ultimato", "Filme", 181, ["Ação", "Ficção", "Aventura"]),
    new Serie(2, "Stranger Things", 50, ["Ficção", "Terror", "Drama"], 4),
    new Conteudo(3, "Interestelar", "Filme", 169, ["Ficção", "Drama", "Aventura"]),
    new Serie(4, "Breaking Bad", 47, ["Drama", "Crime", "Suspense"], 5),
    new Conteudo(5, "O Senhor dos Anéis: A Sociedade do Anel", "Filme", 178, ["Fantasia", "Aventura", "Ação"])
];

const catalogoExibicao = catalogo
  .map((item) => ({
    titulo: item.titulo,
    tipo: item instanceof Serie ? "Série" : "Filme",
  }))

const catalogoContainer = document.getElementById("catalogo")

function carregarCatalogo() {
    catalogoExibicao.forEach((item) => {
    const card = document.createElement("article")
    card.classList.add("filme-card")

    const span = document.createElement("span")
    span.textContent = `${item.titulo} (${item.tipo})`

    const botaoExcluir = document.createElement("button")
    botaoExcluir.textContent = "Excluir"
    botaoExcluir.classList.add("botao-excluir")

    card.appendChild(span)
    card.appendChild(botaoExcluir)
    catalogoContainer.appendChild(card)
    
    // Adicionando evento de clique para remover o card
    botaoExcluir.addEventListener("click", () => {
      card.remove()
    })

  })
}

carregarCatalogo()

// COMPLEMENTO PESSOAL
const recarregar = document.getElementById("botao-recarregar")
recarregar.addEventListener("click", () => {
  // Limpa o container antes de recarregar
  catalogoContainer.innerHTML = ""
  carregarCatalogo()
})
