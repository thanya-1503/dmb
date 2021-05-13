var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where } = require('sequelize');
const { response } = require('express');
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.asset.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}

exports.searchAsset = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.asset.findAll({where:whereReq});
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.createAsset = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.asset.create({
            "_id":req.query._id,
            "assetCode":req.query.assetCode,
            "type":req.query.type,
            "brand":req.query.brand,
            "model":req.query.model,
            "color":req.query.color,
            "serialNumber":req.query.serialNumber,
            "purchaseDt":req.query.purchaseDt,
            "insuranceDt":req.query.insuranceDt,
            "insuranceTerm":req.query.insuranceTerm,
            "purchaseNo":req.query.purchaseNo,
            "price":req.query.price,
            "priceVat":req.query.priceVat,
            "totalPrice":req.query.totalPrice,
            "activity":req.query.activity,
            "state":req.query.state,
            "repairCount":req.query.repairCount,
            "repairInsurance":req.query.repairInsurance,
            "saleDt":req.query.saleDt,
            "salePrice":req.query.salePrice,
            "saleAt":req.query.saleAt,
            "createDt":req.query.createDt,
            "createBy":req.query.createBy,
            "updateDt":req.query.updateDt,
            "updateBy":req.query.updateBy,
            "status":req.query.status,

    }).then(createAsset => {		  
        res.json(createAsset);
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


