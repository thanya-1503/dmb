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
// var formatDateTime = config.formatDate + " " + config.formatTime;

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
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.userAccount.create({
            "_id":req.body._id,
            "email":req.body.email,
            "password":req.body.password,
            "createBy":req.body.createBy,
            "createDt":now,
            "updateBy":req.body.updateBy,
            "updateDt":now,
            "status":req.body.status,
    }).then(createAccount => {		
        // Send created customer to client
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
        let username = req.body.email;
        let password = req.body.password;
        const acc = await models.userAccount.findOne({where:{ email: username }});

        if (!acc) throw [40300, 'username is not associated with any account.'];
        let authen = await models.userAccount.options.instanceMethods.validPassword(password, acc.password); 

        if (!authen) throw [40101, 'Incorrect password'];

        var resultRes = await exports.generateToken(acc);
        res.setHeader('Authorization', resultRes);
        req.session_id = uuid();
        req.username = acc.email;
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
            email: data.email
            //password: data.password,
            //createBy: data.createBy,
            //createDt: data.createDt,
            //pdateBy: data.updateBy,
            //updateDt: data.updateDt,
            // status: data.status
        }
        let token = nJwt.create(dataSetToken, config.secret); // CREATED PAYLOAD
        var timeout = config.timeoutToken; // SET TIMEOUT TYPE ADMIN AND GENERAL
        return await exports.extendToken(token, timeout); // CREATED TOKEN
    } catch (error) {
        throw error
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
        throw error
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
        throw error;
    }
}
