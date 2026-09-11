/* ==========================================================================
   1. SELEÇÃO DOS ELEMENTOS DO DOM
   ========================================================================== */
// Mapeia os elementos HTML por ID para atualização dinâmica dos dados na tela
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

/* ==========================================================================
   2. GERENCIAMENTO DE REQUISIÇÕES
   ========================================================================== */
// Guarda a referência do AbortController para cancelar requisições anteriores
// caso o usuário troque de cidade rapidamente (evita Race Condition)
let controllerAtual = null;

/* ==========================================================================
   3. BASE DE DADOS DAS CIDADES
   ========================================================================== */
// Dicionário com metadados estáticos e coordenadas (latitude/longitude)
// necessárias para consultar a API da Open-Meteo
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

/* ==========================================================================
   4. FUNÇÕES AUXILIARES E FORMATADORES
   ========================================================================== */

/**
 * Converte os códigos meteorológicos padronizados da WMO para descrições em português.
 * @param {number} code - Código da condição do tempo retornado pela API.
 * @returns {string} Descrição em português.
 */
function traduzirCondicaoWMO(code) {
  const codigos = {
    0: "Céu limpo",
    1: "Predominantemente limpo",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Nevoeiro",
    48: "Nevoeiro com geada",
    51: "Garoa fraca",
    53: "Garoa moderada",
    55: "Garoa densa",
    61: "Chuva fraca",
    63: "Chuva moderada",
    65: "Chuva forte",
    80: "Pancadas de chuva leves",
    81: "Pancadas de chuva",
    82: "Pancadas de chuva violentas",
    95: "Trovoada"
  };
  return codigos[code] || "Parcialmente nublado";
}

/**
 * Converte a temperatura de Celsius para Fahrenheit.
 * @param {number} celsius - Temperatura em °C.
 * @returns {number} Temperatura arredondada em °F.
 */
function paraFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

/**
 * Converte uma data no formato ISO (AAAA-MM-DD) para o nome do dia da semana.
 * @param {string} dataISO - Data retornada pela API (ex: "2026-09-11").
 * @param {number} indice - Posição do dia no array (0 = Hoje).
 * @returns {string} Nome formatado (ex: "Hoje", "Sexta-feira").
 */
function formatarDataPrevisao(dataISO, indice) {
  // Adiciona T12:00:00 para evitar desvios de fuso horário local ao instanciar Date
  const data = new Date(`${dataISO}T12:00:00`);

  if (indice === 0) return "Hoje";

  const diaSemana = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long"
  }).format(data);

  // Capitaliza a primeira letra do dia da semana
  return `${diaSemana.charAt(0).toUpperCase()}${diaSemana.slice(1)}`;
}

/* ==========================================================================
   5. REQUISIÇÃO À API (CONSUMO ASSÍNCRONO)
   ========================================================================== */

/**
 * Busca dados em tempo real e previsão de 7 dias na API Open-Meteo.
 * Possui mecanismo de retry simples caso receba erro 503 (Serviço Indisponível).
 * @param {number} lat - Latitude da cidade.
 * @param {number} lon - Longitude da cidade.
 * @param {AbortSignal} signal - Sinal para cancelamento da requisição.
 * @returns {Promise<Object>} Dados estruturados em JSON.
 */
