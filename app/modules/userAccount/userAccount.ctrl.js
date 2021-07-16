var uuid = require('uuid/v4');
var ret = require('../../utils/response/index');
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config.json')[env];
var models = require('./../../models');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var Sequelize = require('sequelize');
const nJwt = require('njwt');
const Op = Sequelize.Op;
const { where, QueryTypes } = require('sequelize');
// var formatDateTime = config.formatDate + " " + config.formatTime;

exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.userAccount.findAll(
        );
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
exports.createAccount = async (req, res) => {
    const now = Date.now();
    const status = true;
    const password = '123456'
    const pass = await models.userAccount.options.instanceMethods.generateHash(password)
    try {
        const responseDetail = await models.userAccount.create({
            "_id":req.body._id,
            "username":req.body.username,
            "password":pass,
            "createBy":req.firstname,
            "createDt":now,
            "updateBy":req.firstname,
            "updateDt":now,
            "status":status,
            "firstname":req.body.firstname,
            "lastname":req.body.lastname,
            "role":req.body.role
    }).then(createAccount => {		
        res.json(createAccount);
    }).catch(err => {
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
        let username = req.body.username;
        let password = req.body.password;
        const acc = await models.userAccount.findOne({where:{ username: username }});
        if (!acc) throw [40300, 'username is not associated with any account.'];
        let authen = await models.userAccount.options.instanceMethods.validPassword(password, acc.password); 
        if (!authen) throw [40101];
        var resultRes = await exports.generateToken(acc);
        res.setHeader('Authorization', resultRes);
        req.session_id = uuid();
        req.username = acc.username;
        ret.response(req, res, { token: resultRes }, '', now);
        // ret.response(20000, msgCode.getMessage("E000", "login"), { token: resultRes }, res);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.generateToken = async function (data, type) {
    try {
        //logger.info("[auth|auth-ctrl|token]");
            var dataSetToken = {
            _id: data._id,
            username: data.username,
            password: data.password,
            createBy: data.createBy,
            createDt: data.createDt,
            updateBy: data.updateBy,
            updateDt: data.updateDt,
            status: data.status,
            firstname:data.firstname,
            lastname:data.lastname,
            role:data.role
        }
        let token = nJwt.create(dataSetToken, config.secret); // CREATED PAYLOAD
        var timeout = config.timeoutToken; // SET TIMEOUT TYPE ADMIN AND GENERAL
        return await exports.extendToken(token, timeout); // CREATED TOKEN
    } catch (error) {
        ret.responseError(req, res, error, '', '');
    }
}
exports.authentication = async function (req, res) {
    try {
        //logger.info("[auth|auth-ctrl|authentication]");
        var tokenHeader = req.headers['authorization'] || null;
        var token = tokenHeader && tokenHeader.split(' ')[0] === 'Bearer' ? tokenHeader.split(' ')[1] : tokenHeader;
        if (!token) {
            if (req.query.Authorization) token = req.query.Authorization;
        }
        if (!token) throw [40101, "Unauthorized"];

        let tokenDecode = nJwt.verify(token, config.secret); // DECODE AND CHECK EXPIRE
        res.setHeader('Authorization', token); // SET TOKEN TO HEADER
        return tokenDecode;
    } catch (error) {
        ret.responseError(req, res, error, '', '');
    }
}

exports.extendToken = async function (data, timeout) {
    try {
        //logger.info("[auth|auth-ctrl|extendToken]");
        data.signingKey = config.secret; // SET SECRET KEY
        data.setExpiration(new Date().getTime() + config.timeoutToken); // SET TIME (+)
        let tokenNew = data.compact(); // GENARATE NEW TOKEN
        return tokenNew;
    } catch (error) {
        ret.responseError(req, res, error, '', '');
    }
}
exports.updateAccount =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
    req.body.updateDt = now;
    req.body.updateBy = req.firstname;
    req.body.password = await models.userAccount.options.instanceMethods.generateHash(req.body.password)
	const responseDetail = await models.userAccount.update(req.body, 
			{ where: {_id:_id} }).then(() => {         
                ret.response(req, res, '', '', now);
			}).catch(err => {
				console.log(err);
				ret.responseError(req, res, err, '', now);
			});
};

exports.deleteAccount =  async(req, res) => {
    const now = Date.now();
	const _id = req.params._id;
	const responseDetail = await models.userAccount.destroy({
			where: { _id:_id }
		}).then(() => {
			ret.response(req, res, '', '', now);
		}).catch(err => {
			console.log(err);
			ret.responseError(req, res, err, '', now);
		});
};
exports.whereUserforgotpass = async (req, res) => {
    const now = Date.now();
    try {
        const sql = `SELECT *
        FROM "userAccount" 
	   	WHERE  "userAccount"."username" = '${req.body.username}'`
       const responseList = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(whereUserforgotpass => {		  
        return res.json(whereUserforgotpass);
        // return responseList;
    })          
    } catch (err) {
        console.log(err)
        ret.responseError(req, res, err, '', now);
    }

}

exports.forgotpassword =  async(req, res) => {
    const now = Date.now();
	// const _id = req.params._id;
    const _id = req.body._id;
    req.body.updateDt = now;
    // req.body.updateBy = req.firstname;
    req.body.password = await models.userAccount.options.instanceMethods.generateHash(req.body.password)
	const responseDetail = await models.userAccount.update(req.body, 
			{ where: {_id:_id} }).then(() => {         
                ret.response(req, res, '', '', now);
			}).catch(err => {
				console.log(err);
				ret.responseError(req, res, err, '', now);
			});
};

// async function passwordTest(params) {
//     try {
//         const password = '123456'
//         const a = await models.userAccount.options.instanceMethods.generateHash(password)
//         console.log(a, 'a');
//         let authen = await models.userAccount.options.instanceMethods.validPassword('123456', passwordEncrypt);
//     }
//     catch (error) {
//     }
// }
// passwordTest()
