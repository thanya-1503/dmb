var ret = require('../../utils/response/index');
var models = require('../../models');
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.model.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.createModel = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.model.create({
            "_id":req.query._id,
            "modelType":req.query.modelType,
            "createDt":req.query.createDt,
            "createBy":req.query.createBy,
            "updateDt":req.query.updateDt,
            "updateBy":req.query.updateBy,
            "status":req.query.status,
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