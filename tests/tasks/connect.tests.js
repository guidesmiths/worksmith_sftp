'use strict'

var assert = require('assert')
var worksmith = require('worksmith')
var whoosh = require('whoosh')
var helper = require('../helper')
var _ = require('lodash')

describe('connect task', function() {

    this.slow(undefined)
    this.timeout(5000)

    beforeEach(helper.nuke)
    after(helper.nuke)

    var config = {
        hostname: 'localhost',
        port: 10022,
        username: 'fred',
        password: 'password'
    }

    it('should report errors', function(done) {

        var workflow = worksmith({
            task: 'connect',
            config: _.defaults({ hostname: 'should-not-resolve-sdfw39fsf' }, config)
        })

        var ctx = {}

        workflow(ctx, function(err) {
            assert.ok(err, 'Connection error was not reported')
            assert.equal(err.message, 'getaddrinfo ENOTFOUND')
            done()
        })
    })

    it('should connect', function(done) {

        var workflow = worksmith({
            task: 'connect',
            config: config,
            resultTo: 'sftp'
        })

        var ctx = {}

        workflow(ctx, function(err) {
            assert.ifError(err)
            assert.ok(ctx.sftp)
            assert.ok(ctx.sftp.isConnected())
            done()
        })
    })
})