export function sendDataToServer(data) {


    return fetch('http://localhost:3000/usuarios', {
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
