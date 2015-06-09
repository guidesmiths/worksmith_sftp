var Whoosh = require('whoosh')
var debug = require('debug')('worksmith:sftp:connect')


module.exports = function(node) {

    return function (context) {

        execute.annotations = { inject: ['config']}

        function execute(config, done) {
            debug('Connecting to %s@%s:%s', config.username, config.hostname, config.port)

            Whoosh.connect(config, done)
        }

        return execute
    }
}