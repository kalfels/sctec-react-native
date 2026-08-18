// FomeJá — exercício de seleção de elementos no DOM
// Abra o DevTools (F12) > aba Console para conferir cada desafio.

// ---------------------------------------------
// 1. getElementById
// O título da tela precisa mostrar que os restaurantes
// estão abertos agora. Selecione #titulo-app e troque
// o texto para "FomeJá — abertos agora".
// ---------------------------------------------
const title = document.getElementById("titulo-app");
title.innerText = "FomeJá — abertos agora";


// ---------------------------------------------
// 2. getElementById
// O campo de busca veio com um placeholder genérico.
// Selecione #busca e altere o placeholder para
// "Pizza, açaí, hambúrguer...".
// ---------------------------------------------

const searchField = document.getElementById("busca");
searchField.placeholder = "Pizza, açaí, hambúrguer...";

// ---------------------------------------------
// 3. getElementsByClassName
// O time de produto quer saber quantos restaurantes
// aparecem na listagem. Selecione todos os cards com
// a classe restaurante-card e mostre a quantidade
// no console.
// ---------------------------------------------

const allRestaurantCards = document.getElementsByClassName("restaurante-card");
console.log("Quantidade de restaurantes:", allRestaurantCards.length);

// ---------------------------------------------
// 4. getElementsByTagName
// Quantos botões "Pedir" existem na página?
// Selecione todas as tags button e mostre o total
// no console. (Vai incluir os botões de categoria também.)
// ---------------------------------------------

const allButtons = document.getElementsByTagName("button");
console.log("Quantidade de botões Pedir:", allButtons.length);

// ---------------------------------------------
// 5. querySelector
// Selecione APENAS o primeiro restaurante da lista
// e mostre o nome dele no console.
// Dica: o nome está em .nome-restaurante
// ---------------------------------------------

const firstRestaurant = document.querySelector(".restaurante-card");
console.log("Primeiro restaurante:", firstRestaurant.querySelector(".nome-restaurante").innerText);

// ---------------------------------------------
// 6. querySelector
// Existe um restaurante em promoção, com id="promocao".
// Selecione esse card e mostre o nome no console.
// ---------------------------------------------

const promoRestaurant = document.querySelector("#promocao");
console.log("Restaurante em promoção:", promoRestaurant.querySelector(".nome-restaurante").innerText);

// ---------------------------------------------
// 7. querySelectorAll
// Percorra TODOS os restaurantes e imprima o nome
// de cada um no console, um por linha.
// Use forEach.
// ---------------------------------------------

const allRestaurants = document.querySelectorAll(".restaurante-card");
allRestaurants.forEach((restaurant) => {
  console.log("Restaurante:", restaurant.querySelector(".nome-restaurante").innerText);
});

// ---------------------------------------------
// 8. Desafio final (opcional)
// Atualize o parágrafo #resultado com um resumo, por exemplo:
// "6 restaurantes encontrados. Promoção: Pizza da Esquina"
// Use os elementos que você já selecionou acima.
// ---------------------------------------------
const result = document.getElementById("resultado");
result.innerText = `${allRestaurants.length} restaurantes encontrados. Promoção: ${promoRestaurant.querySelector(".nome-restaurante").innerText}`;