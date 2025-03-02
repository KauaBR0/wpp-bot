# WhatsApp Bot - WWebJS

Este é um bot para WhatsApp utilizando a biblioteca [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js), que permite interação automatizada com mensagens e grupos no WhatsApp Web.

## Funcionalidades
- Gera um QR Code para autenticação no WhatsApp Web.
- Responde automaticamente a comandos predefinidos.
- Notifica mensagens apagadas por usuários.
- Envia uma mensagem de resposta a pedidos de entrada em grupos.
- Dá boas-vindas a novos membros em grupos.

## Comandos Disponíveis
Os usuários podem interagir com o bot usando os seguintes comandos:

| Comando      | Resposta |
|-------------|----------|
| `!link` | Links úteis: https://linktr.ee/ads.ifba |
| `!discord` | Link do Discord: https://discord.gg/PrR9byfFAn |
| `!sala` | Link do aplicativo para encontrar a sua sala (2024.1): https://find-your-class-front.vercel.app/ |
| `!calendario` | Link do calendário acadêmico: https://portal.ifba.edu.br/salvador/documentos/ensino/calendarios-academicos/2023/Calendario_2023_ENSINO_SUPERIOR.pdf |
| `!suap` | Link do SUAP: https://suap.ifba.edu.br/accounts/login/?next=/ |
| `!help` | Lista os comandos disponíveis |
| `!ping` | Responde com "pong 🏓" |
| `!teste` | Responde com "Fala trouxa" |

## Como Usar

### 1. Instale as dependências
Antes de rodar o bot, instale as dependências necessárias com:
```bash
npm install whatsapp-web.js qrcode-terminal
```

### 2. Execute o bot
Inicie o bot executando o seguinte comando:
```bash
node index.js
```

Ao rodar o script, um QR Code será gerado no terminal. Escaneie com o WhatsApp para autenticar.

## Eventos Implementados
- `message_revoke_everyone`: Captura mensagens deletadas e notifica o grupo.
- `group_join_request`: Responde automaticamente a pedidos de entrada em grupos.
- `group_join`: Dá boas-vindas a novos membros no grupo.
- `message`: Processa comandos recebidos.
- `ready`: Indica que o bot foi inicializado com sucesso.

## Observações
- O bot precisa estar autenticado no WhatsApp Web para funcionar.
- O QR Code expira rapidamente, sendo necessário regenerá-lo caso demore muito para escanear.

## Contribuições
Sinta-se à vontade para contribuir para este projeto enviando Pull Requests ou relatando problemas na seção de Issues.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

