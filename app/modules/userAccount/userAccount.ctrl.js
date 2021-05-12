var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where } = require('sequelize');
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.userAccount.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.searchUserAccount = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.userAccount.findOne({where:whereReq});
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.createAccount = async (data , type) => {
    console.log(data)
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.userAccount.create({
            "_id":req.query._id,
            "email":req.query.email,
            "password":req.query.password,
            "createBy":req.query.createBy,
            "createDt":req.query.createDt,
            "updateBy":req.query.updateBy,
            "updateDt":req.query.updateDt,
            "status":req.query.status,


    }).then(createAccount => {		
        // Send created customer to client
        res.json(createAccount);
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

exports.authLogin = async (req, res) => {
    const now = Date.now();
    try {
        // let whereReq = req.query || {};
        let username = req.body.email;
        let password = req.body.password;
        const acc = await models.userAccount.findOne({where:{ email: username }});
        console.log(acc)

        if (!acc) throw [40300, 'username is not associated with any account.'];
 
        console.log(acc)
        console.log(password)
        let authen = await models.userAccount.options.instanceMethods.validPassword(password, acc.dataValues.password); 
        console.log('authen', authen)
        if (!authen) throw [40101, 'Incorrect password'];
        var resultRes = await exports.createAccount(acc)
        console.log('authen', authen)
        console.log('resultRes', resultRes)

        // ret.response(20000, msgCode.getMessage("E000", "login"), { token: resultRes }, res);
    } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
    }
}
    

