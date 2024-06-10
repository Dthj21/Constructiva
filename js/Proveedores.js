document.addEventListener('DOMContentLoaded', async () => {
    const proveedorForm = document.getElementById('proveedorForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const proveedorTableBody = document.getElementById('proveedorTableBody');

    const fetchProveedores = async () => {
        const query = `
            query {
                proveedores {
                    proveedorId
                    nombre
                    direccion
                    telefono
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
                body: JSON.stringify({ query })
            });

            const data = await response.json();

            if (response.ok && data.data.proveedores) {
                if (proveedorTableBody) {
                    proveedorTableBody.innerHTML = '';
                    data.data.proveedores.forEach(proveedor => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${proveedor.proveedorId}</td>
                            <td>${proveedor.nombre}</td>
                            <td>${proveedor.direccion}</td>
                            <td>${proveedor.telefono}</td>
                            <td>
                                <button class="btn btn-danger btn-sm delete-btn" data-proveedorid="${proveedor.proveedorId}">Eliminar</button>
                            </td>
                        `;
                        proveedorTableBody.appendChild(row);
                    });
                }
            } else {
                errorMessage.innerText = 'Error al cargar los proveedores. Inténtalo de nuevo.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            errorMessage.innerText = 'Error al enviar la solicitud. Inténtalo de nuevo.';
            errorMessage.style.display = 'block';
        }
    };

    if (proveedorTableBody) {
        await fetchProveedores();
    }

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const proveedorId = btn.getAttribute('data-proveedorid');
            const confirmation = confirm('¿Estás seguro de que deseas eliminar este proveedor?');
            if (confirmation) {
                await eliminarProveedor(proveedorId, fetchProveedores);
            }
        });
    });

    if (proveedorForm) {
        proveedorForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const proveedorId = document.getElementById('proveedorId').value;
            const nombre = document.getElementById('nombre').value;
            const direccion = document.getElementById('direccion').value;
            const telefono = document.getElementById('telefono').value;

            const mutation = `
                mutation {
                    createProveedor(proveedorId: "${proveedorId}", nombre: "${nombre}", direccion: "${direccion}", telefono: "${telefono}") {
                        proveedorId
                        nombre
                        direccion
                        telefono
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
                    body: JSON.stringify({ query: mutation })
                });

                const data = await response.json();

                if (response.ok && data.data.createProveedor) {
                    successMessage.innerText = 'Proveedor guardado con éxito.';
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    proveedorForm.reset();
                    await fetchProveedores();
                } else {
                    errorMessage.innerText = 'Error al guardar el proveedor. Inténtalo de nuevo.';
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

const eliminarProveedor = async (proveedorId, fetchProveedores) => {
    const mutation = `
        mutation {
            eliminarProveedor(proveedorId: "${proveedorId}") {
                success
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
            body: JSON.stringify({ query: mutation })
        });

        const data = await response.json();

        if (response.ok && data.data.eliminarProveedor.success) {
            alert('Proveedor eliminado exitosamente.');
            await fetchProveedores();
        } else {
            alert('Error al eliminar el proveedor. Inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Error al enviar la solicitud. Inténtalo de nuevo.');
    }
};


