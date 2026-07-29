const prompt = require('prompt-sync')({sigint: true});

function criarSistemaCurtidas() {
    let curtidas = 0;

    return function(acao) {
        switch (acao) {
            case "curtir":
                curtidas++;
                console.log("Post curtido! 👍");
                break;
            case "descurtir":
                if (curtidas > 0) {
                    curtidas--;
                    console.log("Post descurtido! 👎");
                } else {
                    console.log("Não é possível descurtar mais.");
                }
                break;
            case "consultar":
                console.log(`O post possui ${curtidas} curtida(s)! ❤️`);
                break;
            default:
                console.log("Ação inválida!");
        }
    };
}

function menu() {
    const sistemaCurtidas = criarSistemaCurtidas();
    let escolha;

    do {
        console.log("\n========== POST ==========");
        console.log("1 - Curtir 👍");
        console.log("2 - Descurtir 👎");
        console.log("3 - Exibir curtidas ❤️");
        console.log("4 - Sair");

        escolha = prompt("Escolha: ");

        switch (escolha) {
            case "1":
                sistemaCurtidas("curtir");
                break;
            case "2":
                sistemaCurtidas("descurtir");
                break;
            case "3":
                sistemaCurtidas("consultar");
                break;
            case "4":
                console.log("Saindo do sistema.");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    } while (escolha !== "4");
}

menu();
