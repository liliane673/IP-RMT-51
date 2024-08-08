const cron = require('node-cron');
const axios = require('axios');
const { getFSToken, getRecipes } = require('./controllers/FatSecretController')


let token = 'asdasd'

function refreshToken() {
    return token = Math.random()
}

// cron.schedule("*/5 * * * * *", () => {
// console.log("Cron Jalan untuk reset token", refreshToken());
// })

function request() {
    console.log(token);
}


const inter = setInterval(() => {
    request()
}, 2000)
clearInterval(inter)

// console.log();

// cron.schedule("*/5 * * * * *", () => {
//     console.log("Cron Jalan untuk reset token", tesToken());
// })

async function tesToken() {
    // console.log("tesToken===>")
    const fs_token = await getFSToken()
    console.log(fs_token.data.access_token, "run getToken ===>>>")
}

// tesToken() 

