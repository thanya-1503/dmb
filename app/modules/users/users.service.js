var ret = require('../../utils/response');
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config.json')[env];
var models = require('../../models');
const { Sequelize, QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
var formatDateTime = config.formatDate + " " + config.formatTime;
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();

exports.getDetail = async function (req, res) {
    try {
        var mail = 'admin@entro-lab.com';
        const query = req.query;
        const response = await models.userAccount.findOne();
        response.ema
        
        return response;
    } catch (err) {
        throw err;
    }
}
