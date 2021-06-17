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
            "_id":req.body._id,
            "assetCode":req.body.assetCode,
            "type":req.body.type,
            "brand":req.body.brand,
            "model":req.body.model,
            "color":req.body.color,
            "serialNumber":req.body.serialNumber,
            "purchaseDt":req.body.purchaseDt,
            "insuranceDt":req.body.insuranceDt,
            "insuranceTerm":req.body.insuranceTerm,
            "purchaseNo":req.body.purchaseNo,
            "price":req.body.price,
            "priceVat":req.body.priceVat,
            "totalPrice":req.body.totalPrice,
            "activity":req.body.activity,
            "state":req.body.state,
            "repairCount":req.body.repairCount,
            "repairInsurance":req.body.repairInsurance,
            "saleDt":req.body.saleDt,
            "salePrice":req.body.salePrice,
            "saleAt":req.body.saleAt,
            "createDt":now,
            "createBy":req.body.createBy,
            "updateDt":now,
            "updateBy":req.body.updateBy,
            "status":req.body.status,
            "remark":req.body.remark,

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
exports.listasset = async (req, res) => {
    const now = Data.now();
    try{
        `SELECT asset."assetCode",
                asset."color",
                asset."serialNumber",
                asset."purchaseDt",
                asset."insuranceDt",
                asset."insuranceTerm",
                asset."purchaseNo",
                asset."price",
                asset."priceVat",
                asset."totalPrice",
                asset."activity",
                asset."repairCount",
                asset."repairInsurance",
                asset."saleDt",
                asset."salePrice",
                asset."saleAt"
                asset."createDt",
                asset."createBy",
                asset."updateDt",
                asset."updateBy",
                asset."remark",
                brand."brandType",
                model."modelType",
                type."typeName", 
                status."StatusName",
        FROM asset
        left JOIN type on asset."type" = type."_id"
        left JOIN brand on asset."brand" = brand."_id"
        left JOIN model on asset."model" = model."_id"
        left JOIN status on asset."status" = status."_id" `
        const responseDetail = await models.sequelize.query(sql, { type: QueryType.SELECT });
    }
     catch (err) {
    ret.responseError(req, res, err, '', now);
}
}
