const axios = require('axios');
const cron = require('node-cron');
require('dotenv').config()

module.exports = class FatSecretController {
    static async getToken(req, res, next) {
        try {
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

            console.log(response.data, "====> ini token fatsecret")
            res.status(200).json(response.data);
        } catch (err) {
            next(err)
        }
    }


    static async getRecipes(req, res, next) {
        cron.schedule('* * * * * *', () => {
            console.log('running a task every minute >>');
        });

        try {
            cron.schedule('* * * * * *', () => {
                console.log('running a task every minute >>');
            });

            const access_token = req.headers.authorization;
            console.log(access_token, 'accesstoken fatsecret====>>');
            const [bearer, token] = access_token.split(" ");

            let response = await axios({
                url: "https://platform.fatsecret.com/rest/server.api",
                method: "get",
                headers: {
                    Authorization: "Bearer " + token
                },
                params: {
                    method: "recipe.get.v2",
                    recipe_id: 5,
                    format: "json",
                    max_results: 10
                }
            })
            console.log(response.data)

            res.status(200).json(response.data);
        } catch (err) {
            next(err)
        }
    }
};