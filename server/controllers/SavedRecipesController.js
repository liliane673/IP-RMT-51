const { MySavedRecipe, Recipe, Fact, User, Category, Type } = require('../models')

module.exports = class SavedRecipeController {
    static async getAllSavedRecipes(req, res, next) {
        try {
            let user = req.user.user;
            let data = await MySavedRecipe.findAll({
                order: [['id', 'ASC']],
                include:
                    [
                        {
                            model: User,
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
}