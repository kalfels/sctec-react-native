/* ==========================================================================
   1. SELEÇÃO DOS ELEMENTOS DO DOM
   ========================================================================== */
// Mapeia os elementos HTML por ID para atualização dinâmica dos dados na tela
const botaoCelsius = document.querySelector("#botao-celsius");
const botaoFahrenheit = document.querySelector("#botao-fahrenheit");
const botaoLocalizacao = document.querySelector("#btn-localizacao");
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

// Armazena as coordenadas e dados da localização atual/customizada
let localizacaoAtual = null;

/* ==========================================================================
   3. BASE DE DADOS DAS CIDADES
   ========================================================================== */
// Dicionário com metadados estáticos e coordenadas (latitude/longitude)
// necessárias para consultar a API da Open-Meteo
const configCidades = {
  "florianopolis": {
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
 * Retorna o ícone e o texto traduzido para a condição WMO da Open-Meteo.
 * @param {number} code - Código da condição do tempo retornado pela API.
 * @returns {{ icone: string, texto: string }} Objeto contendo emoji e descrição.
 */
function obterCondicaoWMO(code) {
  const codigos = {
    0: { icone: "☀️", texto: "Céu limpo" },
    1: { icone: "🌤️", texto: "Predominantemente limpo" },
    2: { icone: "⛅", texto: "Parcialmente nublado" },
    3: { icone: "☁️", texto: "Nublado" },
    45: { icone: "🌫️", texto: "Nevoeiro" },
    48: { icone: "🌫️", texto: "Nevoeiro com geada" },
    51: { icone: "🌦️", texto: "Garoa fraca" },
    53: { icone: "🌦️", texto: "Garoa moderada" },
    55: { icone: "🌧️", texto: "Garoa densa" },
    61: { icone: "🌧️", texto: "Chuva fraca" },
    63: { icone: "🌧️", texto: "Chuva moderada" },
    65: { icone: "🌧️", texto: "Chuva forte" },
    80: { icone: "🌦️", texto: "Pancadas de chuva leves" },
    81: { icone: "🌧️", texto: "Pancadas de chuva" },
    82: { icone: "⛈️", texto: "Pancadas de chuva violentas" },
    95: { icone: "🌩️", texto: "Trovoada" }
  };

  return codigos[code] || { icone: "⛅", texto: "Parcialmente nublado" };
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

/**
 * Converte graus para radianos.
 * @param {number} graus
 * @returns {number}
 */
function paraRadianos(graus) {
  return (graus * Math.PI) / 180;
}

/**
 * Calcula a distância em km entre duas coordenadas usando a fórmula de Haversine.
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {number} Distância em quilômetros
 */
function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const raioTerraKm = 6371;
  const dLat = paraRadianos(lat2 - lat1);
  const dLon = paraRadianos(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(paraRadianos(lat1)) *
      Math.cos(paraRadianos(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return raioTerraKm * c;
}

/**
 * Encontra a cidade configurada mais próxima com base em latitude e longitude.
 * @param {number} lat - Latitude atual
 * @param {number} lon - Longitude atual
 * @returns {{ chave: string, info: Object }} Chave e informações da cidade mais próxima
 */
function encontrarCidadeMaisProxima(lat, lon) {
  let menorDistancia = Infinity;
  let cidadeMaisProxima = null;

  for (const [chave, info] of Object.entries(configCidades)) {
    const distancia = calcularDistanciaKm(lat, lon, info.lat, info.lon);
    if (distancia < menorDistancia) {
      menorDistancia = distancia;
      cidadeMaisProxima = { chave, info };
    }
  }

  return cidadeMaisProxima;
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
 * Atualiza os componentes do HTML com os dados meteorológicos
 * com base em coordenadas geográficas (latitude/longitude) e metadados.
 * @param {{ nome: string, selo: string, imagem: string, descricaoImagem: string, lat: number, lon: number }} infoLocal
 * @param {string} unidade - "celsius" ou "fahrenheit".
 */
async function atualizarTelaPorCoordenadas(infoLocal, unidade) {
  if (!infoLocal) return;

  // Cancela a requisição anterior se houver troca de local rápida
  if (controllerAtual) {
    controllerAtual.abort();
  }
  controllerAtual = new AbortController();

  // 1. Atualiza as informações visuais estáticas (marca, imagens e rótulos)
  titulo.textContent = infoLocal.nome;
  selo.textContent = infoLocal.selo;
  imgCidade.src = infoLocal.imagem;
  imgCidade.alt = infoLocal.descricaoImagem;

  // 2. Feedback de carregamento na tela enquanto busca a resposta da rede
  condicao.textContent = "Carregando...";

  try {
    // 3. Busca os dados na API
    const dados = await buscarDadosMetereologicos(
      infoLocal.lat,
      infoLocal.lon,
      controllerAtual.signal
    );

    const atual = dados.current;
    const diario = dados.daily;

    const tempAtual = Math.round(atual.temperature_2m);
    const tempSensacao = Math.round(atual.apparent_temperature);

    // 4. Preenche o painel principal ("Agora") com o ícone e texto
    const condicaoAtual = obterCondicaoWMO(atual.weather_code);
    condicao.textContent = `${condicaoAtual.icone} ${condicaoAtual.texto}`;
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

        // Obtém o ícone e texto correspondentes ao dia
        const condicaoDia = obterCondicaoWMO(diario.weather_code[index]);

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
          condicaoPrevisao.textContent = `${condicaoDia.icone} ${condicaoDia.texto}`;
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

/**
 * Atualiza os componentes do HTML com base na chave da cidade no configCidades.
 * @param {string} chaveCidade - Chave da cidade no objeto configCidades.
 * @param {string} unidade - "celsius" ou "fahrenheit".
 */
async function atualizarTela(chaveCidade, unidade) {
  const infoCidade = configCidades[chaveCidade];
  if (!infoCidade) return;

  localizacaoAtual = infoCidade;
  await atualizarTelaPorCoordenadas(infoCidade, unidade);
}

/* ==========================================================================
   7. ESCUTADORES DE EVENTOS (INTERAÇÕES DO USUÁRIO)
   ========================================================================== */

// Clique no botão Celsius (°C)
botaoCelsius.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "celsius");
  if (localizacaoAtual) {
    atualizarTelaPorCoordenadas(localizacaoAtual, "celsius");
  } else {
    atualizarTela(cidadeSelect.value, "celsius");
  }
});

// Clique no botão Fahrenheit (°F)
botaoFahrenheit.addEventListener("click", () => {
  localStorage.setItem("unidadeTemperatura", "fahrenheit");
  if (localizacaoAtual) {
    atualizarTelaPorCoordenadas(localizacaoAtual, "fahrenheit");
  } else {
    atualizarTela(cidadeSelect.value, "fahrenheit");
  }
});

// Mudança na seleção da cidade (dropdown)
cidadeSelect.addEventListener("change", () => {
  const cidadeEscolhida = cidadeSelect.value;
  localStorage.setItem("cidade", cidadeEscolhida);
  const unidadeSalva = localStorage.getItem("unidadeTemperatura") || "celsius";
  atualizarTela(cidadeEscolhida, unidadeSalva);
});

/**
 * Captura a localização atual do usuário via Geolocation API
 * e exibe as coordenadas no console com tratamento de erros/permissão.
 */
function capturarLocalizacao() {
  if (!("geolocation" in navigator)) {
    console.warn("Geolocalização não é suportada pelo seu navegador.");
    alert("Seu navegador não suporta geolocalização.");
    return;
  }

  const opcoes = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  async function sucesso(posicao) {
    const { latitude, longitude, accuracy } = posicao.coords;
    console.log("📍 Localização obtida com sucesso:", {
      latitude,
      longitude,
      precisaoMetros: accuracy,
      timestamp: new Date(posicao.timestamp).toLocaleString("pt-BR")
    });

    // Encontra a cidade mais próxima cadastrada no configCidades
    const maisProxima = encontrarCidadeMaisProxima(latitude, longitude);

    if (maisProxima) {
      // Atualiza e sincroniza o combo (<select>) com a cidade encontrada
      cidadeSelect.value = maisProxima.chave;
      localStorage.setItem("cidade", maisProxima.chave);

      const infoLocalizacao = {
        ...maisProxima.info,
        nome: `Mais próximo de ${maisProxima.info.nome}`,
        selo: "GPS",
        lat: latitude,
        lon: longitude
      };

      localizacaoAtual = infoLocalizacao;
      const unidadeAtual = localStorage.getItem("unidadeTemperatura") || "celsius";
      await atualizarTelaPorCoordenadas(infoLocalizacao, unidadeAtual);
    }
  }

  function erro(err) {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        console.error("Permissão negada pelo usuário para acessar a localização.");
        alert("Você negou a permissão de localização. Habilite-a nas configurações do navegador.");
        break;
      case err.POSITION_UNAVAILABLE:
        console.error("Informações de localização indisponíveis.");
        alert("Não foi possível determinar sua localização atual.");
        break;
      case err.TIMEOUT:
        console.error("Tempo esgotado para obter a localização.");
        alert("Tempo esgotado ao tentar obter sua localização.");
        break;
      default:
        console.error(`Erro desconhecido ao obter localização (Código ${err.code}):`, err.message);
        alert("Ocorreu um erro ao obter sua localização.");
        break;
    }
  }

  console.log("Solicitando localização do usuário...");
  navigator.geolocation.getCurrentPosition(sucesso, erro, opcoes);
}

// Clique no botão "Usar minha localização"
if (botaoLocalizacao) {
  botaoLocalizacao.addEventListener("click", capturarLocalizacao);
}

/* ==========================================================================
   8. INICIALIZAÇÃO DA APLICAÇÃO
   ========================================================================== */
// Carrega as preferências salvas no localStorage ou define padrões
const unidadeSalva = localStorage.getItem("unidadeTemperatura") || "celsius";
const cidadeSalva = localStorage.getItem("cidade") || "florianopolis";

// Define a seleção inicial no <select> e executa a primeira renderização
cidadeSelect.value = cidadeSalva;
atualizarTela(cidadeSalva, unidadeSalva);