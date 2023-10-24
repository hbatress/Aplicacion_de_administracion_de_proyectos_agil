/* Funcion para agregar Usuario*/
export function AgregarUser(data) {
    return fetch('http://localhost:3000/AddUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch((error) => {
            console.error(error);
        });
}
/* Funcion para Buscar el usuario*/
export function LeerUser() {
    return fetch('http://localhost:3000/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json());

}

/*Funcino para buscar un Usuario espesifico */
export function buscarUsuario(usuarioId) {
    fetch(`http://localhost:3000/usuario/${usuarioId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          console.log('Nombre del usuario:', data.nombre);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /* Funcino para actualizar un dato del usuario*/
  export function actualizarUsuario(usuarioId, datosActualizados) {
    fetch(`http://localhost:3000/UPdatauser/${usuarioId}`, {
      method: 'PUT', // Utiliza el método PUT para actualizar el usuario
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizados),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          console.log('Usuario actualizado con éxito');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
/* Fcuncion para saber el tipo de cuenta del usuario*/
  export function definicionTipoCuenta(usuarioId) {
    fetch(`http://localhost:3000/CuentaTI/${usuarioId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos recibidos:', data); 
        if (data.error) {
          console.error(data.error);
        } else {
          console.log('Nombre del usuario:', data.nombre);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  