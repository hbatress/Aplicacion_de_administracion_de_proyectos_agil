//nos servira para leer la informacino de la base de datos
import {
    buscarUsuario,
    buscarProyectosAsignados,
    buscarTareasAsignadas,
    actualizarUsuario,
    actualizarEstadoTarea,
    AgregarHistorialMovimiento,
    AgregarProyecto
} from "./Intermediario.js";


import {
    encabezado_admin,
    encabezado_user,
    Menu,
    Configuracion,
    actualizarConfiguracion,
    Tareas,
    Proyectos,
    Opciones,
    Opctioproyect,
    crearProyectoForm,
    ActualizarProyect,
    OpcionesTarea,
    OpcionesEquipoProyecto,
    mostrarHistorialDeMovimiento,
    OpcionesNotificaciones,
    crearTareaForm,
    actualizarTareaForm,
    verTareas
} from "./Vistas.js";

//CONTROLADORES

//CONTRALADORES PARA EL USUARIO COLABORADOR
function Ajustes(userID) {
    const usuarioId = userID;

    console.log("ID Enviado:", usuarioId);

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

function actualizarAjustes(userID) {
    document.getElementById("Tablero").innerHTML = actualizarConfiguracion();

    // Agrega un evento de escucha al formulario
    const formulario = document.getElementById("configuracion-form");
    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        // Verifica si el evento proviene del botón de cancelar
        if (event.submitter && event.submitter.name === "cancelar") {
            // Restablece el formulario
            formulario.reset();
            return;
        }
        // Obtiene los datos del formulario
        const nomNombrebre = formulario.elements.nombre.value;
        const Correo_Electronico = formulario.elements.correo.value;
        const Rol = formulario.elements.rol.value;
        const contrasenia = formulario.elements.contrasena.value;
        const Tipo_de_Cuenta = formulario.elements.tipoCuenta.value;

        // Verifica si el correo electrónico es válido
        if (!esCorreoElectronicoValido(correo)) {
            Swal.fire({
                icon: "error",
                title: "Correo no válido",
                text: "Por favor, ingresa un correo electrónico válido.",
            });
            return;
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
        const usuarioId = userID;

        // Llama a la función para enviar los datos al servidor
        actualizarUsuario(usuarioId, userData);

        // Muestra un mensaje de éxito y llama a la función inicarContr al cerrar el mensaje
        Swal.fire({
            icon: "success",
            title: "Actualización exitosa",
            text: "Los datos se han actualizado correctamente.",
            onAfterClose: inicarContr, // Redirige a la función inicarContr
        });
    });
}

function inicarContr(userID) {
    const usuarioId = userID; // Cambia este ID por el que necesitas

    console.log("ID Enviado:", usuarioId);

    buscarUsuario(usuarioId)
        .then((data) => {
            console.log("Datos del servidor:", data);
            const nombre = data.Nombre_Usuario; // Obtener el nombre del usuario
            console.log("Nombre del usuario:", nombre);

            document.getElementById("Tablero").innerHTML = Menu(nombre); // Enviar el nombre a la función Menu
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
        });
}

function VerTarea(usuarioId, Estado) {
    console.log("ID Enviado:", usuarioId);

    buscarTareasAsignadas(usuarioId)
        .then((data) => {
            console.log("Datos del servidor:", data);

            // Convierte los datos en una cadena de texto JSON
            const dataText = JSON.stringify(data, null, 2); // El segundo argumento es para la indentación

            // Muestra la cadena de texto JSON en la consola
            console.log("Datos como texto:", dataText);

            if (data && Array.isArray(data)) {
                document.getElementById("Tablero").innerHTML = Tareas(data, Estado);
            } else {
                console.log("Los datos no son un array.");
            }
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
        });
}

