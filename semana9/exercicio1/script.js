const campoSenha = document.getElementById("senha")
const botaoOlho = document.getElementById("botao-olho")

const iconeOlho = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
`

const iconeOlhoRiscado = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a17.7 17.7 0 0 1-2.94 4.06M6.1 6.1C3.51 7.79 2 10.5 2 12s4 8 11 8a9.14 9.14 0 0 0 4.9-1.34"></path>
    <path d="M9.53 9.53a3 3 0 0 0 4.24 4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
`

botaoOlho.addEventListener("click", () => {
  const senhaVisivel = campoSenha.type === "text"

  campoSenha.type = senhaVisivel ? "password" : "text"
  botaoOlho.innerHTML = senhaVisivel ? iconeOlho : iconeOlhoRiscado
  botaoOlho.setAttribute("aria-pressed", String(!senhaVisivel))
  botaoOlho.setAttribute("aria-label", senhaVisivel ? "Mostrar senha" : "Ocultar senha")
})

//Contador de caracteres do textarea
const apresentacao = document.getElementById("apresentacao")
const contador = document.getElementById("contador")
const limite = 100

apresentacao.addEventListener("input", () => {
  const quantidade = apresentacao.value.length
  contador.textContent = quantidade + "/" + limite + " caracteres"

  if (quantidade >= limite) {
    contador.classList.add("contador-cheio")
  } else {
    contador.classList.remove("contador-cheio")
  }
})

//Dados recuperados do formulário
const form = document.querySelector("#form-credenciamento")

form.addEventListener("submit", (event) => {
  event.preventDefault()

  //text, email, password, number e date
  const nome = document.getElementById("nome").value
  const email = document.getElementById("email").value
  const senha = document.getElementById("senha").value
  const idade = document.getElementById("idade").value
  const dataNascimento = document.getElementById("data-nascimento").value
  console.log(nome, email, senha, idade, dataNascimento)

  //textarea
  const apresentacaoTexto = document.getElementById("apresentacao").value
  console.log(apresentacaoTexto)

  //radio
  const nivelSelecionado = document.querySelector('input[name="nivel"]:checked')
  const nivel = nivelSelecionado ? nivelSelecionado.value : "não informado"
  console.log(nivel)

  //select
  const trilha = document.getElementById("trilha").value
  console.log(trilha)

  //checkbox
  const temasSelecionados = []
  const temas = document.querySelectorAll('input[name="temas"]:checked')
  temas.forEach(tema => temasSelecionados.push(tema.value))
  console.log(temasSelecionados)

  //Resumo exibido na página
  const mensagemSucesso = document.getElementById("mensagem-sucesso")
  mensagemSucesso.style.display = "block"
  mensagemSucesso.innerHTML = `
    <h2>Inscrição realizada com sucesso!</h2>
    <ul>
      <li><strong>Nome:</strong> ${nome}</li>
      <li><strong>E-mail:</strong> ${email}</li>
      <li><strong>Senha:</strong> ${senha}</li>
      <li><strong>Idade:</strong> ${idade}</li>
      <li><strong>Data de nascimento:</strong> ${dataNascimento}</li>
      <li><strong>Trilha:</strong> ${trilha}</li>
      <li><strong>Nível de conhecimento:</strong> ${nivel}</li>
      <li><strong>Temas de interesse:</strong> ${temasSelecionados.join(", ") || "Nenhum tema selecionado"}</li>
      <li><strong>Apresentação:</strong> ${apresentacaoTexto || "não informada"}</li>
    </ul>
  `
})