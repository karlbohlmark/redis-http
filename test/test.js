var request = require('request');

request({uri:'http://localhost:8181/testar'}, function (error, response, body) {
    exports['Can get start page'] = function(assert){
        assert.ok(body.length>0)
    }
})

request({uri:'http://localhost:8181', method:'PUT', body:'anotherkey=testing'}, function (error, response, body) {
    request({uri:'http://localhost:8181/testar?key=anotherkey', method:"GET"}, function (error, response, body) {
        exports['Can put a value and then get it'] = function(assert){
            assert.ok(body=="testing")
        }
    })
    
})

