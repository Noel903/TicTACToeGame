// This is me creating the Tic Tac Toe Game. 

// @author: Noel Moreno 

//Here we store the current game state. Empty strings in an array, this tracks played cells. 
let gameState =  [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];
let gameOver = false;//end game stuff 
let turn = "O"; //storing turn to see who is next 
let numTurns = 0;

//this diplays who is next X or O 
let heading = document.getElementById("heading");
heading.innerText = turn + "'s turn";

//obtain info from the board from each block (cell)
let cells = document.querySelectorAll(".cell");
cells.forEach((cell) =>
{
  cell.addEventListener("click", function()//adding event listener to game cells 
{
    if(gameOver)
    {
      return;
    }

    if(cell.innerText == "")
    {
      numTurns++;
      cell.innerText = turn;
      cell.classList.add("filled");
      $x = cell.getAttribute("x");//making our JS read our HTML to label X || O 
      $y = cell.getAttribute("y");

      gameState[$x-1][$y-1] = turn;

      //here we for loop through all the possiblities so we can dictate winners or draw match 

      for(let x = 0; x < 3; x++) 
      {
        if(x == $x-1)
        {
          if(gameState[x][0] == gameState[x][1] && gameState[x][0] == gameState[x][2])
          {
            winner(turn);
          }

        }
      }
      for(let y = 0; y < 3; y++)
      {
        if(y == $y-1)
        {
          if(gameState[0][y] == gameState[1][y] && gameState[0][y] == gameState[2][y])
          {                                        
            winner(turn);
          }
        }
      }

      if(gameState[0][0] == gameState[1][1] && gameState[0][0] == gameState[2][2] && gameState[1][1] == turn)
      {
        winner(turn);
      }

      if(gameState[2][0] == gameState[1][1] && gameState[2][0] == gameState[0][2] && gameState[1][1] == turn)
      {
        winner(turn);
      }

      if(turn == "O") // going through the turns 
      {
        turn = "X";
      }
      else
      {
        turn = "O";
      }
      heading.innerText = turn + "'s turn";

      if(numTurns == 9)
      {
        winner("No-one"); //draw data 
      }
    }
  });
});

//setting the initial message to let the players know who is the winner.

function winner($turn)
{
  gameOver = true;
  let popup = document.getElementById("popup");
  popup.innerText = $turn + " is the winner!";
  popup.style.zIndex = 10; //positioning of the element 
  popup.style.opacity = 1; //tranperancy 

  popup.addEventListener("click", function()
    {
    turn = "O";
    numTurns = 0;
    gameOver = false;
    let heading = document.getElementById("heading");
    heading.innerText = turn + "'s turn";

    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) =>
    {
      cell.classList.remove("filled");
      cell.innerText = "";
    });

    for($x = 0; $x < 3; $x++)
    {
      for($y = 0; $y < 3; $y++)
      {
        gameState[$x][$y] = "";
      }
    }

    popup.innerText = "";
    popup.style.zIndex = -10;
    popup.style.opacity = 0;
  });
}