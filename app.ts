enum Player {
  None = 0,
  Black = 1,
  White = 2,
}
class GomokuGame {
  private board: number[][];
  private currentPlayer: number;
  private numRows: number;
  private numColumns: number;
  private winCondition: number;
  private container: HTMLElement;
  private boxes: HTMLElement[];
  private clickSound: HTMLAudioElement;
  private gameEnded: boolean; // flag variable to track game state
  private getCurrentPlayerName(): string {
    return this.currentPlayer === Player.Black ? "Black" : "White";
  }

  constructor(
    numRows: number = 5,
    numColumns: number = 5,
    winCondition: number = 5
  ) {
    this.numRows = numRows;
    this.numColumns = numColumns;
    this.winCondition = winCondition;
    this.board = [];
    this.currentPlayer = Player.Black;
    this.container = document.createElement("div");
    this.boxes = [];
    this.clickSound = new Audio("click_sound.mp3");
    this.gameEnded = false;

    // create game board
    for (let row = 0; row < this.numRows; row++) {
      this.board[row] = [];
      const line = document.createElement("div");
      line.classList.add("row");
      for (let column = 0; column < this.numColumns; column++) {
        this.board[row][column] = 0;
        const box = document.createElement("div");
        box.classList.add("box");
        box.addEventListener("click", () => this.handleBoxClick(row, column));
        line.appendChild(box);
        this.container.appendChild(line);
        this.boxes.push(box);
      }
    }
  }

  handleBoxClick(row: number, column: number): void {
    if (this.gameEnded) {
      return; // do nothing if the game has ended
    }
    if (this.board[row][column] === Player.None) {
      this.board[row][column] = this.currentPlayer;

      const boxIndex = row * this.numColumns + column;
      this.boxes[boxIndex].classList.add(
        this.currentPlayer === Player.Black ? "black" : "white"
      );

      if (this.checkWin(row, column)) {
        const resultContainer = document.querySelector(
          ".result-container"
        ) as HTMLElement;
        resultContainer.textContent =
          this.currentPlayer === Player.Black ? "Black wins!" : "White wins!";

        resultContainer.classList.add("show");

        const turnLabel = document.querySelector(".show-turn") as HTMLElement;
        turnLabel.classList.add("hide");
        turnLabel.textContent = "";

        this.gameEnded = true;
        return;
      } else if (this.checkDraw()) {
        const resultContainer = document.querySelector(
          ".result-container"
        ) as HTMLElement;
        resultContainer.textContent = "This is a draw!";
        resultContainer.classList.add("show");
        const turnLabel = document.querySelector(".show-turn") as HTMLElement;
        turnLabel.classList.add("hide");
        turnLabel.textContent = "";

        this.gameEnded = true;
        return;
      } else {
        this.currentPlayer =
          this.currentPlayer === Player.Black ? Player.White : Player.Black;
        const turnLabel = document.querySelector(".show-turn") as HTMLElement;
        turnLabel.textContent =
          this.currentPlayer === Player.Black
            ? "Turn for Black"
            : "Turn for White";
      }
    }
    this.playClickSound();
  }

  playClickSound(): void {
    this.clickSound.currentTime = 0; // rewind the sound to the beginning
    this.clickSound.play();
  }

  checkDraw() {
    // Iterate through the board and check if any empty positions are available
    for (let row = 0; row < this.numRows; row++) {
      for (let column = 0; column < this.numColumns; column++) {
        if (this.board[row][column] === Player.None) {
          return false; // Empty position found, game is not a draw
        }
      }
    }

    return true; // All positions are filled, game is a draw
  }

