/*
Situação-problema

Você está desenvolvendo um sistema para um supermercado.

Ainda existem 12 produtos aguardando conferência no estoque.

Saída esperada:

Conferindo produto... (12 restantes) 
Conferindo produto... (11 restantes) 
…
Conferindo produto... (2 restantes) 
Conferindo produto... (1 restantes) 
Conferência concluída!
*/

let contador = 12;

while(contador >= 1) {
    console.log(`Conferindo produto... (${contador} restantes)`);
    if(contador === 1) {
        console.log(`Conferência concluída!`);
    }
    contador--;

}
