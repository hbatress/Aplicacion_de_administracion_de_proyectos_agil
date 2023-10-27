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
  fetch(`http://localhost:3000/updateTareaEstado/${tareaId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Estado_de_la_Tarea: nuevoEstadoId }),
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

// Función para agregar un historial de movimiento
export function AgregarHistorialMovimiento(newMovementHistory) {
  return fetch('http://localhost:3000/historialesmovimiento', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Fecha_y_Hora_del_Movimiento: newMovementHistory.Fecha_y_Hora_del_Movimiento,
      Proyecto_Perteneciente: newMovementHistory.Proyecto_Perteneciente,
      Usuario_que_Realizo_el_Movimiento: newMovementHistory.Usuario_que_Realizo_el_Movimiento,
      Estado_de_la_Tarea: newMovementHistory.Estado_de_la_Tarea,
      Tarea: newMovementHistory.Tarea
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al agregar historial de movimiento');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error(error);
    });
}

/* funcion para crear nuevos proyectos */
export function AgregarProyecto(data) {
  return fetch('http://localhost:3000/proyectos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Respuesta del servidor:', data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

/*Funcion para agregar tareas */
export function AgregarTarea(data) {
  return fetch('http://localhost:3000/tareas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Respuesta del servidor:', data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });



}
export function actualizarProyecto(proyectoID, nuevoNombre, nuevaDescripcion) {
  console.log(nuevoNombre, nuevaDescripcion);
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/updateproject/${proyectoID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Nombre_del_Proyecto: nuevoNombre, // Establece el nombre correctamente
        Descripcion: nuevaDescripcion, // Establece la descripción correctamente
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data); // Puedes personalizar lo que quieres resolver aquí
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
/*Funcion para leer als tareas y el stado*/
export function obtenerInfoTareas(nombreTarea, usuarioId) {
  fetch(`http://localhost:3000/infotareas/${nombreTarea}/${usuarioId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Datos de las tareas recibidos:', data);
      if (data.error) {
        console.error(data.error);
      } else {
        console.log('Información de las tareas:', data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function actualizarTareaEnServidor(tareaId, nuevoNombre, nuevaDescripcion, nuevoEstado) {
  const requestBody = {
    Nombre_de_la_Tarea: nuevoNombre,
    Descripcion: nuevaDescripcion,
    Estado_de_la_Tarea: nuevoEstado
  };

  return fetch(`http://localhost:3000/updatetask/${tareaId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud de actualización de tarea');
      }
      return response.json();
    });
}
