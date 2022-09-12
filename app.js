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

//  currentTile -> col and cirrentRow -> row
const checkRow = () =>{
  const guess = guessRows[row].join('');
  if(col>4){
    console.log(guess, wordle);
    flipTile();
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

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter)
  key.classList.add(color)
}

const flipTile = ()=>{
  const rowTiles = document.querySelector('#guessRow-'+ row).childNodes
 let checkWordle = wordle
 const guess = []

rowTiles.forEach(tile => {
  guess.push({letter: tile.getAttribute('data'), color: 'gray-overlay'})

})

guess.forEach((guess,index)=> {
    if(guess.letter==wordle[index]){
      guess.color = 'green-overlay'
      checkWordle = checkWordle.replace(guess.letter, '')
    }
})

guess.forEach((guess,index)=> {
  if(checkWordle.includes(guess.letter)){
    guess.color = 'yellow-overlay'
    checkWordle = checkWordle.replace(guess.letter, '')
  }
})






  rowTiles.forEach((tile, index) => {
    const dataLetter = tile.getAttribute('data')

   setTimeout(() => {
    tile.classList.add('flip')
    tile.classList.add(guess[index].color);
    addColorToKey(guess[index].letter, guess[index].color)
   }, 500 * index)
  })
}