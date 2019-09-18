function equals(a, b, c) {
   if (a != "" && a == b && b == c) {
      return true;
   } 
   return false;
}

class Player {
   constructor(name, symbol) {
      this.name = name;
      this.symbol = symbol;
      this.score = 0;
   }
}

class CardGame {
   constructor() {
      this.symbol = "";
   }

   setSymbol(symbol) {
      this.symbol = symbol;
   }
}

class Board {
   constructor() {
      this.board = [
         [new CardGame(), new CardGame(), new CardGame()],
         [new CardGame(), new CardGame(), new CardGame()],
         [new CardGame(), new CardGame(), new CardGame()],
      ];
      this.matchResult = "playing";
   }

   play(symbol, row, col) {
      this.board[row][col].setSymbol(symbol);
   }

   checkResult() {
      for (let i = 0; i < 3; i++) {
         if (equals(this.board[0][0].symbol, this.board[0][1].symbol, this.board[0][2].symbol) ||
            equals(this.board[1][0].symbol, this.board[1][1].symbol, this.board[1][2].symbol) ||
            equals(this.board[2][0].symbol, this.board[2][1].symbol, this.board[2][2].symbol) ||
            equals(this.board[0][0].symbol, this.board[1][0].symbol, this.board[2][0].symbol) ||
            equals(this.board[0][1].symbol, this.board[1][1].symbol, this.board[2][1].symbol) ||
            equals(this.board[0][2].symbol, this.board[1][2].symbol, this.board[2][2].symbol) ||
            equals(this.board[0][0].symbol, this.board[1][1].symbol, this.board[2][2].symbol) ||
            equals(this.board[0][2].symbol, this.board[1][1].symbol, this.board[2][0].symbol)) {

            return "Win";
         } 
         return "nada";
         
      }
      
   }
}

class Game {
   constructor() {
      this.player1 = new Player("", "X"),
      this.player2 = new Player("", "O"),
      this.board = new Board();
      this.playerTurn = this.player1;
      this.turnCounter = 1;
      this.matchWinner = "";
   }

   play() {
      var bd = document.getElementById("gameBoard");
      document.getElementById("rdCount").innerHTML = this.turnCounter;

      bd.addEventListener("click", (event) => {
         event.target.innerHTML = (this.playerTurn == this.player1) ? this.player1.symbol : this.player2.symbol;
         

         console.log(this.playerTurn.symbol);

         var cardPos = event.target.value.split(" ");
         var row = Number(cardPos[0]);
         var col = Number(cardPos[1]);

         this.board.play((this.playerTurn == this.player1) ? this.player1.symbol : this.player2.symbol, row, col);

         document.getElementById("rdCount").innerHTML = this.board.checkResult() + " " + this.turnCounter;
         console.log(this.board)
         this.changeTurn();
      });
   }

   changeTurn() {
      if (this.playerTurn == this.player1) {
         this.playerTurn = this.player2;
      } else {
         this.playerTurn = this.player1;
      }
      this.turnCounter++;
   }
}

var newGame = new Game();

function startGame() {
   newGame.player1.name = $("#player1Form").val();
   newGame.player2.name = $("#player2Form").val();

   if (newGame.player1.name == "" && newGame.player2.name == "") {
      newGame.player1.name = "Darth Vader";
      newGame.player2.name = "Stormtrooper";
   } 

   $("#player1").text(newGame.player1.name);
   $("#player2").text(newGame.player2.name);

   $("#scorePlayer1").text(newGame.player1.score);
   $("#scorePlayer2").text(newGame.player2.score);
   $("#p1Indicator").text("Sua Vez!");
   $("#p2Indicator").text("Vez de Player 1");

   $("#playerSetUp").hide();
   $("#start-btn").hide();
   $("#scoreboard").show();
   $("#table").show();
   $("#rdCount").show();

   newGame.play();
}

$(document).ready(function (){
   $("#scoreboard").hide();
   $("#table").hide();
   $("#rdCount").hide();
});