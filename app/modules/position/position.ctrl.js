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
        }).then(createPosition => {		  
        res.json(createPosition);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
        console(result)
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}

exports.updatePosition =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
    // console.log("iddddddddddddddddddddddd")
    // console.log(_id)
    // console.log(req.body)
	const responseDetail = await models.position.update( req.body, 
			{ where: {_id:_id} }).then(() => {         
                ret.response(req, res, '', '', now);
			}).catch(err => {
				console.log(err);
				ret.responseError(req, res, err, '', now);
			});
};
exports.updatePosition =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
	const responseDetail = await models.position.update( req.body, 
			{ where: {_id:_id} }).then(() => {         
                ret.response(req, res, '', '', now);
			}).catch(err => {
				console.log(err);
				ret.responseError(req, res, err, '', now);
			});
};


exports.deletePosition =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
    // console.log("iddddddddddddddddddddddd")
    // console.log(_id)
    // console.log(req.body)
	const responseDetail = await models.position.destroy({
			where: { _id:_id }
		}).then(() => {
			ret.response(req, res, '', '', now);
		}).catch(err => {
			console.log(err);
			ret.responseError(req, res, err, '', now);
		});
};



