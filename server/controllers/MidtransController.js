require('dotenv').config()
const { User } = require('../models')
const midtransClient = require('midtrans-client');

module.exports = class MidtransController {
    static async getToken(req, res, next) {
        try {

            const user = await User.findByPk(req.user.user.id)
            // console.log(user)
            // if (user.isSubscribed) {
            //     throw { name: "Already_subscribe" };
            // }

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.floor(1_000_000 + Math.random() * 9_000_000),
                    "gross_amount": 10_000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": user.email,
                }
            };

            const midtransToken = await snap.createTransaction(parameter)

            console.log(midtransToken)
            res.status(201).json(midtransToken)
        } catch (err) {
            next(err)
        }
    }
};