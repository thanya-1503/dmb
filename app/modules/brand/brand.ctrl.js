var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where } = require('sequelize');
const { response } = require('express');
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.brand.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.createBrand = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.brand.create({
            "_id":req.query._id,
            "brandType":req.query.brandType,
            "createDt":req.query.createDt,
            "createBy":req.query.createBy,
            "updateDt":req.query.updateDt,
            "updateBy":req.query.updateBy,
            "status":req.query.status,
    }).then(createbrand => {		  
        res.json(createbrand);
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