export { encabezado, pie, indexView, newView, iniciarcontr, Mostrarprecios, funcionesMostrar,solucionesMO,Condiciones };
// VISTA
function encabezado() {
    var html = `
    <header>
    <h1 class="logo" id="Principal">ScrumWave</h1>
    <nav class="menu">
        <a href="#" class="menu-item" id="funciones">Funciones</a>
        <a href="#" class="menu-item" id="soluciones">Manual</a>
        <a href="#" class="menu-item" id="planes">Planes</a>
        <button class="Crear" id="crearCuenta" title="Crear una cuenta">Crear Cuenta</button>
        <button class="Inicio" id="IniciarSesion" title="Iniciar Sesión">Iniciar Sesión</button>
    </nav>
    </header>
    `;

    return html;
}
function pie() {
    var html = `
    <footer>
    <div class="footer-content">
        <div class="copyright">
            ©2023|Todos los Derechos Reservados
        </div>
        <div class="footer-links">
        <a id="terminosCondicionesLink" class="link-azul-subrayado">Términos y condiciones Privacidad</a>
        </div>
        <div class="social-media">
            <span class="notebook-icon"><i class="fa fa-facebook"></i> Facebook</span>
            <span class="notebook-icon"><i class="fa fa-twitter"></i> Twitter</span>
            <span class="notebook-icon"><i class="fa fa-youtube"></i> YouTube</span>
            <span class="notebook-icon"><i class="fa fa-github"></i> GitHub</span>
        </div>
    </div>
</footer>
    `;

    return html;
}
function indexView() {
    var html = `
    
<div class="Informacion">
    <div class="izquierda">
        <h1 class="titulo">Mira ScrumWave</h1>
        <p>Planifica, gestiona y organiza todo el trabajo en un solo lugar. Trabaja de la manera que prefieras.
        Con ScrumWave, los equipos cuentan con una plataforma de gestión del trabajo donde todos pueden planificar, gestionar y automatizar su trabajo.
        </p>
        
        <div class="grid">
            <div class="item">
                <span class="notebook-icon"><i class="fa fa-book"> </i></span>
                <p>Trabajar sin interrupciones, en cualquier momento o lugar.</p>
            </div>
            <div class="item">
                <span class="notebook-icon"><i class="fa fa-book"> </i></span>
                <p>Conectar a toda la organización y cumplir objetivos claros.</p>
            </div>
            <div class="item">
                <span class="notebook-icon"><i class="fa fa-book"> </i></span>
                <p>Eliminar las reuniones para reservar más tiempo.</p>
            </div>
            <div class="item">
                <span class="notebook-icon"><i class="fa fa-book"> </i></span>
                <p>Dedicar más tiempo al trabajo concreto.</p>
            </div>
        </div>
    </div>  
    <div class="derecha">
        <img src="/public/Imagenes/Planificacion_2.png">
    </div>
</div>
    `;

    return html;
}
function newView() {
    var html = `
    <h2>Regístrate</h2>
    <form id="registro-form">
        <div class="input-container">
            <i class="fas fa-user"></i>
            <input type="text" name="nombre" id="nombre" placeholder="Nombre" required>
        </div>
        <div class="input-container">
            <i class="fas fa-envelope"></i>
            <input type="email" name="correo" id="correo" placeholder="Correo Electrónico" required>
        </div>
        <div class="input-container">
            <i class="fas fa-user-tag"></i>
            <select name="rol" id="rol" required>
                <option value="Administrador">Administrador</option>
                <option value="Colaborador">Miembro</option>
            </select>
        </div>
        <div class="input-container">
            <i class="fas fa-credit-card"></i>
            <select name="tipoCuenta" id="tipoCuenta" required>
                <option value="0">Selecciona un tipo de cuenta</option>
                <option value="1">Cuenta Básica</option>
                <option value="2">Cuenta Premium</option>
            </select>
        </div>

        <div class="input-container">
            <i class="fas fa-lock"></i>
            <input type="password" name="contrasenia" id="contrasenia" placeholder="Contraseña" required>
        </div>
        <div id="mensaje-error" class="mensaje-error"></div> <!-- Aquí se muestra el mensaje de error -->
        <button class="boton-atractivo" id="crear-usuario-btn" type="button">Crear Usuario</button>
    </form>
    <br>
    
    `;
    return html;
}

