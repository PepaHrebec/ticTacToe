const gameBoard = (() => {
    const squares = document.querySelectorAll(".panel");
    const arr = ["","","","","","","","",""];

    squares.forEach(square => {
        square.addEventListener("click", (e) => {
            let signMemory = gameState.playerTurn().signReturn();
            e.target.innerHTML = `${signMemory}`;
            arr[parseInt(e.target.dataset.pannum)]=`${signMemory}`;
            console.log(signMemory);
        })   
    });

    return {write,arr};
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
    }

    return {playerTurn};
})();

const first = playerFactory("X");
const second = playerFactory("O");