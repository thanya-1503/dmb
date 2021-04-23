var config = {
    development: {
        node_name: 'service-webasset',
        app_host: '0.0.0.0',
        app_port: '3000',
        use_https: 'false',
        service: {
          mongo: {
            default: {
              conn_type: 'mongodb',
              url: '192.168.10.38:27018',
              dbname: 'Webasset',
              user: 'root',
              password: 'Entronic@',
              options: { 
                 poolSize: 5
              }
            }
          },
        }
    } 
}

exports.get = function get (env) {
    var cfg = config[env] || config.development
    cfg.app_host = process.env.app_host || cfg.app_host
    cfg.node_name = process.env.node_name || cfg.node_name
    cfg.app_port = process.env.app_port || cfg.app_port
    cfg.use_https = process.env.use_https || cfg.use_https
    cfg.key = process.env.key || cfg.key
    cfg.cert = process.env.cert || cfg.cert
    cfg.rdr_social = process.env.rdr_social || cfg.rdr_social
    cfg.tmp_path = process.env.TMP_PATH || cfg.tmp_path
    var envService = null
    var envLog = null
    try {
      if (process.env.service && process.env.service.length > 0) {
        envLog = JSON.parse(process.env.log)
        envService = JSON.parse(process.env.service)
      }
    } catch (error) {
      envService = null
    }
    cfg.log = envLog !== null ? envLog : cfg.log
    cfg.service = envService !== null ? envService : cfg.service
    // console.log('cfg.service: ', cfg.service)
    return cfg
  }