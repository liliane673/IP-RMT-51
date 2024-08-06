const { MySavedRecipe, Recipe, Fact, User, Category, Type } = require('../models')

module.exports = class SavedRecipeController {
    static async getAllSavedRecipes(req, res, next) {
        try {
            const user = req.user.user;
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
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async addToSavedRecipes(req, res, next) {
        try {
            const { recipeId } = req.params;
            const user = req.user

            const data = await MySavedRecipe.create({ recipeId, userId: req.user.user.id });

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}