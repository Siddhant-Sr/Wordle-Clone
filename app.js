const keyboard = document.querySelector(".keyboard");
const tile = document.querySelector(".tile");
const message = document.querySelector(".message");

let row = 0;
let col = 0;
let isGameOver = false;

const wordle = "SUPER";
const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "«",
];

const guessRows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

//Tiles
guessRows.forEach((guessRow, guessRowIndex) => {
  const rowElement = document.createElement("div");
  rowElement.setAttribute("id", "guessRow-" + guessRowIndex);
  guessRow.forEach((guess, guessIndex) => {
    const tileElement = document.createElement("div");
    tileElement.setAttribute(
      "id",
      "guessRow-" + guessRowIndex + "-tile-" + guessIndex
    );
    tileElement.classList.add("tiles");
    rowElement.append(tileElement);
  });

  tile.append(rowElement);
});

//keyboard
keys.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = key;
  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", () => handleClick(key));

  keyboard.append(buttonElement);
});

const handleClick = (key) => {
  console.log("clicked", key);
  if (key === "«") {
    deleteLetter();
    console.log(guessRows);
    return;
  }
  if (key === "ENTER") {
    checkRow();
    console.log(guessRows);
    return;
  }
  addLetter(key);
  console.log(guessRows);
};

const addLetter = (letter) => {
  if (row < 5 && col < 6) {
    const cell = document.getElementById("guessRow-" + row + "-tile-" + col);
    cell.textContent = letter;
    guessRows[row][col] = letter;
    cell.setAttribute("data", letter);
    col++;
    console.log(guessRows);
  }
};

const deleteLetter = () => {
  if (col > 0) {
    col--;
    const cell = document.getElementById("guessRow-" + row + "-tile-" + col);
    cell.textContent = "";
    guessRows[row][col] = "";
    cell.setAttribute("data", "");
  }
};


const checkRow = () =>{
  const guess = guessRows[row].join('');
  if(col>4){
    console.log(guess, wordle);
    if(wordle==guess){
   showMessage('Magnificent!');
      isGameOver = true
      return
  }else{
  if(row >=5){
    showMessage('Game Over');
    isGameOver=true
    return
  }
  if(row<5){
    row++;
    col = 0;
    return;
  }
}
  }
}


const showMessage = (mes) =>{
  const messageElement = document.createElement('p');
  messageElement.textContent=mes;
  message.append(messageElement)
  setTimeout(() => {
    
    message.remove(messageElement)
  }, 2000);
}