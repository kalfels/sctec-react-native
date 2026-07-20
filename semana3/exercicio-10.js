/*
const livro1 = "Dom Casmurro";
const livro2 = "1984";
const livro3 = "O Pequeno Príncipe";
const livro4 = "Harry Potter";
const livro5 = "Clean Code";
const livro6 = "Código Limpo";
console.log("Livro:", livro1);
console.log("Livro:", livro2);
console.log("Livro:", livro3);
console.log("Livro:", livro4);
console.log("Livro:", livro5);
console.log("Livro:", livro6);

Refatore o código do slide anterior seguindo os requisitos abaixo:

Armazene todos os livros em um Array chamado livros.
Utilize um laço for para percorrer todos os livros.
Exiba cada livro no seguinte formato:


1 - Dom Casmurro 
2 - 1984 
3 - O Pequeno Príncipe 
... 

Ao final, exiba: Total de livros cadastrados: 6
Se o livro atual for "Clean Code", exiba antes dele a mensagem: ⭐ Livro recomendado pelos
*/

const livro = ["Dom Casmurro","1984","O Pequeno Príncipe","Harry Potter","Clean Code","Código Limpo"]

for(i = 0;i < livro.length; i++) {
    if(livro[i] === "Clean Code") {
            console.log(`${i+1} - ⭐ Livro recomendado pelos desenvolvedores: ${livro[i]}`);
    } else {
        console.log(`${i+1} - ${livro[i]}`);
    }
}