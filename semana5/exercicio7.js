/**
 * SISTEMA DE NOTIFICAÇÕES (USO DE HERANÇA E OVERRIDE)
 * ---------------------------------------------------
 * Implementação utilizando array e forEach para envio das mensagens.
 */

// 1. Classe Base (Pai)
class Notificacao {
  constructor(destinatario) {
    this.destinatario = destinatario;
  }

  enviar(mensagem) {
    console.log("Enviando notificação…");
  }
}

// 2. Classes Filhas com sobrescrita de método (Override)
class Email extends Notificacao {
  constructor(destinatario) {
    super(destinatario);
  }

  enviar(mensagem) {
    console.log(`Enviando E-mail para ${this.destinatario}: "${mensagem}"`);
  }
}

class SMS extends Notificacao {
  constructor(destinatario) {
    super(destinatario);
  }

  enviar(mensagem) {
    console.log(`Enviando SMS para ${this.destinatario}: "${mensagem}"`);
  }
}

class PushNotification extends Notificacao {
  constructor(destinatario) {
    super(destinatario);
  }

  enviar(mensagem) {
    console.log(`Enviando Push Notification para o dispositivo de ${this.destinatario}: "${mensagem}"`);
  }
}

class WhatsApp extends Notificacao {
  constructor(destinatario) {
    super(destinatario);
  }

  enviar(mensagem) {
    console.log(`Enviando WhatsApp para ${this.destinatario}: "${mensagem}"`);
  }
}

// ==========================================
// TESTES DO SISTEMA COM FOREACH
// ==========================================

// Criação de um array contendo instâncias de diferentes canais
const notificacoes = [
  new Notificacao("Geral"),
  new Email("carlos@email.com"),
  new SMS("(47) 99999-1111"),
  new PushNotification("UsuárioApp"),
  new WhatsApp("(47) 98888-2222")
];

// Mensagem padrão para o teste em lote
const mensagemEnvio = "Sua atualização importante está disponível.";

// Percorrendo o array com forEach e acionando o polimorfismo/override
notificacoes.forEach((notificacao) => {
  notificacao.enviar(mensagemEnvio);
});

// Teste extra da classe pai isolada conforme o exemplo original
console.log("-----------------------------------");
const notificacaoInicial = new Notificacao();
notificacaoInicial.enviar();