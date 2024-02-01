let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector("#reset-btn")
let newGameBtn = document.querySelector("#New-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO = true   //PlayerX , PlayerO
let count = 0 //To check for draw, if click box reaches 9 and no wins then draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]
const resetGame = () => {
    turnO = true
    enableBoxes()
    msgContainer.classList.add("hide")

}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            //PlayerO
            box.innerHTML = "O"
            turnO = false
        }
        else {
            //PlayerX
            box.innerHTML = "X"
            turnO = true
        }
        box.disabled = "true"
        count++

        let isWinner = checkWinner();

        if (count == 9 && !isWinner) {
            gamedraw()
        }

        if (box.innerHTML == "O") {

            box.style.color = '#465362'
        }
        else {  //box.innerHTML=="X"
            box.style.color = '#931621'
        }
    })
})

const gamedraw = () => {
    msg.innerHTML = `Game Draw!`
    msgContainer.classList.remove("hide")
    disabledBoxes()
}

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true

    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false
        box.innerHTML = ""
    }
}

const showWinner = (winner) => {
    msg.innerHTML = `congratulations! , Winner is ${winner}`
    msgContainer.classList.remove("hide")
    disabledBoxes()
}
const checkWinner = () => {
    for (let pattern of winPatterns) { //pattern of winPatterns se winPatters me se ek ek array lete jyega in pattern [0,1,2] ,[]...

        let position1val = boxes[pattern[0]].innerHTML;
        let position2val = boxes[pattern[1]].innerHTML;
        let position3val = boxes[pattern[2]].innerHTML;

        if (position1val != "" && position2val != "" && position3val != "") {
            if (position1val === position2val && position2val === position3val) {

                showWinner(position1val)
            }
        }
    }

}


newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)
