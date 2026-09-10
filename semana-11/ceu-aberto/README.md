# Exercício 1 — Unidade de temperatura (Céu Aberto)

## Etapa 1

Você já recebeu o `index.html`, o `style.css` e a base do `script.js` do **Céu Aberto**. Não precisa alterar o HTML nem o CSS.

O site mostra o tempo de Florianópolis com os números **fixos em Celsius**. Na seção **Agora** existem dois botões: **°C** e **°F**. Hoje eles não fazem nada.

A base do `script.js` já seleciona os elementos e traz os dados em Celsius. Sua tarefa é **completar** esse arquivo para:

1. o clique em **°C** ou **°F** converter as temperaturas da tela;
2. a escolha do usuário ser **salva no `localStorage`**;
3. ao recarregar a página (F5), a unidade escolhida **continuar valendo**.

O seletor de cidade **não entra nesta etapa**. Ignore-o por enquanto.

## O que você já tem na tela

| Elemento | ID | Valor inicial |
| --- | --- | --- |
| Botão Celsius | `#botao-celsius` | já vem com a classe `ativa` |
| Botão Fahrenheit | `#botao-fahrenheit` | sem a classe `ativa` |
| Temperatura agora | `#temperatura` | `23 °C` |
| Sensação térmica | `#sensacao` | `24 °C` |
| Máxima / mínima de cada dia | `#temp-hoje`, `#temp-segunda`, `#temp-terca`, `#temp-quarta`, `#temp-quinta`, `#temp-sexta`, `#temp-sabado` | exemplo: `26° / 16°` |

A classe `ativa` deixa o botão azul. Só um dos dois deve ter essa classe de cada vez.

## Dados em Celsius

Os valores originais **já estão** no `script.js`. **Não tente “adivinhar” o número lendo o texto da tela** — o texto muda depois da conversão.

Use `temperaturaAgora`, `sensacaoTermica` e o array `previsao` para montar os textos.

## Conversão

Os dados estão em **Celsius**. A fórmula para Fahrenheit é:

**°F = (°C × 9 / 5) + 32**

Crie **você** o corpo da função `paraFahrenheit`. Ela já existe no `script.js`: recebe um número em Celsius e deve devolver o valor em Fahrenheit. Use `Math.round(...)` para arredondar para inteiro.

```js
paraFahrenheit(23); // deve retornar 73
paraFahrenheit(24); // deve retornar 75
paraFahrenheit(26); // deve retornar 79
```

Não coloque o cálculo espalhado no clique dos botões. Sempre que a tela precisar de Fahrenheit, chame essa função.

Exemplos na tela:

- `23 °C` → `73 °F`
- `24 °C` → `75 °F`
- `26° / 16°` → `79° / 61°`

## O que o `script.js` precisa fazer

### 1. Converter Celsius para Fahrenheit

Complete a função `paraFahrenheit` que já está no `script.js`.

### 2. Atualizar a tela de acordo com a unidade

Complete a função `atualizarTela(unidade)` que já está no `script.js`:

- se `unidade === "celsius"`:
  - temperatura: `23 °C`
  - sensação: `24 °C`
  - cada dia: `26° / 16°` (máxima / mínima em Celsius)
  - classe `ativa` no botão **°C**
- se `unidade === "fahrenheit"`:
  - temperatura e sensação convertidas **com a função que você criou**, com `°F`
  - cada dia convertido com a mesma função, no formato `79° / 61°`
  - classe `ativa` no botão **°F**

### 3. Salvar a escolha

Complete os `addEventListener` dos botões. Em cada clique:

```js
localStorage.setItem("unidadeTemperatura", "celsius");
// ou
localStorage.setItem("unidadeTemperatura", "fahrenheit");
```

Depois de salvar, chame `atualizarTela` com a unidade escolhida.

### 4. Restaurar ao abrir a página

No final do `script.js`, leia o valor salvo:

```js
const unidadeSalva = localStorage.getItem("unidadeTemperatura") || "celsius";
```

Se ainda não existir nada salvo, `getItem` retorna `null`. O `|| "celsius"` garante o padrão.

Chame `atualizarTela(unidadeSalva)` para a página nascer na unidade certa.

## Critérios de aceite

- Existe uma função de conversão Celsius → Fahrenheit (recebe número, retorna número).
- Essa função é reutilizada na temperatura agora, na sensação e na previsão dos 7 dias.
- Clicar em **°F** converte temperatura agora, sensação térmica **e** as 7 faixas da previsão.
- Clicar em **°C** volta os números originais, com `°C`.
- O botão clicado fica com a classe `ativa`; o outro perde essa classe.
- Recarregar a página (F5) mantém a unidade escolhida.
- Fechar e abrir de novo o site (mesmo navegador) também mantém a unidade.
- A chave no `localStorage` deve se chamar `unidadeTemperatura`.
- Os valores salvos devem ser exatamente `"celsius"` ou `"fahrenheit"`.

## Como testar

1. Abra o `index.html` no navegador.
2. Clique em **°F** e confira os números.
3. Abra o DevTools (F12) → **Application** (Chrome/Edge) → **Local Storage**. Deve existir `unidadeTemperatura` = `fahrenheit`.
4. Dê F5. A página deve continuar em Fahrenheit, com o botão **°F** ativo.
5. Clique em **°C**, dê F5 de novo e confira o retorno para Celsius.

## Regras

- Não altere o `index.html` nem o `style.css`.
- Não use `sessionStorage` — a preferência precisa sobreviver ao fechar o navegador.
- Não precisa salvar objeto/array nesta etapa: a unidade é uma **string**.
- Não implemente a troca de cidade ainda.
