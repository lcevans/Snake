(function(root) {

	var SnakeLib = root.SnakeLib = (root.SnakeLib || {})

	var Snake = SnakeLib.snake = function() {
		this.dir = "E";
		this.segments = [[Math.ceil(Snake.WIDTH/2),Math.ceil(Snake.HEIGHT/2)]];
		this.ableToMove = true;
	}

	Snake.WIDTH = 20;
	Snake.HEIGHT = 20;
	Snake.DIRS = {"N":[0,-1],"S":[0,1],"E":[1,0],"W":[-1,0]}

	Snake.prototype.move = function(board, intervalID) {
		var oldPos = this.segments[this.segments.length-1];
		var newPos = [oldPos[0]+Snake.DIRS[this.dir][0],
									oldPos[1]+Snake.DIRS[this.dir][1]];
		if (this.hitSelf(newPos) || this.hitWall(newPos)) {
			alert("You dead, bro.");
			window.clearInterval(intervalID);
		}
		else {
			this.segments.push(newPos);
			if ((newPos[0] != board.apple[0]) || (newPos[1] != board.apple[1])) {
				this.segments.shift();
			} else {
				board.apple = null;
			}
		}
	}

	Snake.prototype.hitSelf = function(newPos) {
		return _.any(this.segments, function (pos) {
			return ((pos[0] === newPos[0]) && (pos[1] === newPos[1]));
		});
	}

	Snake.prototype.hitWall = function(newPos) {
		return !((Math.abs(newPos[0] % Snake.WIDTH) == newPos[0])
					&& (Math.abs(newPos[1] % Snake.WIDTH) == newPos[1]));
	}

	var Board = SnakeLib.Board = function() {
		this.snake = new Snake();
		this.apple = null;
	}

	Board.prototype.generateApple = function () {
		if (this.apple === null) {
			var posX = Math.floor(Math.random() * Snake.WIDTH);
			var posY = Math.floor(Math.random() * Snake.HEIGHT);
			//ensure not on top of snake
			this.apple = [posX,posY];
			console.log(this.apple)
		}
	}

	Board.prototype.render = function ($el) {
		var board = this;
		$el.empty();
		for (var i = 0; i < Snake.WIDTH; i++){
			$el.append('<div class="column" id="column' + i + '"></div>');
		}
		$(".column").each( function (colIndex, column) {
			for (var j = 0; j < Snake.HEIGHT; j++){
				var occupant = "";
				if (_.any(board.snake.segments, function (segment) {
					return ((segment[0] === colIndex) && (segment[1] === j))
				      })) {
					occupant = "snake";
				} else if ((board.apple !== null) && (board.apple[0] == colIndex) && (board.apple[1] == j)){
					occupant = "apple";
				}
				$(column).append('<div class="square" occupant="'+occupant+'" id="square' + colIndex + '-' + j + '"></div>');
			}
		});
		return $el;
	}


})(this);
