var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where,QueryTypes, Sequelize} = require('sequelize');
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
            "createBy":req.username,
            "updateDt":now,
            "updateBy":req.username,
            "status":req.body.status,
            "remark":req.body.remark,
            "boi":req.body.boi,

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
    const now = Date.now();
    try{
        const sql = `SELECT asset."assetCode",
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
        asset."saleAt",
        asset."createDt",
        asset."createBy",
        asset."updateDt",
        asset."updateBy",
        asset."remark",
        asset."type",
        asset."brand",
        asset."model",
        asset."state",
        brandType."brandId"as brandId,
        brandType."brandType",
        brandType."brandName",
        model."_id"as modelId,
        model."modelType",
        brandType."typeId"as typeId,
        brandType."typeName", 
        status."_id"as statusId,
        status."StatusName"
        FROM asset
        LEFT JOIN (SELECT  brand."_id" as "brandId" , brand."brandName", brand."brandType", type."_id" as "typeId", type."typeName"
           FROM brand INNER JOIN type on brand."brandType" = type."_id") as brandType
           on asset."brand" = brandType."brandId"
        LEFT JOIN model on asset."model" = model."_id"
        LEFT JOIN status on asset."state" = status."_id"`
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listasset => {		  
            res.json(listasset);
            return responseList;
        })     
        } catch (err) {
            console.log(err)
            ret.responseError(req, res, err, '', now);
        }
    }


    
   
