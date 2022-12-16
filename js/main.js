const taskDom = document.querySelector('#task');

/*pintarlista*/

function PrintAllTask(pList, pDom) {
    pDom.innerHTML = "";
    if (pList.length !== 0) {
        pList.forEach(task => printOneTask(task, pDom));
    } else {
        pDom.innerHTML = `<article>
                <h3>No hay tareas pendientes</h3>
                </article> `
    }
}

function printOneTask(pTask, pDom) {

    let li = document.createElement('li');
    li.classList.add('list-group-item', `list-group-item-${getPriority(pTask.priority)}`);
    li.innerText = (`${pTask.task}`);

    let i = document.createElement('i');
    i.classList.add('borrar', 'fa-solid', 'fa-trash');

    i.addEventListener('click', borrar)

    li.appendChild(i);
    pDom.appendChild(li);
}
function getPriority(pPriority) {
    let tipo = "";

    switch (pPriority) {
        case 'urgent':
            tipo = 'danger';
            break;
        case 'monthly':
            tipo = 'warning';
            break;
        case 'daily':
            tipo = 'success';
            break;
        case 'other':
            tipo = 'secondary';
            break;
    }

    return tipo

}

/*fin pintarLista*/

/*borrar elemento*/

function borrar(event) {
    let localList = localStorage.getItem("taskList");
    let list = JSON.parse(localList);
    let element = event.target.parentNode.innerText;
    let indice = list.findIndex(tareas => tareas.task === element)
    list.splice(indice, 1);
    taskList.splice(indice, 1);
    localStorage.setItem("taskList", JSON.stringify(list));
    PrintAllTask(list, taskDom);
    Mensaje4(mensaje);
}
/*fin de borrar elemento*/

/*añadir elemento*/

const inputTask = document.querySelector('#inputTask');
const prioridad = document.querySelector('#priority');
const btn = document.querySelector('#btn');
const mensaje = document.querySelector('#mensaje');

let id = 0;

btn.addEventListener('click', getTask);

function getTask() {
    let prio = prioridad.value;
    let tar = inputTask.value;
    if (tar === "") {
        Mensaje1(mensaje);
    }

    else if (prio === "Choose the priority") { Mensaje2(mensaje); }

    else if (tar && prio !== "") {

        const tarea = new Task(id, tar, prio);

        taskList.push(tarea);

        id++;
        localStorage.setItem('taskList', JSON.stringify(taskList));
        let localList = localStorage.getItem("taskList");
        let list = JSON.parse(localList);
        PrintAllTask(list, taskDom);

        inputTask.value = "";
    }
};


/*Fin de añadir elemento*/



/* Filtro*/
const filtro = document.querySelector('#filter');

function filterByPriority(pList, pPriority) {
    return pList.filter(task => task.priority === pPriority);
};

filtro.addEventListener('change', getPrio);

function getPrio(e) {
    let prio = e.target.value;


    if (prio !== "Filter by priority") {
        let filterPrio = filterByPriority(taskList, prio);

        PrintAllTask(filterPrio, taskDom);
    } else {
        PrintAllTask(taskList, taskDom)
    }
}

/*Fin de filtro */

/*Buscador*/

const search = document.querySelector('#search');

document.addEventListener('keydown', StartSearch);

function StartSearch(event) {

    switch (event.keyCode) {
        case 13:
            searchTask()
            break;
    };

}

function searchTask() {

    let searchInput = search.value;

    if (searchInput !== "") {
        let tareaBuscada = filterByInput(taskList, searchInput);
        PrintAllTask(tareaBuscada, taskDom);
    } else {
        PrintAllTask(taskList, taskDom);
    }
}

function filterByInput(pList, value) {
    return pList.filter(tarea => tarea.task.toLowerCase().includes(value.toLowerCase()))
}
/*Fin de Buscador */

/*Mensajes*/

function Mensaje1(pDom) {
    pDom.innerHTML = "";
    let div1 = document.createElement('div');
    div1.classList.add('mensaje', 'alert', 'alert-danger', 'd-flex', 'align-items-center');

    let i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-triangle-exclamation');

    let div2 = document.createElement('div');
    div2.innerText = 'El campo de tarea no puede estar vacío. Por favor introduzca una tarea.';

    div1.appendChild(i);
    div1.appendChild(div2);
    pDom.appendChild(div1);
}
function Mensaje2(pDom) {
    pDom.innerHTML = "";
    let div1 = document.createElement('div');
    div1.classList.add('mensaje', 'alert', 'alert-danger', 'd-flex', 'align-items-center');

    let i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-triangle-exclamation');

    let div2 = document.createElement('div');
    div2.innerText = 'Por favor selecciona una prioridad para la nueva tarea.';

    div1.appendChild(i);
    div1.appendChild(div2);
    pDom.appendChild(div1);
}
function Mensaje3(pDom) {
    pDom.innerHTML = "";
    let div1 = document.createElement('div');
    div1.classList.add('mensaje', 'alert', 'alert-success', 'd-flex', 'align-items-center');

    let i = document.createElement('i');
    i.classList.add('fa-regular', 'fa-circle-check');

    let div2 = document.createElement('div');
    div2.innerText = ' La tarea se ha añadido correctamente.';

    div1.appendChild(i);
    div1.appendChild(div2);
    pDom.appendChild(div1);
}
function Mensaje4(pDom) {
    pDom.innerHTML = "";
    let div1 = document.createElement('div');
    div1.classList.add('mensaje', 'alert', 'alert-success', 'd-flex', 'align-items-center');

    let i = document.createElement('i');
    i.classList.add('fa-regular', 'fa-circle-check');

    let div2 = document.createElement('div');
    div2.innerText = ' La tarea se ha eliminado correctamente.';

    div1.appendChild(i);
    div1.appendChild(div2);
    pDom.appendChild(div1);
}
function Mensaje5(pDom) {
    pDom.innerHTML = "";
    let div1 = document.createElement('div');
    div1.classList.add('mensaje', 'alert', 'alert-danger', 'd-flex', 'align-items-center');

    let i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-triangle-exclamation');

    let div2 = document.createElement('div');
    div2.innerText = 'La tarea ya existe. Por favor introduzca una nueva tarea.';

    div1.appendChild(i);
    div1.appendChild(div2);
    pDom.appendChild(div1);
}


