var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
var models = require('../../models');
const { where } = require('sequelize');
const { response } = require('express');
exports.list = async (req, res) => {
    const now = Date.now();
    try {
        const responseDetail = await models.employee.findAll();
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}
exports.searchEmployee = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.employee.findAll({where:whereReq});
        const result = {
            data: responseDetail,
        }
        ret.response(req, res, result, '', now);
    } catch (err) {
        ret.responseError(req, res, err, '', now);
    }
}

exports.searchEmployee = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.employee.fildAll({where:whereReq});
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
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.userAccount.create({
            "_id":req.query._id,
            "employeeCode":req.query.employeeCode,
            "type":req.query.type,
            "prefix":req.query.prefix,
            "firstname":req.query.firstname,
            "lastname":req.query.lastname,
            "nickname":req.query.nickname,
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



