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
const container = document.getElementsByClassName("container")[0]

const resumo = document.createElement("div");
resumo.classList.add("mensagem-sucesso");
resumo.id = "mensagem-sucesso";
resumo.style.display = "none";

container.after(resumo);

//Abastecer as trilhas do select com os dados do array
const trilhas = {
  values: ["Front-end", "Back-end", "Mobile", "Data Science", "DevOps", "UI/UX Design"],
  labels: ["Front-end", "Back-end", "Mobile", "Data Science", "DevOps", "UI/UX Design"]
}

const selectTrilha = document.getElementById("trilha")

trilhas.values.forEach((value, index) => {
  const option = document.createElement("option")
  option.value = value
  option.textContent = trilhas.labels[index]
  selectTrilha.appendChild(option)
})

form.addEventListener("submit", (event) => {
  event.preventDefault()

  //radio
  const nivel = document.querySelector('input[name="nivel"]:checked')
  
  //checkbox
  const temasSelecionados = []
  const temas = document.querySelectorAll('input[name="temas"]:checked')
  temas.forEach(tema => temasSelecionados.push(tema.value))
  console.log(temasSelecionados)

  //data
  const dataNascimento = new Date(document.getElementById("data-nascimento").value)
    .toLocaleDateString("pt-BR", { timeZone: "UTC" })

  //Objeto com todos os dados capturados
  const inscricao = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value,
    idade: document.getElementById("idade").value,
    dataNascimento: dataNascimento,
    trilha: document.getElementById("trilha").value,
    nivel: nivel ? nivel.value : "não informado",
    temas: temasSelecionados,
    apresentacao: document.getElementById("apresentacao").value
  }
  console.log(inscricao)

  exibirResumo(inscricao)
})

//Resumo exibido na página
function exibirResumo(dados) {
  resumo.style.display = "block"
  const H2 = document.createElement("h2")
  H2.textContent = "Inscrição realizada com sucesso!"
  resumo.appendChild(H2)
  const UL = document.createElement("ul")
  resumo.appendChild(UL)

  for (const [chave, valor] of Object.entries(dados)) {
    const LI = document.createElement("li")
    LI.innerHTML = `<strong>${chave.charAt(0).toUpperCase() + chave.slice(1)}:</strong> ${Array.isArray(valor) ? valor.join(", ") : valor || "não informado"}`
    UL.appendChild(LI)
  }
}