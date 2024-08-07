require('dotenv').config()

const { User } = require('../models');
const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken');

module.exports = class UserController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) {
                res.status(400).json({ message: "Email is required" });
                return;
            }
            if (!password) {
                res.status(400).json({ message: "Password is required" });
                return;
            }

            const user = await User.findOne({ where: { email } })
            // console.log(user);
            if (!user) {
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }

            const isPasswordVaild = comparePassword(password, user.password);
            if (!isPasswordVaild) {
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }

            const SECRET_KEY = process.env.SECRET_KEY
            const token = jwt.sign({ id: user.id }, SECRET_KEY);


            res.status(200).json({ access_token: token });
        } catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        try {
            // console.log(req.body,'====> masuk sini');
            const { username, email, password, phoneNumber, address } = req.body

            const user = await User.create({ username, email, password, phoneNumber, address })

            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email
            })
        } catch (err) {
            next(err)
        }
    }

    static async editProfile(req, res, next) {
        try {
            const userId = req.params.id;
            // console.log(userId, 'userId===>')

            const { bodyweight, height, preference } = req.body
            // console.log(req.body, 'req.body=====>>>>')

            const data = await User.findByPk(Number(userId));
            // console.log(data, 'data====>')
            if (data) {
                const result = await data.update({ bodyweight, height, preference });
                // console.log(result, 'result====>>')
                res.status(200).json(result)
            } else {
                res.status(404).json({ message: "User not found" })
            }

        } catch (err) {
            next(err)
        }
    }

}