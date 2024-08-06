import OpenAI from "openai";

const axios = require('axios');
require('dotenv').config()

module.exports = class OpenAiController {
    static async getRecipeRecommendation(req, res, next) {
        try {
            const openai = new OpenAI({
                apiKey: process.env.OPEN_AI_API_KEY
            });
            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: "You are a helpful assistant." }],
                model: "gpt-4o-mini",
            });

            console.log(completion.choices[0]);
        } catch (err) {
            next(err)
        }
    }
};