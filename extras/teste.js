class CPF {
  constructor(cpf) {
    if (typeof cpf !== 'string' && typeof cpf !== 'number') {
      throw new Error('CPF inválido.');
    }

    this.cpf = String(cpf).replace(/[^0-9]/g, '');

    if (this.cpf.length !== 11) {
      throw new Error('O CPF deve ter exatamente 11 números,');
    }
  }

  validar() {
    // Bloqueia CPFs com todos os dígitos iguais (ex: 111.111.111-11)
    if (/^(\d)\1+$/.test(this.cpf)) {
      return false;
    }

    let soma = 0;
    let resto;

    // 1º Dígito Verificador
    for (let i = 0; i < 9; i++) {
      soma += parseInt(this.cpf.substring(i, i + 1)) * (10 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(this.cpf.substring(9, 10))) {
      return false;
    }

    // 2º Dígito Verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(this.cpf.substring(i, i + 1)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(this.cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }
}

// Exemplo de uso:
try {
  const cpf1 = new CPF('02220991946');
  console.log(`Resultado para CPF1: ${cpf1.validar()}`); // true (se for válido matematicamente)

  const cpf2 = new CPF('11111111111');
  console.log(`Resultado para CPF2: ${cpf2.validar()}`); // false
} catch (error) {
  console.error(error.message);
}