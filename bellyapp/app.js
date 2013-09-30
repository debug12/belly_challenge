
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

var As = [2,4,6,8,9,6,5,3,2,3,4,5,6];
var Ops = ['+', '-', '+','*','-', '+', '*', '+', '-', '+', '*', '-', '*']
var Bs = [4,5,7,8,8,9,3,3,6,3,4,5,3,2,1];
var current = '9+5';

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
app.get('/', function (req, res){
	res.render('index');
});

var genQ = function(){
	var rand = Math.floor(Math.random()*13);
	var rando = Math.floor(Math.random()*13);
	var random = Math.floor(Math.random()*13);
	var message = As[rand] + Ops[rando] + Bs[random];
	current = message;
	return message;
}



var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket){
	socket.emit('message', {message: current});
	socket.on('answer', function(data){
 		io.sockets.emit('next', {message: genQ()})
	});
});