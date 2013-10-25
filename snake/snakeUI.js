(function(root) {

	var SnakeLib = root.SnakeLib = (root.SnakeLib || {})

	var Board = root.SnakeLib.Board;

  var View = SnakeLib.View = function($el) {
		this.$el = $el
  }

	View.prototype.start = function() {
		this.board = new Board();
		var view = this;
		$(document).keydown(function(e) {
			if (view.board.snake.ableToMove) {
				if (e.keyCode == 37) {
					if (view.board.snake.dir !== "E") {
						view.board.snake.dir = "W";
					}
				} else if (e.keyCode == 38) {
					if (view.board.snake.dir !== "S") {
						view.board.snake.dir = "N";
					}
				} else if (e.keyCode == 39) {
					if (view.board.snake.dir !== "W") {
						view.board.snake.dir = "E";
					}
				} else if (e.keyCode == 40) {
					if (view.board.snake.dir !== "N") {
						view.board.snake.dir = "S";
					}
				}
				view.board.snake.ableToMove = false;
			}
		});
		this.intervalID = setInterval(this.elapse.bind(this), 100);
	}

  View.prototype.elapse = function (){
  	this.board.snake.ableToMove = true;
		this.board.generateApple();
		this.$el = this.board.render(this.$el);
  	this.board.snake.move(this.board, this.intervalID);
  }

})(this);