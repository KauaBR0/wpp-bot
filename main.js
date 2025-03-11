// Load environment variables from .env file for local development
require('dotenv').config();

const { Client } = require('whatsapp-web.js');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const qrcode = require('qrcode-terminal');
const express = require('express');
const qr = require('qrcode');
const path = require('path');

// Express app setup
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Store the QR code data
let qrCodeData = null;
let connectionStatus = 'disconnected';

// API endpoint to get the QR code
app.get('/qrcode', (req, res) => {
    if (connectionStatus === 'connected') {
        return res.json({ status: 'connected' });
    }
    
    if (qrCodeData) {
        return res.json({ qrcode: qrCodeData });
    }
    
    return res.json({ status: 'waiting' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Open this URL in your browser to see the QR code`);
});


const chatIdTeste = "120363391407848498@g.us"
const chatId = '557193631886-1433983949@g.us'
const chatJulia = "557499990520@c.us"
const messageConfirmation = 'Olá!\n\nEu sou o Kowalski 🐧, uma automação criada para auxiliar a comunidade do curso de ADS - IFBA, campus Ssa.\n\nPra entrar no grupo de ADS, por favor informar o número da matrícula.'

const wwebVersion = '2.3000.1015010030-alpha';
// MongoDB connection string - use environment variable in production
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-mongodb-connection-string';

// Initialize MongoDB store
let store;
let client;

// Connect to MongoDB and initialize the client
async function initializeClient() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        
        store = new MongoStore({ mongoose: mongoose });
        
        client = new Client({
            puppeteer: {
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process',
                    '--disable-gpu'
                ],
                headless: true,
            },
            authStrategy: store,
            webVersionCache: {
                type: 'remote',
                remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
            }
        });
        
        setupClientEvents();
        client.initialize();
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

function setupClientEvents() {
    client.on('qr', async qrText => {
        // Generate QR code for terminal (optional, can be removed)
        qrcode.generate(qrText, { small: true });
        
        // Generate QR code as data URL for web display
        try {
            qrCodeData = await qr.toDataURL(qrText);
            console.log('QR Code generated for web display');
        } catch (err) {
            console.error('Error generating QR code:', err);
        }
    });

const objects = {
    '!link': 'Links úteis: https://linktr.ee/ads.ifba',
    '!discord': 'Link do discord: https://discord.gg/PrR9byfFAn',
    '!sala': 'Link do aplicativo para encontrar a sua sala (2024.1): https://find-your-class-front.vercel.app/',
    '!calendario': 'Link do calendário acadêmico: https://portal.ifba.edu.br/salvador/documentos/ensino/calendarios-academicos/2023/Calendario_2023_ENSINO_SUPERIOR.pdf',
    '!suap': 'Link do suap: https://suap.ifba.edu.br/accounts/login/?next=/',
    '!help': 'Comandos disponíveis: \n\n!link \n!discord \n!sala \n!calendario \n!suap \n!ping',
    '!ping': 'pong 🏓',
    '!teste': 'Fala trouxa'
};

client.on('message_revoke_everyone', async (after, before) => {
    // Fired whenever a message is deleted by anyone (including you)
    console.log(after);
    const messageText = `@${before.author.split('@')[0]} enviou uma mensagem e apagou! \n Mensagem: ${before.body}`;
    if (before) {
        console.log(before);
        return await client.sendMessage(before.from, messageText, {
            mentions: [before.author]
        });
    }
    return await client.sendMessage(before.from, messageText);
});


client.on('group_membership_request', async (notification) => {
    console.log('New membership request:', notification);
    // Enviar uma mensagem para a pessoa que solicitou
    const requesterId = notification.author;
    await client.sendMessage(requesterId, messageConfirmation);
    return client.sendMessage(chatJulia, `Nova solicitação de entrada no grupo de ADS: ${requesterId}`);
});

client.on('group_join', async (notification) => {
    // Usuário foi adicionado ou entrou no grupo
    console.log('join', notification);
    // Enviar mensagem de boas-vindas
    if (notification.chatId === chatId) {
        const chat = await notification.getChat();
        const user = notification.id.participant; // ID do usuário que entrou no grupo
        return chat.sendMessage(`Bem-vindo ao grupo, @${user.split('@')[0]}!`, {
            mentions: [user]
        });
    }
    return true
});

client.on('message', message => {
    console.log('event Message', message)
    if (message.body.startsWith('!')) {
        const command = message.body.slice(1).toLowerCase();
        if (objects.hasOwnProperty('!' + command)) {
            return message.reply(objects['!' + command]);
        } else {
            return message.reply('Comando não encontrado. Use !help para ver a lista de comandos disponíveis.');
        }
    }
    return true
});

    client.on('ready', () => {
        console.log('Client is ready!');
        connectionStatus = 'connected';
    });
}

// Initialize the WhatsApp client
initializeClient();
