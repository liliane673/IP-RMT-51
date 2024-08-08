require('dotenv').config()

const { User } = require('../models');
const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');

module.exports = class UserController {
    static async googleLogin(req, res, next) {
        try {
            // console.log(req.body, '=====>controller')
            if (!req.body.googleToken) {
                throw { name: "MissingGoogleToken" }
            }

            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: req.body.googleToken,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const response = ticket.getPayload();
            // console.log(response)
            // const userid = payload['sub'];
            // If the request specified a Google Workspace domain:
            // const domain = payload['hd'];

            const [user] = await User.findOrCreate({
                where: { email: response.email },
                defaults: {
                    username: response.given_name,
                    email: response.email,
                    password: Date.now().toString() + "DummyGoogleLogin" + Math.random().toFixed(0),
                }
            })
            const SECRET_KEY = process.env.SECRET_KEY
            const token = jwt.sign({ id: user.id }, SECRET_KEY);
            res.status(200).json({ access_token: token });
        } catch (err) {
            next(err)
        }
    }

    static async getDataUser(req, res, next) {
        try {
            const user = req.user.user
            // console.log(user, '==>user')
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                isSubscribed: user.isSubscribed,
                bodyweight: user.bodyweight,
                height: user.height,
                preference: user.preference,
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            // console.log(req.body, '=====>>')
            if (!email) {
                res.status(400).json({ message: "Email is required" });
                return;
            }
            if (!password) {
                res.status(400).json({ message: "Password is required" });
                return;
            }

            const user = await User.findOne({ where: { email } })
            // console.log(user, '===>>>>');
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
            const { username, email, password, phoneNumber, address, bodyweight, height, preference } = req.body

            const user = await User.create({ username, email, password, phoneNumber, address, bodyweight, height, preference })

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
            console.log(data, 'data====>')
            if (data) {
                const result = await data.update({ bodyweight, height, preference });
                console.log(result, 'result====>>')
                res.status(201).json({
                    id: result.id,
                    username: result.username,
                    email: result.email,
                    phoneNumber: result.phoneNumber,
                    address: result.address,
                    isSubscribed: result.isSubscribed,
                    bodyweight: result.bodyweight,
                    height: result.height,
                    preference: result.preference
                })
            } else {
                res.status(404).json({ message: "User not found" })
            }

        } catch (err) {
            next(err)
        }
    }

}