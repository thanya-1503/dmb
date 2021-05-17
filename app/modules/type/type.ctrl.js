var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where } = require('sequelize');
const { response } = require('express');

exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.type.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.createType = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.type.create({
            "_id":req.body._id,
            "typeName":req.body.typeName,
            "createDt":now,
            "createBy":req.body.createBy,
            "updateDt":now,
            "updateBy":req.body.updateBy,
            "status":req.body.status,
    }).then(createType => {		  
        res.json(createType);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}