import{encabezado,pie,indexView,newView,iniciarcontr}from'./Vistas.js';

// CONTROLADORES
function indexContr() {
    document.getElementById("main").innerHTML = indexView();
    document.getElementById("Encabezado").innerHTML = encabezado();
    document.getElementById("main").innerHTML = localStorage.getItem('currentView') || indexView();
    document.getElementById("pie").innerHTML = pie();

}

function createContr() {
    document.getElementById("main").innerHTML = newView();
    document.getElementById("crearCuenta").style.display = "none";
    document.getElementById("IniciarSesion").style.display = "inline";
    localStorage.setItem('currentView', document.getElementById("main").innerHTML);
}

function inicarContr() {
    document.getElementById("main").innerHTML = iniciarcontr();
    document.getElementById("crearCuenta").style.display = "inline";
    document.getElementById("IniciarSesion").style.display = "none";
    localStorage.setItem('currentView', document.getElementById("main").innerHTML);
}

function Plataforma(){
    //document.getElementById("Encabezado").innerHTML = encabezado();
    document.getElementById("main").innerHTML = iniciarcontr();
    //document.getElementById("pie").innerHTML = pie();
}
// Variable para llevar un registro del estado actual
let currentState = 'index'; // Puedes establecer el estado inicial aquí

// EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    // Ejecuta la función correspondiente al estado actual
    if (currentState === 'index') {
        indexContr();
    } else if (currentState === 'create') {
        createContr();
    } else if (currentState === 'iniciar') {
        inicarContr();
    }
});

document.addEventListener('click', ev => {
    if (ev.target.matches('#crearCuenta')) {
        currentState = 'create'; // Actualiza el estado
        createContr();
    } else if (ev.target.matches('#IniciarSesion')) {
        currentState = 'iniciar'; // Actualiza el estado
        inicarContr();
    } else if (ev.target.matches('#Plataforma')) {
        currentState = 'plataforma'; // Actualiza el estado
        Plataforma();
    } 
    else if (ev.target.matches('#Principal')) {
        localStorage.removeItem('currentView');
        currentState = 'index'; // Actualiza el estado
        indexContr();
    } 
});
    

