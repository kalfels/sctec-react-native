// Defina o operador desejado aqui (ex: '==', '===', '!=', '!==', '>', '<', '>=', '<=')
const operador = '==='; 

const a = 10;
const b = 10;

console.log(`Resultado da comparação (${a} ${operador} ${b}):`);

switch (operador) {
    case '==':
        console.log(a == b);  // Igualdade (valor)
        break;
    case '===':
        console.log(a === b); // Igualdade estrita (valor e tipo)
        break;
    case '!=':
        console.log(a != b);  // Desigualdade
        break;
    case '!==':
        console.log(a !== b); // Desigualdade estrita
        break;
    case '>':
        console.log(a > b);
        break;
    case '<':
        console.log(a < b);
        break;
    case '>=':
        console.log(a >= b);
        break;
    case '<=':
        console.log(a <= b);
        break;
    default:
        console.log("Operador não reconhecido.");
}