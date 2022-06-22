// oversees the board itself and interactions with it
const gameBoard = (() => {
    const squares = document.querySelectorAll(".panel");
    const resetBtn = document.querySelector(".resetBtn");
    const winMess = document.querySelector(".winMess");
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

    // checks for 3 signs in a row
    const winCheck = () => {
        winVar.forEach(innard => {
            if(arr[innard[0]] !== "" && arr[innard[0]] === arr[innard[1]] 
            && arr[innard[0]] === arr[innard[2]]) {
                winMess.innerHTML = `Player ${arr[innard[0]]} has won`; 
                colorWin(innard[0],innard[1],innard[2]);              
            }
            if(gameState.whichRound() === 9) {
                winMess.innerHTML = "Tie";
            }
        });
    }

    // changes the color of the winning signs
    const colorWin = (fir,sec,thr) => {
        document.querySelector(`[data-pannum="${fir}"]`).style.color = "red";
        document.querySelector(`[data-pannum="${sec}"]`).style.color = "red";
        document.querySelector(`[data-pannum="${thr}"]`).style.color = "red";
    }

    // resets all variables
    const boardReset = () => {
        winMess.innerHTML = "";
        squares.forEach(square => {
            square.innerHTML = "";
            square.style.color="black";
        })
        for(let i = 0; i<9; i++) {
            arr[i] = "";
        };
        gameState.gameStateReset();
    };

    // checks if the tile isn't taken already
    const emptyCheck = (position) => {
        if(arr[position]!=""){
            return false;
        } else {
            return true;
        }
    };

    // inserts sign into DOM and the array
    const clicked = (e) => {
        if(emptyCheck(e.target.dataset.pannum) && winMess.innerHTML === "") {
            let signMemory = gameState.playerTurn().signReturn();
            e.target.innerHTML = `${signMemory}`;
            arr[parseInt(e.target.dataset.pannum)]=`${signMemory}`;
            winCheck();
        };
    }

    // enters value into HTML and the array
    squares.forEach(square => {
        square.addEventListener("click", clicked)  
    });

    resetBtn.addEventListener("click", boardReset);

    return {};
})();

// creates player objects
const playerFactory = ((sign) => {
    const signReturn = () => {
        return sign;
    };
    return {signReturn};
});

// oversees the logic behind turns
const gameState = (() => {
    const trafLigOne = document.querySelector(".playerOne");
    const trafLigTwo = document.querySelector(".playerTwo");
    trafLigOne.style.backgroundColor = "red";
    let round = 0;
    let turn = true;

    const setTrafLight = (decider) => {
        if (decider) {
            trafLigOne.style.backgroundColor = "red";
            trafLigTwo.style.backgroundColor = "gainsboro";
        } else {
            trafLigOne.style.backgroundColor = "gainsboro";
            trafLigTwo.style.backgroundColor = "red";
        };
    };

    // counts turns and chooses which sign is placed
    const playerTurn = () => {
        round = round + 1;
        if(turn) {
            turn = false;
            setTrafLight(turn);
            return first;
        } else {
            turn = true;
            setTrafLight(turn);
            return second;
        }
    };

    // returns rounds
    const whichRound = () => {
        return round;
    };
    
    // tied to the main reset
    const gameStateReset = () => {
        round = 0;
        turn = true;
        setTrafLight(turn);
    };

    return {playerTurn, whichRound, gameStateReset};
})();

const first = playerFactory("X");
const second = playerFactory("O");