const { MySavedRecipe, User } = require('../models')

async function authorization(req, res, next) {
    const user = req.user.user;
    const savedRecipeId = req.params.id
    console.log(savedRecipeId, 'savedRecipeId di authorization ===>>>>')

    try {
        const savedRecipe = await MySavedRecipe.findByPk(savedRecipeId);
        console.log(savedRecipe, 'savedRecipe di authorization')

        if (!savedRecipe) throw { name: "Saved Recipe not found" };
        else {
            if (savedRecipe.userId !== user.id) {
                console.log(savedRecipe.UserId, 'savedRecipe.UserId', '====', user.id, 'userId')
                throw { name: "Forbidden" };
            } else {
                next()
            }
        }
    } catch (err) {
        next(err)
    }

}

module.exports = authorization