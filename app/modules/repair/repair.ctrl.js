var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where } = require('sequelize');
exports.listrepair = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.repair.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    } 
}
exports.createRepair = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.repair.create({
                "_id":req.body._id,
                "state":req.body.state,
                "remark":req.body.remark,
                "boi":req.body.boi,
                "assetCode":req.body.assetCode,
                "pricerepair":req.body.pricerepair,
                "pricerepairvat":req.body.pricerepairvat,
                "insuranceDt":req.body.insuranceDt,
                "repairDt":req.body.repairDt,
                "repairAt":req.body.repairAt,
                "totalpricerepair":req.body.totalpricerepair,
                "createDt":now,
                "createBy":req.username,
                "updateDt":now,
                "updateBy":req.username,
        }).then(createrepair => {		  
            res.json(createrepair);
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
exports.repairasset = async (req, res) => {
    const now = Date.now();
    try{
        const sql = `SELECT 
        asset."_id",
        asset."insuranceDt",
        asset."assetCode",
       	asset."repairCount",
        asset."createDt",
        asset."createBy",
        asset."updateDt",
        asset."updateBy",
        asset."remark",       
        asset."state",
        asset."boi",
        asset."repairAt",
        asset."repairDt",
        asset."pricerepair",
        asset."pricerepairvat",
        asset."totalpricerepair"
        FROM "asset"
		LEFT JOIN repair on asset."state" = repair."state"
        ORDER BY asset."updateDt" DESC `
        const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listrepair => {		  
            res.json(listrepair);
            return responseList;
        })     
        } catch (err) {
            // console.log(err)
            ret.responseError(req, res, err, '', now);
        }
    }
exports.updateRepair =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
    req.body.updateDt = now;
    req.body.updateBy = req.username;
	const responseDetail = await models.repair.update( req.body, 
			{ where: {_id:_id} }).then(() => {         
                ret.response(req, res, '', '', now);
			}).catch(err => {
				console.log(err);
				ret.responseError(req, res, err, '', now);
			});
};
exports.deleteRepair =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
	const responseDetail = await models.repair.destroy({
			where: { _id:_id }
		}).then(() => {
			ret.response(req, res, '', '', now);
		}).catch(err => {
			console.log(err);
			ret.responseError(req, res, err, '', now);
		});
};
