import { encabezado, pie, indexView, newView, iniciarcontr } from './Vistas.js';
import { AgregarUser, LeerUser } from './Intermediario.js';

// CONTROLADORES
function indexContr() {
    document.getElementById("main").innerHTML = indexView();
    document.getElementById("Encabezado").innerHTML = encabezado();
    document.getElementById("main").innerHTML = localStorage.getItem('currentView') || indexView();
    document.getElementById("pie").innerHTML = pie();

}

function createContr() {
    document.getElementById("main").innerHTML = newView();
    document.getElementById("crearCuenta").style.display = "none";
    document.getElementById("IniciarSesion").style.display = "inline";
    localStorage.setItem('currentView', document.getElementById("main").innerHTML);
}

function inicarContr() {
    document.getElementById("main").innerHTML = iniciarcontr();
    document.getElementById("crearCuenta").style.display = "inline";
    document.getElementById("IniciarSesion").style.display = "none";
    localStorage.setItem('currentView', document.getElementById("main").innerHTML);
}

function Plataforma() {
    //document.getElementById("Encabezado").innerHTML = encabezado();
    document.getElementById("main").innerHTML = iniciarcontr();
    //document.getElementById("pie").innerHTML = pie();
}
function Crear() {
    // Obtén todos los campos de entrada y selección
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const rolSelect = document.getElementById('rol');
    //const fechaInput = document.getElementById('fecha');
    const tipoCuentaSelect = document.getElementById('tipoCuenta');
    const tipoPagoSelect = document.getElementById('tipoPago');
    const contraseniaInput = document.getElementById('contrasenia');
    // Obtener la fecha actual de la computadora
    const fechaActual = new Date();
    // Formatear la fecha en el formato deseado, por ejemplo, "YYYY-MM-DD"
    const fechaFormateada = fechaActual.toISOString().split('T')[0];

    // Obtén los valores de cada campo
    const Nombre = nombreInput.value;
    const Correo_Electronico = correoInput.value;
    const Rol = rolSelect.value;
    const Fecha_de_Registro = fechaFormateada;
    const Tipo_de_Cuenta = tipoCuentaSelect.value;
    const Tipo_de_Pago = tipoPagoSelect.value;
    const Contrasenia = contraseniaInput.value;

    // Crea un objeto con todos los datos
    const userData = {
        Nombre,
        Correo_Electronico,
        Rol,
        Fecha_de_Registro,
        Tipo_de_Cuenta,
        Tipo_de_Pago,
        Contrasenia
    };
    console.log("Datos que se envían al servidor:", userData);
    AgregarUser(userData)
}

function iniciar() {
    // Obtén todos los campos de entrada y selección
    const correoInput = document.getElementById('correo');
    const contraseniaInput = document.getElementById('contrasenia');

    // Obtén los valores de cada campo
    const Correo_Electronico = correoInput.value;
    const Contrasenia = contraseniaInput.value;
    console.log("Datos que se envían al servidor:", Correo_Electronico);
    console.log("Datos que se envían al servidor:", Contrasenia);

LeerUser()
  .then((data) => {
    let datosCoinciden = false; // Declaración y definición de la variable
    // Aquí puedes trabajar con los datos obtenidos
    console.log('Datos obtenidos:', data);

    // Por ejemplo, si la respuesta es un array de objetos de usuarios:
    data.forEach((usuario) => {
      console.log('ID:', usuario.ID);
      console.log('Nombre:', usuario.Contrasenia);
      console.log('Correo Electrónico:', usuario.Correo_Electronico);

      if (usuario.Contrasenia === Contrasenia && usuario.Correo_Electronico === Correo_Electronico) {
        console.log('Los datos ingresados pertenecen a la misma persona.');
        datosCoinciden = true;
      }
    });

    if (datosCoinciden) {
      // Redirigir a otra página si los datos coinciden
      window.location.href = '/Pagina.html'; // Reemplaza con la URL de la página a la que deseas redirigir
    } else {
      // Mostrar una advertencia si los datos no coinciden
      alert('Los datos ingresados no son correctos. Inténtalo de nuevo.');
    }
  })
  .catch((error) => {
    console.error('Error en la solicitud:', error);
  });


}
// Variable para llevar un registro del estado actual
let currentState = 'index'; // Puedes establecer el estado inicial aquí

// EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    // Ejecuta la función correspondiente al estado actual
    if (currentState === 'index') {
        indexContr();
    } else if (currentState === 'create') {
        createContr();
    } else if (currentState === 'iniciar') {
        inicarContr();
    }
});

document.addEventListener('click', ev => {
    if (ev.target.matches('#crearCuenta')) {
        currentState = 'create';
        createContr();
    } else if (ev.target.matches('#IniciarSesion')) {
        currentState = 'iniciar';
        inicarContr();
    } else if (ev.target.matches('#Plataforma')) {
        currentState = 'plataforma';
        Plataforma();
    }
    else if (ev.target.matches('#Principal')) {
        localStorage.removeItem('currentView');
        currentState = 'index';
        indexContr();
    } else if (ev.target.id === 'crear-usuario-btn') {
        ev.preventDefault();
        Crear();
    } if (ev.target.id === 'BTN_Iniciar') {
        ev.preventDefault();
        iniciar();
    }
});


