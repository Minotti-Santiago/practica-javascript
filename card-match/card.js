const moves = document.getElementById('moves')
const resetGameBtn = document.getElementById('restart-game')
const gameBoard = document.getElementById('game-board')
const icons = ['🚀', '🥑', '👾', '🍄', '👻', '🔥', '💎', '🌈']

let cardValues = [...icons, ...icons].sort(() => Math.random() - 0.5)

let flippedCard = []
let matchedCount = 0
let moveCount = 0

function createCard(){

    cardValues.forEach((value, index) =>{
        const card = document.createElement('div')
        card.classList.add('card')
        card.dataset.value = value
        card.dataset.index = index

        card.addEventListener('click', flipCard)

        gameBoard.appendChild(card)
    })
}

function flipCard(){

    if(flippedCard.length === 2) return

    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.innerText = this.dataset.value
    this.classList.add('flipped')

    flippedCard.push(this)

    if(flippedCard.length === 2){
        checkMatch()
    }   
}

function checkMatch(){
    const [card1, card2] = flippedCard

    if(card1.dataset.value === card2.dataset.value){
        card1.classList.add('matched')
        card2.classList.add('matched')
        flippedCard = []
        matchedCount += 2
        
        moveCount++
        moves.innerText = moveCount

        if(matchedCount === cardValues.length){
            
            const congratulations = document.createElement('div')
            congratulations.classList.add('congrats')
            congratulations.innerHTML = `
                <h1>¡Felicidades! Has ganado el juego</h1>
            `

            document.body.appendChild(congratulations)

            setTimeout(() => {
                document.body.removeChild(congratulations)
            }, 1000)
        }
        
    } else {
        setTimeout(() => {
            card1.innerText = ''
            card2.innerText = ''
            card1.classList.remove('flipped')
            card2.classList.remove('flipped')
            flippedCard = []
        }, 500)
    }
}

resetGameBtn.addEventListener('click',() => {
    flippedCard = []
    matchedCount = 0
    moveCount = 0

    cardValues = [...icons, ...icons].sort(() => Math.random() - 0.5)

    gameBoard.innerHTML = '';
    createCard();
})

createCard()