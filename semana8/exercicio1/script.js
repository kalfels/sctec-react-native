// Selecionar o título usando getElementById e exibir no console
const title = document.getElementById("titulo-pagina");
console.log("Título:", title.innerText);

// Selecionar todos os .filme-card usando getElementsByClassName e exibir a quantidade
const cardsForClass = document.getElementsByClassName("filme-card");
console.log("Quantidade por getElementsByClassName:", cardsForClass.length);

// Selecionar todas as <div> da página e comparar a quantidade com o item anterior
const allDivs = document.getElementsByTagName("div");
console.log("Quantidade de <div>:", allDivs.length);
console.log("<div> iguais?", cardsForClass.length === allDivs.length);

// Selecionar o campo de busca usando querySelector (por ID)
const searchField = document.querySelector("#busca");
console.log("Campo de busca:", searchField);

// Selecionar o primeiro .filme-card usando querySelector (por classe)
const firstCard = document.querySelector(".filme-card");
console.log("Primeiro filme:", firstCard.innerText);

// Selecionar todos os .filme-card usando querySelectorAll e imprimir o nome de cada filme
const allCards = document.querySelectorAll(".filme-card");
allCards.forEach((card) => {
  console.log("Filme:", card.innerText);
});

// BÔNUS: Alterar o texto do <p id="descricao"> mostrando a quantidade de filmes
const description = document.getElementById("descricao");
description.innerText = `${allCards.length} filmes encontrados`;