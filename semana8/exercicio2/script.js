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
const botaoPedir = document.querySelectorAll(".botao-pedir");

categoria.forEach((botao) => {
  botao.addEventListener("click", () => { // busca o botão clicado e adiciona a classe ativa, removendo de quem já tinha
    const ativa = document.querySelector(".categoria.ativa");
    if (ativa) {
      ativa.classList.remove("ativa");
    }
    botao.classList.add("ativa");
  });
});

botaoPedir.forEach((botao) => {
  botao.addEventListener("click", () => {
    const card = botao.closest(".restaurante-card"); //closest encontra o elemento pai mais próximo com a classe restaurante-card
    const pedidoAnterior = document.querySelector(
      ".restaurante-card.pedido-ativo"
    ); //encontra o card que já está com a classe pedido-ativo

    if (pedidoAnterior && pedidoAnterior !== card) { // se já existe um card com pedido-ativo e não é o mesmo card, remove a classe e reseta o botão
      pedidoAnterior.classList.remove("pedido-ativo");
      const botaoAnterior = pedidoAnterior.querySelector(".botao-pedir");
      botaoAnterior.style.background = "";
      botaoAnterior.textContent = "Pedir";
    }

    //aplica a classe pedido-ativo no card clicado, muda o estilo do botão e atualiza o resultado
    card.classList.add("pedido-ativo");
    botao.style.background = "#014315";
    botao.textContent = "Pedido!";

    //informa o nome do restaurante no resultado
    const nomeRestaurante = card.querySelector(".nome-restaurante").textContent;
    resultado.innerHTML = `Pedido enviado para ${nomeRestaurante}!`;
  });
});