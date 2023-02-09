const tg = window.Telegram.WebApp;

const onClose = () => {
    tg.close()
}

let username = tg.initDataUnsafe?.user?.username;
document.getElementById('hello').innerHTML += username;