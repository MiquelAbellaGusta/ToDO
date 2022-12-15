const taskDom = document.querySelector('#task');

/*pintarlista*/

function PrintAllTask(pList, pDom) {
    pDom.innerHTML = "";
    if (pList.length !== 0) {
        pList.forEach(task => printOneTask(task, pDom));
    } else {
        pDom.innerHTML = `<article id="empty" class="card p-2">
                <h3>NO HAY TAREAS PENDIENTES</h3>
                </article> `
    }
}


function printOneTask(pTask, pDom) {
    pDom.innerHTML += `<li class="list-group-item list-group-item-${getPriority(pTask.priority)}"> ${pTask.task} <i class="fa-solid fa-trash"></i>
</li >`}

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
    }

    return tipo

}

PrintAllTask(taskList, taskDom);

/*fin pintarLista*/

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

    console.log(searchInput)

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

/*añadir tareas*/


let tarea = document.querySelector('#inputTask');
let prioridad = document.querySelector('#priority');
let btn = document.querySelector('#btn');


btn.addEventListener('click', getTask)

function getTask() {
    let nuevatarea = {
        task: tarea.value,
        priority: prioridad.value,
    }

    localStorage.setItem('nuevatarea', JSON.stringify(nuevatarea));


};
let newTask = JSON.parse(localStorage.getItem('nuevatarea'));

console.log(newTask);
printOneTask(newTask, taskDom);