function iniciarcontr() {
    var html = `
    <div class="ContenedorInicio">
    <h2>Iniciar Sesión</h2>
    <form action="guardar_usuario.php" method="POST">
        <div class="input-container">
            <i class="fas fa-envelope"></i>
            <input type="email" name="correo" id="correo" placeholder="Correo Electrónico" required>
        </div>
        <div class="input-container">
            <i class="fas fa-lock"></i>
            <input type="password" name="contrasenia" id="contrasenia" placeholder="Contraseña" required>
        </div>
        <div id="mensaje-error" class="mensaje-error"></div> <!-- Aquí se muestra el mensaje de error -->
        <button class="boton-atractivo" id="BTN_Iniciar">Iniciar</button>
    </form>
</div>


    `;
    return html;
}

function Mostrarprecios() {
    var html = `
    <div class="container" style="height: 80vh;">
    <div class="row">
        <div class="col-sm-4">
            <div class="feature">
                <i class="fa fa-certificate" ></i>
                <h3>Cuenta Gratuita</h3>
                <ul>
                    <li>Hasta 10 tableros</li>
                    <li>Power-Ups ilimitados</li>
                    <li>Automatizaciones limitadas</li>
                </ul>
                <p>Precio: Gratis </p>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="feature">
                <i class="fa fa-star"></i>
                <h3>Cuenta Estándar</h3>
                <ul>
                    <li>Tableros ilimitados</li>
                    <li>Checklists avanzadas</li>
                    <li>Más automatizaciones</li>
                    <li>Búsquedas guardadas</li>
                    <li>Campos personalizados</li>
                </ul>
                <p>Precio: Q. 500 </p>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="feature">
                <i class="fa fa-trophy"></i>
                <h3>Cuenta Premium</h3>
                <ul>
                    <li>Automatizaciones ilimitadas</li>
                    <li>Colecciones de tableros</li>
                    <li>Funcionalidades de administración y seguridad</li>
                    <li>Exportación de datos en CSV</li>
                    <li>Vista de Tabla</li>
                    <li>Vista de Cronograma</li>
                    <li>Vista de Panel</li>
                    <li>Asistencia prioritaria</li>

                </ul>
                <p>Precio: Q. 1000 </p>
            </div>
        </div>
    </div>
</div>

    
`;
    return html;
}
function funcionesMostrar() {
    var html = `
    <div id="function-container">
    <h1>Funciones de SCRUMWAVE</h1>

    <ul>
    <li>Creación y Gestión de Tareas: Permite crear, editar y eliminar tareas de forma sencilla, asignarlas a miembros del equipo y establecer fechas de vencimiento.</li>
    <li>Tableros Kanban: Organiza las tareas en tableros Kanban para una visualización clara del flujo de trabajo.</li>
    <li>Planificación de Sprints: Facilita la planificación de sprints y la asignación de tareas para cada iteración.</li>
    <li>Seguimiento de Progreso: Ofrece herramientas para seguir el progreso de las tareas y los hitos del proyecto.</li>
    <li>Gestión de Recursos: Permite asignar recursos, incluyendo miembros del equipo y equipos, a las tareas del proyecto.</li>
    <li>Colaboración en Tiempo Real: Facilita la colaboración entre miembros del equipo en tiempo real a través de comentarios y notificaciones.</li>
    <li>Generación de Informes: Crea informes personalizados para analizar el rendimiento del proyecto y el equipo.</li>
    <li>Integración con Herramientas Externas: Permite la integración con otras herramientas como repositorios de código, servicios de nube y más.</li>
    <li>Automatización de Tareas: Automatiza procesos repetitivos y flujos de trabajo para aumentar la eficiencia.</li>
    <li>Gestión de Cambios: Registra y gestiona los cambios en el proyecto para mantener un historial claro.</li>
    <li>Seguridad y Control de Acceso: Proporciona opciones de seguridad y control de acceso para proteger los datos del proyecto.</li>
    <li>Soporte Móvil: Ofrece una aplicación móvil para acceder y gestionar proyectos desde dispositivos móviles.</li>
    </ul>
</div>
    `;
    return html;
}
function solucionesMO() {
    var html = `
    <div id="function-container">
    <h2>Instrucciones para Trabajar en una Plataforma de Proyecto Ágil</h2>
    <ol>
        <li><strong>Conoce la Plataforma:</strong> Antes de comenzar, familiarízate con la plataforma que estás utilizando. Aprende sus características, funciones y herramientas para aprovechar al máximo sus capacidades.</li>
        <li><strong>Definir Roles y Responsabilidades:</strong> Establece claramente los roles y responsabilidades de los miembros del equipo. Esto incluye quién es el Scrum Master, el Product Owner y los miembros del equipo de desarrollo.</li>
        <li><strong>Creación de Backlog:</strong> Inicia creando un Product Backlog que contenga todas las funcionalidades, tareas y requisitos del proyecto. Clasifica las historias de usuario y funcionalidades por prioridad.</li>
        <li><strong>Planificación de Sprints:</strong> Define la duración de tus sprints y planifica las tareas que se abordarán en cada uno. Asegúrate de que las tareas sean alcanzables durante el período del sprint.</li>
        <li><strong>Reuniones Diarias:</strong> Realiza reuniones diarias (Daily Standup) para que el equipo comparta el progreso, los obstáculos y las tareas pendientes. Mantén estas reuniones cortas y enfocadas.</li>
        <li><strong>Seguimiento del Progreso:</strong> Utiliza las herramientas de seguimiento del progreso para tener una visión clara del trabajo completado y pendiente en cada sprint.</li>
        <li><strong>Colaboración:</strong> Fomenta la colaboración constante entre los miembros del equipo. Utiliza las funciones de comentarios y notificaciones de la plataforma para mantener a todos actualizados.</li>
        <li><strong>Integración con Herramientas Externas:</strong> Si es necesario, integra la plataforma con otras herramientas que estés utilizando, como repositorios de código, servicios de nube, etc.</li>
        <li><strong>Automatización de Tareas:</strong> Aprovecha las capacidades de automatización de la plataforma para reducir la carga de trabajo manual en tareas repetitivas.</li>
        <li><strong>Pruebas y Validación:</strong> Realiza pruebas continuas y validaciones para asegurarte de que el producto cumple con los requisitos del cliente. Registra y gestiona los cambios según sea necesario.</li>
        <li><strong>Generación de Informes:</strong> Utiliza la función de generación de informes para analizar el rendimiento del proyecto y del equipo. Estos informes pueden ayudar en la toma de decisiones.</li>
        <li><strong>Seguridad y Control de Acceso:</strong> Configura adecuadamente la seguridad y el control de acceso para proteger los datos del proyecto. Asegúrate de que los usuarios tengan acceso solo a la información relevante.</li>
        <li><strong>Soporte Móvil:</strong> Si la plataforma ofrece una aplicación móvil, asegúrate de que los miembros del equipo puedan acceder y gestionar proyectos desde dispositivos móviles.</li>
        <li><strong>Mantenimiento y Actualizaciones:</strong> Mantén la plataforma actualizada con las últimas versiones y realiza el mantenimiento regular para garantizar su funcionamiento óptimo.</li>
        <li><strong>Capacitación Continua:</strong> Proporciona capacitación continua a los miembros del equipo para garantizar que estén al tanto de las mejores prácticas y las actualizaciones de la plataforma.</li>
    </ol>
</div>

    `;
    return html;
}

