# worksmith_sftp

SFTP activities for [worksmith](http://npmjs.com/package/worksmith)

This package contains the following activities/tasks:

name | description
--- | ---
[connect](#connect-activity) | Connects the underlying sftp client
[disconnect](#disconnect-activity) | Disconnects the underlying sftp client
[command](#command-activity) | Executes the specified sftp command

### connect-activity activity
Connects the underlying sftp client
##### params
name | type | description
--- | --- | ---
config | object | Connection parameters (see [whoosh](http://npmjs.com/package/whoosh))

##### example

```javascript
var worksmith = require('worksmith')
worksmith.use('sftp', require('worksmith_sftp'))
var workflow = worksmith({task:'sequence', items : [{
    task:'sftp/connect',
    config: {
        hostname: 'sftp.example.com',
        port: 22,
        username: 'fred',
        password: 'secret'
    },
    resultTo: 'sftp'
}])
```

### disconnect activity
Disconnects the underlying sftp client
##### params
name | type | description
--- | --- | ---
sftp | sftp client | The sftp client (if not specified expected to be in the context 'sftp' property)

##### example

```javascript
var worksmith = require('worksmith')
worksmith.use('sftp', require('worksmith_sftp'))
var workflow = worksmith({task:'sequence', items : [{
    task:'sftp/connect',
    config: {
        hostname: 'sftp.example.com',
        port: 22,
        username: 'fred',
        password: 'secret'
    },
    resultTo: 'sftp'
}, {
    task: 'sftp/disconnect',
    sftp: '@sftp'
}])
```

### command activity
Executes the specified sftp command

##### params
name | type | description
--- | --- | ---
sftp | sftp client | The sftp client (if not specified expected to be in the context 'sftp' property)
command | string | The command to execute (see [whoosh](http://npmjs.com/package/whoosh))
arguments | array | The array of parameters to pass to the command

##### example

```javascript
var worksmith = require('worksmith')
worksmith.use('sftp', require('worksmith_sftp'))
var workflow = worksmith({task:'sequence', items : [{
    task:'sftp/connect',
    config: {
        hostname: 'sftp.example.com',
        port: 22,
        username: 'fred',
        password: 'secret'
    },
    resultTo: 'sftp'
}, {
    task: 'sftp/command',
    command: 'stat',
    arguments: ['.']
}, {
    task: 'sftp/disconnect',
    sftp: '@sftp'
}])
```

### Running tests
You need an sftp server running on localhost:10022 for the tests to pass. If you have docker and docker-compose installed simply run ```docker-compose up``` in the route of this project.

