const gameBoard = (() => {
    const squares = document.querySelectorAll(".panel");
    const arr = ["","","","","","","","",""];
    const winVar = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

    const winCheck = () => {
        winVar.forEach(innard => {
            if(arr[innard[0]] !== "" && arr[innard[0]] === arr[innard[1]] 
            && arr[innard[0]] === arr[innard[2]]) {
                console.log(`Player with the sign ${arr[innard[0]]}`);
            }
        });
    }

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
                winCheck();
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
    let round = 0;
    let turn = true;

    const playerTurn = () => {
        round = round + 1;
        if(turn) {
            turn = false;
            return first;
        } else {
            turn = true;
            return second;
        }
    };

    const whichRound = () => {
        return round;
    }

    const gameEnd = () => {
        console.log("tie");
    };


    return {playerTurn, whichRound, gameEnd};
})();

const first = playerFactory("X");
const second = playerFactory("O");