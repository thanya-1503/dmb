var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
const usersService = require('./users.service')
var models = require('../../models');
exports.list = async (req, res) => {
    try {
        const responseDetail = await models.userAccount.findOne();
        const response = {
            data: responseDetail,
        }
        ret.response(20000, msgCode.getMessage("E000", "Get users by Id"), response, res);
    } catch (err) {
        ret.matchError(err, msgCode.getMessage("E001", "Get users by Id"), res);
    }
}