const { Category } = require('../models')

module.exports = class CategoryController {
    static async createCategory(req, res, next) {
        try {
            // console.log(req.body);
            const { name } = req.body
            const data = await Category.create({ name });
            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async getAllCategories(req, res, next) {
        try {
            let data = await Category.findAll()
            res.status(200).json(data)

        } catch (err) {
            next(err)
        }
    }

    static async updateCategoryById(req, res, next) {
        try {
            const categoryId = req.params.id;
            const { name } = req.body

            const data = await Category.findByPk(Number(categoryId));
            if (data) {
                const result = await data.update({ name });
                res.status(200).json(result)
            } else {
                res.status(404).json({ message: "Category not found!" })
            }
        } catch (err) {
            next(err)
        }
    }
}