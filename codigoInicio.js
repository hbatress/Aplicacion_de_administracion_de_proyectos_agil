import { encabezado, pie, indexView, newView, iniciarcontr,Mostrarprecios,funcionesMostrar,solucionesMO,Condiciones} from './Vistas.js';
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

  // Expresión regular para validar un correo electrónico
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Verifica si todos los campos están llenos
  if (
    Nombre.trim() === '' ||
    Rol.trim() === '' ||
    Tipo_de_Cuenta.trim() === '' ||
    Tipo_de_Pago.trim() === '' ||
    Contrasenia.trim() === ''
  ) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacíos',
      text: 'Por favor, completa todos los campos.',
    });
  } else if (!emailRegex.test(Correo_Electronico)) {
    Swal.fire({
      icon: 'error',
      title: 'Correo no válido',
      text: 'Por favor, ingresa un correo electrónico válido.',
    });
  } else {
    LeerUser()
      .then((data) => {
        let correoExistente = false;

        data.forEach((usuario) => {
          if (usuario.Correo_Electronico === Correo_Electronico) {
            correoExistente = true;
          }
        });

        if (correoExistente) {
          Swal.fire({
            icon: 'error',
            title: 'Correo ya registrado',
            text: 'El correo ya está registrado en la base de datos.',
          });
        } else {
          // Crea un objeto con todos los datos
          const userData = {
            Nombre,
            Correo_Electronico,
            Rol,
            Fecha_de_Registro,
            Tipo_de_Cuenta,
            Tipo_de_Pago,
            Contrasenia,
          };

          AgregarUser(userData);

          Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            text: 'El usuario se ha creado correctamente.',
          }).then(() => {
            window.location.href = '/Pagina/Pagina.html';
          });
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error en la solicitud.',
        });
      });
  }
}


function iniciar() {
  // Obtén todos los campos de entrada y selección
  const correoInput = document.getElementById('correo');
  const contraseniaInput = document.getElementById('contrasenia');

  // Obtén los valores de cada campo
  const Correo_Electronico = correoInput.value;
  const contrasenia = contraseniaInput.value;

  // Verifica si los campos están llenos y si el correo es válido
  if (Correo_Electronico.trim() === '' || contrasenia.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacíos',
      text: 'Por favor, completa todos los campos.',
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
        let contraseniaCorrecta = false;

        data.forEach((usuario) => {
          if (usuario.Correo_Electronico === Correo_Electronico) {
            correoEncontrado = true;

            if (usuario.contrasenia === contrasenia) {
              contraseniaCorrecta = true;
            }
          }
        });

        if (correoEncontrado) {
          if (contraseniaCorrecta) {
            // Redirigir a otra página si los datos coinciden
            window.location.href = '/Pagina/Pagina.html'; // Reemplaza con la URL de la página a la que deseas redirigir
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Contraseña incorrecta',
              text: 'Inténtalo de nuevo.',
            });
          }
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

function MostrarP() {
  document.getElementById("main").innerHTML = Mostrarprecios();
  document.getElementById("Encabezado").innerHTML = encabezado();
  localStorage.setItem('currentView', document.getElementById("main").innerHTML);
  document.getElementById("pie").innerHTML = pie();
}

function MostrarFunciones() {
  document.getElementById("main").innerHTML = funcionesMostrar();
  document.getElementById("Encabezado").innerHTML = encabezado();
  localStorage.setItem('currentView', document.getElementById("main").innerHTML);
  document.getElementById("pie").innerHTML = pie();
}

function MostrarSoluciones() {
  document.getElementById("main").innerHTML = solucionesMO();
  document.getElementById("Encabezado").innerHTML = encabezado();
  document.getElementById("pie").innerHTML = pie();
  localStorage.setItem('currentView', document.getElementById("main").innerHTML);

}

function condicionesF() {
  document.getElementById("main").innerHTML = Condiciones();
  document.getElementById("Encabezado").innerHTML = encabezado();
  document.getElementById("pie").innerHTML = pie();
  localStorage.setItem('currentView', document.getElementById("main").innerHTML);

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
  }else if (ev.target.matches('#Principal')) {
    localStorage.removeItem('currentView');
    currentState = 'index';
    indexContr();
  } else if (ev.target.id === 'crear-usuario-btn') {
    ev.preventDefault();
    Crear();
  } else if (ev.target.id === 'BTN_Iniciar') {
    ev.preventDefault();
    iniciar();
  } else if (ev.target.matches('#planes')) {
    currentState = 'mostrarPrecios';
    MostrarP();
  }
  else if (ev.target.matches('#funciones')) {
    currentState = 'funcionesMostrar';
    MostrarFunciones();
  }
  else if (ev.target.matches('#soluciones')) {
    currentState = 'solucionesMO';
    MostrarSoluciones();
  }
  else if (ev.target.matches('#terminosCondicionesLink')) {
    currentState = 'Condiciiones';
    condicionesF();
  }
});



