const { Op } = require('sequelize');
const { Recipe } = require('../models')

module.exports = class PublicController {

    static async getAllRecipesPublic(req, res, next) {
        try {
            const { search, sort, page } = req.query;
            // console.log(req.query, '====>>> di controller');

            const option = {
                where: {},
            }

            if (search) {
                option.where.title = { [Op.iLike]: `%${search}%` }
            }


            if (sort) {
                const ordering = sort[0] === '-' ? 'desc' : 'asc'
                const name = ordering === 'desc' ? sort.slice(1) : sort
                option.order = [[name, ordering]]
            }

            let limit = 10;
            let pageNumber = 1;

            if (page) {
                if (page.size) {
                    limit = +page.size
                    option.limit = limit
                }
                if (page.number) {
                    pageNumber = +page.number
                    option.offset = limit * (pageNumber - 1)
                }
            }

            // console.log(option, 'option');

            const { count, rows } = await Recipe.findAndCountAll(option)
            res.status(200).json({
                page: pageNumber,
                data: rows,
                totalData: count,
                totalPage: Math.ceil(count / limit),
                dataPerPage: limit
            });

        } catch (err) {
            next(err)
        }
    }

}