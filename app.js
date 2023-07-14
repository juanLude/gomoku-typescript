console.log("hola");
var Board = /** @class */ (function () {
    function Board(rows, columns) {
        // initialise the board and currentPlayer properties
        this.board = [];
        this.currentPlayer = "Black"; // set first turn to Black
        for (var row = 0; row < rows; row++) {
            // initialise each box of the board with a null value
            this.board[row] = [];
            for (var col = 0; col < columns; col++) {
                this.board[row][col] = null;
            }
        }
    }
    return Board;
}());
var MarkupGenerator = /** @class */ (function () {
    function MarkupGenerator() {
    }
    MarkupGenerator.prototype.createMarkup = function (numRows, numBoxesPerRow) {
        var container = document.createElement("div");
        for (var i = 0; i < numRows; i++) {
            var row = document.createElement("div");
            row.classList.add("row");
            for (var j = 0; j < numBoxesPerRow; j++) {
                var box = document.createElement("div");
                box.classList.add("box");
                row.appendChild(box);
            }
            container.appendChild(row);
        }
        return container;
    };
    return MarkupGenerator;
}());
// Usage:
var generator = new MarkupGenerator();
var numRows = 2;
var numBoxesPerRow = 4;
var markup = generator.createMarkup(numRows, numBoxesPerRow);
console.log(markup);
// Append the markup to a target element with an ID
var targetElement = document.getElementById("target");
if (targetElement) {
    targetElement.appendChild(markup);
}
