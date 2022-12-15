class Tarea {

    constructor(pId, pTitulo, pPrioridad) {
        //donde se inicializan los parametro de una clase.
        this.id = pId;
        this.titulo = pTitulo;
        this.prioridad = pPrioridad;
    }

    print(pDom) {
        let li = document.createElement('li');
        li.innerText = this.titulo + ' - ' + this.prioridad + " ";
        let button = document.createElement('button');
        button.innerText = 'borrar';
        button.addEventListener('click', (event) => {
            //button       li    ul                       li
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        })
        li.appendChild(button);
        pDom.appendChild(li);
    }

}

const tarea1 = new Tarea(1, 'Estudiar Javascript', 'urgente');
const tarea2 = new Tarea(2, 'Leer un libro', 'diaria');
const arrTareas = new Array()
arrTareas.push(tarea1, tarea2);
console.log(arrTareas)
//captura la seccion del DOM
let sectionTareas = document.querySelector('#tareas');

arrTareas.forEach(tarea => tarea.print(sectionTareas));