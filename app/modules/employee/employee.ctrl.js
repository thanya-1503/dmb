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
exports.createEmployee = async (req, res) => {
    const now = Date.now();
    try {
        let whereReq = req.query || {};
        const responseDetail = await models.employee.create({
            "_id":data._id,
            "employeeCode":data.employeeCode,
            "type":data.type,
            "prefix":data.prefix,
            "firstname":data.firstname,
            "lastname":data.lastname,
            "nickname":data.nickname,
            "position":data.position,
            "site":data.site,
            "workStart":data.workStart,
            "workEnd":data.workEnd,
            "createDt":data.createDt,
            "createBy":data.createBy,
            "updateDt":data.updateDt,
            "updateBy":data.updateBy,
            "status":data.status,
    }).then(createEmployee => {		  
        res.json(createEmployee);
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



