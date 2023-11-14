const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');
let currentPlayer = 'X';

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', resetBoard);

function handleCellClick(e) {
  const cell = e.target;
  
  if (cell.textContent === '') {
    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      setTimeout(() => {
        alert(`Player ${currentPlayer} wins!`);
        resetBoard();
      }, 10);
    } else if (checkDraw()) {
      setTimeout(() => {
        alert("It's a draw!");
        resetBoard();
      }, 10);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin(player) {
  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]           // diagonals
  ];

  return winCombinations.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

function checkDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function resetBoard() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
}
