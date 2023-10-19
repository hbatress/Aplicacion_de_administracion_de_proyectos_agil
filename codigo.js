
// VISTA
function indexView() {
    var html = `
    <header>
    <h1 class="logo" onclick="location.reload();">ScrumWave</h1>
    <nav class="menu">
    <a href="#">Funciones</a>
    <a href="#">Soluciones</a>
    <a href="#">Planes</a>
    <a href="#">Precio</a>
    <a href="#">Recursos</a>
    <a href="#" class="Crear" id="crearCuenta">Crear Cuenta</a>
    <a href="#" class="Inicio">Iniciar Sesión</a>
    
    </nav>
</header>
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
        <img src="../Imagenes/planificacion.png">
    </div>
</div>

<footer>
    <p class="pie">© 2023 ScrumWave. Todos los derechos reservados.</p>
</footer>



    `;

    return html ;
}



// CONTROLADORES
function indexContr() {
    document.getElementById("main").innerHTML = indexView();
}

// EVENTOS
document.addEventListener('DOMContentLoaded', indexContr);
