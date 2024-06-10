document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    loginForm.appendChild(errorMessage);

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('Username:', username);
        console.log('Password:', password);

        const query = `
            mutation {
                tokenAuth(username: "${username}", password: "${password}") {
                    token
                }
            }
        `;

        try {
            const response = await fetch('http://127.0.0.1:8000/graphql/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            const data = await response.json();

            console.log('Response Data:', data);

            if (response.ok && data.data.tokenAuth && data.data.tokenAuth.token) {
                const token = data.data.tokenAuth.token;
                localStorage.setItem('token', token);
                await fetchUserProfile(token);
            } else {
                errorMessage.textContent = 'Credenciales incorrectas. Inténtalo de nuevo.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            errorMessage.textContent = 'Error al enviar la solicitud. Por favor, inténtelo de nuevo.';
            errorMessage.style.display = 'block';
        }
    });
});

async function fetchUserProfile(token) {
    const query = `
        query {
            me {
                username
            }
        }
    `;

    try {
        const response = await fetch('http://127.0.0.1:8000/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();

        console.log('User Profile Data:', data);

        if (response.ok && data.data.me && data.data.me.username) {
            const username = data.data.me.username;
            localStorage.setItem('username', username);
            window.location.href = 'Principal.html';
        } else {
            console.error('Error al obtener el perfil del usuario.');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
    }
}
