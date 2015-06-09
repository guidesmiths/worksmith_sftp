'use strict'

var assert = require('assert')
var worksmith = require('worksmith')
var whoosh = require('whoosh')
var helper = require('../helper')
var _ = require('lodash')

describe('command task', function() {

    this.slow(undefined)

    beforeEach(helper.nuke)
    after(helper.nuke)

    var config = {
        hostname: 'localhost',
        port: 10022,
        username: 'fred',
        password: 'password'
    }

    it('should execute an sftp command', function(done) {

        var workflow = worksmith({
            task: 'sequence',
            items: [
                {
                    task: 'connect',
                    config: config,
                    resultTo: 'sftp'
                },
                {
                    task: 'command',
                    sftp: '@sftp',
                    command: 'stat',
                    arguments: ['.'],
                    resultTo: 'stats'
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
            assert.ok(ctx.stats)
            assert.equal(ctx.stats.mode, 16877)
            done()
        })
    })
})