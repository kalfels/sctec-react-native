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
