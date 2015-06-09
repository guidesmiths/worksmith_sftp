'use strict'

var assert = require('assert')
var worksmith = require('worksmith')
var whoosh = require('whoosh')
var helper = require('../helper')
var _ = require('lodash')

describe('disconnect task', function() {

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

    it('should disconnect connect', function(done) {

        var workflow = worksmith({
            task: 'sequence',
            items: [
                {
                    task: 'connect',
                    config: config,
                    resultTo: 'sftp'
                },
                {
                    task: 'disconnect',
                    sftp: '@sftp'
                }
            ]
        })

        var ctx = {}

        workflow(ctx, function(err) {
            assert.ifError(err)
            assert.ok(ctx.sftp)
            assert.ok(!ctx.sftp.isConnected())
            done()
        })
    })
})