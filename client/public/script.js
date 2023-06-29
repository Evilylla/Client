const tg = window.Telegram.WebApp;
tg.expand();

document.getElementById('hello').innerHTML += tg.initDataUnsafe?.user?.username;
document.getElementById('tg_uid').value = tg.initDataUnsafe?.user?.id;

const onClose = () => {
    tg.close()
}
