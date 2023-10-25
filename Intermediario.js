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




export function actualizarUsuario(usuarioId, datosActualizados) {
  // Excluye 'Fecha_de_Registro' y 'ID' de los datos a actualizar
  const { Fecha_de_Registro, ID, ...userData } = datosActualizados;

  fetch(`http://localhost:3000/UPdatauser/${usuarioId}`, {
    method: 'PUT', // Utiliza el método PUT para actualizar el usuario
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
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
  
  
  /*Funcion para llamar a la informacion requerida */
  /* Función para obtener información de la historia del usuario */
export function obtenerInfoHistoria(usuarioId) {
  fetch(`http://localhost:3000/infohistoria/${usuarioId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Datos de la historia recibidos:', data);
      if (data.error) {
        console.error(data.error);
      } else {
        console.log('Información de la historia:', data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/*Actualiza el estado de la tarea*/
export function actualizarEstadoTarea(tareaId, nuevoEstadoId) {
  console.log(`Actualizando estado de la tarea con ID ${tareaId} a "${nuevoEstadoId}"`);
  fetch(`http://localhost:3000/updateTareaEstado/${tareaId}`, {
    method: 'PUT', // Utiliza el método PUT para actualizar el estado de la tarea
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Estado_de_la_Tarea: nuevoEstadoId }), // Enviar el nuevo estado en el cuerpo de la solicitud
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        console.log('Estado de la tarea actualizado con éxito');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
