//nos servira para leer la informacino de la base de datos
import { buscarUsuario, buscarProyectosAsignados, buscarTareasAsignadas, actualizarUsuario, actualizarEstadoTarea} from "./Intermediario.js";
import {
    encabezado_admin,
    encabezado_user,
    Menu,
    Configuracion,
    actualizarConfiguracion,
    Tareas,
    adminProyectos,
    Proyectos,
    Opciones
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
function esCorreoElectronicoValido(correoElectronico) {
    // Expresión regular para validar una dirección de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(correoElectronico);
}

function actualizarAjustes() {
    document.getElementById("Tablero").innerHTML = actualizarConfiguracion();

    // Agrega un evento de escucha al formulario
    const formulario = document.getElementById("configuracion-form");
    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        // Obtiene los datos del formulario
        const nomNombrebre = formulario.elements.nombre.value;
        const Correo_Electronico = formulario.elements.correo.value;
        const Rol = formulario.elements.rol.value;
        const contrasenia = formulario.elements.contrasena.value;
        const Tipo_de_Cuenta = formulario.elements.tipoCuenta.value;

        // Verifica si el correo electrónico es válido
        if (!esCorreoElectronicoValido(correo)) {
            Swal.fire({
                icon: 'error',
                title: 'Correo no válido',
                text: 'Por favor, ingresa un correo electrónico válido.',
            });
            return; // Detiene la ejecución si el correo no es válido
        }

        // Crea un objeto con los datos
        const userData = {
            nomNombrebre,
            Correo_Electronico,
            Rol,
            contrasenia,
            Tipo_de_Cuenta,
        };

        // Obtén el usuarioId de alguna manera
        const usuarioId = 5; // Reemplaza obtenerUsuarioId con la lógica real

        // Llama a la función para enviar los datos al servidor
        actualizarUsuario(usuarioId, userData);

        // Muestra un mensaje de éxito y llama a la función inicarContr al cerrar el mensaje
        Swal.fire({
            icon: 'success',
            title: 'Actualización exitosa',
            text: 'Los datos se han actualizado correctamente.',
            onAfterClose: inicarContr, // Redirige a la función inicarContr
        });
    });
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

function VerTarea(usuarioId,datoUsuario) {

    console.log('ID Enviado:', usuarioId);

    buscarTareasAsignadas(usuarioId)
        .then((data) => {
            console.log("Datos del servidor:", data);

            // Convierte los datos en una cadena de texto JSON
            const dataText = JSON.stringify(data, null, 2); // El segundo argumento es para la indentación

            // Muestra la cadena de texto JSON en la consola
            console.log("Datos como texto:", dataText);

            if (data && Array.isArray(data)) {

                document.getElementById("Tablero").innerHTML = Tareas(data,datoUsuario);

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

function botones_interaccion(){
    document.getElementById("Tablero").innerHTML =Opciones();

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


document.addEventListener("DOMContentLoaded", () => {
    var tipoUsuario = "user";
    mostrarEncabezado(tipoUsuario);
    inicarContr();
});
// Declarar las variables globales para el estado y el usuario
let estadoActual = "Pendiente"; // Puedes establecer un estado predeterminado
let usuarioActual = 4; // Puedes establecer un usuario predeterminado

document.addEventListener("click", (ev) => {
    if (ev.target.matches("#perfil")) {
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
        botones_interaccion();
    } else if (ev.target && ev.target.classList.contains('estado-btn')) {
        const estado = ev.target.getAttribute('data-estado');
        const tareaElement = ev.target.closest('.tarea');
        const tareaID = ev.target.getAttribute('data-tarea-id');
        console.log(`Clic en botón con estado `, estado, ` para tarea con ID `, tareaID);
        actualizarEstadoTarea(tareaID, estado);
        VerTarea(usuarioActual,estadoActual);
    } else if (ev.target.matches("#mostrarRealizadas")) {
        estadoActual = "Realizado";
        usuarioActual = 4;
        const datoUsuario = estadoActual;
        VerTarea(usuarioActual, datoUsuario);
    } else if (ev.target.matches("#mostrarEnProceso")) {
        estadoActual = "En Proceso";
        usuarioActual = 4;
        const datoUsuario = estadoActual;
        VerTarea(usuarioActual, datoUsuario);
    } else if (ev.target.matches("#mostrarPendientes")) {
        estadoActual = "Pendiente";
        usuarioActual = 4;
        const datoUsuario = estadoActual;
        VerTarea(usuarioActual, datoUsuario);
    }else if (ev.target.matches("#Regreso")) {
        botones_interaccion();
    }
});

