'use strict';
require('dotenv').config()
const axios = require('axios');
const { getFSToken, getRecipes } = require('../controllers/FatSecretController')

const { Recipe } = require('../models');
// async function getFSToken() {
//   console.log("disini====>>>")

//   const clientID = process.env.FAT_SECRET_CLIENT_ID
//   console.log(clientID, '===>>')
//   const clientSecret = process.env.FAT_SECRET_CLIENT_SECRET

//   const options = {
//     url: "https://oauth.fatsecret.com/connect/token",
//     method: "POST",
//     auth: {
//       username: clientID,
//       password: clientSecret,
//     },
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//       // authorization: `Username: ${process.env.fs_id} Password: ${process.env.fs_secret}`
//     },
//     data: {
//       grant_type: "client_credentials",
//       scope: "basic",
//     },
//     json: true,
//   }

//   let response = await axios(
//     options
//   );

//   // fs_token = response.data.access_token

//   return response;
// }

// async function getRecipes() {
//   const access_token = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ4NDUzNUJFOUI2REY5QzM3M0VDNUNBRTRGMEJFNUE2QTk3REQ3QkMiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJTRVUxdnB0dC1jTno3Rnl1VHd2bHBxbDkxN3cifQ.eyJuYmYiOjE3MjMwMDA1ODQsImV4cCI6MTcyMzA4Njk4NCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5NGI4ZTk1MzI3ODA0YmI0ODI5MmEwNjMwNjU2MzVjMyIsInNjb3BlIjpbImJhc2ljIl19.Tg9xKKiOVX9TzSAw6X0DklTD40fG057fVYALst6GBkzI-DFWqEXm1q6we1_1CKHotJYTP2-XVhHb41OtqjAsCFQYEdpDv2Ypc0wt8eTt63qI12wCWiqG7lJXNKmmwlZWCNCtJytYKxTZQ0SuKpB-z6aI0_q-NIUTkM5NjYZXjJ_NKjwxDpFOY5kHtyFWTQzH1Ugv0yLlEJ-ZAay_B8djmVNxtJUVSR-PW3HFKYSRVttwgcB0LyUB9ID4vqoQp1-x-fmzubSAmA7wzx86zKk6n-yJSUJXxAINXj7ACIb1PzLMvOzA11j60lXzPAxwXv11fQugXRGMYLcusNgelWYUWw"
//   // console.log(access_token, 'accesstoken fatsecret====>>');
//   const [bearer, token] = access_token.split(" ");

//   let response = await axios({
//     url: "https://platform.fatsecret.com/rest/server.api",
//     method: "get",
//     headers: {
//       Authorization: "Bearer " + token
//     },
//     params: {
//       method: "recipe.get.v2",
//       recipe_id: 5,
//       format: "json",
//       max_results: 10
//     }
//   })
//   console.log(response.data)
//   return response.data
// }
let fs_token = ""

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fs_token = await getFSToken()
    // console.log(fs_token.data.access_token, 'fs_token.access_token===>>>')

    let number = 1;
    let newFact = [];
    let newDataRecipe = [];

    try {
      for (let i = 1; i < 20; i++) {
        const recipe_id = Math.ceil(Math.random() * 1_00 + 12)

        const dataRecipe = await getRecipes(fs_token.data.access_token, recipe_id)

        if (dataRecipe) {

          newDataRecipe.push({
            "title": dataRecipe.recipe.recipe_name,
            "grams_per_portion": dataRecipe.recipe.grams_per_portion,
            "number_of_servings": dataRecipe.recipe.number_of_servings,
            "ingredient": dataRecipe.recipe.ingredients.ingredient,
            "direction": dataRecipe.recipe.directions.direction,
            "imgUrl": "https://wallpaperaccess.com/full/767042.jpg",
            "category": dataRecipe.recipe.recipe_categories.recipe_category[0].recipe_category_name,
            "type": dataRecipe.recipe.recipe_types.recipe_type[0],
            "factId": number,
            "createdAt": new Date(),
            "updatedAt": new Date()
          })
          newFact.push({
            ...dataRecipe.recipe.serving_sizes.serving,
            id: number,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          number++;
        }
      }
      //console.dir({ newFact }, { depth: 4 })
      console.dir({ newDataRecipe }, { depth: 4 })
      await queryInterface.bulkInsert('Facts', newFact)
      // await Recipe.bulkCreate(newDataRecipe)
      await queryInterface.bulkInsert('Recipes', newDataRecipe, {}, {
        ingredient: { type: new Sequelize.JSON() },
        direction: { type: new Sequelize.JSON() }
      });
    } catch (error) {
      console.log(error.message)
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Facts', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    });

    await queryInterface.bulkDelete('Recipes', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    });

  }
};
