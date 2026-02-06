const btnSave = document.getElementById('saveBtn')
const inputConcept = document.getElementById('inputConcept')
const inputAmount = document.getElementById('inputAmount')
const expensesList = document.getElementById('expenseList')
const totalAmount = document.getElementById('totalAmount')

let expenses = JSON.parse(localStorage.getItem('misGastos')) || []

function saveInStorage(){
    localStorage.setItem('misGastos',JSON.stringify(expenses))
}

function renderExpenses(){
    expensesList.innerHTML = ''

    expenses.forEach(expense =>{
        const list = document.createElement('div')
        list.classList.add('expense-content')

        list.innerHTML = `
            <h2>${expense.concept}</h2>
            <p>${expense.amount} </p>
            <button class="delete">Eliminar</button>
        `

        list.querySelector('.delete').addEventListener('click',() =>{
            expenses = expenses.filter(e => e.id !== expense.id )
            list.remove()
            saveInStorage()
            renderExpenses()
            
        })

        expensesList.appendChild(list)

    })
    totalAmountFunc()

}

btnSave.addEventListener('click', () => {

    const concept = inputConcept.value
    const amount = parseFloat(inputAmount.value)

    if(!concept || isNaN(amount)){
        alert('completa los campos correctamente')
        return
    }

    const newExpense = {
        id : Date.now(),
        concept : concept,
        amount : amount,
    }

    expenses.push(newExpense)
    saveInStorage()
    renderExpenses()

    inputConcept.value = ''
    inputAmount.value = ''

})

function totalAmountFunc() {

    const total = expenses.reduce((acc, el) => acc + el.amount, 0)

    if (totalAmount) {
        totalAmount.innerText = `Total: $${total.toFixed(2)}`;
    }
}

renderExpenses()

