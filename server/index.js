const http = require('http');

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const config = require('./config/');

const app = express();
const server = http.createServer(app);

server.listen(process.env.PORT, async () => {
    console.log(`\nServer successfully started on ${config.host}:${config.port}`);

    try {
        const bot = new TelegramBot(config.token, { polling: true });

        bot.on('message', async (message) => {
            const chatId = message?.chat?.id;
            const text = message?.text;

            if(text === '/start') {
                await bot.sendMessage(chatId, 'Привет, ниже появится кнопка, ты должен пройти регистрацию(авторизацию). 🤖', {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Вход.', web_app: { url: config.webAppUrl + "/formlogin"} }]
                        ]
                    }
                });
            }
        });
    } catch (error) {
        console.log(`Failed to starting the bot:\n${error}`);
    }
});
