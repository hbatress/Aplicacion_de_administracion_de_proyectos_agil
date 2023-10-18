document.addEventListener('DOMContentLoaded', function () {
    const main = document.getElementById("main");


//VISTAS
function indexView() {
const html=`
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
    
    `;
    
    return html ;
}


    // CONTROLADOR
    function indexContr() {
        main.innerHTML = indexView();
    }

    // EVENTO para cargar el MVC
    document.getElementById("crearCuenta").addEventListener("click", function (e) {
        e.preventDefault(); // Evita que el enlace se comporte como un enlace normal
        indexContr();
    });

    // Llamada inicial al controlador (opcional)
    // indexContr(); // Puedes descomentar esto si deseas cargar el MVC al cargar la página inicialmente
});

/*
function indexContr() {
    const main = document.getElementById("main");
    main.innerHTML = indexView();
}

document.addEventListener('DOMContentLoaded', indexContr);
*/