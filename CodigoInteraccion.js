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
            <li><a href="#">Mi Perfil</a></li>
        </ul>
    </nav>
    <div class="search-bar">
        <input type="text" placeholder="Buscar...">
        <button>Buscar</button>
    </div>
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
            <li><a href="#">Mi Perfil</a></li>
        </ul>
    </nav>
    <div class="search-bar">
        <input type="text" placeholder="Buscar...">
        <button>Buscar</button>
    </div>
</header>
    
    `;

    return html;
}
function encabezado_observador() {
    var html = `
    <header class="beautiful-header">
    <div class="logo">ScrumWave</div>
    <nav>
        <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Proyectos</a></li>
            <li><a href="#">Ver Proyectos</a></li>
            <li><a href="#">Mi Perfil</a></li>
        </ul>
    </nav>
    <div class="search-bar">
        <input type="text" placeholder="Buscar...">
        <button>Buscar</button>
    </div>
</header>
    `;

    return html;
}

function Menu() {
    var html = `
    <div class="Menu">
    <div class="user-info">
        <div class="icon">Icono de Usuario</div>
        <div class="user-details">
            <p>Nombre del Usuario</p>
            <p>Tipo de Usuario</p>
        </div>
    </div>
    <div class="menu-item">
        <div class="icon">Icono de Tablero</div>
        <p>Tablero</p>
    </div>
    <div class="menu-item">
        <div class="icon">Icono de Miembro</div>
        <p>Miembro</p>
    </div>
    <div class="menu-item">
        <p>Lista de Tableros</p>
    </div>
    <!-- Otros elementos similares para las otras secciones -->
</div>

    `;

    return html;
}


//CONTROLADORES

function inicarContr() {
  document.getElementById("Listado").innerHTML = Menu();

}


//EVENTOS
//document.addEventListener('DOMContentLoaded', () => {
  //inicarContr();
//});

function mostrarEncabezado(tipoUsuario) {
    var encabezadoHTML = '';
    //var menuHTML = '';

    if (tipoUsuario === 'admin') {
        encabezadoHTML = encabezado_admin();
      //  menuHTML = Menu();
      inicarContr();
    } else if (tipoUsuario === 'user') {
        encabezadoHTML = encabezado_user();
    } else if (tipoUsuario === 'observador') {
        encabezadoHTML = encabezado_observador();
    } else {
        // Si el tipo de usuario no es válido, puedes manejarlo de acuerdo a tus necesidades.
        encabezadoHTML = 'Tipo de usuario no válido';
    }

    document.getElementById("Superior").innerHTML = encabezadoHTML;
    //document.getElementById("Listado").innerHTML = menuHTML;

}

// Ejemplo de uso:
document.addEventListener('DOMContentLoaded', () => {
    // Supongamos que el tipo de usuario se obtiene de algún lugar, como una variable o una función.
    var tipoUsuario = 'admin'; // Cambia esto según el tipo de usuario actual.
    mostrarEncabezado(tipoUsuario);
    inicarContr();
});
