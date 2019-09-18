function equals(a, b, c) {
   return (a == b && b == c);
}

class Player {
   constructor(name, symbol) {
      this.name = name;
      this.symbol = symbol;
      this.score = 0;
   }
}

class CardGame {
   constructor(id) {
      this.id = id;
      this.state = "";
   }

   setState(name) {
      this.state = name;
   }
}

class Game {
   constructor(player1, player2) {
      this.player1 = player1;
      this.player2 = player2;

      this.board = [
         [card1 = new CardGame("#card1"), card2 = new CardGame("#card2"), card3 = new CardGame("#card3")],
         [card4 = new CardGame("#card4"), card5 = new CardGame("#card5"), card6 = new CardGame("#card6")],
         [card7 = new CardGame("#card7"), card8 = new CardGame("#card8"), card9 = new CardGame("#card9")],
      ];

      this.playerTurn = this.player1;
      this.turnCounter = 1;
      this.matchResult = "";
      this.matchWinner = "";
   }

   play(card) {
      card.setState(this.playerTurn);
      this.changeTurn();
   }

   changeTurn() {
      if (this.playerTurn == this.player1) {
         this.playerTurn = this.player2;
      } else {
         this.playerTurn = this.player1;
      }
      this.turnCounter++;
   }

   checkResult() {
      if (this.turnCounter >= 5 && this.turnCounter < 9) {
         for (i = 0; i < 3; i++) {
            if (equals(board[i][0].state, board[i][1].state, board[i][2].state) ||
               equals(board[0][i].state, board[1][i].state, board[2][i].state) ||
               equals(board[0][0].state, board[1][1].state, board[2][2].state) ||
               equals(board[1][2].state, board[1][1].state, board[2][0].state)) {

               this.matchResult = "Win";
               this.matchWinner = this.playerTurn;
            }
         }
      } else if (this.turnCounter == 9) {
         for (i = 0; i < 3; i++) {
            if (equals(board[i][0].state, board[i][1].state, board[i][2].state) ||
               equals(board[0][i].state, board[1][i].state, board[2][i].state) ||
               equals(board[0][0].state, board[1][1].state, board[2][2].state) ||
               equals(board[1][2].state, board[1][1].state, board[2][0].state)) {

               this.matchResult = "Win";
               this.matchWinner = this.playerTurn;
               if (this.matchWinner == this.player1.name) {
                  this.player1.score++;
               } else {
                  this.player2.score++;
               }

            } else {
               this.matchResult = "Draw";
            }
         }
      }
      return this.matchResult;
   }
}

// jQuery



$(document).ready(function myGame() {
   $("#scoreboard").hide();
   $("#gameBoard").hide();

   var player1 = new Player("", "X");
   var player2 = new Player("", "O");

   $("#start-btn").click(function start() {
      player1.name = $("#player1Form").val();
      player2.name = $("#player2Form").val();

      if (player1.name == "" && player2.name == "") {
         player1.name = "Darth Vader";
         player2.name = "Stormtrooper";
      }
      $("#player1").text(player1.name);
      $("#player2").text(player2.name);

      $("#scorePlayer1").text(player1.score);
      $("#scorePlayer2").text(player2.score);

      $("#playerSetUp").hide();
      $("#start-btn").hide();
      $("#scoreboard").show();
      $("#gameBoard").show();
   });

   var newGame = new Game(player1, player2);

   $(".btn-game").click(function playerMove() {
     
   });
});