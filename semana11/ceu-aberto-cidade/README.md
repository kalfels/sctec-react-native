# Exercício 2 — Última cidade (Céu Aberto)

Este exercício continua o Céu Aberto. O `index.html` e o `style.css` são os mesmos. **Não altere o HTML nem o CSS.**

Na Etapa 1 você salvou a unidade de temperatura (°C / °F). Agora o `<select>` de cidade precisa funcionar: ao trocar a cidade, a tela muda e a escolha **sobrevive ao F5**.

Ainda **não** chame nenhuma API. Os dados das três cidades já estão no `script.js`.

## O que você já tem na tela

| Elemento | ID |
| --- | --- |
| Select de cidade | `#cidade` |
| Selo | `#selo` |
| Título | `#titulo` |
| Temperatura agora | `#temperatura` |
| Condição | `#condicao` |
| Sensação térmica | `#sensacao` |
| Umidade | `#umidade` |
| Vento | `#vento` |
| Máxima / mínima de cada dia | `#temp-hoje`, `#temp-segunda`, `#temp-terca`, `#temp-quarta`, `#temp-quinta`, `#temp-sexta`, `#temp-sabado` |

Valores do select (são as chaves no `localStorage` e no array `cidades`):

- `florianopolis`
- `sao-paulo`
- `rio-de-janeiro`

## Dados das cidades

O array `cidades` **já está** no `script.js`. Cada item tem `value`, `nome`, `selo`, temperatura, condição, sensação, umidade, vento e a previsão dos 7 dias.

Para achar a cidade escolhida:

```js
const cidade = cidades.find((item) => item.value === chaveCidade);
```

## O que o `script.js` precisa fazer

### 1. Reaproveitar a conversão da Etapa 1

Complete `paraFahrenheit` como no exercício anterior. A unidade escolhida continua valendo quando a cidade muda.

### 2. Atualizar a tela com cidade **e** unidade

Complete `atualizarTela(chaveCidade, unidade)`:

1. Encontre a cidade no array `cidades`.
2. Atualize selo, título, condição, umidade e vento.
3. Atualize temperatura agora e sensação, em °C ou °F, conforme `unidade`.
4. Percorra `cidade.previsao`: atualize a faixa de temperatura e a condição de cada dia.

O título deve seguir o formato `Tempo em Florianópolis hoje` (troque o nome da cidade).

A condição de cada dia está no parágrafo **logo depois** da faixa de temperatura. Dica: `elemento.nextElementSibling`.

### 3. Salvar a cidade no `change` do select

```js
localStorage.setItem("cidade", cidadeSelect.value);
```

Depois de salvar, leia a unidade atual e chame `atualizarTela` com a cidade escolhida e essa unidade.

### 4. Manter os botões °C / °F

Nos cliques, continue salvando `unidadeTemperatura`. Agora `atualizarTela` precisa da **cidade atual** do select:

```js
atualizarTela(cidadeSelect.value, "celsius");
```

### 5. Restaurar ao abrir a página

```js
const cidadeSalva = localStorage.getItem("cidade") || "florianopolis";
const unidadeSalva = localStorage.getItem("unidadeTemperatura") || "celsius";
```

Coloque a cidade salva no select (`cidadeSelect.value = cidadeSalva`) e chame `atualizarTela(cidadeSalva, unidadeSalva)`.

## Critérios de aceite

- Trocar o select atualiza selo, título, condição, umidade, vento, temperaturas e a previsão dos 7 dias.
- A unidade (°C / °F) continua funcionando depois de trocar a cidade.
- Recarregar a página (F5) mantém a **última cidade** e a **última unidade**.
- A chave da cidade no `localStorage` deve se chamar `cidade`.
- Os valores salvos devem ser exatamente `"florianopolis"`, `"sao-paulo"` ou `"rio-de-janeiro"`.

## Como testar

1. Abra o `index.html` no navegador.
2. Troque para **São Paulo**. Confira título, números e previsão.
3. Clique em **°F**. As temperaturas de São Paulo devem ir para Fahrenheit.
4. Abra o DevTools (F12) → **Application** → **Local Storage**. Deve existir `cidade` = `sao-paulo`.
5. Dê F5. O select deve continuar em São Paulo, na unidade escolhida.
6. Troque para o Rio, dê F5 de novo e confira.

## Regras

- Não altere o `index.html` nem o `style.css`.
- Não use `sessionStorage`.
- Não chame API (Open-Meteo fica para o próximo exercício).
- Não precisa de `JSON.stringify` / `JSON.parse`: cidade e unidade são **strings**.
