var buffered = require('./buffered')
  , client = require('./redisclient')
  , cors = require('./cors')

module.exports = {
    'put': {
        'condition': function(request){ return request.method.toUpperCase()=='PUT'},
        'act': function(request, response){
            buffered(request, function(body){
                console.log("Put request")
                var pairs = body.split('&')
                pairs.forEach(function(pair){
                    var parts = pair.split('='),
                    key = parts[0],
                    value = parts[1]
                    client.set(key, value, function(err, results){
                      var origin
                      console.log(results)
                      var responseHeaders = {
                        'Content-Type': 'application/json'
                      }
                      if(origin=(request.headers['origin'] || request.headers['Origin'])){
                       responseHeaders['Access-Control-Allow-Origin'] = origin
                      }
                      response.writeHead(200, responseHeaders)
                      response.end('{"success":"maybe"}')
                    })
                })
            })
        }
    },
    'get':{
        'condition': function(request){return request.method.toUpperCase()=='GET' && (this.qs = request.url.match(/\?key=(.*)/))},
        'act': function(request, response){
            var origin = cors.getOrigin(request),
              qs = this.qs
              
            console.log('origin:' + origin)
            response.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin
            });
            client.get(qs[1], function(err,resp){
                console.log(resp)
                response.end(resp.toString())
            })
        }
    },
    'get html':{
        'condition': function(request){return request.method.toUpperCase()=='GET'},
        'act': function(request, response){
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.write("<html><head></head><body>hejhej</body></html>")
            response.end()
        }
    }
}

