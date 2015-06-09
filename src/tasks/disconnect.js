var debug = require('debug')('worksmith:sftp:disconnect')

module.exports = function(node) {

    return function (context) {

        execute.annotations = { inject: ['sftp']}

        function execute(sftp, done) {
            debug('Disconnecting')
            sftp = sftp || context.sftp
            sftp.disconnect(done)
        }

        return execute
    }
}