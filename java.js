/*to-do: 
-Move switchPlayer to the playerController module
-get rid of 'true'


*/

//to switch players: gameController.switchPlayer(); 
//to play turn: gameController.playTurn(# of array cell you want to select)

//Board Controller Module

const boardController = (function(){

const board = Array(9).fill("")
const logBoard = console.log(board)



return{board, logBoard};
})();

//Player Controller Module

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


// Game Controller Module

const gameController = (function(){

    const currentPlayerToken = playerController.playerOne.newPlayer.token;
    const logCurrentPlayer= console.log(currentPlayerToken);
    let currentTurn = playerController.playerOne;


    console.log(currentTurn);

     const switchPlayer = ()=>{
        if(currentTurn == playerController.playerOne){
            currentTurn = playerController.playerTwo
            return(currentTurn)
        } if(currentTurn == playerController.playerTwo){
            currentTurn = playerController.playerOne
            return(currentTurn)
        }
     }

     const playTurn = (move) =>{
if(boardController.board[move] == ""){
           boardController.board[move] = currentTurn.newPlayer.token
           const logNewBoard = console.log(boardController.board)
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
            alert("tie")
       }
       const logFiltered = console.log(filtered)
       return{filtered, logFiltered}
    }


return {switchPlayer, currentTurn, playTurn, testTie};
})();


gameController.testTie()
