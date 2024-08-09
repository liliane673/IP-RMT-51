const { default: axios } = require('axios');
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

            let orderId = "TRANSACTION_" + Math.floor(1_000_000 + Math.random() * 9_000_000)

            let parameter = {
                "transaction_details": {
                    "order_id": orderId,
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
            res.status(201).json({
                midtransToken,
                orderId
            })
        } catch (err) {
            next(err)
        }
    }

    static async userUpdate(req, res, next) {
        try {
            console.log(req.user, 'req.user====>>')
            const result = await User.update(
                {
                    isSubsribed: true,
                },
                {
                    where: {
                        id: Number(req.user.user.id)
                    }
                });
            console.log(result, '=====>>>')
            // console.log('disini---->>>')
            // const { orderId } = req.body;
            // const serverKey = "SB-Mid-server-e2INi_Gybdx2nW6ZIPwz51Ao";
            // const base64ServerKey = Buffer.from(serverKey + ':').toString('base64')

            // const response = await axiosInstance({
            //     method: 'get',
            //     url: `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
            //     headers: {
            //         Authorization: `Basic ${base64ServerKey}`
            //     }
            // })
            // console.log(response)
            res.status(200).json({ message: `user id ${req.user.user.id} success subscribed` })
        } catch (err) {
            next(err)
        }
    }
};