//nos servira para leer la informacino de la base de datos
import { buscarUsuario } from "./Intermediario.js";
import {
    encabezado_admin,
    encabezado_user,
    Menu,
    Configuracion,
    actualizarConfiguracion,
    Tareas,
    adminProyectos,
    Proyectos,
} from "./Vistas.js";
//CONTROLADORES

function Ajustes() {
    document.getElementById("Tablero").innerHTML = Configuracion();
}
function actualizarAjustes() {
    document.getElementById("Tablero").innerHTML = actualizarConfiguracion();
}
function inicarContr() {
  
    const usuarioId = 3; // Cambia este ID por el que necesitas
    console.log('ID Enviado:', usuarioId);
    buscarUsuario(usuarioId)
      .then((data) => {
        console.log("Datos del servidor:", data);
        const nombre =data;
        console.log('ID Enviado:', data);
        document.getElementById("Tablero").innerHTML =Menu(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
    }

function VerTarea() {
    document.getElementById("Tablero").innerHTML = Tareas();
}
function VerProyectos() {
    document.getElementById("Tablero").innerHTML = Proyectos();
}

function mostrarEncabezado(tipoUsuario) {
    var encabezadoHTML = "";

    if (tipoUsuario === "admin") {
        encabezadoHTML = encabezado_admin();
        IncioSeccion();
    } else if (tipoUsuario === "user") {
        encabezadoHTML = encabezado_user();
    } else {
        encabezadoHTML = "Tipo de usuario no válido";
    }

    document.getElementById("Superior").innerHTML = encabezadoHTML;
}

// Ejemplo de uso:
document.addEventListener("DOMContentLoaded", () => {
    var tipoUsuario = "user";
    mostrarEncabezado(tipoUsuario);
    inicarContr();
});
document.addEventListener("click", (ev) => {
    if (ev.target.matches("#perfil")) {
        //ev.preventDefault();
        Ajustes();
    } else if (ev.target.matches("#boton-cancelar")) {
        inicarContr();
    } else if (ev.target.matches("#inicio")) {
        inicarContr();
    } else if (ev.target.matches("#boton-actualizar")) {
        actualizarAjustes();
    } else if (ev.target.matches("#proyectos-asignados")) {
        VerProyectos();
    } else if (ev.target.matches("#mis-tareas")) {
        VerTarea();
    }
});
