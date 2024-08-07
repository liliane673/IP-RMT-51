'use strict';
require('dotenv').config()
const axios = require('axios');
const { getFSToken, getRecipes } = require('../controllers/FatSecretController')

const { Recipe } = require('../models');

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