async function buscarDadosMetereologicos(lat, lon, signal) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;

  // Executa até 2 tentativas em caso de erro 503 do servidor
  for (let tentativa = 0; tentativa < 2; tentativa += 1) {
    const resposta = await fetch(url, { signal });

    if (resposta.ok) return resposta.json();
    
    // Se não for erro de indisponibilidade ou for a última tentativa, lança exceção
    if (resposta.status !== 503 || tentativa === 1) {
      throw new Error(`Falha ao carregar dados do tempo (${resposta.status})`);
    }

    // Aguarda 1 segundo antes de tentar novamente
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

/* ==========================================================================
   6. RENDERIZAÇÃO DA INTERFACE
   ========================================================================== */

/**
 * Atualiza os componentes do HTML com os dados da cidade e unidade escolhidas.
 * @param {string} chaveCidade - Chave da cidade no objeto configCidades.
 * @param {string} unidade - "celsius" ou "fahrenheit".
 */
async function atualizarTela(chaveCidade, unidade) {
  const infoCidade = configCidades[chaveCidade];
  if (!infoCidade) return;

  // Cancela a requisição anterior se o usuário alterou a cidade rapidamente
  if (controllerAtual) {
    controllerAtual.abort();
  }
  controllerAtual = new AbortController();

  // 1. Atualiza as informações visuais estáticas (marca, imagens e rótulos)
  titulo.textContent = infoCidade.nome;
  selo.textContent = infoCidade.selo;
  imgCidade.src = infoCidade.imagem;
  imgCidade.alt = infoCidade.descricaoImagem;

  // 2. Feedback de carregamento na tela enquanto busca a resposta da rede
  condicao.textContent = "Carregando...";

  try {
    // 3. Busca os dados na API
    const dados = await buscarDadosMetereologicos(
      infoCidade.lat,
      infoCidade.lon,
      controllerAtual.signal
    );

    const atual = dados.current;
    const diario = dados.daily;

    const tempAtual = Math.round(atual.temperature_2m);
    const tempSensacao = Math.round(atual.apparent_temperature);

    // 4. Preenche o painel principal ("Agora")
    condicao.textContent = traduzirCondicaoWMO(atual.weather_code);
    umidade.textContent = `${atual.relative_humidity_2m}%`;
    vento.textContent = `${Math.round(atual.wind_speed_10m)} km/h`;

    // 5. Ajusta exibição e os botões conforme a unidade escolhida (°C ou °F)
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

    // 6. Preenche a lista com os 7 dias de previsão futura
    const cards = document.querySelectorAll(".card-previsao");

    cards.forEach((card, index) => {
      if (diario.temperature_2m_max[index] !== undefined) {
        const max = Math.round(diario.temperature_2m_max[index]);
        const min = Math.round(diario.temperature_2m_min[index]);
        const dataISO = diario.time[index];
        
        // Formata a data para exibição amigável (ex: "11 de set.")
        const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
          day: "numeric",
          month: "short"
        }).format(new Date(`${dataISO}T12:00:00`));

        // Mapeia os elementos internos do card do dia
        const h3 = card.querySelector("h3");
        const time = card.querySelector("time");
        const condicaoPrevisao = card.querySelector(".condicao-previsao");
        const tempElemento = card.querySelector(".temperatura-min-max");

        if (h3) h3.textContent = formatarDataPrevisao(dataISO, index);
        if (time) {
          time.dateTime = dataISO;
          time.textContent = dataFormatada;
        }
        if (condicaoPrevisao) {
          condicaoPrevisao.textContent = traduzirCondicaoWMO(diario.weather_code[index]);
        }
        if (tempElemento) {
          tempElemento.textContent = unidade === "fahrenheit"
            ? `${paraFahrenheit(max)}° / ${paraFahrenheit(min)}°`
            : `${max}° / ${min}°`;
        }
      }
    });

  } catch (erro) {
    // Se a requisição foi cancelada intencionalmente, ignora o bloco de erro
    if (erro.name === "AbortError") return;

    console.error("Erro ao atualizar o tempo:", erro);
    condicao.textContent = "Dados indisponíveis no momento";
  }
}

/* ==========================================================================
   7. ESCUTADORES DE EVENTOS (INTERAÇÕES DO USUÁRIO)
   ========================================================================== */

// Clique no botão Celsius (°C)
botaoCelsius.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "celsius");
  atualizarTela(cidadeSelect.value, "celsius");
});

// Clique no botão Fahrenheit (°F)
botaoFahrenheit.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "fahrenheit");
  atualizarTela(cidadeSelect.value, "fahrenheit");
});

// Mudança na seleção da cidade (dropdown)
cidadeSelect.addEventListener("change", () => {
  const cidadeEscolhida = cidadeSelect.value;
  localStorage.setItem("cidade", cidadeEscolhida);
  const unidadeSalva = localStorage.getItem("unidadeTemperatura") || "celsius";
  atualizarTela(cidadeEscolhida, unidadeSalva);
});

/* ==========================================================================
   8. INICIALIZAÇÃO DA APLICAÇÃO
   ========================================================================== */
// Carrega as preferências salvas no localStorage ou define padrões
const unidadeSalva = localStorage.getItem("unidadeTemperatura") || "celsius";
const cidadeSalva = localStorage.getItem("cidade") || "florianopolis";

// Define a seleção inicial no <select> e executa a primeira renderização
cidadeSelect.value = cidadeSalva;
atualizarTela(cidadeSalva, unidadeSalva);