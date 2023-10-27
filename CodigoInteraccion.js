//nos servira para leer la informacino de la base de datos
import {
    buscarUsuario,
    buscarProyectosAsignados,
    buscarTareasAsignadas,
    actualizarUsuario,
    actualizarEstadoTarea,
    AgregarHistorialMovimiento,
    AgregarProyecto,
    AgregarTarea,
    actualizarProyecto,
    actualizarTareaEnServidor,
    obtenerInfoTareas,
    obtenerInfoTareasdeMienbro,
    buscarTareasSinColaborador,
    Buscarproyectosincola,
    LeerUser,
    agregarColaborador,
    buscarEstadosPromedio
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
    mostrarHistorialDeMovimiento,
    OpcionesNotificaciones,
    crearTareaForm,
    actualizarTareaForm,
    verTareas,
    MostrarTareasDivididas,
    MostrarColaboradoresYTareas,
    verTareasSinColaborador,
    verTareasConColaborador,
    crearUsuarioForm
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

function VerProyectos(userID, hacer) {
    const usuarioId = userID;
    const Realizar = hacer;
    buscarProyectosAsignados(usuarioId)
        .then((data) => {
            console.log("Datos del servidor:", data);

            // Convierte los datos en una cadena de texto JSON
            const dataText = JSON.stringify(data, null, 2); // El segundo argumento es para la indentación

            // Muestra la cadena de texto JSON en la consola
            console.log("Datos como texto:", dataText);

            if (data && Array.isArray(data)) {
                document.getElementById("Tablero").innerHTML = Proyectos(data, Realizar);
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

function GuardarProyecto(userID) {
    var formulario = document.getElementById("proyecto-form");

    // Obtiene los valores de los campos del formulario
    var nombreProyecto = formulario.querySelector("#nombre_proyecto").value;
    var descripcionProyecto = formulario.querySelector("#descripcion").value;

    // Verifica si los campos están vacíos
    if (!nombreProyecto || !descripcionProyecto) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos.'
        });
        return; // Detén el proceso si los campos están vacíos
    }

    // Crea un objeto con los datos del proyecto
    var nuevoProyecto = {
        Nombre_del_Proyecto: nombreProyecto,
        Descripcion: descripcionProyecto,
        Fecha_de_Creacion: obtenerFechaHoraActual(),
        Usuario_Propietario: userID
    };
    // Llama a la función AgregarProyecto para enviar los datos al servidor
    AgregarProyecto(nuevoProyecto)
        .then((response) => {
            if (response.message === "Proyecto agregado con éxito") {
                // Si el servidor responde con un mensaje de éxito
                mostrarMensajeExito('Proyecto creado', 'El proyecto se creó exitosamente.');
                // Limpia los campos de entrada del formulario
                formulario.querySelector("#nombre_proyecto").value = "";
                formulario.querySelector("#descripcion").value = "";
            } else {
                // Si el servidor responde con un mensaje de error
                mostrarMensajeError('Error', 'Hubo un error al crear el proyecto.');
            }
        })
        .catch((error) => {
            console.error(error);
            mostrarMensajeError('Error', 'Hubo un error al crear el proyecto.');
        });

    function mostrarMensajeExito(titulo, mensaje) {
        Swal.fire({
            icon: 'success',
            title: titulo,
            text: mensaje,
            showConfirmButton: true,
            timer: false,
        });
    }

    function mostrarMensajeError(titulo, mensaje) {
        Swal.fire({
            icon: 'error',
            title: titulo,
            text: mensaje,
            showConfirmButton: true,
            timer: false,
        });
    }
}

function GuardarTarea(userID, proyectoID) {
    const hacer = "CrearTarea";
    var formulario = document.getElementById("tarea-form");

    // Obtiene los valores de los campos del formulario
    var nombreTarea = formulario.querySelector("#nombre-tarea").value;
    var descripcionTarea = formulario.querySelector("#descripcion-tarea").value;

    // Verifica si los campos están vacíos
    if (!nombreTarea || !descripcionTarea) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos.'
        });
        return; // Detén el proceso si los campos están vacíos
    }
    console.log("Ver id par estar correctoen la tarea", proyectoID)
    var nuevaTarea = {
        Nombre_de_la_Tarea: nombreTarea,
        Descripcion: descripcionTarea,
        Fecha_de_Creacion: obtenerFechaHoraActual(), // Asegúrate de tener esta función definida
        Proyecto_Perteneciente: proyectoID,
        Estado_de_la_Tarea: 1, // Reemplaza con el estado adecuado
    };

    console.log('Datos que se envían al servidor:', nuevaTarea);

    // Llama a la función AgregarTarea (debes definirla) para enviar los datos al servidor
    AgregarTarea(nuevaTarea)
        .then((response) => {
            if (response.message === "Tarea agregada con éxito") {
                // Si el servidor responde con un mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Tarea creada',
                    text: 'La tarea se creó exitosamente.',
                    showConfirmButton: true,
                    timer: false,
                });

                // Limpia los campos de entrada del formulario
                formulario.querySelector("#nombre-tarea").value = "";
                formulario.querySelector("#descripcion-tarea").value = "";

                // Llama a VerProyectos(userID)
                VerProyectos(userID, hacer);
            } else {
                // Si el servidor responde con un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al crear la tarea.',
                    showConfirmButton: true,
                    timer: false,
                });
            }
        })
        .catch((error) => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al crear la tarea.',
                showConfirmButton: true,
                timer: false,
            });
        });
}

