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

/* Busca un usuario por ID */
export function buscarUsuario(usuarioId) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/usuario/${usuarioId}`)
      .then((response) => {
        if (response.status === 404) {
          // Usuario no encontrado
          reject('Usuario no encontrado');
        } else if (response.status === 500) {
          // Error en el servidor
          reject('Error al buscar el usuario');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // Aquí puedes ajustar los campos según tus necesidades
        const usuarioConTipoCuenta = {
          Usuario_ID: data.Usuario_ID,
          Nombre_Usuario: data.Nombre_Usuario,
          Correo_Electronico: data.Correo_Electronico,
          Rol: data.Rol,
          Fecha_de_Registro: data.Fecha_de_Registro,
          Contrasenia:data.Contrasenia,
          Nombre_del_Tipo_de_Cuenta: data.Nombre_del_Tipo_de_Cuenta,
        };

        resolve(usuarioConTipoCuenta);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


/*Busca los proyectos asignado por ID */
export function buscarProyectosAsignados(usuarioId) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/proyectos/${usuarioId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
/*Sirve para buscar tareas */
export function buscarTareasAsignadas(usuarioId) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/tareas/${usuarioId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        reject(error);
      });
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
  
  