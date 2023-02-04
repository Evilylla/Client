require('dotenv')
    .config();

const config = {
    port: process.env.PORT,
    host: process.env.HOST,
    token: process.env.TG_TOKEN,
    webAppUrl: process.env.WEB_APP_HOST + ':' + process.env.WEB_APP_PORT,
};

module.exports = config;