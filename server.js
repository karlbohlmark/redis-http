var http = require('http')
  , connect = require('connect')
  , sys = require('sys')
  , io = require('socket.io')
  , cors = require('./cors')
  , actions = require('./actions')
  , buffered = require('./buffered')
  , client = require('./redisclient')
;

var server = http.createServer(function(request, response){
  console.log("request: " + request.method  + " " + request.url)
  console.log(request.headers)
  
  if(cors.getOrigin(request) && request.method.toUpperCase()=='OPTIONS'){
    console.log('preflight')
    return cors.handlePreflight(request, response)
  }

  console.log(actions)

  for(var action in actions){
    if(!actions.hasOwnProperty(action)) continue
    
    var todo = actions[action]
    if(todo.condition(request, response)){
        return todo.act(request, response);
    }
  }
})

var socket = io.listen(server)
socket.on('connection', function(client){
  client.on('message', function(message){
    
  })
  client.on('disconnect', function(){
    
  })
  
  client.send('a message')
})

var serverStarted = false

client.on("connect", function () {
  if(!serverStarted){
    serverStarted = true
    server.listen(8181)
  }
});



