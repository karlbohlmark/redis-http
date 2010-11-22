var handlePreflightRequest = function(request, response){
  console.log('preflight request')
  response.writeHead(200, {
    'Access-Control-Allow-Origin': request.headers['origin'] || request.headers['Origin'],
    'Access-Control-Allow-Methods': 'PUT',
    'Access-Control-Allow-Headers': request.headers['access-control-request-headers'] || request.headers['Access-Control-Request-Headers']
  })
  response.end()
}

var isPreflightRequest = function(request){
    var origin = request.headers['origin'] || request.headers['Origin']
    return origin
}


exports.handlePreflight = handlePreflightRequest
exports.getOrigin = isPreflightRequest
