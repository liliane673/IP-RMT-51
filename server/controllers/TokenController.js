const axios = require('axios');

module.exports = class TokenController {
    static async getToken(req, res, next) {
        try {
            const clientID = '94b8e95327804bb48292a063065635c3'
            const clientSecret = '16ddddaacd2341e187522a12f957892e'

            let data = await axios({
                method: 'POST',
                url: 'https://oauth.fatsecret.com/connect/token',
                auth: {
                    user: clientID,
                    password: clientSecret
                },
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                form: {
                    'grant_type': 'client_credentials',
                    'scope': 'basic'
                },
                json: true
            });

            console.log(data, "====> ini token fatsecret")
            // request(options, function (error, response, body) {
            //     if (error) throw new Error(error);

            //     console.log(body);
        } catch (err) {
            next(err)
            console.log(err)
        }
    }
};