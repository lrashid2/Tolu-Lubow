// Computer makes a move with algorithm choice and skill/depth level
var makeMove = function(algo, skill=3) {
  // exit if the game is over
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  // Calculate the best move, using chosen algorithm
  if (algo === 1) {
    var move = randomMove();
  } else if (algo === 2) {
    var move = calcBestMoveOne(game.turn());
  } else if (algo === 3) {
    var move = calcBestMoveNoAB(skill, game, game.turn())[1];
  } else if (algo == 4) {
   var move = calcBestMove(skill, game, game.turn())[1];
  } else if (algo == 5) {
    var move = calcBestMove_2(skill, game, game.turn())[1];
  } else{
    var move = calcBestMove_2(skill, game, game.turn())[1];
  }

  // Make the calculated move
  game.move(move);
  // Update board positions
  board.position(game.fen());
}

// Computer vs Computer
var playGame = function(algo=4, skillW=2, skillB=2) {
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  var skill = game.turn() === 'w' ? skillW : skillB;
  makeMove(algo, skill);
  window.setTimeout(function() {
    playGame(algo, skillW, skillB);
  }, 250);
};

// Handles what to do after human makes move.
// Computer automatically makes next move
var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // If illegal move, snapback
  if (move === null) return 'snapback';

  // Log the move
  console.log(move)

  // make move for black
  window.setTimeout(function() {
    makeMove(4, 3);
  }, 250);
};


// function to run multiple iterations of the game. It randomly selects the evaluation (algorithm) to use and the depth for both players. 
var test = function(){
    
    for (var i = 0; i < 100 ; i++){
      var algorithm = Math.floor((Math.random()*3) + 3); // random number between 3 and 5 for algorithm 
      var skillW = Math.floor((Math.random()*3) + 1); // random number between 1 and 3 for depth of W
      var skillB = Math.floor((Math.random()*3) + 1); // random number between 1 amd 3 for depth B 
      game.reset(); // reset chess game 
      board.clear(); // clear board 
      board.start();
      playGame(algorithm, skillW , skillB); // play game 

      console.log('Algorithm' + algorithm);
      console.log('SkillW' + skillW);
      console.log('SkillB' + skillB);
    }
   
};
