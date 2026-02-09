const status = document.getElementById('status')
const timer = document.getElementById('timer')
const startBtn = document.getElementById('start')
const resetBtn = document.getElementById('reset')
const pauseBtn = document.getElementById('pause')

let workTime = 25 * 60
let timeLeft = workTime
let timerInterval = null
let isRunning = false

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    timer.textContent = ` ${minutes} : ${seconds.toString().padStart(2, '0')} `
}

function startTimer(){

    if( timerInterval !== null ) return

    timerInterval = setInterval(() => {

        timeLeft--
        updateTimer()

        if( timeLeft <= 0) {
            clearInterval(timerInterval)
            timerInterval = null
            alert( 'Se ha terminado el tiempo!!' )
        }

    } , 1000)

}

startBtn.addEventListener('click',startTimer)

resetBtn.addEventListener('click', () => {

    clearInterval(timerInterval)
    timerInterval = null
    timeLeft = workTime
    updateTimer()

})

pauseBtn.addEventListener('click', () => {
    clearInterval(timerInterval)
    timerInterval = null

} )