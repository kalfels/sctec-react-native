const botaoCelsius = document.querySelector("#botao-celsius");
const botaoFahrenheit = document.querySelector("#botao-fahrenheit");
const cidadeSelect = document.querySelector("#cidade");
const selo = document.querySelector("#selo");
const titulo = document.querySelector("#titulo");
const imgCidade = document.querySelector("#imgCidade");
const temperatura = document.querySelector("#temperatura");
const condicao = document.querySelector("#condicao");
const sensacao = document.querySelector("#sensacao");
const umidade = document.querySelector("#umidade");
const vento = document.querySelector("#vento");

// 1. Mapeamento de coordenadas e metadados visuais das cidades
const configCidades = {
  florianopolis: {
    nome: "Florianópolis",
    selo: "Floripa",
    imagem: "floripa.jpg",
    descricaoImagem: "Ponte Hercílio Luz em Florianópolis",
    lat: -27.5954,
    lon: -48.5480
  },
  "sao-paulo": {
    nome: "São Paulo",
    selo: "SP",
    imagem: "saopaulo.jpg",
    descricaoImagem: "Ponte Estaiada em São Paulo",
    lat: -23.5505,
    lon: -46.6333
  },
  "rio-de-janeiro": {
    nome: "Rio de Janeiro",
    selo: "Rio",
    imagem: "riodejaneiro.jpg",
    descricaoImagem: "Baía de Guanabara no Rio de Janeiro",
    lat: -22.9068,
    lon: -43.1729
  }
};

// Mapeamento dos códigos WMO meteorológicos para descrições em português
function traduzirCondicaoWMO(code) {
  const codigos = {
    0: "Céu limpo",
    1: "Predominantemente limpo",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Nevoeiro",
    51: "Garoa fraca",
    61: "Chuva fraca",
    63: "Chuva moderada",
    65: "Chuva forte",
    80: "Pancadas de chuva",
    95: "Trovoada"
  };
  return codigos[code] || "Parcialmente nublado";
}

function paraFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

// 2. Busca de dados em tempo real + 7 dias de previsão
async function buscarDadosMetereologicos(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
  
  const resposta = await fetch(url);
  if (!resposta.ok) throw new Error("Falha ao carregar dados do tempo");
  return await resposta.json();
}

// 3. Atualização da interface
async function atualizarTela(chaveCidade, unidade) {
  const infoCidade = configCidades[chaveCidade];
  if (!infoCidade) return;

  // Define informações estáticas visuais
  titulo.textContent = infoCidade.nome;
  selo.textContent = infoCidade.selo;
  imgCidade.src = infoCidade.imagem;
  imgCidade.alt = infoCidade.descricaoImagem;

  try {
    const dados = await buscarDadosMetereologicos(infoCidade.lat, infoCidade.lon);
    
    const atual = dados.current;
    const diário = dados.daily;

    const tempAtual = Math.round(atual.temperature_2m);
    const tempSensacao = Math.round(atual.apparent_temperature);

    condicao.textContent = traduzirCondicaoWMO(atual.weather_code);
    umidade.textContent = `${atual.relative_humidity_2m}%`;
    vento.textContent = `${Math.round(atual.wind_speed_10m)} km/h`;

    if (unidade === "fahrenheit") {
      temperatura.textContent = `${paraFahrenheit(tempAtual)} °F`;
      sensacao.textContent = `${paraFahrenheit(tempSensacao)} °F`;
      botaoCelsius.classList.remove("ativa");
      botaoFahrenheit.classList.add("ativa");
    } else {
      temperatura.textContent = `${tempAtual} °C`;
      sensacao.textContent = `${tempSensacao} °C`;
      botaoFahrenheit.classList.remove("ativa");
      botaoCelsius.classList.add("ativa");
    }

    // Mapeia os 7 dias retornados pela API nos elementos da tela
    const idsDias = [
      "temp-hoje",
      "temp-segunda",
      "temp-terca",
      "temp-quarta",
      "temp-quinta",
      "temp-sexta",
      "temp-sabado"
    ];

    idsDias.forEach((id, index) => {
      const elemento = document.querySelector(`#${id}`);
      if (elemento && diário.temperature_2m_max[index] !== undefined) {
        const max = Math.round(diário.temperature_2m_max[index]);
        const min = Math.round(diário.temperature_2m_min[index]);

        if (unidade === "fahrenheit") {
          elemento.textContent = `${paraFahrenheit(max)}° / ${paraFahrenheit(min)}°`;
        } else {
          elemento.textContent = `${max}° / ${min}°`;
        }
      }
    });

  } catch (erro) {
    console.error("Erro ao atualizar o tempo:", erro);
  }
}

// Event Listeners
botaoCelsius.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "celsius");
  atualizarTela(cidadeSelect.value, "celsius");
});

botaoFahrenheit.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "fahrenheit");
  atualizarTela(cidadeSelect.value, "fahrenheit");
});

cidadeSelect.addEventListener("change", () => {
  const cidadeEscolhida = cidadeSelect.value;
  localStorage.setItem("cidade", cidadeEscolhida);
  const unidadeSalva = localStorage.getItem("unidadeTemperatura") || "celsius";
  atualizarTela(cidadeEscolhida, unidadeSalva);
});

// Inicialização
const unidadeSalva = localStorage.getItem("unidadeTemperatura") || "celsius";
const cidadeSalva = localStorage.getItem("cidade") || "florianopolis";
cidadeSelect.value = cidadeSalva;
atualizarTela(cidadeSalva, unidadeSalva);