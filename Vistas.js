export { encabezado, pie, indexView, newView, iniciarcontr };
// VISTA
function encabezado() {
    var html = `
    <header>
    <h1 class="logo" id="Principal">ScrumWave</h1>
    <nav class="menu">
        <a href="#" class="menu-item" id="funciones">Funciones</a>
        <a href="#" class="menu-item" id="soluciones">Soluciones</a>
        <a href="#" class="menu-item" id="planes">Planes</a>
        <a href="#" class="menu-item" id="precio">Precio</a>
        <a href="#" class="menu-item" id="recursos">Recursos</a>
        <button class="Crear" id="crearCuenta" title="Crear una cuenta">Crear Cuenta</button>
        <button class="Inicio" id="IniciarSesion" title="Iniciar Sesión">Iniciar Sesión</button>
    </nav>
</header>
<div class="info-popup" id="infoPopup">s</div>


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
                <option value="Miembro">Miembro</option>
                <option value="Observador">Observador</option>
            </select>
        </div>
        <div class="input-container">
            <i class="fas fa-credit-card"></i>
            <select name="tipoCuenta" id="tipoCuenta" required>
                <option value="0">Selecciona un tipo de cuenta</option>
                <option value="1">Cuenta Básica</option>
                <option value="2">Cuenta Premium</option>
                <option value="3">Cuenta Empresarial</option>
            </select>
        </div>
        <div class="payment-container" id="forma-pago-container" >
        <select name="tipoPago" id="tipoPago" required>
            <option value="0">Selecciona una forma de pago</option>
            <option value="1">Tarjetas de Crédito</option>
            <option value="2">Tarjetas de Débito</option>
            <option value="3">PayPal</option>
            <option value="4">Skrill</option>
            <option value="5">Western Union</option>
        </select>
    </div>
    
<br>
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