function Condiciones() {
    var html = `
    <div id="function-container">
    <h1 style="color: white;">Términos y Condiciones de Uso de la Plataforma de Proyecto Ágil</h1>

    <p style="color: white;">Los siguientes términos y condiciones (en adelante, los "Términos") rigen el uso de la plataforma de gestión de proyectos ágiles "ScrumWave" (en adelante, la "Plataforma"). Al utilizar la Plataforma, aceptas y te comprometes a cumplir estos Términos. Si no estás de acuerdo con estos Términos, por favor, no utilices la Plataforma.</p>
    
    <h2 style="color: white;">1. Uso de la Plataforma</h2>
    
    <p style="color: white;">1.1. La Plataforma se proporciona con el propósito de ayudar a los equipos a planificar, gestionar y automatizar proyectos de manera eficiente. Debes utilizar la Plataforma de acuerdo con su propósito y de conformidad con estos Términos.</p>
    
    <p style="color: white;">1.2. Al utilizar la Plataforma, te comprometes a proporcionar información precisa y actualizada, y a mantener la confidencialidad de tus credenciales de inicio de sesión.</p>
    
    <h2 style="color: white;">2. Responsabilidades del Usuario</h2>
    
    <p style="color: white;">2.1. Eres responsable de cualquier contenido que cargues o compartas a través de la Plataforma, incluyendo textos, imágenes, archivos y otros datos. Asegúrate de que tu contenido cumple con las leyes aplicables y no infringe los derechos de terceros.</p>
    
    <p style="color: white;">2.2. No debes utilizar la Plataforma para actividades ilegales, difamatorias, ofensivas o inapropiadas. Nos reservamos el derecho de suspender o cerrar tu cuenta si violas estos términos.</p>
    
    <h2 style="color: white;">3. Privacidad</h2>
    
    <p style="color: white;">3.1. Tu privacidad es importante para nosotros. Consulta nuestra Política de Privacidad para obtener más información sobre cómo recopilamos, utilizamos y protegemos tus datos personales.</p>
    
    <h2 style="color: white;">4. Cambios en los Términos</h2>
    
    <p style="color: white;">4.1. Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios entrarán en vigor tan pronto como se publiquen en la Plataforma. Te recomendamos revisar periódicamente estos Términos para estar al tanto de las actualizaciones.</p>
    
    <h2 style="color: white;">5. Contacto</h2>
    
    <p style="color: white;">5.1. Si tienes alguna pregunta o comentario sobre estos Términos y Condiciones, por favor, contáctanos a través de nuestros canales de soporte.</p>
    
    <p style="color: white;">Gracias por utilizar la Plataforma de Proyecto Ágil "ScrumWave". Esperamos que tengas una experiencia productiva y exitosa.</p>
    
    </div>
    `;
    return html;
}



