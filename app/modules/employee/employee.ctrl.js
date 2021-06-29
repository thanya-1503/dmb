var ret = require('../../utils/response/index');
var MessageCode = require('../../utils/message');
const msgCode = new MessageCode();
const { where,QueryTypes, Sequelize} = require('sequelize');
var models = require('../../models');
const { response } = require('express');
const Op = Sequelize.Op;
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
            "createBy":req.username,
            "updateDt":now,
            "updateBy":req.username,
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
    const now = Date.now();
    try{
        const sql = `SELECT 
        employee."_id",
        employee."employeeCode",
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
        typeEmp."_id" as typeId,
        typeEmp."emType",
        position."_id" as positionId,
        position."lovType",
        site."_id" as siteId,
        site."siteType"
        
        FROM employee
        LEFT JOIN "typeEm" as typeEmp on employee."type" = typeEmp."_id"
        LEFT JOIN position on employee."position" = position."_id"
        LEFT JOIN site on employee."site" = site."_id"`
        const listemployee = await models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listemployee => {		  
            res.json(listemployee);
            return listemployee;
        })     
        } catch (err) {
            console.log(err)
            ret.responseError(req, res, err, '', now);
        }
    }
    exports.deleteEmployee =  async(req, res) => {
        const now = Date.now();
        const _id = req.params._id;
        const responseDetail = await models.employee.destroy({
                where: { _id:_id }
            }).then(() => {
                ret.response(req, res, '', '', now);
            }).catch(err => {
                console.log(err);
                ret.responseError(req, res, err, '', now);
            });
    };
    exports.updateEmployee= async (req, res) => {
        const now = Date.now();
        const _id = req.params._id;
        req.body.updateDt = now;
        req.body.updateBy = req.username;
        const responseDetail = await models.employee.update(req.body,
            { where: { _id: _id } }).then(() => {
                ret.response(req, res, '', '', now);
            }).catch(err => {
                console.log(err);
                ret.responseError(req, res, err, '', now);
            });
    };


    exports.getSearchDateEmp= async function (req, res){
        const now = Date.now();
        try {
            const startPeriod = req.body.startPeriod;
            const endPeriod = req.body.endPeriod;
            let response = []; 
            response = await models.employee.findAndCountAll({
                order: [
                    ['updateDt', 'DESC']
                ]
            });
            if (startPeriod && endPeriod) {
                    response = await models.employee.findAndCountAll({
                        where: {
                            [Op.and]: [{
                                updateDt: {
                                    [Op.gte]: startPeriod,
                                    [Op.lte]: endPeriod
                                }
                            }]
                        },order: [
                            ['updateDt', 'DESC']
                        ]
             });
            }
            return res.json(response);
        } catch (err) {
            ret.responseError(req, res, err, '', now);
            console.log(err)
        }
    };

    
    // exports.getSearchDateEmp= async function (req, res){
    //     const now = Date.now();
    //     try {
    //         // const startPeriod = req.body.startPeriod;
    //         // const endPeriod = req.body.endPeriod;
    //         let response = []; 
       
    //     // if (startPeriod && endPeriod) {
    //         try {
    //             const sql = `SELECT 
    //             employee."_id",
    //             employee."employeeCode",
    //             employee."prefix",
    //             employee."firstname",
    //             employee."lastname",
    //             employee."nickname",
    //             employee."workStart",
    //             employee."workEnd",
    //             employee."createDt",
    //             employee."createBy",
    //             employee."updateDt",
    //             employee."updateBy",
    //             typeEmp."_id" as typeId,
    //             typeEmp."emType",
    //             position."_id" as positionId,
    //             position."lovType",
    //             site."_id" as siteId,
    //             site."siteType"  
    //             FROM employee
    //             LEFT JOIN "typeEm" as typeEmp on employee."type" = typeEmp."_id"
    //             LEFT JOIN position on employee."position" = position."_id"
    //             LEFT JOIN site on employee."site" = site."_id" 
    //             WHERE employee."updateDt" >= '${req.body.startPeriod}' AND employee."updateDt" <= '${req.body.endPeriod}'`
    //             response = models.sequelize.query(sql, { type: QueryTypes.SELECT }).then(listemployee => {		  
    //             res.json(listemployee);
    //             return listemployee;
    //         })     
    //         }
    //         catch (err) {
    //             console.log(err)
    //             ret.responseError(req, res, err, '', now);
    //         } 
            
    //     // }
    //         // return res.json(response);
    //     } catch (err) {
    //         ret.responseError(req, res, err, '', now);
    //         console.log(err)
    //     }
    // };
    
    

