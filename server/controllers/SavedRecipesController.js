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
                            attributes: ["username", "email", "phoneNumber", "address", "isSubscribed", "bodyweight", "height", "preference"],
                            where: {
                                id: user.id
                            },
                        },
                        {
                            model: Recipe,
                            include: {
                                model: Fact
                            }
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

            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async deleteSavedRecipes(req, res, next) {
        try {
            const savedRecipeId = req.params.id;
            // console.log(savedRecipeId, '>>>>')

            const data = await MySavedRecipe.findByPk(Number(savedRecipeId));
            // console.log(data, 'ini di controller===>')

            if (data) {
                await data.destroy();
                res.status(200).json({ message: `Recipe success to delete!` })
            } else {
                res.status(404).json({ message: "Recipe not found" })
            }
        } catch (err) {
            next(err)
        }
    }

}