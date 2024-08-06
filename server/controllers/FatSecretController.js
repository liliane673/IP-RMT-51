const axios = require('axios');
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
            // console.log(err.response.data)
        }
    }
};