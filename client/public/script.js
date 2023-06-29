const tg = window.Telegram.WebApp;

const onClose = () => {
    tg.close()
}

document.getElementById('hello').innerHTML += tg.initDataUnsafe?.user?.username;