//function funciones() {
  //  var html = `
    
  //  `;
  //  return html;
//}

//function funciones() {
  //  var html = `
    
  //  `;
  //  return html;
//}


// Vistas del pagina de interaccion
export{encabezado_admin,encabezado_user,Menu,Configuracion,actualizarConfiguracion,Tareas,adminProyectos,Proyectos}
function encabezado_admin() {
    var html = `
    <header class="beautiful-header">
    <div class="logo" id="logo">ScrumWave</div>
    <nav>
        <ul>
            <li id="inicio">Inicio</li>
            <li id="proyectos">Proyectos</li>
            <li id="tareas">Tareas</li>
            <li id="equipos">Equipos</li>
            <li id="registro">Registro</li>
            <li id="Grafico">Notificaciones</li>
            <li id="perfil">Perfil</li>
        </ul>
    </nav>
</header>

    `;

    return html;
}

function encabezado_user() {
    var html = `
    <header class="beautiful-header">
    <div class="logo">ScrumWave</div>
    <nav>
    <ul>
        <li id="inicio">Inicio</li>
        <li id="mis-tareas">Mis Tareas</li>
        <li id="proyectos-asignados">Proyectos Asignados</li>
        <li id="perfil">Perfil</li>
    </ul>
</nav>

</header>
    `;

    return html;
}

function Menu(nombreUsuario) {
    let nombre = nombreUsuario; // Si nombreUsuario es un objeto como {"nombre":"Herber"}, obtén el valor de "nombre"
    if (typeof nombreUsuario === 'object' && nombreUsuario.nombre) {
        nombre = nombreUsuario.nombre; // Si es un objeto con la propiedad "nombre", obtenla
    }

    console.log("Nombre de usuario que se envía:", nombre);
    var html = `
    <div class="Tablero">
    <div class="mensaje-bienvenida">
        <h1 class="titulo-bienvenida">Bienvenido a ScrumWave</h1>
        <p class="descripcion-bienvenida">Tu plataforma de Gestión  de Proyecto Ágil.</p>
        <span class="numero-especial" id="Nombre">${nombre}</span>
    </div>
</div>
    `;
    return html;
}

