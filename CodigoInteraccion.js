// VISTA
function encabezado_admin() {
    var html = `
    <header class="beautiful-header">
    <div class="logo">ScrumWave</div>
    <nav>
        <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Proyectos</a></li>
            <li><a href="#">Tareas</a></li>
            <li><a href="#">Equipos</a></li>
            <li><a href="#">Registro</a></li>
            <li><a href="#">Notificaciones</a></li>
            <li><a href="#">Perfil</a></li>
        
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
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Mis Tareas</a></li>
            <li><a href="#">Proyectos Asignados</a></li>
            <li class="profile-menu">
            <li><a href="#">Notificaciones</a></li>
            <li><a href="#">Perfil</a></li>
        </li>
        </ul>
    </nav>
</header>
    `;

    return html;
}

function Menu() {
    var html = `
    <div class="container">
    <div class="first-div">Div 1 (80%)</div>
    <div class="second-div">Div 2 (20%)</div>
</div>

    `;
    return html;
}


//CONTROLADORES

function inicarContr() {
    document.getElementById("Listado").innerHTML = Menu();
}

function mostrarEncabezado(tipoUsuario) {
    var encabezadoHTML = '';
    //var menuHTML = '';

    if (tipoUsuario === 'admin') {
        encabezadoHTML = encabezado_admin();
        //  menuHTML = Menu();
        inicarContr();
    } else if (tipoUsuario === 'user') {
        encabezadoHTML = encabezado_user();
    } else {
        // Si el tipo de usuario no es válido, puedes manejarlo de acuerdo a tus necesidades.
        encabezadoHTML = 'Tipo de usuario no válido';
    }

    document.getElementById("Superior").innerHTML = encabezadoHTML;
}

// Ejemplo de uso:
document.addEventListener('DOMContentLoaded', () => {
    var tipoUsuario = 'user';
    mostrarEncabezado(tipoUsuario);
    inicarContr();
});
document.addEventListener('click', ev => {
    if (ev.target.matches('#crearCuenta')) {
        currentState = 'create';
        createContr();
    } else if (ev.target.matches('#IniciarSesion')) {
        currentState = 'iniciar';
        inicarContr();
    }
});