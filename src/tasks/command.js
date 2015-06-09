var _ = require('lodash')
var debug = require('debug')('worksmith:sftp:command')

module.exports = function(node) {

    return function (context) {

        execute.annotations = { inject: ['sftp', 'command', 'arguments']}

        function execute(sftp, command, arguments, done) {
            debug('Executing %s with [%s]', command, arguments.join(', '))
            sftp = sftp || context.sftp
            sftp[command].apply(sftp, _.compact([].concat(arguments, done)))
        }

        return execute
    }
}