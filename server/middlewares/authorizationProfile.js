const { User } = require('../models')

async function authorizationProfile(req, res, next) {
    const user = req.user.user;
    const userId = req.params.id
    console.log(userId, 'userId di authorization ===>>>>')

    try {
        const findUser = await User.findByPk(userId);
        console.log(findUser, 'findUser di authorization')

        if (!findUser) throw { name: "User not found" };
        else {
            if (findUser.id !== user.id) {
                console.log(findUser.id, 'findUser.id', '====', user.id, 'userId')
                throw { name: "Forbidden" };
            } else {
                next()
            }
        }
    } catch (err) {
        next(err)
    }

}

module.exports = authorizationProfile