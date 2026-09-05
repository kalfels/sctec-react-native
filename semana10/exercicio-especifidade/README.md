# Exercício — Especificidade no CSS

O CSS “não funciona”: as regras certas já estão no arquivo, mas o navegador escolhe outra. A tarefa é descobrir **qual seletor está vencendo** e corrigir sem `!important`.

## Como abrir

Abra `index.html` no navegador. Use o DevTools (F12): clique no elemento, veja a declaração riscada e compare a pontuação dos seletores.

Arquivos desta pasta:

- `index.html` — a página e o enunciado
- `style.css` — layout + as regras em conflito (no final do arquivo)

## O que precisa ficar certo

1. O nome do produto (`#titulo` + `.destaque`) deve ficar **azul**, seguindo a classe `.destaque`. Hoje está verde.
2. O botão **Comprar** deve ficar **azul**. Hoje está vermelho — mesmo com a regra azul escrita por último no CSS.
3. O preço antigo deve ficar **cinza e riscado**. Hoje está vermelho.

## Regras

- Não use `!important`.
- Não invente um seletor com ID só para “ganhar” a briga.
- Pode apagar a regra que não deveria existir ou ajustar o seletor.
- No bug do preço antigo, o conflito está no HTML (`style="..."`), não só no CSS.

## Antes de mexer, calcule

Cada seletor vale `(inline, ID, classe, elemento)`. O primeiro dígito diferente decide. Empate de pontuação: vale a regra que aparece por último.

| Seletor | Pontuação |
| --- | --- |
| `p` | 0, 0, 0, ? |
| `.destaque` | 0, 0, ?, 0 |
| `#titulo` | 0, ?, 0, 0 |
| `.botao` | 0, 0, ?, 0 |
| `.card .botao` | 0, 0, ?, 0 |
| `style="color: red"` | ?, 0, 0, 0 |

Lembrete da aula: um ID vence qualquer quantidade de classes. Ordem no arquivo só decide quando a especificidade empata.