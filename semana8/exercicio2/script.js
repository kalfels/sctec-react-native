// Exemplo: assim você encontra elementos na tela

const resultado = document.getElementById("resultado");
const categorias = document.querySelectorAll(".categoria");

console.log(resultado);
console.log(categorias);

// Agora selecione os botões Pedir e continue o desafio
//
// Dica:
// 1. Percorra as categorias com forEach e use addEventListener("click")
// 2. No clique, tire a classe "ativa" de quem já tem e coloque no botão clicado
// 3. Faça o mesmo com os botões Pedir
// 4. No clique em Pedir: destaque o card (classList), mude o botão (style)
//    e escreva a mensagem em #resultado (innerHTML)

// FomeJá — De estático para dinâmico

// 1. Categorias
// Ao clicar em um botão de categoria, somente ele fica com a classe ativa em verde
// Os outros perdem essa classe
// A classe ativa já existe no CSS

// 2. Pedir
// Crie no CSS a classe pedido-ativo, com borda verde e fundo clarinho
// No JS, o card clicado recebe essa classe e o card anterior perde
// O botão clicado muda com style: fundo verde e o texto Pedido!
// O elemento resultado é preenchido com innerHTML, por exemplo: Pedido enviado para Burger Lab!

// 3. Técnicas obrigatórias
// addEventListener para escutar os cliques
// classList para adicionar e remover classes
// style para alterar pelo menos uma propriedade CSS
// innerHTML para montar a mensagem do pedido

const categoria = document.querySelectorAll(".categoria");
const pedido = document.querySelectorAll(".pedido");
const resultado = document.getElementById("banner-cupom");

categoria.forEach((botao) => {
  botao.addEventListener("click", () => {
    const ativa = document.querySelector(".categoria.ativa");
    if (ativa) {
      ativa.classList.remove("ativa");
    }
    botao.classList.add("ativa");
  });
});