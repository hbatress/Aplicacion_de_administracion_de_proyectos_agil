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

//Funciones
function Crear() {
  // Obtén todos los campos de entrada y selección
  const nombreInput = document.getElementById('nombre');
  const correoInput = document.getElementById('correo');
  const rolSelect = document.getElementById('rol');
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

// Obtén el elemento del mensaje de error
const mensajeError = document.getElementById("mensaje-error");


// Verifica si todos los campos están llenos
if (
  Nombre.trim() === '' ||
  Correo_Electronico.trim() === '' ||
  Rol.trim() === '' ||
  Tipo_de_Cuenta.trim() === '' ||
  Tipo_de_Pago.trim() === '' ||
  Contrasenia.trim() === ''
) {
  mensajeError.innerHTML = 'Por favor, completa todos los campos.';
} else {
  mensajeError.innerHTML = ''; // Limpia el mensaje de error si todos los campos están llenos

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

  LeerUser()
    .then((data) => {
      let datosCoinciden = false; // Declaración y definición de la variable
      // Aquí puedes trabajar con los datos obtenidos
      console.log('Datos obtenidos:', data);

      // Por ejemplo, si la respuesta es un array de objetos de usuarios:
      data.forEach((usuario) => {
        console.log('Nombre:', usuario.Contrasenia);
        console.log('Correo Electrónico:', usuario.Correo_Electronico);

        if (usuario.Correo_Electronico === Correo_Electronico) {
          console.log('Correo Electrónico:', usuario.Correo_Electronico);
          console.log('Correo Electrónico ya está registrado.');
          datosCoinciden = true;
        }
      });

      if (datosCoinciden) {
        mensajeError.innerHTML = 'El correo ya está registrado.';
      } else {
        console.log("Datos que se envían al servidor:", userData);
        AgregarUser(userData);
        window.location.href = '/Pagina/Pagina.html';
      }
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error);
    });
}
}

function iniciar() {
  // Obtén todos los campos de entrada y selección
  const correoInput = document.getElementById('correo');
  const contraseniaInput = document.getElementById('contrasenia');

// Obtén los valores de cada campo
const Correo_Electronico = correoInput.value;
const Contrasenia = contraseniaInput.value;

// Obtén el elemento del mensaje de error
const mensajeError = document.getElementById("mensaje-error");

// Verifica si los campos están llenos
if (Correo_Electronico.trim() === '' || Contrasenia.trim() === '') {
  mensajeError.innerHTML = 'Por favor, completa todos los campos.';
} else {
  mensajeError.innerHTML = ''; // Limpia el mensaje de error si los campos están llenos

  LeerUser()
    .then((data) => {
      let correoEncontrado = false;
      let contraseniaCorrecta = false;

      data.forEach((usuario) => {
        if (usuario.Correo_Electronico === Correo_Electronico) {
          correoEncontrado = true;

          if (usuario.Contrasenia === Contrasenia) {
            contraseniaCorrecta = true;
          }
        }
      });

      if (correoEncontrado) {
        if (contraseniaCorrecta) {
          // Redirigir a otra página si los datos coinciden
          window.location.href = '/Pagina/Pagina.html'; // Reemplaza con la URL de la página a la que deseas redirigir
        } else {
          mensajeError.innerHTML = 'Contraseña incorrecta. Inténtalo de nuevo.';
        }
      } else {
        mensajeError.innerHTML = 'El correo no existe en la base de datos. Regístrate o verifica tus datos.';
      }
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error);
    });
}



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
    } else if (ev.target.matches('#Planes')) {
        currentState = 'planes';
        mostrarPlanes();
    } else if (ev.target.matches('#Principal')) {
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




