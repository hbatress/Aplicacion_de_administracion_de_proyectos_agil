//funcion para guardar los cambios al recargar
const scrollPosition = window.scrollY;

window.addEventListener("load", () => {
    window.scrollTo(0, scrollPosition);
  });


// VISTA
function encabezado() {
    var html = `
    <header>
    <h1 class="logo" onclick="location.reload();">ScrumWave</h1>
    <nav class="menu">
    <button class="button">Funciones</button>
    <button class="button">Soluciones</button>
    <button class="button">Planes</button>
    <button class="button">Precio</button>
    <button class="button">Recursos</button>
    <button class="Crear" id="crearCuenta">Crear Cuenta</button>
    <button class="Inicio" id="IniciarSesion">Iniciar Sesión</button>
    
    </nav>
</header>
    `;

    return html ;
}
function pie() {
    var html = `
    <footer>
    <div class="footer-content">
        <div class="copyright">
            ©2023|Todos los Derechos Reservados
        </div>
        <div class="footer-links">
            <a href="terminos-y-condiciones">Términos y condiciones</a>
            <a href="privacidad">Privacidad</a>
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

    return html ;
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
        <img src="../Imagenes/planificacion.png">
    </div>
</div>
    `;

    return html ;
}
function newView() {
    return `
    <h2>Registrate</h2>
    <form action="guardar_usuario.php" method="POST">
        <div class="input-container">
            <i class="fas fa-id-card"></i>
            <input type="text" name="id" id="id" placeholder="ID" required>
        </div>
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
                <option value="">Selecciona un rol</option>
                <option value="Administrador">Administrador</option>
                <option value="Usuario">Miembro </option>
                <option value="Observador ">Observador </option>
            </select>
        </div>
        <div class="input-container">
            <i class="fas fa-calendar-alt"></i>
            <input type="date" name="fecha" id="fecha" placeholder="Fecha de Registro" required>
        </div>
        <div class="input-container">
            <i class="fas fa-credit-card"></i>
            <select name="tipoCuenta" id="tipoCuenta" required>
                <option value="">Selecciona un tipo de cuenta</option>
                <option value="Cuenta básica">Cuenta Básica</option>
                <option value="Cuenta premium">Cuenta Premium</option>
                <option value="Cuenta empresarial">Cuenta Empresarial</option>
            </select>
        </div>
        <div class="payment-container">
            <select name="tipoPago" id="tipoPago" required>
                <option value="">Selecciona una forma de pago</option>
                <option value="pago1" style="background-image: url('../ImagenPago/tarjetasCredito.jpg');"><img src="../ImagenPago/tarjetasCredito.jpg"> Tarjetas de Crédito</option>
                <option value="pago2" style="background-image: url('../ImagenPago/tarjetasDebito.jpg');">Tarjetas de Débito</option>
                <option value="pago3" style="background-image: url('../ImagenPago/paypal.jpg');">PayPal</option>
                <option value="pago4" style="background-image: url('../ImagenPago/skrill.jpg');">Skrill</option>
                <option value="pago5" style="background-image: url('../ImagenPago/westernUnion.jpg');">Western Union</option>
            </select>
        </div>
        <br>
        <div class="input-container">
            <i class="fas fa-lock"></i>
            <input type="password" name="contrasenia" id="contrasenia" placeholder="Contraseña" required>
        </div>
        <button class="boton-atractivo">Crear Usuario</button>
    </form>
    <br>
    `;
}

function iniciarcontr(){
    return `
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
        <button class="boton-atractivo">Iniciar</button>
    </form>
    </div>
    `;
}

// CONTROLADORES
function indexContr() {
    document.getElementById("Encabezado").innerHTML = encabezado();
    document.getElementById("main").innerHTML = indexView();
    document.getElementById("pie").innerHTML = pie();
}
function createContr() { 
    document.getElementById("main").innerHTML = newView();
    document.getElementById("crearCuenta").style.display = "none"; 
    document.getElementById("IniciarSesion").style.display = "inline";
};  
function inicarContr(){
    document.getElementById("Encabezado").innerHTML = encabezado();
    document.getElementById("main").innerHTML = iniciarcontr();
    document.getElementById("pie").innerHTML = pie();
    document.getElementById("crearCuenta").style.display = "inline";
    document.getElementById("IniciarSesion").style.display = "none"; 
}
function Plataforma(){
    //document.getElementById("Encabezado").innerHTML = encabezado();
    document.getElementById("main").innerHTML = iniciarcontr();
    //document.getElementById("pie").innerHTML = pie();
}
// EVENTOS
document.addEventListener('DOMContentLoaded', indexContr);
document.addEventListener('click', ev => {
    if      (ev.target.matches('#crearCuenta'))createContr();
    else if (ev.target.matches('#IniciarSesion')) inicarContr();
    else if(ev.target.matches('#IniciarSesion')) Plataforma();
})
