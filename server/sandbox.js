const cron = require('node-cron');
const axios = require('axios');

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

async function getFSToken() {
    const clientID = process.env.FAT_SECRET_CLIENT_ID
    const clientSecret = process.env.FAT_SECRET_CLIENT_SECRET

    const options = {
        url: "https://oauth.fatsecret.com/connect/token",
        method: "POST",
        auth: {
            username: clientID,
            password: clientSecret,
        },
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            // authorization: `Username: ${process.env.fs_id} Password: ${process.env.fs_secret}`
        },
        data: {
            grant_type: "client_credentials",
            scope: "basic",
        },
        json: true,
    }

    let response = await axios(
        options
    );
    return response;
}

getFSToken()
console.log("run getToken ===>>>")