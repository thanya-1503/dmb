var ret = require('../../utils/response/index');
var models = require('../../models');
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.position.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.createPosition = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.position.create({
            "_id":req.body._id,
            "lovType":req.body.lovType,
            "createDt":now,
            "createBy":req.body.createBy,
            "updateDt":now,
            "updateBy":req.body.updateBy,
            "status":req.body.status,
        }).then(createSite => {		  
        res.json(createSite);
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