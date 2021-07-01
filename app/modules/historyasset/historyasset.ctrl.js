var ret = require('../../utils/response/index');
var models = require('../../models');
const { where, QueryTypes } = require('sequelize');
exports.listHistoryasset = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.historyasset.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.createHistoryasset = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.historyasset.create({
            "_id":req.body._id,
            "employeeCode":req.body.employeeCode,
            "assetCode":req.body.assetCode,
            "createDt":now,
            "createBy":req.username,
            "updateDt":now,
            "updateBy":req.username,
    }).then(createModel => {		  
        res.json(createModel);
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

// find emp join EmpAsset  All table
exports.historyUsedAsset = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT 
        employee."_id",
        employee."employeeCode",
        employee."prefix",
        employee."firstname",
        employee."lastname",
        employee."nickname",
        employee."workStart",
        employee."workEnd",
        employee."createDt",
        employee."createBy",
        employee."updateDt",
        employee."updateBy",
        typeEmp."_id" as typeId,
        typeEmp."emType",
        position."_id" as positionId,
        position."lovType",
        site."_id" as siteId,
        site."siteType",
		"historyasset"."_id" as historyassetId,
        "historyasset"."employeeCode",
        "historyasset"."assetCode"
        FROM employee
        LEFT JOIN "typeEm" as typeEmp on employee."type" = typeEmp."_id"
        LEFT JOIN position on employee."position" = position."_id"
        LEFT JOIN site on employee."site" = site."_id"
		LEFT JOIN "historyasset" on "historyasset"."employeeCode" =employee."employeeCode" 
	   	WHERE  "historyasset"."assetCode" = '${req.body.assetCode}'`
       const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(historyUsedAsset => {		  
        return res.json(historyUsedAsset);
        // return responseList;
    })          
    } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
    }

}


