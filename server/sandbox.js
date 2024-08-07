const cron = require('node-cron');

let token = 'asdasd'

function refreshToken() {
    return token = Math.random()
}

cron.schedule("*/5 * * * * *", () => {
    console.log("Cron Jalan untuk reset token", refreshToken());
})

function request() {
    console.log(token);
}


const inter = setInterval(() => {
    request()
}, 2000)
clearInterval(inter)

console.log();