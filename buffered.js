var buffered = function(stream, onBody){
  var body = ''
  stream.on('data', function(data){
    body+=data
  })
  stream.on('end', function(){
  	onBody(body)
  })
}

module.exports = buffered