function Proyecactualizar(proyectoID) {
    // Obtén los valores del formulario
    const Nombre_del_Proyecto = document.getElementById('nombre_proyecto').value;
    const descripcion = document.getElementById('descripcion').value;

    // Verifica que los campos no estén vacíos
    if (Nombre_del_Proyecto.trim() === '' || descripcion.trim() === '') {
        mostrarMensajeAdvertencia('Campos vacíos', 'Por favor, completa todos los campos.');
        return;
    }

    // Llama a la función para enviar los valores a la base de datos
    actualizarProyecto(proyectoID, Nombre_del_Proyecto, descripcion)
        .then(() => {
            mostrarMensajeExito(`Proyecto "${Nombre_del_Proyecto}" actualizado con éxito.`);
            //proyectadmin(userID);
        })
        .catch((error) => {
            mostrarMensajeError('Error al actualizar el proyecto', error.message);
        });

    function mostrarMensajeAdvertencia(titulo, texto) {
        Swal.fire({
            icon: 'warning',
            title: titulo,
            text: texto,
        });
    }

    function mostrarMensajeExito(mensaje) {
        Swal.fire({
            icon: 'success',
            title: 'Proyecto Actualizado',
            text: mensaje,
        });
    }

    function mostrarMensajeError(titulo, error) {
        Swal.fire({
            icon: 'error',
            title: titulo,
            text: error,
        });
    }
}

function EnviarActualizacionTarea(tareaId) {
    // Obtén los valores de los campos del formulario
    const nuevoNombre = document.getElementById('nombre-tarea').value;
    const nuevaDescripcion = document.getElementById('descripcion-tarea').value;
    const nuevoEstado = document.getElementById('estado-tarea').value;

    // Ahora puedes utilizar estos valores para llamar a la función que actualiza la tarea en el servidor
    actualizarTareaEnServidor(tareaId, nuevoNombre, nuevaDescripcion, nuevoEstado)
        .then(() => {
            // La tarea se ha actualizado con éxito, puedes mostrar un mensaje de éxito o redirigir aquí si es necesario
            Swal.fire({
                icon: 'success',
                title: 'Tarea actualizada',
                text: 'La tarea se actualizó con éxito.'
            });
        })
        .catch((error) => {
            // Hubo un error en la solicitud, puedes mostrar un mensaje de error aquí
            Swal.fire({
                icon: 'error',
                title: 'Error en la solicitud',
                text: 'Hubo un error al actualizar la tarea.'
            });
        });
}



function mostrarIntegrantes() {
    const userID = localStorage.getItem("userID");
    console.log(userID);

    obtenerInfoTareasdeMienbro(userID)
        .then((data) => {

            const datosFiltrados = filtrarDatosUnicos(data, "Nombre_del_Proyecto");

            document.getElementById("Tablero").innerHTML = MostrarColaboradoresYTareas(datosFiltrados);
        })
        .catch((error) => {
            console.error(error);
        });

    function filtrarDatosUnicos(datos, campoClave) {
        const datosUnicos = [];
        const valoresUnicos = new Set();

        datos.forEach((fila) => {
            const valor = fila[campoClave];
            if (!valoresUnicos.has(valor)) {
                valoresUnicos.add(valor);
                datosUnicos.push(fila);
            }
        });

        return datosUnicos;
    }

}

