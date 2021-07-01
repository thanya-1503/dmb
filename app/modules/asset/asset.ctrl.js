var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where,QueryTypes, Sequelize} = require('sequelize');
const { response } = require('express');
const Op = Sequelize.Op;
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
            "repairAt":req.body.repairAt,
            "repairDt":now,
            "pricerepair":req.body.pricerepair,
            "pricerepairvat": req.body.pricerepairvat,
            "totalpricerepair": req.body.totalpricerepair,
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
        const sql = `SELECT 
        asset."_id",
        asset."assetCode",
        asset."color",
        asset."serialNumber",
        asset."purchaseDt",
        asset."insuranceDt",
        asset."insuranceTerm",
        asset."purchaseNo",
        asset."price",
        asset."priceVat",
        asset."totalPrice",
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
        asset."boi",
        asset."repairAt",
        asset."repairDt",
        asset."pricerepair",
        asset."pricerepairvat",
        asset."totalpricerepair",
        brand."_id"as brandId,
        brand."brandType",
        brand."brandName",
        model."_id"as modelId,
        model."modelType",
        type."_id" as typeId,
        type."typeName", 
        status."_id"as statusId,
        status."StatusName"
        FROM asset
        LEFT JOIN brand on asset."brand" = brand."_id"
		LEFT JOIN type on asset.type = type."_id"	   
        LEFT JOIN model on asset."model" = model."_id"
        LEFT JOIN status on asset."state" = status."_id"`
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listasset => {		  
            res.json(listasset);
            return responseList;
        })     
        } catch (err) {
            // console.log(err)
            ret.responseError(req, res, err, '', now);
        }
    }
    exports.deleteAsset =  async(req, res) => {
        const now = Date.now();
        const _id = req.params._id;
        const responseDetail = await models.asset.destroy({
                where: { _id:_id }
            }).then(() => {
                ret.response(req, res, '', '', now);
            }).catch(err => {
                console.log(err);
                ret.responseError(req, res, err, '', now);
            });
    };
    exports.updateAsset = async (req, res) => {
        const now = Date.now();
        const _id = req.params._id;
        req.body.updateDt = now;
        req.body.updateBy = req.username;
        const responseDetail = await models.asset.update(req.body,
            { where: { _id: _id } }).then(() => {
                ret.response(req, res, '', '', now);
            }).catch(err => {
                console.log(err);
                ret.responseError(req, res, err, '', now);
            });
    };

    exports.listassetFree = async (req, res) => {
        const now = Date.now();
        try{
            const sql = `SELECT 
            asset."_id",
            asset."assetCode",
            asset."color",
            asset."serialNumber",
            asset."purchaseDt",
            asset."insuranceDt",
            asset."insuranceTerm",
            asset."purchaseNo",
            asset."price",
            asset."priceVat",
            asset."totalPrice",
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
            asset."boi",
            asset."repairAt",
            asset."repairDt",
            asset."pricerepair",
            asset."pricerepairvat",
            asset."totalpricerepair",
            brand."_id"as brandId,
            brand."brandType",
            brand."brandName",
            model."_id"as modelId,
            model."modelType",
            type."_id" as typeId,
            type."typeName", 
            status."_id"as statusId,
            status."StatusName"
            FROM asset
            LEFT JOIN brand on asset."brand" = brand."_id"
            LEFT JOIN type on asset.type = type."_id"	   
            LEFT JOIN model on asset."model" = model."_id"
            LEFT JOIN status on asset."state" = status."_id"
            WHERE "status"."StatusName" = 'ว่าง' `
            const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listassetFree => {		  
                res.json(listassetFree);
                return responseList;
            })     
            } catch (err) {
                // console.log(err)
                ret.responseError(req, res, err, '', now);
            }
        }

    // exports.getSearchDateAsset = async function (req, res){
    //     const now = Date.now();
    //     try {
    //         const startPeriod = req.body.startPeriod;
    //         const endPeriod = req.body.endPeriod;
    //         let response = []; 
    //         response = await models.asset.findAndCountAll({
    //             order: [
    //                 ['updateDt', 'DESC']
    //             ]
    //         });
    //         if (startPeriod && endPeriod) {
    //                 response = await models.asset.findAndCountAll({
    //                     where: {
    //                         [Op.and]: [{
    //                             updateDt: {
    //                                 [Op.gte]: startPeriod,
    //                                 [Op.lte]: endPeriod
    //                             }
    //                         }]
    //                     },order: [
    //                         ['updateDt', 'DESC']
    //                     ]
    //          });
    //         }
    //         return res.json(response);
    //     } catch (err) {
    //         ret.responseError(req, res, err, '', now);
    //         console.log(err)
    //     }
    // };
    
    
    
   
