document.addEventListener('DOMContentLoaded', () => {
    const inventarioForm = document.getElementById('inventarioForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    if (inventarioForm) {
        inventarioForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const stock = parseInt(document.getElementById('stock').value);
            const productoId = document.getElementById('productoId').value;

            const mutation = `
                mutation AgregarStock($productoId: String!, $cantidad: Int!) {
                    agregarStock(productoId: $productoId, cantidad: $cantidad) {
                        inventario {
                            inventarioId
                            nombre
                            stock
                            fechaEntrada
                            productoId
                        }
                    }
                }
            `;

            try {
                const response = await fetch('http://127.0.0.1:8000/graphql/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        query: mutation,
                        variables: { productoId, cantidad: stock }
                    })
                });

                const data = await response.json();

                if (response.ok && !data.errors) {
                    successMessage.innerText = 'Stock agregado con éxito.';
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                } else {
                    errorMessage.innerText = 'Error al agregar stock. Inténtalo de nuevo.';
                    errorMessage.style.display = 'block';
                    successMessage.style.display = 'none';
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
                errorMessage.innerText = 'Error al enviar la solicitud. Inténtalo de nuevo.';
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
        });
    }
});
