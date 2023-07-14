console.log("asda Juan");

// This type represents the possible values that a player can have
type Player = "Black" | "White" | null;

class Board {
  private board: Player[][]; // This 2D array represents the game board and maps the current state of each box
  private currentPlayer: Player; // Defines the player's turn

  constructor(rows: number, columns: number) {
    // initialise the board and currentPlayer properties
    this.board = [];
    this.currentPlayer = "Black"; // set first turn to Black
    for (let row = 0; row < rows; row++) {
      // initialise each box of the board with a null value
      this.board[row] = [];
      for (let col = 0; col < columns; col++) {
        this.board[row][col] = null;
      }
    }
  }
}

class MarkupGenerator {
  createMarkup(numRows: number, numBoxesPerRow: number): HTMLElement {
    const container = document.createElement("div");

    for (let i = 0; i < numRows; i++) {
      const row = document.createElement("div");
      row.classList.add("row");

      for (let j = 0; j < numBoxesPerRow; j++) {
        const box = document.createElement("div");
        box.classList.add("box");
        row.appendChild(box);
      }

      container.appendChild(row);
    }

    return container;
  }
}

const generator = new MarkupGenerator();
const numRows = 7;
const numBoxesPerRow = 7;
const markup = generator.createMarkup(numRows, numBoxesPerRow);
console.log(markup);

// Append the markup to a target element with an ID
const targetElement = document.getElementById("target");
targetElement?.appendChild(markup);
