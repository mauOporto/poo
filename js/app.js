const alert = document.querySelector('.alert')
const formulario = document.getElementById('formulario')
const pintarTarea = document.getElementById('pintarTarea')
const templateTarea = document.getElementById('templateTarea').content


let tareas = [];

formulario.addEventListener('submit',(e) => {
    e.preventDefault();

    alert.classList.add('d-none')

    const data = new FormData(formulario);
    const [tarea] = [...data.values()];

    if(!tarea.trim()){
        alert.classList.remove('d-none')
        console.log('Campo vacio')
        return
    }

    agregarTarea(tarea)
    pintarTareas()

})

const agregarTarea = tarea => {
    const objetoTarea = {
        nombre: tarea,
        id: `${Date.now()}`
    }
    tareas.push(objetoTarea)
}

const pintarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
    pintarTarea.textContent = ''

    const fragment = document.createDocumentFragment()

    tareas.forEach(item => {
        const clone = templateTarea.cloneNode(true)
        clone.querySelector('.lead').textContent = item.nombre
        clone.querySelector('.btn').dataset.id = item.id

        fragment.appendChild(clone)
    })
    pintarTarea.appendChild(fragment)
}

document.addEventListener('click', (e) => {
    // console.log(e.target.dataset.id);
    if (e.target.matches('.btn-danger')) {
        tareas = tareas.filter(item => item.id !== e.target.dataset.id)
        pintarTareas()
    }
})

document.addEventListener('DOMContentLoaded', (e) => {

    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
        pintarTareas()
    }
    

})