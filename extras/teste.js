// extras/teste.js
class CPF {
    constructor(cpf) {
        this.validateInputType(cpf);
        // Limpa e transforma para string
        this.cpf = String(cpf).replace(/[^0-9]/g, '');
        this.validateLength();
    }

    /**
     * Valida se a entrada é string ou number.
     */
    validateInputType(cpf) {
        if (typeof cpf !== 'string' && typeof cpf !== 'number') {
            throw new Error('CPF inválido. Deve ser um número.');
        }
    }

    /**
     * Garante que o CPF tenha exatamente 11 dígitos.
     */
    validateLength() {
        if (this.cpf.length !== 11) {
            throw new Error('O CPF deve ter exatamente 11 números');
        }
    }

    /**
     * Calcula um dígito verificador baseado em uma sequência de dígitos iniciais.
     * O cálculo utiliza pesos decrescentes (N, N-1, ..., 2).
     * @param {string} initialDigits - Os dígitos a serem usados no cálculo (9 ou 10).
     * @returns {number} O dígito verificador calculado.
     */
    calcularDigitoVerificador(initialDigits) {
        let soma = 0;
        const numDigits = initialDigits.length;

        // Peso começa em numDigits e decresce até 2 (o peso do último dígito).
        for (let i = 0; i < numDigits; i++) {
            const peso = numDigits - i;
            soma += parseInt(initialDigits[i]) * peso;
        }

        // Cálculo do resto módulo 11
        let resto = soma % 11;
        let digitoVerificador;

        // Regra de cálculo padrão:
        if (resto < 2) {
            digitoVerificador = 0;
        } else {
            // O dígito é 11 menos o resto.
            digitoVerificador = 11 - resto;
        }

        return digitoVerificador;
    }

    /**
     * Valida se o CPF é matematicamente correto seguindo os algoritmos oficiais.
     * @returns {boolean} True se for válido, false caso contrário.
     */
    validar() {
        // 1. Checa dígitos repetidos (Ex: 11111111111)
        const identicalDigits = /^(\d)\1{10}$/;
        if (identicalDigits.test(this.cpf)) {
            return false;
        }

        // --- Verificação do Primeiro Dígito Verificador (D10) ---
        // Usa os primeiros 9 dígitos para calcular o D10.
        const cpfBase1 = this.cpf.substring(0, 9);
        const digitoCalculado1 = this.calcularDigitoVerificador(cpfBase1);

        if (digitoCalculado1 !== parseInt(this.cpf[9])) {
            return false; // O D10 não corresponde ao calculado
        }


        // --- Verificação do Segundo Dígito Verificador (D11) ---
        // Usa os primeiros 10 dígitos para calcular o D11.
        const cpfBase2 = this.cpf.substring(0, 10);
        const digitoCalculado2 = this.calcularDigitoVerificador(cpfBase2);

        if (digitoCalculado2 !== parseInt(this.cpf[10])) {
            return false; // O D11 não corresponde ao calculado
        }
        
        // Se passou por todas as verificações, é válido.
        return true;
    }
}

// Exemplo de uso:
try {
  console.log("-----------------------------------");
  console.log("Testando CPFs fornecidos pelo usuário:");

  // Teste 1: O CPF que deveria ser validado (Passará se a lógica matemática estiver correta)
  const cpf1 = new CPF('02220991946');
  console.log(`Resultado para CPF1 (022...): ${cpf1.validar()}`);

  // Teste 2: Outro exemplo solicitado pelo usuário (Passará se a lógica matemática estiver correta)
  const cpf3 = new CPF('99409931029');
  console.log(`Resultado para CPF3 (994...): ${cpf3.validar()}`);

  // Teste 3: Um exemplo conhecido como válido matematicamente
  const cpfValidoExemplo = new CPF('37045893274');
  console.log(`Resultado para CPF Válido (370...): ${cpfValidoExemplo.validar()}`);

  // Teste 4: CPF com dígitos repetidos (deve retornar FALSE)
  const cpf2 = new CPF('11111111111');
  console.log(`Resultado para CPF2 (repetido): ${cpf2.validar()}`); // false
} catch (error) {
  console.error("Erro na execução:", error.message);
}