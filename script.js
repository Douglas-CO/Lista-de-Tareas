//POO, Debbuger, LocalStorage
function agregar() {
    document.getElementById("agregarBlock").style.display = "block";
}
function cancelarTarea() {
    document.getElementById("agregarBlock").style.display = "none";
}

class Tareas {
    constructor() {
        this.tareas = [];
        this.id = 0;
    }
    addTareas(newTitulo, newDescripcion) {
        this.tareas.push({
            id: this.id,
            titulo: newTitulo,
            descripcion: newDescripcion,
            terminado: false
        });
        this.id++;
    }
    showTarea(tarea) {
        const tabla = document.getElementById("listaTareas");
        if (!tabla.hasChildNodes()) {
            tabla.innerHTML = `
                <tr>
                    <th>Titulo</th>
                    <th>Descripcion</th>
                    <th>Tarea Terminada</th>
                </tr>
            `;
        }
        const fila = tabla.insertRow(-1);
        //Otorga valor unico siendo este tarea.id
        fila.setAttribute("data-id", tarea.id);

        const infoTitulo = fila.insertCell();
        infoTitulo.innerHTML = tarea.titulo;

        const infoDescripcion = fila.insertCell();
        infoDescripcion.innerHTML = tarea.descripcion;

        //Celda boton y su evento
        const celdaTerminado = fila.insertCell();
        const botonTerminado = document.createElement("button");
        botonTerminado.className = "btn btn-primary";
        botonTerminado.innerHTML = "Terminado";
        botonTerminado.onclick = () => {
            debugger;
            tarea.terminado = true;
            botonTerminado.disabled = true;
            const fila = botonTerminado.parentNode.parentNode;
            //Llama el valor unico siendo este los datos de la tarea.id
            const id = fila.getAttribute("data-id");
            agregarCookies(id, tarea.titulo, tarea.descripcion);
            fila.remove();
        };
        celdaTerminado.appendChild(botonTerminado);
        //Actualiza los datos
        this.titulo = [];
        this.descripcion = [];
    }
    //Actualiza la tabla cuando terminado: false sea terminado: true
    showTodasLasTareas() {
        const tabla = document.getElementById("listaTareas");
        tabla.innerHTML = "";
        for (let tarea of this.tareas) {
            if (!tarea.terminado) {
                this.showTarea(tarea);
            }
        }
    }
}

const listaTarea = new Tareas();

function agregarTarea() {
    document.getElementById("agregarBlock").style.display = "none";
    const nuevoTitulo = document.getElementById("idTitulo").value;
    const nuevoDescripcion = document.getElementById("idDescripcion").value;
    debugger;
    listaTarea.addTareas(nuevoTitulo, nuevoDescripcion);
    listaTarea.showTodasLasTareas();
    document.getElementById("idTitulo").value = "";
    document.getElementById("idDescripcion").value = "";
}

function agregarCookies(id, titulo, descripcion) {
    const tarea = {
        id: id,
        titulo: titulo,
        descripcion: descripcion,
        terminado: true
    };
    //Agrega al LocalStorage los datos con su respectiva id
    localStorage.setItem(`${id}`, JSON.stringify(tarea));
    
    const tabla = document.getElementById("TareasCompletadas");
    const fila = tabla.insertRow(-1);
    //Otorga valor unico siendo este tarea.id
    fila.setAttribute("data-id", `${id}`);

    const infoTitulo = fila.insertCell();
    const infoDescripcion = fila.insertCell();
    if(typeof `${tarea.id}` !== 'null'){
        //sconst tablaCookie = document.createElement("table")
        infoTitulo.innerHTML = `${tarea.titulo}`;
        infoDescripcion.innerHTML = `${tarea.descripcion}`;

    }

    //Celda boton y su evento
    const celdaEliminar = fila.insertCell();
    const botonEliminar = document.createElement("button");
    botonEliminar.className = "btn btn-danger";
    botonEliminar.innerHTML = "Eliminar";
    botonEliminar.onclick = () => {
        debugger;
        tarea.terminado = true;
        botonEliminar.disabled = true;
        const fila = botonEliminar.parentNode.parentNode;
        const id = fila.getAttribute("data-id");
        localStorage.removeItem(id);
        fila.remove();
    };
    celdaEliminar.appendChild(botonEliminar);
    //Actualiza los datos
    this.titulo = [];
    this.descripcion = [];
}

//localStorage.removeItem('Batman');
//localStorage.removeItem('0');
