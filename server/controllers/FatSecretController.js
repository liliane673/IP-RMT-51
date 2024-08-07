const axios = require('axios');
require('dotenv').config()

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

async function getRecipes(access_token, recipe_id) {
    console.log(recipe_id, 'recipe_id=====>>>')
    let { data } = await axios({
        url: "https://platform.fatsecret.com/rest/server.api",
        method: "get",
        headers: {
            Authorization: "Bearer " + access_token
        },
        params: {
            method: "recipe.get.v2",
            recipe_id: recipe_id,
            format: "json",
            max_results: 10
        }
    })
    // console.log(data);
    if (data.error) {
        return null;
    } else {
        return data
    }
}


module.exports = { getFSToken, getRecipes }