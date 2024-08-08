const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');

const { MySavedRecipe, Recipe, User } = require('../models')

module.exports = class OpenAiController {
    static async getRecipeRecommendation(req, res, next) {
        try {
            const user = req.user.user
            const data = await MySavedRecipe.findAll({
                order: [['id', 'ASC']],
                include:
                    [
                        {
                            model: User,
                            where: {
                                id: user.id
                            },
                        },
                        {
                            model: Recipe,
                        }
                    ],
            })
            console.log(data, '---->data');

            // let newArrayRecipe = []
            // data.forEach((element, index) => {
            //     newArrayRecipe.push({
            //         'recipe_number': index,
            //         'recipe_name': element.Recipe.title,
            //         'recipe_ingredients': element.Recipe.ingredient,
            //         'recipe_instructions': element.Recipe.direction,
            //     });
            // });

            // console.log(newArrayRecipe, 'newArrayRecipe----->>>');

            // let newingredients = []
            // newArrayRecipe.forEach((element) => {
            //     // console.log(element['recipe_ingredients'])
            //     element['recipe_ingredients'].forEach((ing) => {
            //         // console.log(ing.ingredient_description, '====>>')
            //         newingredients.push(ing.ingredient_description)
            //     });
            // });
            // console.log(newingredients)

            const { preference } = req.body
            // console.log(preference, '>>>>>')

            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `give me few recommendation recipes to ${preference} with some recipes ${data}
            the response must be in JSON with the format like this  
            {
                "Response": {...},
                "Recommendation Recipes":
                [
                    {
                        "Recipe Name" : {...}
                        "Why":{...} 
                        "How to Enhance":{...}
                    }
                ]
            }`

            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();

            console.log(text);

            res.status(200).json({ text })
        } catch (err) {
            next(err)
        }
    }
};