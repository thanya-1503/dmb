var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where } = require('sequelize');
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.employeeAsset.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.createEmpAsset = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.employeeAsset.create({
            "_id":req.body._id,
            "employeeId":req.body.employee,
            "assetId":req.body.assetId,
            "createDt":now,
            "createBy":req.username,
            "updateDt":now,
            "updateBy":req.username,
            
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
exports.updateEmpAsset =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
    req.body.updateDt = now;
    req.body.updateBy = req.username;
	const responseDetail = await models.employeeAsset.update(req.body, 
			{ where: {_id:_id} }).then(() => {         
                ret.response(req, res, '', '', now);
			}).catch(err => {
				console.log(err);
				ret.responseError(req, res, err, '', now);
			});                
};
exports.deleteEmpAsset =  async(req, res) => {
    const now = Date.now();
    const _id = req.params._id;
	const responseDetail = await models.employeeAsset.destroy({
			where: { _id:_id }
		}).then(() => {
			ret.response(req, res, '', '', now);
		}).catch(err => {
			console.log(err);
			ret.responseError(req, res, err, '', now);
		});
};

exports.listEmpAsset = async function (req, res) {
    const now = Date.now();
    try {
        const sql = `SELECT 	
        "employeeAsset"."_id",
        "employeeAsset"."employeeId",
        "employeeAsset"."assetId",
        "employeeAsset"."createDt",
        "employeeAsset"."createBy",
        "employeeAsset"."updateDt",
        "employeeAsset"."updateBy",
		asset."_id" as id_asset,
        asset."assetCode",
        employee."_id" as id_employee,
        employee."employeeCode",
        employee."prefix",
        employee."firstname",
        employee."lastname",
        employee."nickname"
       FROM "employeeAsset"
       INNER JOIN asset on asset."_id" = "employeeAsset"."assetId"
	   INNER JOIN employee on employee."_id" = "employeeAsset"."employeeId"`
       const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listBrand => {		  
        res.json(listBrand);
        return responseList;
    })     
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
    // SELECT *
    //    FROM "employeeAsset"
    //    INNER JOIN asset on asset."_id" = "employeeAsset"."assetId"
	//    INNER JOIN employee on employee."_id" = "employeeAsset"."employeeId"
}