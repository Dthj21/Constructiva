document.addEventListener('DOMContentLoaded', () => {
    const productoForm = document.getElementById('productoForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const resultContainer = document.getElementById('resultContainer');

    if (productoForm) {
        productoForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value;

            const query = `
                query ProductoYInventarioPorNombre($nombre: String!) {
                    productoYInventarioPorNombre(nombre: $nombre) {
                        producto {
                            productoId
                            nombre
                            descripcion
                            precio
                        }
                        inventario {
                            stock
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
                        query: query,
                        variables: { nombre }
                    })
                });

                const data = await response.json();

                console.log('Respuesta de GraphQL:', data);

                if (response.ok && data.data.productoYInventarioPorNombre) {
                    const { producto, inventario } = data.data.productoYInventarioPorNombre;

                    if (producto) {
                        successMessage.innerText = 'Producto encontrado con éxito.';
                        successMessage.style.display = 'block';
                        errorMessage.style.display = 'none';

                        if (inventario) {
                            resultContainer.innerHTML = `
                                <h4>Producto</h4>
                                <p>ID: ${producto.productoId}</p>
                                <p>Nombre: ${producto.nombre}</p>
                                <p>Descripción: ${producto.descripcion}</p>
                                <p>Precio: ${producto.precio}</p>
                                <h4>Inventario</h4>
                                <p>Stock: ${inventario.stock}</p>
                                <p>Producto ID: ${inventario.productoId}</p>
                                <button id="editButton" class="btn btn-primary">Editar Inventario</button>
                            `;

                            document.getElementById('editButton').addEventListener('click', () => {
                                window.location.href = 'editar_inventario.html';
                            });
                        } else {
                            resultContainer.innerHTML = `<p>No hay inventario disponible para este producto.</p>`;
                            
                            const addButton = document.createElement('button');
                            addButton.textContent = 'Agregar Inventario';
                            addButton.className = 'btn btn-primary';
                            addButton.id = 'addButton';
                            resultContainer.appendChild(addButton);
                            
                            addButton.addEventListener('click', () => {
                                window.location.href = 'editar_inventario.html';
                            });
                        }
                    } else {
                        errorMessage.innerText = 'No se encontraron productos con ese nombre.';
                        errorMessage.style.display = 'block';
                        successMessage.style.display = 'none';
                        resultContainer.innerHTML = '';
                    }
                } else {
                    if (data.errors) {
                        console.error('Errores de GraphQL:', data.errors);
                    }

                    errorMessage.innerText = 'Error al buscar el producto. Inténtalo de nuevo.';
                    errorMessage.style.display = 'block';
                    successMessage.style.display = 'none';
                    resultContainer.innerHTML = '';
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
                errorMessage.innerText = 'Error al enviar la solicitud. Inténtalo de nuevo.';
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
                resultContainer.innerHTML = '';
            }
        });
    }
});