function VerProyectos(userID) {
    const usuarioId = userID; // Cambia este ID por el que necesitas
    console.log("ID Enviado:", usuarioId);

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

function botones_interaccion() {
    document.getElementById("Tablero").innerHTML = Opciones();
}

function mostrarEncabezado(tipoUsuario) {
    var encabezadoHTML = "";

    if (tipoUsuario === "Administrador") {
        encabezadoHTML = encabezado_admin();
    } else if (tipoUsuario === "Colaborador") {
        encabezadoHTML = encabezado_user();
    } else {
        encabezadoHTML = "Tipo de usuario no válido";
    }

    document.getElementById("Superior").innerHTML = encabezadoHTML;
}

//CONFIGURACIONES DE USUARIO ADMINISTRADO 

function proyectadmin(userID) {
    const ID=userID;
    document.getElementById("Tablero").innerHTML = Opctioproyect(ID);
}
function CrearProyecto() {
    document.getElementById("Tablero").innerHTML = crearProyectoForm();
}
function EditarProyect() {
    document.getElementById("Tablero").innerHTML = ActualizarProyect();
}

function OptionTarea() {
    document.getElementById("Tablero").innerHTML = OpcionesTarea();
}
function OptinoEquipo() {
    document.getElementById("Tablero").innerHTML = OpcionesEquipoProyecto();
}
function MostarRegistro() {
    document.getElementById("Tablero").innerHTML = mostrarHistorialDeMovimiento();
}

function OptrionMEnsaje() {
    document.getElementById("Tablero").innerHTML = OpcionesNotificaciones();
}
function UotadeTarea() {
    document.getElementById("Tablero").innerHTML = actualizarTareaForm();
}
function createtarea() {
    document.getElementById("Tablero").innerHTML = crearTareaForm();
}
function VerTareas() {
    document.getElementById("Tablero").innerHTML = verTareas();
}

let estadoActual="Pendiente";
//EVENTOS
document.addEventListener("DOMContentLoaded", () => {
    // Obtiene el userID y el userRole del almacenamiento local
    const userID = localStorage.getItem("userID");
    const userRole = localStorage.getItem("userRole");

    // Verifica que userID y userRole no sean nulos
    if (userID !== null && userRole !== null) {
        window.usuarioActual = userID;
        window.rolActual = userRole;
        mostrarEncabezado(userRole);
        inicarContr(userID);
    } else {
        console.error(
            "No se encontraron datos de usuario en el almacenamiento local."
        );
    }
});

document.addEventListener("click", (ev) => {
    const userID = window.usuarioActual;
    const userRole = window.rolActual;   
    if (ev.target.matches("#perfil")) {
        Ajustes(userID);
    } else if (ev.target.matches("#boton-cancelar")) {
        inicarContr(userID);
    } else if (ev.target.matches("#inicio")) {
        inicarContr(userID);
    } else if (ev.target.matches("#boton-actualizar")) {
        actualizarAjustes(userID);
    } else if (ev.target.matches("#proyectos-asignados")) {
        VerProyectos(userID);
    } else if (ev.target.matches("#mis-tareas")) {
        botones_interaccion();
    } else if (ev.target && ev.target.classList.contains("estado-btn")) {
        const estado = ev.target.getAttribute("data-estado");
        const tareaElement = ev.target.closest(".tarea");
        const tareaID = ev.target.getAttribute("data-tarea-id");
        const proyectoID = ev.target.getAttribute("data-proyecto-id");
        const colaboradorID = ev.target.getAttribute("data-colaborador-id");

        console.log(
            `Clic en botón con estado`,
            estado,
            `para tarea con ID`,
            tareaID
        );
        console.log(`ID del Proyecto para recibir:`, proyectoID);
        console.log(`ID del Colaborador para recibir:`, colaboradorID);
        actualizarEstadoTarea(tareaID, estado);

        // Define un objeto con los datos del historial de movimiento que deseas enviar
        const nuevoHistorial = {
            Fecha_y_Hora_del_Movimiento: obtenerFechaHoraActual(),
            Proyecto_Perteneciente: proyectoID,
            Usuario_que_Realizo_el_Movimiento: colaboradorID,
            Estado_de_la_Tarea: estado,
            Tarea: tareaID,
        };

        // Llama a la función para enviar los datos al servidor
        AgregarHistorialMovimiento(nuevoHistorial);
        VerTarea(usuarioActual, estadoActual);
    } else if (ev.target.matches("#mostrarRealizadas")) {
        estadoActual = "Realizado"; 
        VerTarea(usuarioActual, estadoActual);
    } else if (ev.target.matches("#mostrarEnProceso")) {
        estadoActual = "En Proceso"; 
        VerTarea(usuarioActual, estadoActual);
    } else if (ev.target.matches("#mostrarPendientes")) {
        estadoActual = "Pendiente"; 
        VerTarea(usuarioActual, estadoActual);
    } else if (ev.target.matches("#Regreso")) {

        if (userRole === "Administrador") {
            proyectadmin(userID);
        } else if (userRole === "Colaborador") {
            botones_interaccion();
        } else {
            encabezadoHTML = "Tipo de usuario no válido";
        }
    } else if (ev.target.matches("#salir")) {
        localStorage.removeItem("userID");
        localStorage.removeItem("userRole");
        window.location.href = "/Pagina/index.html";
    }else if (ev.target.matches("#proyectos")) {
        proyectadmin(userID);
    }else if (ev.target.matches("#tareas")) {
        OptionTarea();
        
    }else if (ev.target.matches("#equipos")) {
        OptinoEquipo()
    } else if (ev.target.matches("#registro")) {
        MostarRegistro();
    }else if (ev.target.matches("#crear-proyecto")) {
        CrearProyecto();
    }
    else if (ev.target.matches("#ver-proyecto")) {
        VerProyectos(userID);
    }
    else if (ev.target.matches("#editar-proyecto")) {
        EditarProyect();
    }
    else if (ev.target.matches("#Mensaje")) {
        OptrionMEnsaje();
    }else if (ev.target.matches("#crear-tarea")) {
        createtarea();
      } else if (ev.target.matches("#ver-tarea")) {
        VerTareas();
      } else if (ev.target.matches("#editar-tarea")) {
        UotadeTarea();
      }
});

function obtenerFechaHoraActual() {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = (fechaActual.getMonth() + 1).toString().padStart(2, "0"); // Sumar 1 al mes (los meses en JavaScript son 0-based)
    const day = fechaActual.getDate().toString().padStart(2, "0");
    const hours = fechaActual.getHours().toString().padStart(2, "0");
    const minutes = fechaActual.getMinutes().toString().padStart(2, "0");
    const seconds = fechaActual.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/*Funcion  para obenter el Id */
function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.search);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



