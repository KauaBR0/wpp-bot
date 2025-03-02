const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({});
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

const objects = {
    '!link': 'Links úteis: https://linktr.ee/ads.ifba',
    '!discord': 'Link do discord: https://discord.gg/PrR9byfFAn',
    '!sala': 'Link do aplicativo para encontrar a sua sala (2024.1): https://find-your-class-front.vercel.app/',
    '!calendario': 'Link do calendário acadêmico: https://portal.ifba.edu.br/salvador/documentos/ensino/calendarios-academicos/2023/Calendario_2023_ENSINO_SUPERIOR.pdf',
    '!suap': 'Link do suap: https://suap.ifba.edu.br/accounts/login/?next=/',
    '!help': 'Comandos disponíveis: \n\n!link \n!discord \n!sala \n!calendario \n!suap \n!ping',
    '!ping': 'pong 🏓',
    '!teste' : 'Fala trouxa'
};



client.on('message_revoke_everyone', async (after, before) => {
    // Fired whenever a message is deleted by anyone (including you)
    console.log(after); 
    if (before) {
        console.log(before); 

        const messageText = `enviou uma mensagem e apagou! Mensagem: ${before.body}`;

        await client.sendMessage(before.from, messageText, {
            mentions: [before.author]
        });
    }
    const messageText = `enviou uma mensagem e apagou! Mensagem: ${before.body}`;

        await client.sendMessage(before.from, messageText);
});

client.on('group_join_request', async (notification) => {
    const userId = notification.id.participant;
    const chat = await client.getChatById(userId);
    await chat.sendMessage('Sua solicitação para entrar no grupo foi recebida e está sendo analisada. Em breve você receberá uma resposta.');
});

client.on('group_join', async (notification) => {
    // Usuário foi adicionado ou entrou no grupo
    console.log('join', notification);
    // Enviar mensagem de boas-vindas
    const chat = await notification.getChat();
    const user = notification.id.participant; // ID do usuário que entrou no grupo
    chat.sendMessage(`Bem-vindo ao grupo, @${user.split('@')[0]}!`, {
        mentions: [user]
    });
});

client.on('message', message => {
    console.log(message.body)
    if (message.body.startsWith('!')) {
        const command = message.body.slice(1).toLowerCase();

        if (objects.hasOwnProperty('!' + command)) {
            message.reply(objects['!' + command]);
        } else {
            message.reply('Comando não encontrado. Use !help para ver a lista de comandos disponíveis.');
        }
    }
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