  checkWin(row: number, column: number): boolean {
    const player = this.board[row][column]; //retrieve the player number

    // check horizontal
    let count = 1; // keep track of the number of consecutive pieces of the same player in a horizontal direction
    let left = column - 1;
    let right = column + 1;

    // check if there are consecutive pieces to the left of the current position
    while (left >= 0 && this.board[row][left] === player) {
      count++;
      left--;
    }
    // check if there are consecutive pieces to the right of the current position
    while (right < this.numColumns && this.board[row][right] === player) {
      count++;
      right++;
    }
    // if the total count of consecutive pieces in the horizontal direction is greater than or equal to the win condition, then player has won
    if (count >= this.winCondition) {
      return true;
    }

    // check vertical
    count = 1; // reset the count to 1 to start counting from the current position
    let top = row - 1;
    let bottom = row + 1;

    while (top >= 0 && this.board[top][column] === player) {
      count++;
      top--;
    }

    while (bottom < this.numRows && this.board[bottom][column] === player) {
      count++;
      bottom++;
    }

    if (count >= this.winCondition) {
      return true;
    }

    // check diagonal (top-left to bottom-right)
    count = 1;
    let topLeftRow = row - 1;
    let topLeftColumn = column - 1;
    let bottomRightRow = row + 1;
    let bottomRightColumn = column + 1;

    while (
      topLeftRow >= 0 &&
      topLeftColumn >= 0 &&
      this.board[topLeftRow][topLeftColumn] === player
    ) {
      count++;
      topLeftRow--;
      topLeftColumn--;
    }

    while (
      bottomRightRow < this.numRows &&
      bottomRightColumn < this.numColumns &&
      this.board[bottomRightRow][bottomRightColumn] === player
    ) {
      count++;
      bottomRightRow++;
      bottomRightColumn++;
    }

    if (count >= this.winCondition) {
      const resultText = document.createElement("span");
      resultText.textContent =
        this.currentPlayer === Player.Black ? "Black wins!" : "White wins!";

      const resultContainer = document.querySelector(
        ".result-container"
      ) as HTMLElement;
      resultContainer.innerHTML = "";
      resultContainer.appendChild(resultText);
      resultContainer.classList.add("show");

      return true;
    }

    // Check diagonal (top-right to bottom-left)
    count = 1;
    let topRightRow = row - 1;
    let topRightColumn = column + 1;
    let bottomLeftRow = row + 1;
    let bottomLeftColumn = column - 1;

    while (
      topRightRow >= 0 &&
      topRightColumn < this.numColumns &&
      this.board[topRightRow][topRightColumn] === player
    ) {
      count++;
      topRightRow--;
      topRightColumn++;
    }

    while (
      bottomLeftRow < this.numRows &&
      bottomLeftColumn >= 0 &&
      this.board[bottomLeftRow][bottomLeftColumn] === player
    ) {
      count++;
      bottomLeftRow++;
      bottomLeftColumn--;
    }

    if (count >= this.winCondition) {
      return true;
    }

    return false;
  }

  resetBoard(): void {
    this.gameEnded = false; // Reset gameEnded to false
    this.currentPlayer = Player.Black;

    for (let row = 0; row < this.numRows; row++) {
      for (let column = 0; column < this.numColumns; column++) {
        this.board[row][column] = Player.None;
      }
    }

    this.boxes.forEach((box) => {
      box.classList.remove("black", "white");
    });

    const resultContainer = document.querySelector(
      ".result-container"
    ) as HTMLElement;
    resultContainer.classList.remove("show");

    const turnLabel = document.querySelector(".show-turn") as HTMLElement;
    turnLabel.classList.remove("hide");
    turnLabel.textContent = "Turn for Black";
    // const turnLabel = document.createElement("div");
    // turnLabel.classList.add("show-turn");
    //turnLabel.textContent = `Turn for ${this.getCurrentPlayerName()}`;
    this.playClickSound();
    // this.render(document.getElementById("game-container")!);
    // const turnLabel = document.querySelector(".show-turn") as HTMLElement;
    // turnLabel.classList.add("show-turn");
    // turnLabel.textContent = `Turn for ${this.getCurrentPlayerName()}`;
  }
  render(containerElement: HTMLElement): void {
    // containerElement.appendChild(this.container); this was before
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset";
    resetButton.addEventListener("click", () => {
      this.resetBoard();
      //this.playClickSound();
    });

    const turnLabel = document.createElement("div");
    turnLabel.classList.add("show-turn");
    turnLabel.textContent = `Turn for ${this.getCurrentPlayerName()}`;

    const resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");

    const gameWrapper = document.createElement("div");
    gameWrapper.appendChild(this.container);

    containerElement.appendChild(gameWrapper);
    containerElement.appendChild(resultContainer);
    containerElement.appendChild(turnLabel);
    console.log("pedro");

    containerElement.appendChild(resetButton);
  }
}

// create a Gomoku game object and let user input board size and winning condition. Otherwise, let default settings
const gomokuGame = new GomokuGame(4, 4, 4);
gomokuGame.render(document.getElementById("game-container")!);
