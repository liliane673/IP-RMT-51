const OpenAI = require("openai");
const axios = require('axios');
require('dotenv').config()

const { MySavedRecipe, Recipe, User } = require('../models')

module.exports = class OpenAiController {
    static async getRecipeRecommendation(req, res, next) {
        try {
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

            const input = req.body

            const openai = new OpenAI({
                apiKey: process.env.OPEN_AI_API_KEY
            });
            const completion = await openai.chat.completions.create({
                messages: [{
                    role: "system",
                    content: `give me recommendation recipes above if i want to ${input}. the response must be in JSON with the format like this :
                    {
                        "Response": {...},
                        "Recommendation Recipes":{...}
                        "Why":{...}
                        "How to Enhance":{...}
                    }`
                }],
                model: "gpt-4o-mini",
            });
            // const completion = await openai.chat.completions.create({
            //     messages: [{ role: "system", content: "You are a helpful assistant." }],
            //     model: "gpt-4o-mini",
            // });

            console.log(completion.choices[0]);

            console.log(openai)
        } catch (err) {
            next(err)
        }
    }
};