function Configuracion() {
    var html = `
    <div class="Tablero">
    <div class="Contenido-ajuste">
        <div class="titulo">
            <h1><i class="fa fa-cogs icono"></i> Ajustes de ScrumWave</h1>
        </div>
        <div class="encabezados">
            <div class="item">
                <i class="fa fa-id-card-o"></i>
                <span class="Enca">Identificacion: </span>
                <span>1 </span>
            </div>
            <div class="item">
                <i class="fa fa-user"></i>
                <span class="Enca">Nombre</span>
                <span>1 </span>
            </div>
            <div class="item">
                <i class="fa fa-envelope"></i>
                <span class="Enca">Correo Electrónico: </span>
                <span>1 </span>
            </div>
            <div class="item">
                <i class="fa fa-briefcase"></i>
                <span class="Enca">Rol</span>
                <span>1 2111111111111111111111111111111455555555555555555</span>
            </div>
            <div class="item">
                <i class="fa fa-calendar"></i>
                <span class="Enca">Fecha de Registro</span>
                <span>1 </span>
            </div>
            <div class="item">
                <i class="fa fa-lock"></i>
                <span class="Enca">Contraseña</span>
                <span>1 </span>
            </div>
            <div class="item">
                <i class="fa fa-check-circle"></i>
                <span class="Enca">Tipo de Cuenta</span>
                <span>1 </span>
            </div>
        </div>
        <div class="botones">
            <button id="boton-actualizar" class="boton"><i class="fa fa-pencil"></i> Actualizar</button>
            <button id="boton-cancelar" class="boton"><i class="fa fa-times"></i> Cancelar</button>        
        </div>
    </div>
</div>


    `;
    return html;
}
function actualizarConfiguracion(){
    var html = `
    <div class="Tablero">
    <div class="Contenido-ajuste">
        <div class="titulo">
            <h1><i class="fa fa-cogs icono"></i> Ajustes de ScrumWave</h1>
        </div>
        <div class="encabezados">
            <div class="item">
                <i class="fa fa-user"></i>
                <span class="Enca">Nombre: </span>
                <input type="text" id="nombre" placeholder="Ingrese su nombre" />
            </div>
            <div class="item">
                <i class="fa fa-envelope"></i>
                <span class="Enca">Correo Electrónico: </span>
                <input type="email" id="correo" placeholder="Ingrese su correo electrónico" />
            </div>
            <div class="item">
                <i class="fa fa-briefcase"></i>
                <span class="Enca">Rol: </span>
                <div class="input-container">
                <i class="fas fa-user-tag"></i>
                <select name="rol" id="rol" required>
                <option value="Administrador">Administrador</option>
                <option value="Colaborador">Miembro</option>
                </div>
    </select>
</div>

            </div>
            <div class="item">
                <i class="fa fa-lock"></i>
                <span class="Enca">Contraseña: </span>
                <input type="password" id="contrasena" placeholder="Ingrese su contraseña" />
            </div>
            <div class="item">
                <i class="fa fa-check-circle"></i>
                <span class="Enca">Tipo de Cuenta: </span>
                <div class="input-container">
                <i class="fas fa-user-tag"></i>
                <select name="tipoCuenta" id="tipoCuenta" required>
                <option value="0">Selecciona un tipo de cuenta</option>
                <option value="1">Cuenta Básica</option>
                <option value="2">Cuenta Premium</option>
                </select>
</div>

            </div>
        </div>
        <div class="botones">
            <button id="boton-guardar" class="boton"><i class="fa fa-floppy-o"></i> Guardar</button>
            <button id="boton-cancelar" class="boton"><i class="fa fa-times"></i> Cancelar</button>        
        </div>
    </div>
</div>

    `;
    return html;
}

function Tareas() {
    var html = `
    <div class="Tablero">
    <div class="tarea">
        <div class="tarea-info">
            <h3>Nombre de la Tarea</h3>
            <br>
            <p>Descripción de la tarea 1</p>
            <br>
            <p>Fecha de Creación: 2023-01-15</p>
            <br>
            <p>Proyecto Perteneciente: Proyecto 1</p>
        </div>
        <br>
        <div class="estado-select">
            <select name="estado" id="estado-tarea">
                <option value="Pendiente">Pendiente</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completada">Completada</option>
            </select>
        </div>
    </div>
    </div>
    `;
    return html;
}

function adminProyectos() {
    var html = `
    <div class="Tablero">
    <div class="tarea">
    <h3>Proyecto 1</h3>
    <p>Descripción del proyecto 1</p>
    <p>Fecha de Creación: 2023-01-15</p>
    <p>Usuario Propietario: Usuario 1</p>
    <select name="estado" id="estado-proyecto">
        <option value="Pendiente">Pendiente</option>
        <option value="En Progreso">En Progreso</option>
        <option value="Completada">Completada</option>
    </select>
</div>
</div>


    `;
    return html;
}

function Proyectos() {
    var html = `
    <div class="Tablero">
    <div class="tarea">
    <h3>Proyecto 1</h3>
    <p>Descripción del proyecto 1</p>
    <p>Fecha de Creación: 2023-01-15</p>
    <p>Usuario Propietario: Usuario 1</p>
</div>
</div>


    `;
    return html;
}


function Notificacion() {
    var html = `
    <div class="Tablero">
    <div class="tarea">
    <h3>Proyecto 1</h3>
    <p>Descripción del proyecto 1</p>
    <p>Fecha de Creación: 2023-01-15</p>
    <p>Usuario Propietario: Usuario 1</p>
</div>
</div>


    `;
    return html;
}