export function AgregarUser(data) {


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
export function LeerUser() {
    return fetch('http://localhost:3000/Usuario', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json());

}
