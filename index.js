// const io = require('socket.io')(3000);

// const users = {};


// io.on('connection' , socket=>{
// 	socket.on('new-user-joined',namee =>{
// 		console.log("new user" , namee);
// 		users[socket.id] = namee;
// 		socket.broadcast.emit('user-joined', namee);
// 	});

// 	socket.on('send', message =>{
// 		socket.broadcast.emit('receive',{message: message,namee: user[socket.id]})
// 	});
// });


var app = require('express')();
var PORT = process.env.PORT || 5500;
app.use(express.static('public'));
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html');});
users = [];
io.on('connection', function(socket){
   console.log('A user connected');
   socket.on('setUsername', function(data){
      if(users.indexOf(data) > -1){
         users.push(data);
         socket.emit('userSet', {username: data});
      } else {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
     }
   })
   	socket.on('new-user-joined',name =>{
		console.log("new user" , name);
		users[socket.id] = name;
		socket.broadcast.emit('user-joined', name);
	});



	socket.on('send', message =>{
		socket.broadcast.emit('receive',{message: message,name: users[socket.id]})
	});

	socket.on('disconnect',message=>{
		socket.broadcast.emit('left', users[socket.id]);
		delete users[socket.id];
	})

});
http.listen(PORT, function(){
   console.log(`listening on ${PORT}`);
});