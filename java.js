/*to-do: 

-get rid of 'true'
*/

//to play turn: gameController.playTurn(# of array cell you want to select)

//Board Controller Module (Initialize board, reset board)



const boardController = (function(){
   
        const gameBoard= document.querySelector(".gameBoard");

        const board = Array(9).fill("")
        const logBoard = console.log(board)

                const resetBoard =()=>{
                    for(i = 0; i<board.length;i++){
                        board[i]=("")
                    }
                    return(board)
                }

//DOM Manipulation

                const showBoard =()=>{
                    for(i=0; i<board.length; i++){
                        content=document.createElement("div")
                        content.classList.add("cell");
                        content.setAttribute("id", `cell${i}`)
                        content.addEventListener(`click`, console.log("test"))
                        gameBoard.appendChild(content)
                    }
                }

showBoard();



return{board, logBoard, resetBoard,showBoard, gameBoard};
})();




//Player Controller Module (create Player)

const playerController = (function(){

    const userNameOne = document.getElementById("playerOneTitle")

    const playerOneName = "Player One"
    const playerTwoName = "Player Two"

    const createPlayer = (name,token,turn)  =>{
        const newPlayer = {name, token, turn}
        const logNewPlayer = console.log(newPlayer)
     return{newPlayer}
    }

    const playerOne = createPlayer("Player One", "X", true);
    const playerTwo = createPlayer("Player Two","O", false);



    return {createPlayer, playerOneName, playerTwoName, playerOne, playerTwo}

})();    


// Game Controller Module(SwitchPlayer, playTurn, TestTie, CheckWInner)

const gameController = (function(){

    const currentPlayerToken = playerController.playerOne.newPlayer.token;
    const logCurrentPlayer= console.log(currentPlayerToken);
    var currentTurn = playerController.playerOne;
    var newGame = true
    var gameOver =false
    var tie=false

    //DOM Manipulation
    
    var messageAlert = document.getElementById("messageAlert" )
    messageAlert.textContent = `${playerController.playerOne.newPlayer.name}'s TURN`

    console.log(currentTurn);
    const logTurn = console.log(`${playerController.playerOne.newPlayer.name}'s TURN`)



     const switchPlayer = ()=>{
        if(gameOver == true){
            messageAlert.textContent=`${currentTurn.newPlayer.name} WINS!`
            return
        }

        if(tie == true){
            messageAlert.textContent="TIE!"
            return
        }

        if(newGame == true){
            console.log(newGame)
            currentTurn = playerController.playerOne
            messageAlert.textContent=`${playerController.playerOne.newPlayer.name}'s TURN`
            return(currentTurn)
        }
        if(currentTurn == playerController.playerOne && newGame == false){
            currentTurn = playerController.playerTwo
            messageAlert.textContent=`${playerController.playerTwo.newPlayer.name}'s TURN`
            return(currentTurn)
        } if(currentTurn == playerController.playerTwo && newGame ==false){
            currentTurn = playerController.playerOne
            messageAlert.textContent=(`${playerController.playerOne.newPlayer.name}'s TURN`)
            return(currentTurn)
        }
     }



    const playTurn = (move) =>{
        newGame = false
        console.log(newGame)
        if(boardController.board[move] == ""){
           boardController.board[move] = currentTurn.newPlayer.token
           const logNewBoard = console.log(boardController.board)
           checkWinner()
           testTie();
            switchPlayer();
            return(logNewBoard)
     }
    }

    const testTie = ()=>{
            //tests if there are no empty cells (will execute after check Win to avoid last move winners being mistaken)
       function isEmpty(cell){
        return cell == ("")
       }
            //if no empty cells and its not a win
      const  filtered = boardController.board.filter(isEmpty)
       if(filtered.length < 1){
            boardController.gameBoard.removeEventListener('click', test)
            messageAlert.textContent = "TIE!"
            tie = true
            return
       }

    }

    const checkWinner = () =>{
        const winningStats = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for(let winState of winningStats) {
            const [position1, position2, position3] = winState;
            
            if (
                boardController.board[position1] !== '' && 
               boardController.board[position1] === boardController.board[position2] && 
                boardController.board[position1] === boardController.board[position3]
            ) {
                console.log(`${currentTurn.newPlayer.name} wins`)
                boardController.gameBoard.removeEventListener('click', test)
                gameOver = true
                messageAlert.classList.add("blinking-text")
                return
            } 
        }
    }

boardController.gameBoard.addEventListener('click', test =(e)=>{
    var gridCell = e.target
    var grid = e.target.id
    var gridid= grid[grid.length-1]
    if(gridCell.textContent==""){
    gridCell.textContent = `${currentTurn.newPlayer.token}`
    console.log(gridid)
    playTurn(gridid);
    }
})

// reset button

const reset = document.getElementById("reset");



reset.addEventListener('click', resetBoard =()=>{

    location.reload();

    //this code works but if you click reset on player two's turn, it stays their turn on the new game

    /*
    var allCells = document.querySelectorAll(".cell")

    for(i=0; i < allCells.length; i++){
        allCells[i].textContent=''
    }
    boardController.resetBoard();
    newGame = true
   gameOver =false
    tie=false

    boardController.gameBoard.addEventListener('click', test =(e)=>{
        var gridCell = e.target
        var grid = e.target.id
        var gridid= grid[grid.length-1]
        gridCell.textContent = `${currentTurn.newPlayer.token}`
        console.log(gridid)
        playTurn(gridid);
    })
messageAlert.textContent = `${playerController.playerOne.newPlayer.name}'s TURN`
*/
})



return {switchPlayer, currentTurn, playTurn, testTie, checkWinner};
})();

