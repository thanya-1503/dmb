var ret = require('../../utils/response/index');
var models = require('../../models');
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.status.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.createStatus = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.status.create({
            "_id":req.body._id,
            "StatusName":req.body.StatusName,
            "createDt":now,
            "createBy":req.body.createBy,
            "updateDt":now,
            "updateBy":req.body.updateBy,
            "status":req.body.status,
        }).then(createStatus => {		  
        res.json(createStatus);
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
exports.updatestatus =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
	const responseDetail = await models.status.update( req.body, 
			{ where: {_id:_id} }).then(() => {         
                ret.response(req, res, '', '', now);
			}).catch(err => {
				console.log(err);
				ret.responseError(req, res, err, '', now);
			});
};