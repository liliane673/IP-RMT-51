const { User } = require('../models');
const { signToken, verifyToken } = require('../helpers/jwt')


//add middleware
async function authentication(req, res, next) {
    console.log(req.headers, "header====>>>")
    const access_token = req.headers['authorization-accesstoken'];
    console.log(access_token, 'accesstoken====>>');

    try {
        if (!access_token) {
            throw { name: "Unauthenticated" }
        }

        const [bearer, token] = access_token.split(" ");
        if (bearer !== "Bearer") {
            throw { name: "Unauthenticated" }
        }

        const payload = verifyToken(token)
        // console.log({payload});

        const user = await User.findByPk(payload.id)
        // console.log(user, '=====>USER')
        if (!user) {
            throw { name: "Unauthenticated" }
        }

        req.user = {
            user
        }

        next()

    } catch (err) {
        next(err)
    }

}

module.exports = authentication