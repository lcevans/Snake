(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

	var TowersUI = Hanoi.TowersUI = function () {
		this.selectedPile = null;
	};

  var Game = Hanoi.Game = function () {
    this.towers = [[3, 2, 1], [], []];
		this.ui = new TowersUI();
  };

  Game.prototype.turn = function () {

  }

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.run = function () {
    var game = this;
		$(".pile").click( function () {
			var pileID = parseInt($(this).attr("id")[4]);
			if (game.ui.selectedPile === null){
				game.ui.selectedPile = pileID;
			}
			else if (game.ui.selectedPile === pileID) {
				game.ui.selectedPile = null;
			} else {
				game.move(game.ui.selectedPile, pileID);
				game.ui.selectedPile = null;
			}
			game.ui.render(game.towers);
		});
  };

	TowersUI.prototype.render = function (towers) {
		var ui = this;
		$('.pile').empty();
		$('.pile').each(function(index, element) {
			$(element).attr("highlighted", ((index == ui.selectedPile) ? "true" : "false"));

			var pile = this;
			towers[index].forEach ( function (block){
				$(pile).append('<div class="block'+ block +'"></div>')
			});
		});
	}

})(this);

// this.Hanoi.Game is a constructor function, so we instantiate a new object, then run it.

var Game = new this.Hanoi.Game();
Game.run();