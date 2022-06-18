const gameBoard = (() => {
    const squares = document.querySelectorAll(".panel");
    const arr = ["","","","","","","","",""];
    let round = 0;

    // checks if the tile isn't taken already
    const emptyCheck = (position) => {
        if(arr[position]!=""){
            return false;
        } else {
            return true;
        }
    };

    // enters value into HTML and the array
    squares.forEach(square => {
        square.addEventListener("click", (e) => {
            if(emptyCheck(e.target.dataset.pannum)) {
                let signMemory = gameState.playerTurn().signReturn();
                e.target.innerHTML = `${signMemory}`;
                arr[parseInt(e.target.dataset.pannum)]=`${signMemory}`;
                round = round + 1;
                if(round === 9) {
                    gameState.gameEnd();
                };
            };
        })  
    });

    return {};
})();

// creates player objects
const playerFactory = ((sign) => {
    const signReturn = () => {
        return sign;
    };
    return {signReturn};
});

// checks which player clicks
const gameState = (() => {
    let turn = true;
    const playerTurn = () => {
        if(turn) {
            turn = false;
            return first;
        } else {
            turn = true;
            return second;
        }
    };

    const gameEnd = () => {
        console.log("tie");
    };


    return {playerTurn, gameEnd};
})();

const first = playerFactory("X");
const second = playerFactory("O");