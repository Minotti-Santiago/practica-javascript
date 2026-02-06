const btnCreate = document.getElementById('btnCreate')
const inputTitle = document.getElementById('inputTitle')
const inputDesc = document.getElementById('inputDesc')
const table = document.getElementById('table')

let tasks = JSON.parse(localStorage.getItem('misTareas')) || []

function guardarEnStorage() {
    localStorage.setItem('misTareas', JSON.stringify(tasks));
}

function renderTasks(){
    table.innerHTML = ''
    
        tasks.forEach(task => {

        const list = document.createElement('div')
        list.classList.add('task-container')
        

        list.innerHTML = `
        <div class="task"> 
            <h2>${task.titulo}</h2>    
            <p>${task.descripcion} </p> 
            <span class="eliminar"> Eliminar </span>
        </div>
        `

        list.querySelector('.eliminar').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id)
            list.remove()
            guardarEnStorage()
            renderTasks()
        })

        table.appendChild(list)
        });
    }

btnCreate.addEventListener('click', () => {
    
    const newTask = {
    id: Date.now(), // Un ID único para poder borrarla después
    titulo: inputTitle.value,
    descripcion: inputDesc.value
    };

    tasks.push(newTask);
    guardarEnStorage();
    renderTasks(); // Esta función dibujará todo en pantalla

    inputTitle.value = '';
    inputDesc.value = '';

})


renderTasks()




