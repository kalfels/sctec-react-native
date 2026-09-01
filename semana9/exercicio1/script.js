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
  values: ["frontend", "backend", "mobile", "datascience", "devops", "uiuxdesign"],
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
  const erros = []
  const dados = new FormData(form)
  const senha = dados.get("senha")
  const temas = dados.getAll("temas")
  const apresentacaoPessoal = dados.get("apresentacao")

  //Validações
  document.querySelectorAll(".input-error").forEach((campo) => {
    campo.classList.remove("input-error")
  })
  document.querySelectorAll(".mensagem-erro").forEach((mensagem) => {
    mensagem.remove()
  })

  const senhaValida = senha.length >= 8 && /\d/.test(senha)
  const grupoTemas = document.getElementById("temas-interesse")
  const apresentacaoValida = apresentacaoPessoal.trim().length >= 20
  const idadeValida = validarIdade()
  const erroSenha = "A senha deve ter pelo menos 8 caracteres e um número."
  const erroTemas = "Selecione pelo menos um tema de interesse."
  const erroApresentacao = "A apresentação deve ter pelo menos 20 caracteres, sem contar os espaços no início e no fim."
  const erroIdade = "A idade informada não corresponde à data de nascimento."

  if (!senhaValida) {
    erros.push({
      campo: campoSenha,
      campoMensagem: campoSenha.closest(".senha-wrapper"),
      campoId: "senha",
      texto: erroSenha,
      ordem: 1
    })
  }

  if (temas.length === 0) {
    erros.push({
      campo: grupoTemas,
      campoFoco: document.querySelector('input[name="temas"]'),
      campoMensagem: grupoTemas,
      campoId: "temas",
      texto: erroTemas,
      ordem: 2
    })
  }

  if (!apresentacaoValida) {
    erros.push({
      campo: apresentacao,
      campoMensagem: apresentacao,
      campoId: "apresentacao",
      texto: erroApresentacao,
      ordem: 3
    })
  }

  if (!idadeValida) {
    erros.push({
      campo: document.getElementById("idade"),
      campoMensagem: document.getElementById("idade"),
      campoId: "idade",
      texto: erroIdade,
      ordem: 4
    })
  }

  if (erros.length > 0) {
    console.log(erros)
    erros.sort((erroA, erroB) => erroA.ordem - erroB.ordem)

    erros.forEach((erro) => {
      erro.campo.classList.add("input-error")
      exibirMensagemErro(erro.campoMensagem, erro.campoId, erro.texto)
    })

    const campoFoco = erros[0].campoFoco || erros[0].campo
    campoFoco.focus()

    return
  }

  //data
  const dataNascimento = new Date(dados.get("data_nascimento"))
    .toLocaleDateString("pt-BR", { timeZone: "UTC" })

  //Objeto com todos os dados capturados
  const inscricao = {
    nome: dados.get("nome"),
    email: dados.get("email"),
    senha: senha,
    idade: dados.get("idade"),
    dataNascimento: dataNascimento,
    trilha: dados.get("trilha"),
    nivel: dados.get("nivel") || "não informado",
    temas: temas,
    apresentacao: apresentacaoPessoal
  }
  console.log(inscricao)

  exibirResumo(inscricao)
})

function validarIdade() {
  const campoIdade = document.getElementById("idade")
  const campoDataNascimento = document.getElementById("data-nascimento")
  const [ano, mes, dia] = campoDataNascimento.value.split("-").map(Number)
  const hoje = new Date()
  let idadeCalculada = hoje.getFullYear() - ano
  const aniversarioAindaNaoOcorreu = hoje.getMonth() + 1 < mes
    || (hoje.getMonth() + 1 === mes && hoje.getDate() < dia)

  if (aniversarioAindaNaoOcorreu) {
    idadeCalculada--
  }

  const idadeValida = Number(campoIdade.value) === idadeCalculada

  return idadeValida
}

function exibirMensagemErro(campo, campoId, texto) {
  const mensagemErro = document.createElement("label")
  mensagemErro.classList.add("label-error", "mensagem-erro")
  mensagemErro.htmlFor = campoId
  mensagemErro.textContent = texto
  campo.after(mensagemErro)
}

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