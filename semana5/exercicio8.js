
// Callback
function saudar(nome, callback) {
    console.log("Olá, " + nome);
    callback(); // Executa a função passada como argumento
}

function despedida() {
    console.log("Até logo!");
}

// Passando 'despedida' como callback
saudar("Maria", despedida);



//callback com parâmetros assíncronos
function buscarUsuario(id, callback) {
    console.log("Buscando usuário no banco de dados...");
    
    setTimeout(() => {
        // Simulando dados vindos de uma API/Banco
        const erro = false;
        const usuario = { id: id, nome: "Ana", email: "ana@email.com" };

        if (erro) {
            callback("Erro ao buscar usuário", null);
        } else {
            // O resultado é "retornado" chamando o callback e passando os dados
            callback(null, usuario);
        }
    }, 2000);
}

// Usando a função e recebendo o resultado assíncrono
buscarUsuario(42, function(erro, resultado) {
    if (erro) {
        console.error(erro);
    } else {
        console.log("Usuário encontrado:", resultado);
    }
});