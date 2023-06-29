const http = require('http');

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const config = require('./config/');
const { brotliCompress } = require('zlib');

const app = express();
const server = http.createServer(app);

server.listen(process.env.PORT, async () => {
    console.log(`\nServer successfully started on ${config.host}:${config.port}`);

    try {

        function randomKey() {
            let result = '';
            let str = '0123456789qwertyuiopasdfghjklzxcvbnm';

            function getRandom(min, max) {
                return Math.floor(Math.random() * max - min + 1) + min;
            }   

            for (let i = 0; i < 14; i++) {
                result += str[getRandom(0, str.length - 1)];
            }  
            
            let key = result;
            
            return key;
        }

        const bot = new TelegramBot(config.token, { polling: true });

        bot.on('message', async (message) => {
            const chatId = message?.chat?.id;
            const text = message?.text;

            if(text === '/start') {
                await bot.sendMessage(chatId, 'Привет, ниже слева, есть кнопка "форма", заполни её. 🤖', {
                    reply_markup: {
                        keyboard: [
                            [{ text: 'Магазин товаров', web_app: { url: config.webAppUrl}}]
                        ]
                    }
                });
            }
        
            if(message?.web_app_data?.data) {
                const data = JSON.parse(message?.web_app_data?.data);
                const invoiceButton = {
                text: "Купить",
                pay: true
            };      
        
            bot.sendInvoice(chatId, 'Оплата', 'Купленный товар будет отправлен в этот чат.', 'Payload', config.paymentsToken, 'RUB', [{ label: data?.label, amount: data?.amount }],
            {
                reply_markup: 
                {
                inline_keyboard: 
                [
                [invoiceButton]
                ]
                }
                
            });
            }
            
        });

        bot.on('pre_checkout_query', (preCheckoutQuery) => {
            bot.answerPreCheckoutQuery(preCheckoutQuery.id, true);
        });

        bot.on('successful_payment', async (message) => {
            await bot.sendMessage(
                message.chat.id,
                `Вы успешно оплатили ${message.successful_payment.total_amount / 100} руб.`,);
            await bot.sendMessage(
                message.chat.id,
                `Ваш ключ от товара - ${randomKey()}`,);
        });
         

    } catch (e) {
        console.log(`Failed to starting the bot:\n${e}`);
    }

   
});
