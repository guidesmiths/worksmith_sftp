var fs = require('fs-extra')
var async = require('async')

module.exports = {
    getRemotePath: getRemotePath,
    getLocalPath: getLocalPath,
    nuke: nuke
}

function getRemotePath(filename) {
    return 'files/uploads/' + (filename ? filename.replace(/\W/g, '_') : '')
}

function getLocalPath(filename) {
    return __dirname + '/volumes/sftp/home/fred/' + getRemotePath(filename)
}

function nuke(next) {
    async.series([
        fs.remove.bind(fs, getLocalPath()),
        fs.mkdirp.bind(fs, getLocalPath()),
        fs.chmod.bind(fs, getLocalPath(), '0777')
    ], next)
}