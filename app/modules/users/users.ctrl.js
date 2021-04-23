var Users = require('../../models/users')
const CONFIG = require('../../config/config')
const { response, responseError, genResponseObj } = require('../../utils/response/index')
exports.list = async (req, res) => {
    try {
        const now = Date.now();
        const service = 'service-webasset';
        return Users.find()
        .then(result => {
            if(result.length == 0) {
                throw genResponseObj(req.get('x-language'), '40400', 'user not found.', undefined, service)
              } else {
                return res.json(
                    resultCode = 200,
                    developerMessage = result
                )
              }
        })
        .catch( err => {
            return responseError(req, res, err, service, now);
        })

    } catch (error) {
        return responseError(req, res, error, service, now);
    }
}