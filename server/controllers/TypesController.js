const { Type } = require('../models')

module.exports = class TypeController {
    static async createType(req, res, next) {
        try {
            // console.log(req.body);
            const { name } = req.body
            const data = await Type.create({ name });
            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async getAllTypes(req, res, next) {
        try {
            let data = await Type.findAll()
            res.status(200).json(data)

        } catch (err) {
            next(err)
        }
    }

    static async updateTypeById(req, res, next) {
        try {
            const TypeId = req.params.id;
            const { name } = req.body

            const data = await Type.findByPk(Number(TypeId));
            if (data) {
                const result = await data.update({ name });
                res.status(200).json(result)
            } else {
                res.status(404).json({ message: "Type not found!" })
            }
        } catch (err) {
            next(err)
        }
    }
}