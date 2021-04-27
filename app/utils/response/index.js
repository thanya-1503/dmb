var _ = require('underscore');
var MessageCode = require('../message');
const msgCode = new MessageCode();
var code = require('../../config/message_code.json');
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config.json')[env];
var mime = require('mime-types');
const path = require("path");

exports.response = function(statusCode, info, data, res) {
    try {

        // var resultCode = statusCode && code[statusCode].result_code ? statusCode : 50000;
        if (!statusCode) statusCode = 50000;

        // MATCHING STATUS CODE 
        resultCodeString = statusCode.toString();
        let resCode = resultCodeString.match(/.{1,3}/g);
        let resMainCode = resCode[0];
        let resSubCode = resCode[1];

        if (!resMainCode || !resSubCode) {
            resMainCode = 500;
            resSubCode = 00;
        }
        // HTTP STATUS 
        var http_status = code[resMainCode][resSubCode].http_status;

        // RESULT CODE
        let ret = {
            result_header: {
                result_code: code[resMainCode][resSubCode].result_code,
                result_message: code[resMainCode][resSubCode].result_message,
                more_info: info ? info : code[resMainCode][resSubCode].more_info
            },
            result_data: data ? data : code[resMainCode][resSubCode].result_data
        }
        res.setHeader('http_status_code', http_status); // SET HEADER
        res.json(http_status, ret); // RESPONSE

    } catch (error) {
        throw error;
    }
}

exports.matchError = async function(err, errHeader, res) {
    let newError = err;
    if (err && err.name && err.name === 'SequelizeValidationError') {
        newError = await exports.mapCodeErrorDB(err);
    }
    let resCode = 50000;
    let errMsg = '';
    let error = newError && newError.name ? newError.name : (newError || '');
    if (_.isArray(newError)) {
        resCode = newError[0];
        errMsg = newError[1];
    } else {
        switch (error) {
            case "SequelizeDatabaseError":
                resCode = 50001;
                break;
            case "SequelizeValidationError":
                resCode = 40300;
                break;
            case "SequelizeConnectionError":
                resCode = 50002;
                break;
            case "TimeoutError":
                resCode = 50002;
                break;
            case "JsonWebTokenError":
                resCode = 40401;
                break;
            
            default:
                resCode = 50000;
                break;
        }
        errMsg = newError && newError.message ? newError.message : (newError || '');
    }
    exports.response(resCode, errHeader + errMsg, "", res);
}

exports.responseFile = function(fileName, filePath, res) {


    res.removeHeader('X-Powered-By');
    res.removeHeader('X-Hostname');
    res.removeHeader('Access-Control-Allow-Origin');
    res.removeHeader('Access-Control-Allow-Headers');
    res.removeHeader('Access-Control-Allow-Methods');
    res.removeHeader('Date');
    res.removeHeader('ETag');
    res.removeHeader('Connection');

    let file = filePath.split('.');
    // var contentType = mime.contentType(path.extname('upload' + filePath));
    var contentType = mime.contentType(filePath);
    let typeR = contentType.split(';');
    res.setHeader('Content-Type', typeR[0]);
    res.setHeader('http_status_code', 200);
    res.setHeader('Content-Disposition', 'inline;filename=' + fileName + '.' + file[1]);
    res.download(filePath, fileName + '.' + file[1]);
}

exports.mapCodeErrorDB = function(err, Header) {
    try {
        return [40300, err];
    } catch (error) {
        throw error;
    }
}