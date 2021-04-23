/* ------------- [START IMPORT MODULE] ------------ */
const express = require('express')
const router = require('express').Router();
const bodyParser = require('body-parser')
const path = require('path')
// const jwtDecode = require('jwt-decode');
const cfgPermission = require("../config/config_permission.json")
const moment = require('moment')
var httpContext = require('express-http-context');
const _conf = require('../config/config').get(process.env.NODE_ENV);

module.exports = function () {
    var app = express();

    var genXTID = function () {
        return moment().format('YYYYMMDDHHmmssSSS') + new Array(13).join().replace(/(.|$)/g, function () {
            return ((Math.random() * 36) | 0).toString(36)[Math.random() < 0.5 ? 'toString' : 'toUpperCase']()
        })
    }

    app.use(bodyParser.json({ limit: "75mb" }));
    app.use(bodyParser.urlencoded({ limit: "75mb", extended: false, parameterLimit: 50000 }));
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    app.set('etag', false);
    app.use(httpContext.middleware);

  app.use((req,res,next) => {
    httpContext.ns.bindEmitter(req);
    httpContext.ns.bindEmitter(res);
    return next();
  })
    /* ------------- [START MIDDLEWARE] ------------ */

    app.all('/*', (req, res, next) => {
        if (req.headers['authorization']) {
            try {
                req.userProfile = jwt.verify(req.headers['authorization'].replace('Bearer ', ''),SECRET)
            } catch (error) { }
        }
        return next();
    })

    if (cfgPermission) {
        var methodFuncList = Object.keys(cfgPermission);
        if (methodFuncList.length > 0) {
            methodFuncList.forEach((key) => {
                if(Array.isArray(cfgPermission[key])){
                    for(let i = 0; i < cfgPermission[key].length; i++){
                        router[cfgPermission[key][i].method](cfgPermission[key][i].uri, async (req, res, next) => {
                            req.apiName = cfgPermission[key][i].apiName||'UNKNOWN API';
                            httpContext.set('apiName', req.apiName);
                            if(key == 'bypass') { }
                            else if (!req.userProfile || (req.userProfile && req.userProfile.methods && req.userProfile.methods.indexOf(key) == -1)) {
                                httpContext.set('unauthorized', 'unauthorized');
                                // return next();
                            }
                            return next();
                        })
                    }
                }
                else{
                    router[cfgPermission[key].method](cfgPermission[key].uri, async (req, res, next) => {
                        // console.log(('you need permission ' + key + ' to access this fucnction'));
                        req.apiName = cfgPermission[key].apiName||'UNKNOWN API';
                        httpContext.set('apiName', req.apiName);
                        if(key == 'bypass') { }
                        else if (!req.userProfile || (req.userProfile && req.userProfile.methods && req.userProfile.methods.indexOf(key) == -1)) {
                            // return res.status(403).json({ responseCode: "403", developerMessage: "Access denied" })
                            httpContext.set('unauthorized', 'unauthorized');
                            // return next();
                        }
                        return next();
                    })
                }
            })
            app.use('', router);
        }
    }

    app.all('/*', function (req, res, next) {
        
        let logResources = {
            reqBody: (req.body),
            fromIp: getRemoteIp(req),
            requestId: req.headers.tid||'',
            method: (req.method).toUpperCase(),
            path: req.originalUrl||'',
            service: 'SERVICE',
            params: Object.keys(req.query).length > 0 ? '' : (req.query),
            // startTime: Date.now(),
            result: '',
            resultCode: '',
            response: '',
            respTime: '',
            message: '',
            header: (req.headers),
            appName: _conf.node_name || 'repoapi',
            componentName: 'SRFP',
            origination: 'repofe',
            sessionID: genXTID(),
            recordName: (req.apiName||'UNKNOWN API')//apiList.getCMD(req.originalUrl, req.method),
        };
        req.logResources = logResources;
        httpContext.set('logResources', JSON.stringify(logResources));
    
        const oldWrite = res.write
        const oldEnd = res.end
        var chunks = []
        var body = ''

        // genarate session
        req.id = req.headers['x-session-id']
        req.xrtid = req.headers['x-rtid']
        let reqId = genXTID();

        const start = process.hrtime();
        

        res.on('finish', () => {
            var diff = (process.hrtime(start));
            var diffMs = (diff[0] * 1e9 + diff[1]) / 1e6;
            var genId2 = genXTID();
            var objBody = '';//JSON.parse(body)
            var respBody = '';
            try {
                objBody = JSON.parse(body);
                respBody = JSON.stringify(objBody, function(key, value) {
                    if (this[key] instanceof Date) {
                        moment.locale();
                        return moment(this[key]).local().format('YYYY-MM-DD[T]HH:mm:ss')
                    }
                    else if (typeof this[key] === "string" && value.length > 300) {return (value.slice(0, 300) + ' ...')}
                    return value;
                })
            } catch (error) {
                respBody = body;
            }

            var statResult = res.statusCode < 400 ? ' success' : 
            ' err '+ (objBody.responseMessage ? objBody.responseMessage : objBody.developerMessage ? objBody.developerMessage : 'internal server error').replace(/["]+/g,'').trim().toLowerCase();

            if(res.statusCode < 400){
            }else{
                // logger.error('', '');

            }
        });
        
        res.write = function (chunk) {
            chunks.push(chunk)
            oldWrite.apply(res, arguments)
        }

        res.end = function (chunk) {
            if (chunk && chunk instanceof Buffer){
                chunks.push(chunk);
                body = Buffer.concat(chunks).toString('utf8');
            } else {
                body = chunk;
            }
            oldEnd.apply(res, arguments)
        }
        // let aaa = httpContext.get('logResources');
        // console.log(aaa);
        return next()
    })

    function getRemoteIp(req, res) {
        var remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''
        if (remoteIp.indexOf(':') > -1) {
            var tmp = remoteIp.split(':')
            remoteIp = tmp.length > 0 ? tmp[tmp.length - 1] : remoteIp
        }
        return remoteIp
    }

    // app.use(function (req, res, next) {
    //     var _json = res.json;
    //     res.json = function (obj) {
    //         res._body = obj;
    //         _json.call(this, obj);
    //     };
    //     next();
    // });

    /* ------------- [END MIDDLEWARE] ------------ */

    // app.use(jsonRes);

    app.all('/api/v1/*', function (req, res, next) {
        if (req.originalUrl == '/api/v1/authen-ids') {
            return next();
        }
        if (!req.userProfile) {
            return res.status(401).json({ responseCode: 401, responseMessage: "Unauthorized" });
        }
        else if(httpContext.get('unauthorized') == 'unauthorized'){
            return res.status(403).json({ responseCode: 403, developerMessage: "Access denied" })
        }
        return next();
    });

    /* ------------- [START LOAD API ROUTE] ------------ */
    var load = require('express-load')
    var cwdPath = path.join(__dirname, '..')
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

    /* ------------- [END LOAD API ROUTE] ------------ */

    app.use((err, req, res, next) => {
        if (err) {
            return res.status(500).json({
                responseCode: 500,
                responseMessage: 'Internal Server Error'
            })
        }
        return next();
    });
    /* ------------- [START NOT MATCH ROUTE - 404 ] ------------ */

    app.all('*', function (req, res) {
        return res.status(404).send({
            responseCode: '404',
            responseMessage: 'Page not found',
            // error: 'Page not found'
        })
    })
    /* ------------- [END NOT MATCH ROUTE - 404 ] ------------ */

    return app
}