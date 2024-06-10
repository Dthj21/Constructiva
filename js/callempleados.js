const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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

        if (response.ok && data.data && data.data.tokenAuth && data.data.tokenAuth.token) {
            const token = data.data.tokenAuth.token;
            localStorage.setItem('token', token);
            window.location.href = 'Admin/proveedores.html';
        } else if (data.errors) {
            errorMessage.innerText = 'Credenciales incorrectas. Inténtalo de nuevo.';
            errorMessage.style.display = 'block';
        }

    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        errorMessage.innerText = 'Hubo un problema con el servidor. Inténtalo de nuevo más tarde.';
        errorMessage.style.display = 'block';
    }
});
