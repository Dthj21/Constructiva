document.addEventListener('DOMContentLoaded', async () => {
    const registerForm = document.querySelector('.form-register');
    const registrationMessage = document.querySelector('.registration-message');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('Username').value;
        const email = document.getElementById('correo').value;
        const password = document.getElementById('contraseña').value;

        const mutation = `
            mutation {
                createUser(username: "${username}", email: "${email}", password: "${password}") {
                    user {
                        username
                        email
                    }
                }
            }
        `;

        try {
            const response = await fetch('http://127.0.0.1:8000/graphql/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: mutation })
            });

            const data = await response.json();

            if (response.ok && data.data.createUser) {
                // Manejar el éxito del registro
                console.log('Usuario registrado con éxito:', data.data.createUser);
                registrationMessage.textContent = 'Usuario registrado con éxito';
                registrationMessage.style.color = 'green';
                registrationMessage.style.display = 'block'; 
            } else {
                // Manejar errores de registro
                console.error('Error al registrar el usuario:', data);
                if (data.errors && data.errors[0].message.includes('unique constraint')) {
                    registrationMessage.textContent = 'El usuario ya existe. Por favor, elige otro nombre de usuario o correo electrónico.';
                    registrationMessage.style.color = 'red';
                    registrationMessage.style.display = 'block'; 
                } else {
                    registrationMessage.textContent = 'Error al registrar el usuario. Por favor, inténtelo de nuevo.';
                    registrationMessage.style.color = 'red';
                    registrationMessage.style.display = 'block'; 
                }
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            registrationMessage.textContent = 'Error al enviar la solicitud. Por favor, inténtelo de nuevo.';
            registrationMessage.style.color = 'red';
            registrationMessage.style.display = 'block'; 
        }
    });
});
