const { Recipe, Fact, User } = require('../models')

module.exports = class RecipeController {
    static async getAllRecipes(req, res, next) {
        try {
            let user = req.user.user;
            let data = await Recipe.findAll({
                order: [['id', 'ASC']],
                include:
                    [
                        {
                            model: Fact,
                        }
                    ],

            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async getRecipeById(req, res, next) {
        try {
            const RecipeId = req.params.id;
            const data = await Recipe.findOne({
                where: {
                    id: Number(RecipeId)
                },
                include:
                    [
                        {
                            model: Fact,
                        },
                    ],
            })
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: "Recipe not found" })
            }
        } catch (err) {
            next(err)
        }
    }
}