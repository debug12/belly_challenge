$(document).ready(function(){
	var socket = io.connect('http://localhost:3000');
	var current;
	var score  = 0;
	socket.on('message', function (data){
		if(data.message){
			current = data.message;
			$('#title').html(data.message);
		} else{
			console.log("There is a problem with: ", data);
		}
	});
	socket.on('next', function (data){
		if(data.message){
			current = data.message;
			$('#title').html(data.message);
			$('#answer').val("");
		} else{
			console.log("There is a problem with: ", data);
		}
	});

	var checkAnswer = function(op, A, B, answer){
		switch(op){
			case '+':
				if(A+B != answer){
					return false;
				} else{
					return true;
				}
				break;
			case '-':
				if(A-B != answer){
					return false;
				} else{
					return true;
				}
				break;
			case '*':
				if(A*B != answer){
					return false;
				} else{
					return true;
				}
				break;
			default:
				return false;
		}
	}
	$('#answer').keyup(function(e){
		if(e.which == 13){
			$('#submit').click();
		}
	})

	$('#submit').click(function(){
		var answer = parseInt($('#answer').val());
		var A = parseInt(current.substr(0, 1));
		var Op = current.substr(1, 1);
		var B = parseInt(current.substr(2, 1));
		if(checkAnswer(Op, A, B, answer)){
			score += 10;
			var html = "Score: " + score;
			$('#score').html(html);
			toastr.success('Good job! 10 points for you!');
			socket.emit('answer');
		} else{
			$('#answer').val("");
			toastr.error('That answer is wrong. Try again!')
			//alert that it's wrong.
		}
	});
});
