/*to-do: 
-Move switchPlayer to the playerController module
-get rid of 'true'
-when game ends, switches to player 2 then player 1 quickly


*/

//to play turn: gameController.playTurn(# of array cell you want to select)

//Board Controller Module (Initialize board, reset board)

const boardController = (function(){

const board = Array(9).fill("")
const logBoard = console.log(board)

const resetBoard =()=>{
    for(i = 0; i<board.length;i++){
        board[i]=("")
    }
    return(board)
}



return{board, logBoard, resetBoard};
})();

//Player Controller Module (create Player)

const playerController = (function(){

    const playerOneName = "Joe"
    const playerTwoName = "Laurel"

    const createPlayer = (name,token,turn)  =>{
        const newPlayer = {name, token, turn}
        const logNewPlayer = console.log(newPlayer)
     return{newPlayer}
    }

    const playerOne = createPlayer("Joe", "X", true);
    const playerTwo = createPlayer("Laurel","O", false);



    return {createPlayer, playerOneName, playerTwoName, playerOne, playerTwo}

})();    


// Game Controller Module(SwitchPlayer, playTurn, TestTie, CheckWInner)

const gameController = (function(){

    const currentPlayerToken = playerController.playerOne.newPlayer.token;
    const logCurrentPlayer= console.log(currentPlayerToken);
    var currentTurn = playerController.playerOne;
    var newGame = true


    console.log(currentTurn);
    const logTurn = console.log(`${playerController.playerOne.newPlayer.name}'s TURN`)

     const switchPlayer = ()=>{
        if(newGame == true){
            console.log(newGame)
            currentTurn = playerController.playerOne
            console.log(`${playerController.playerOne.newPlayer.name}'s TURN`)
            return(currentTurn)
        }
        if(currentTurn == playerController.playerOne && newGame == false){
            currentTurn = playerController.playerTwo
            console.log(`${playerController.playerTwo.newPlayer.name}'s TURN`)
            return(currentTurn)
        } if(currentTurn == playerController.playerTwo && newGame ==false){
            currentTurn = playerController.playerOne
            console.log(`${playerController.playerOne.newPlayer.name}'s TURN`)
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
            currentTurn = playerController.playerOne
            boardController.resetBoard();
            alert("tie")
       }
       return{filtered}
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
                alert(`${currentTurn.newPlayer.name} wins`)
                boardController.resetBoard();
                newGame = true
                return;

            }
    
        }
    }





return {switchPlayer, currentTurn, playTurn, testTie, checkWinner};
})();



gameController.playTurn(0);
gameController.playTurn(8);
gameController.playTurn(1);
gameController.playTurn(7);
