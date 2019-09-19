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
      this.matchResult = "Playing";
      this.turnCounter = 0;
   }

   boardPlay(symbol, row, col) {
      this.board[row][col].setSymbol(symbol);
      this.turnCounter++;
   }

   checkResult() {
      for (let i = 0; i < 3; i++) {
         if (equals(this.board[i][0].symbol, this.board[i][1].symbol, this.board[i][2].symbol) ||
            equals(this.board[0][i].symbol, this.board[1][i].symbol, this.board[2][i].symbol) ||
            equals(this.board[0][0].symbol, this.board[1][1].symbol, this.board[2][2].symbol) ||
            equals(this.board[0][2].symbol, this.board[1][1].symbol, this.board[2][0].symbol)) {

            this.matchResult = "Win";

         } else if (this.turnCounter == 9 && this.matchResult != "Win") {
            this.matchResult = "Draw";
         }
      }
   }
}

class Game {
   constructor() {
      this.player1 = new Player("", "X");
      this.player2 = new Player("", "O");
      this.board = new Board();
      this.playerTurn = this.player1;
      this.matchWinner = "";
   }

   play() {
      var bd = document.getElementById("gameBoard");
      document.getElementById("turnCount").innerHTML = "Turn: " + (this.board.turnCounter + 1);

      bd.addEventListener("click", (event) => {
         this.board.checkResult();

         if (this.board.matchResult == "Playing") {
            if (event.target.tagName == "BUTTON") {
               event.target.innerHTML = (this.playerTurn == this.player1) ? this.player1.symbol : this.player2.symbol;
               document.getElementById("" + event.target.id + "").disabled = true;
            }

            var cardPos = event.target.value.split(" ");
            var row = Number(cardPos[0]);
            var col = Number(cardPos[1]);

            this.board.boardPlay((this.playerTurn == this.player1) ? this.player1.symbol : this.player2.symbol, row, col);
            this.board.checkResult();
            this.changeTurn();

            console.log(this.board);

            document.getElementById("turnCount").innerHTML = "Turn: " + (this.board.turnCounter + 1);
         } else {
            this.changeTurn();
            for (var i = 1; i <= 9; i++) {
               document.getElementById("btn-" + i).disabled = true;
            }
         }
      });


   }

   changeTurn() {
      if (this.board.matchResult == "Draw" || this.board.matchResult == "Win") {
         document.getElementById("p1Indicator").innerHTML = "Match is over!";
         document.getElementById("p2Indicator").innerHTML = "Match is over!";
         document.getElementById("showWinner").innerHTML = this.board.matchResult == "Win"
            ? "Winner: " + this.playerTurn.name : "Draw";
         $("#roundUp").show();

      } else if (this.playerTurn == this.player1) {
         document.getElementById("p2Indicator").innerHTML = "Sua Vez!";
         document.getElementById("p1Indicator").innerHTML = "Vez de Player 2";
         this.playerTurn = this.player2;

      } else {
         document.getElementById("p1Indicator").innerHTML = "Sua Vez!";
         document.getElementById("p2Indicator").innerHTML = "Vez de Player 1";
         this.playerTurn = this.player1;
      }
   }

   restartGame() {
      var bd = document.getElementById("rs-btn");
      bd.addEventListener("click", (event) => {
         if (event.target.tagName == "BUTTON") {
            for (var i = 1; i <= 9; i++) {
               document.getElementById("btn-" + i).innerHTML = "";
               document.getElementById("btn-" + i).disabled = false;
            }
            
            this.board = new Board();

            $("#roundUp").hide();

            document.getElementById("showWinner").innerHTML = "";
            document.getElementById("turnCount").innerHTML = "Turn: " + (this.board.turnCounter + 1);

            if (this.playerTurn == this.player1) {
               this.player1.score++;
               $("#scorePlayer1").text(this.player1.score);
               $("#scorePlayer2").text(this.player2.score);
            } else {
               this.player2.score++;
               $("#scorePlayer1").text(this.player1.score);
               $("#scorePlayer2").text(this.player2.score);
            }

            this.changeTurn();
         }
      });
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

   $("#player1").text("Player 1: " + newGame.player1.name);
   $("#player2").text("Player 2: " + newGame.player2.name);

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
   newGame.restartGame();
}

$(document).ready(function () {
   $("#scoreboard").hide();
   $("#table").hide();
   $("#rdCount").hide();
   $("#roundUp").hide();
});