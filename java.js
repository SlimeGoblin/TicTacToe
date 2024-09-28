//to switch players: gameController.switchPlayer(); 

const boardController = (function(){

const board = Array(9).fill("")
const logBoard = console.log(board)



return{board, logBoard};
})();

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


const gameController = (function(){

    const currentPlayerToken = playerController.playerOne.newPlayer.token;
    const logCurrentPlayer= console.log(currentPlayerToken);
    let currentTurn = playerController.playerOne;

    console.log(currentTurn);

     const switchPlayer = function(){
        if(currentTurn == playerController.playerOne){
            currentTurn = playerController.playerTwo
            return(currentTurn)
        } if(currentTurn == playerController.playerTwo){
            currentTurn = playerController.playerOne
            return(currentTurn)
        }

     }

return {switchPlayer, currentTurn};

})();



/*
playerController.createPlayer(playerController.playerOneName, "X");
playerController.createPlayer(playerController.playerTwoName, "O");
*/
