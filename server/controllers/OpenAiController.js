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
            // console.log(data);

            const { preference } = req.body
            // console.log(preference, '>>>>>')

            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


            const prompt = `give me recommendation recipes above to ${preference}. the response must be in JSON with the format like this :
            {
                "Response": {...},
                "Recommendation Recipes":
                [
                    {
                        "Recipe Name" : {...}
                        "Ingredients" : {...}
                        "Instrucions" : {...}
                        "Why":{...} 
                        "How to Enhance":{...}
                    }
                ]
            }`

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            console.log(text);

            res.status(201).json(text)
        } catch (err) {
            next(err)
        }
    }
};