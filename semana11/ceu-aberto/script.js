const botaoCelsius = document.querySelector("#botao-celsius");
const botaoFahrenheit = document.querySelector("#botao-fahrenheit");
const temperatura = document.querySelector("#temperatura");
const sensacao = document.querySelector("#sensacao");

const temperaturaAgora = 23;
const sensacaoTermica = 24;

const previsao = [
  { id: "temp-hoje", max: 26, min: 16 },
  { id: "temp-segunda", max: 27, min: 17 },
  { id: "temp-terca", max: 24, min: 16 },
  { id: "temp-quarta", max: 22, min: 15 },
  { id: "temp-quinta", max: 25, min: 16 },
  { id: "temp-sexta", max: 28, min: 17 },
  { id: "temp-sabado", max: 29, min: 18 },
];

function paraFahrenheit(celsius) {
  // Fórmula: (°C × 9 / 5) + 32
  // Arredonde o resultado com Math.round(...)
  // A função deve retornar um número, por exemplo: paraFahrenheit(23) === 73
  return Math.round((celsius * 9) / 5 + 32);
}

function atualizarTela(unidade) {
  if (unidade === "fahrenheit") {
    temperatura.textContent = `${paraFahrenheit(temperaturaAgora)} °F`;
    sensacao.textContent = `${paraFahrenheit(sensacaoTermica)} °F`;
    botaoCelsius.classList.remove("ativa");
    botaoFahrenheit.classList.add("ativa");
  } else {
    temperatura.textContent = `${temperaturaAgora} °C`;
    sensacao.textContent = `${sensacaoTermica} °C`;
    botaoFahrenheit.classList.remove("ativa");
    botaoCelsius.classList.add("ativa");
  }

  // Depois, percorra o array previsao.
  // Para cada dia, encontre o elemento com document.querySelector(`#${dia.id}`)
  // e atualize o texto:
  //   - fahrenheit: "79° / 61°" (sempre usando paraFahrenheit)
  //   - celsius: "26° / 16°"
  previsao.forEach((dia) => {
    const elemento = document.getElementById(`${dia.id}`);

    if (unidade === "fahrenheit") {
      elemento.textContent = `${paraFahrenheit(dia.max)} ° / ${paraFahrenheit(dia.min)} °`;
    } else {
      elemento.textContent = `${dia.max} ° / ${dia.min} °`;
    }
  });
}

botaoCelsius.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "celsius");
  atualizarTela("celsius");
});

botaoFahrenheit.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "fahrenheit");
  atualizarTela("fahrenheit");
});

// Ao abrir a página, leia a unidade salva com localStorage.getItem
// Se não existir nada, use "celsius"
// Chame atualizarTela com o valor encontrado
const unidadeSalva = localStorage.getItem("unidadeTemperatura") || "celsius";
atualizarTela(unidadeSalva);
