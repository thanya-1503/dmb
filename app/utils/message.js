var msgCode = require('../config/message_code.json');
var lodash = require('lodash');

class MessageCode {
    constructor() { }

    getMessage(code, value) {
        return msgCode[code].replace(/{data}/g, value);
    };


}

module.exports = MessageCode;