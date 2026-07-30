class CPF {
    constructor(cpf) {
        this.validateInputType(cpf);
        this.cpf = String(cpf).replace(/[^0-9]/g, '');
        this.validateLength();
    }

    validateInputType(cpf) {
        if (typeof cpf !== 'string' && typeof cpf !== 'number') {
            throw new Error('CPF inválido.');
        }
    }

    validateLength() {
        if (this.cpf.length !== 11) {
            throw new Error('O CPF deve ter exatamente 11 números');
        }
    }

    validar() {
        const identicalDigits = /^(\d)\1+$/;
        const digitsSum = this.calculateSumOfDigits();
        const firstDigitVerifier = this.getDigitVerifier(9, digitsSum);
        const secondDigitVerifier = this.getDigitVerifier(10, this.calculateSumOfDigits([firstDigitVerifier]));
        
        if (identicalDigits.test(this.cpf) || firstDigitVerifier !== parseInt(this.cpf[9]) 
            || secondDigitVerifier !== parseInt(this.cpf[10])) {
            return false;
        }

        return true;
    }

    calculateSumOfDigits(digitVerifiers = []) {
        let sum = 0;
        for (let i = 0; i < this.cpf.length - digitVerifiers.length; i++) {
            sum += parseInt(this.cpf[i]) * (this.cpf.length + 1 - i - digitVerifiers.length);
        }
        
        digitVerifiers.forEach((verifier, index) => {
            sum += verifier * (12 - this.cpf.length - index); // Adjust the weight according to CPF length
        });

        return sum;
    }

    getDigitVerifier(digitPosition, digitsSum) {
        const resto = (digitsSum * 10) % 11;
        return resto === 10 || resto === 11 ? 0 : resto;
    }
}

// Exemplo de uso:
try {
  const cpf2 = new CPF('11111111111');
  console.log(`Resultado para CPF2: ${cpf2.validar()}`); // false
} catch (error) {
  console.error(error.message);
}