function mostracola() {
    const userID = window.usuarioActual;
    Buscarproyectosincola(userID)
        .then((data) => {
            document.getElementById("Tablero").innerHTML = verTareasConColaborador(data);
            console.log("Datos obtenidos:", data);
        })
        .catch((error) => {
            console.error("Error al obtener y mostrar tareas sin colaborador:", error);
        });
}

function mostrarsincola() {
    const userID = window.usuarioActual;
    buscarTareasSinColaborador(userID)
        .then((data) => {
            document.getElementById("Tablero").innerHTML = verTareasSinColaborador(data);
            console.log("Datos obtenidos:", data);
        })
        .catch((error) => {
            console.error("Error al obtener y mostrar tareas sin colaborador:", error);
        });
}

function crearcolaborardor() {
    document.getElementById("Tablero").innerHTML = crearUsuarioForm();

}
function bucarcolaborador() {
    var correoColaboradorInput = document.getElementById("correo-colaborador");
    const Correo_Electronico = correoColaboradorInput.value;
    console.log(Correo_Electronico);

    if (Correo_Electronico.trim() === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa el campo de correo electrónico.',
        });
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(Correo_Electronico)) {
        Swal.fire({
            icon: 'error',
            title: 'Correo inválido',
            text: 'Por favor, ingresa un correo electrónico válido.',
        });
    } else {

        LeerUser()
            .then((data) => {
                let correoEncontrado = false;
                let IDencontra = null;

                data.forEach((usuario) => {
                    if (usuario.Correo_Electronico === Correo_Electronico) {
                        correoEncontrado = true;

                        IDencontra = usuario.ID;
                        console.log(IDencontra);
                    }
                });

                if (correoEncontrado) {
                    console.log(IDencontra);
                    // Crear un objeto nuevoColaborador con valores
                    var nuevoColaborador = {
                        Usuario_Participante: IDencontra,
                        Proyecto_Perteneciente: proyectoID,
                        Tarea_Asignada: idtarea
                    };

                    agregarColaborador(nuevoColaborador);


                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Correo no encontrado',
                        text: 'El correo no existe en la base de datos. Regístrate o verifica tus datos.',
                    });
                }
            })
            .catch((error) => {
                console.error('Error en la solicitud:', error);
            });
    }
}

//CONFIGURACIONES DE USUARIO ADMINISTRADO 

