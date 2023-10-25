//nos servira para leer la informacino de la base de datos
import { buscarUsuario, buscarProyectosAsignados, buscarTareasAsignadas } from "./Intermediario.js";
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
    const usuarioId = 4; // Cambia este ID por el que necesitas

    console.log('ID Enviado:', usuarioId);

    buscarUsuario(usuarioId)
        .then((data) => {
            console.log("Datos del servidor:", data);

            // Llamar a la función Configuracion con todos los datos del usuario
            document.getElementById("Tablero").innerHTML = Configuracion(data);
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
        });

}
function actualizarAjustes() {
    document.getElementById("Tablero").innerHTML = actualizarConfiguracion();
}
function inicarContr() {
    const usuarioId = 4; // Cambia este ID por el que necesitas

    console.log('ID Enviado:', usuarioId);

    buscarUsuario(usuarioId)
        .then((data) => {
            console.log("Datos del servidor:", data);
            const nombre = data.Nombre_Usuario; // Obtener el nombre del usuario
            console.log('Nombre del usuario:', nombre);

            document.getElementById("Tablero").innerHTML = Menu(nombre); // Enviar el nombre a la función Menu
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
        });



}

function VerTarea() {
    const usuarioId = 4; // Cambia este ID por el que necesitas
    console.log('ID Enviado:', usuarioId);

    buscarTareasAsignadas(usuarioId)
        .then((data) => {
            console.log("Datos del servidor:", data);

            // Convierte los datos en una cadena de texto JSON
            const dataText = JSON.stringify(data, null, 2); // El segundo argumento es para la indentación

            // Muestra la cadena de texto JSON en la consola
            console.log("Datos como texto:", dataText);

            if (data && Array.isArray(data)) {
                document.getElementById("Tablero").innerHTML = Tareas(data);
            } else {
                console.log("Los datos no son un array.");
            }
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
        });
}


function VerProyectos() {
    const usuarioId = 4; // Cambia este ID por el que necesitas
    console.log('ID Enviado:', usuarioId);

    buscarProyectosAsignados(usuarioId)
        .then((data) => {
            console.log("Datos del servidor:", data);

            // Convierte los datos en una cadena de texto JSON
            const dataText = JSON.stringify(data, null, 2); // El segundo argumento es para la indentación

            // Muestra la cadena de texto JSON en la consola
            console.log("Datos como texto:", dataText);

            if (data && Array.isArray(data)) {
                document.getElementById("Tablero").innerHTML = Proyectos(data);
            } else {
                console.log("Los datos no son un array.");
            }
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
        });
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
