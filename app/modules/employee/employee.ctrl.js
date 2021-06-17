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
            "_id":req.body._id,
            "employeeCode":req.body.employeeCode,
            "prefix":req.body.prefix,
            "firstname":req.body.firstname,
            "lastname":req.body.lastname,
            "nickname":req.body.nickname,
            "workStart":req.body.workStart,
            "workEnd":req.body.workEnd,
            "createDt":now,
            "createBy":req.body.createBy,
            "updateDt":now,
            "updateBy":req.body.updateBy,
            "status":req.body.status,
            "type":req.body.type,
            "position":req.body.position,
            "site":req.body.site,
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
exports.listemployee = async (req, res) => {
    const now = Data.now();
    try{
        `SELECT employee."employeeCode",
                employee."prefix",
                employee."firstname",
                employee."lastname",
                employee."nickname",
                employee."workStart",
                employee."workEnd",
                employee."createDt",
                employee."createBy",
                employee."updateDt",
                employee."updateBy",
        FROM employee
        left JOIN type on employee."type" = type."_id"
        Left JOIN position on employee."position" = position."_id"
        left JOIN site on employee."site" = site."_id" `
        const responseDetail = await models.sequelize.query(sql, { type: QueryType.SELECT });
    }
     catch (err) {
    ret.responseError(req, res, err, '', now);
}
}


