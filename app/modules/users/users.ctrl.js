const CONFIG = require('../../config/config')
const models = require('../../models')
const sequelizeService = require('../../utils/sequelize');
var ret = require('../../utils/response/index');
const { response, responseError, genResponseObj } = require('../../utils/response/index')
exports.list = async (req, res) => {
    try {
        console.log(req.query._id)
        const res = await models.userAccount.findOne({
            where: {
                _id: req.query._id
            }
        })
        console.log(res)
    return resp;
    } catch (err) {
        throw err;
    }
}