/* ------------- [START IMPORT MODULE] ------------ */
const express = require('express')
const router = require('express').Router();
const bodyParser = require('body-parser')
const path = require('path')
const genUtil = require('../utils/genUtil.js')
const stat = require('../constants/stat.const')
const morgan = require("morgan")
// const jwtDecode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const cfgPermission = require("./config_permission.json")
const moment = require('moment')
const apiList = require('./api_list');
const { config } = require('process');
const _conf = require('./config').get(process.env.NODE_ENV);
var SECRET = 'rrs-service';

module.exports = function () {
    var app = express()

    var genXTID = function(){
        return moment().format('YYYYMMDDHHmmssSSS') + new Array(13).join().replace(/(.|$)/g, function () {
          return ((Math.random() * 36) | 0).toString(36)[Math.random() < 0.5 ? 'toString' : 'toUpperCase']()
        })
    }

    app.use(function (req, res, next) {
        // genarate session
        req.id = req.headers['x-session-id']
        req.xtid = req.headers['x-tid']
        req.reqId = genXTID();
        
        const start = process.hrtime();

        res.on('finish', () => {            
            var diff = (process.hrtime(start));
            var diffMs = (diff[0]*1e9 + diff[1]) / 1e6;
            var genId2 = genXTID();

        });
        return next()
    })

    function getRemoteIp (req, res) {
        var remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''
        if (remoteIp.indexOf(':') > -1) {
            var tmp = remoteIp.split(':')
            remoteIp = tmp.length > 0 ? tmp[tmp.length - 1] : remoteIp
        }
        return remoteIp
    }

    app.use(function(req, res, next) {
        var _json = res.json;
        res.json = function(obj) {
            res._body = obj;
            _json.call(this, obj);
        };
        next();
    });

    // app.all('/api/v1/*', function (req, res, next) {
    //     if(req.originalUrl == '/api/v1/authen-ids'){
    //         return next();
    //     }
    //     if (req.headers['authorization']) {
    //         try {
    //             // req.userProfile = jwtDecode(req.headers['authorization'].replace('Bearer ', ''));
    //             req.userProfile = jwt.verify(req.headers['authorization'].replace('Bearer ', ''),SECRET)
    //         } catch (error) {
    //             return res.status(401).json({
    //                 responseCode: 401,
    //                 responseMessage: "Unauthorized"
    //             });
    //         }
    //     }
    //     else{
    //         return res.status(401).json({
    //             responseCode: 401,
    //             responseMessage: "Unauthorized"
    //         });
    //     }
    //     return next();
    // });

    if(cfgPermission){
        var methodFuncList = Object.keys(cfgPermission);
        if(methodFuncList.length > 0 ){
            methodFuncList.forEach( (key) => {
                router[cfgPermission[key].method](cfgPermission[key].uri, async (req, res, next) => {
                    console.log(('you need permission '+ key +' to access this fucnction'));
                    if(!req.userProfile || (req.userProfile && req.userProfile.methods && req.userProfile.methods.indexOf(key) == -1) ){
                        return res.status(403).json({ responseCode: "403", developerMessage: "Access denied"})
                    }
                    return next();
                })
            })
            app.use('',router);
        }
    }
    var load = require('express-load')
    var cwdPath = path.join(__dirname, '..')
    // logger.info('CWD Path :'+ cwdPath);
    // console.log(cwdPath)
    // console.log(__dirname)
    load('modules', {
        cwd: cwdPath,
        checkext: true,
        extlist: ['service.js']
    }).into(app)
    load('modules', {
        cwd: cwdPath,
        checkext: true,
        extlist: ['ctrl.js']
    }).into(app)
    load('modules', {
        cwd: cwdPath,
        // verbose: true,
        checkext: true,
        extlist: ['route.js']
    }).into(app)
    // logger.info('load module')
    // logger.info('CWD Path :'+ cwdPath.toString());
    /* ------------- [END LOAD API ROUTE] ------------ */

    app.all('/error', function (req, res) {
        logger.debug('Got Redirect Error')
        res.status(500).send({
            error: 'Connection close!'
        })
        // Future Action.
    })
    /* ------------- [START NOT MATCH ROUTE - 404 ] ------------ */
    // unknown URL

    app.all('*', function (req, res) {
        var remoteIp = getRemoteIp(req, res)

        const session = `${req.id}:${req.xrtid}:`
        var headerLog = `FROMIP|${remoteIp}|REQUESTID|${req.id}|URL|${req.method} ${req.originalUrl}|REQHEADER|${JSON.stringify(req.headers)}|REQBODY|${JSON.stringify(req.body, function (key, value) {
            if(key == 'password'){
                return '********'
            }
            if (typeof this[key] === "string" && value.length > 300) {return (value.slice(0, 300) + ' ...')}
            return value;
        })}`
        req.headerLog = headerLog
        logger.debug('Start Process', req.method, ' Unknown URL...')

        logger.debug(stat.revUknReq)
        logger.debug(stat.retUknErr)

        const ret = {
            resultCode: '50000',
            developerMessage: 'System error',
            error: 'invalid_request'
        }

        let rawData = {}
        rawData['url'] = req.originalUrl
        if (req.query.length > 1) { rawData['query'] = req.query }
        if (req.body.length > 1) { rawData['body'] = req.body }

        logger.error('CLIENT', 'Unknown', null, 'Unknown URL=' + req.url + ', Method=' + req.method)
        logger.error(400, 'invalid_request')
        logger.error('CLIENT', 'Unknown', '', JSON.stringify(ret), {
            header: '',
            body: ret,
            url: ''
        })

        return res.status(400).send(ret)
    })
    /* ------------- [END NOT MATCH ROUTE - 404 ] ------------ */

    app.use((err, req, res, next) =>{
        if(err){
          return res.status(500).json({
            responseCode : 500,
            responseMessage : 'Internal Server Error'
          })
        }
        return next();
      });

    return app
}
