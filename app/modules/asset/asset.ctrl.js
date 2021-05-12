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
            "_id":data._id,
            "assetCode":data.assetCode,
            "type":data.type,
            "prefix":data.prefix,
            "brand":data.brand,
            "model":data.model,
            "color":data.color,
            "serialNumber":data.serialNumber,
            "purchaseDt":data.purchaseDt,
            "insuranceDt":data.insuranceDt,
            "insuranceTerm":data.insuranceTerm,
            "purchaseNo":data.purchaseNo,
            "price":data.price,
            "priceVat":data.priceVat,
            "totalPrice":data.totalPrice,
            "activity":data.activity,
            "state":data.state,
            "repairCount":data.repairCount,
            "repairInsurance":data.repairInsurance,
            "saleDt":data.saleDt,
            "salePrice":data.salePrice,
            "saleAt":data.saleAt,
            "createDt":data.createDt,
            "createBy":data.createBy,
            "updateDt":data.updateDt,
            "updateBy":data.updateBy,
            "status":data.status,

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


