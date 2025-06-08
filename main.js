const form = document.getElementById('form'); // Formulario
const lista = document.getElementById('lista'); // Lista de recursos
let recursos= JSON.parse(localStorage.getItem('recursos')) || []; // intentamos recuperar los recursos del localStorage o crea un array vacio si no hay nada

// funcion para guardar 
function guardarRecursos() {
    localStorage.setItem('recursos', JSON.stringify(recursos)); // Guardamos los recursos en el localStorage
} //convierte el array de objetos recursos en texto JSON y lo guarda en el navegador

//funcion para mostrar los recursos en pantalla
function renderizarRecursos(){
    lista.innerHTML = ''; // Limpiamos la lista antes de renderizar
    recursos.forEach((recurso, index) => { // Recorremos el array de recursos
        const li = document.createElement('li'); // Creamos un elemento li
        li.classList.toggle('adquirido', recurso.adquirido); // Añadimos la clase 'adquirido' si el recurso está adquirido
        li.innerHTML = `
            <span>${recurso.nombre} - ${recurso.categoria} (${recurso.prioridad})</span>
            <div>
            <button class="adquirir" data-index="${index}">Adquirir</button>
            <button class="eliminar" data-index="${index}">Eliminar</button>
            </div>
        `;
        lista.appendChild(li); // Añadimos el li a la lista
    }); 


// EVENTOS PARA LOS BOTONES
document.querySelectorAll('.adquirir').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = btn.getAttribute('data-index');
            marcarComoAdquirido(i);
        });
    });

    document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = btn.getAttribute('data-index');
            eliminarRecurso(i);
        });
    });
}



// funcion cuando se envia el formulario
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitamos que se recargue la página al enviar el formulario
    const nombre = document.getElementById('recurso').value.trim(); // Obtenemos el nombre del recurso
    const categoria = document.getElementById('categoria').value.trim(); // Obtenemos la categoría del recurso
    const prioridad = document.getElementById('prioridad').value; // Obtenemos la prioridad del recurso

    if (nombre && categoria && prioridad) { // Verificamos que todos los campos estén llenos
        recursos.push({ nombre, categoria, prioridad, adquirido: false }); // Añadimos el nuevo recurso al array
        guardarRecursos(); // Guardamos los recursos en el localStorage
        renderizarRecursos(); // Renderizamos los recursos en pantalla
        form.reset(); // Reseteamos el formulario
    }
});

// marcar como adquirido 
function marcarComoAdquirido(index) {
    recursos[index].adquirido = !recursos[index].adquirido; // Marcamos el recurso como adquirido
    guardarRecursos(); // Guardamos los cambios en el localStorage
    renderizarRecursos(); // Renderizamos los recursos en pantalla
}

// eliminar recurso
function eliminarRecurso(index) {
    recursos.splice(index, 1); // Eliminamos el recurso del array
    guardarRecursos(); // Guardamos los cambios en el localStorage
    renderizarRecursos(); // Renderizamos los recursos en pantalla
}

renderizarRecursos();

// mostrar los recursos guardados el cargar la pagina

