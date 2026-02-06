const btnSumar = document.getElementById('btnSumar')
const btnRestar = document.getElementById('btnRestar')
const points = document.getElementById('points')
const btnReiniciar = document.getElementById('btnReiniciar')

let value = 0

    btnSumar.addEventListener('click',() => {
    points.textContent = ++value
    })

    btnRestar.addEventListener('click',() => {
        points.textContent = --value
    })

    btnReiniciar.addEventListener('click',() => {
        value = 0
        points.textContent = value
    })