function proyectadmin(userID) {
    const ID = userID;
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
    const userID = localStorage.getItem("userID");
    buscarEstadosPromedio(userID)
        .then((estadosPromedio) => {
            var datosFormateados = estadosPromedio.map(item => {
                return {
                    Nombre_del_Proyecto: item.Nombre_del_Proyecto,
                    ChartData: {
                        labels: ["Porcentaje_Terminado", "Porcentaje_EnProceso", "Porcentaje_Pendiente"],
                        datasets: [{
                            data: [item.Porcentaje_Terminado, item.Porcentaje_EnProceso, item.Porcentaje_Pendiente],
                            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6']
                        }]
                    }
                };
            });
            mostrarHistorialDeMovimiento(datosFormateados);
        })
        .catch((error) => {
            console.error('Error al buscar proyectos y estados promedio:', error);
        });
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

function ListaoTareas() {
    const userID = localStorage.getItem("userID");
    buscarTareasAsignadas(userID)
        .then((data) => {
            document.getElementById("Tablero").innerHTML = MostrarTareasDivididas(data);
        })
        .catch((error) => {

            console.error('Error al buscar tareas:', error);

        });
}

let estadoActual = "Pendiente";
let proyectoID;
let Estadoregreso;
let idtarea;
let IDencontra;
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
        const hacer = "ver"
        VerProyectos(userID, hacer, hacer);
    } else if (ev.target.matches("#mis-tareas")) {
        botones_interaccion();
    } else if (ev.target && ev.target.classList.contains("estado-botones-btn")) {
        const estado = ev.target.getAttribute("data-estado");
        const tareaElement = ev.target.closest(".tarea");
        const tareaID = ev.target.getAttribute("data-tarea-id");
        const proyectoID = ev.target.getAttribute("data-proyecto-id");
        const colaboradorID = ev.target.getAttribute("data-colaborador-id");
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
            if (Estadoregreso === "Tarea") {
                OptionTarea();
            } else {
                proyectadmin(userID);
            }

        } else if (userRole === "Colaborador") {
            botones_interaccion();
        } else {
            encabezadoHTML = "Tipo de usuario no válido";
        }
    } else if (ev.target.matches("#salir")) {
        localStorage.removeItem("userID");
        localStorage.removeItem("userRole");
        window.location.href = "/Pagina/index.html";
    } else if (ev.target.matches("#proyectos")) {
        proyectadmin(userID);
    } else if (ev.target.matches("#tareas")) {
        OptionTarea();

    } else if (ev.target.matches("#registro")) {
        MostarRegistro();
    } else if (ev.target.matches("#crear-proyecto")) {
        CrearProyecto();
    }
    else if (ev.target.matches("#ver-proyecto")) {
        Estadoregreso = "No"
        const hacer = "Ver"
        VerProyectos(userID, hacer);
    }
    else if (ev.target.matches("#editar-proyecto")) {
        Estadoregreso = "No"
        const hacer = "ActualizarProyecto";
        VerProyectos(userID, hacer);
    } else if (ev.target.matches("#proyectoIncividual")) {
        proyectoID = ev.target.getAttribute("data-proyecto-id");
        ev.preventDefault();
        console.log("Aqui va el ID en cada Proyecto", proyectoID);
        EditarProyect();

    }else if (ev.target.matches("#crear-tarea")) {
        Estadoregreso = "Tarea";
        const hacer = "CrearTarea"
        VerProyectos(userID, hacer);
    } else if (ev.target.matches("#tareas-con-colaborador")) {
        mostrarsincola();
    } else if (ev.target.matches("#tareas-sin-colaborador")) {

        mostracola();
    } else if (ev.target.matches("#boton-crear-proyecto")) {
        ev.preventDefault();
        GuardarProyecto(userID);
        ev.preventDefault();
        inicarContr(userID);
    }
    if (ev.target.matches("#AgregarTarea_proyec")) {
        proyectoID = ev.target.getAttribute("data-proyecto-id");
        ev.preventDefault();
        createtarea();
    } else if (ev.target.matches("#boton-cancelar-proyecto")) {
        ev.preventDefault();
        proyectadmin(userID);
    } else if (ev.target.matches("#boton-crear-tarea")) {
        ev.preventDefault();
        GuardarTarea(userID, proyectoID);
    } else if (ev.target.matches("#boton-cancelar-tarea")) {
        OptionTarea();
    }
    else if (ev.target.matches("#boton-cancelar-actualizacion")) {
        ev.preventDefault();
        Estadoregreso = "No"
        const hacer = "ActualizarProyecto";
        VerProyectos(userID, hacer);
    }
    else if (ev.target.matches("#boton-actualizar-proyecto")) {
        Proyecactualizar(proyectoID);
        ev.preventDefault();
        const hacer = "ActualizarProyecto";
        VerProyectos(userID, hacer);

    } else if (ev.target.matches("#ActualizarTarea")) {
        ev.preventDefault();
        proyectoID = ev.target.getAttribute("data-tarea-id");
        console.log(proyectoID);
        UotadeTarea();
    } else if (ev.target.matches("#boton-actualizar-tarea")) {
        ev.preventDefault();
        EnviarActualizacionTarea(proyectoID);
        OptionTarea();
    } else if (ev.target.matches("#equipos")) {
        ev.preventDefault();
        mostrarIntegrantes();

    } else if (ev.target.matches("#Agregarcolaborador")) {
        proyectoID = ev.target.getAttribute("data-tarea-id");
        idtarea = ev.target.getAttribute("data-proyecto-id");
        const idp = proyectoID;
        const idt = idtarea;
        console.log("ide pro:", idp, "ide tarea:", idt);
        ev.preventDefault();
        crearcolaborardor();

    } else if (ev.target.matches("#boton-buscar-colaborador")) {
        ev.preventDefault();
        bucarcolaborador();
        OptionTarea();
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



