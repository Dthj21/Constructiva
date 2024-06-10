document.addEventListener('DOMContentLoaded', async () => {
    const productoForm = document.getElementById('productoForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    


    if (productoForm) {
        productoForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const productoId = document.getElementById('ProductoId').value;
            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;
            const precio = document.getElementById('precio').value;
            const url = document.getElementById('imagen').value;

            const categoriaId = document.getElementById('categoria').value;
            const proveedorId = document.getElementById('proveedor').value;

            const mutation = `
                mutation {
                    createProductos(
                        productoId: "${productoId}",
                        nombre: "${nombre}",
                        descripcion: "${descripcion}",
                        precio: "${precio}",
                        url: "${url}",
                        categoriaId: "${categoriaId}",
                        proveedorId: "${proveedorId}"
                    ) {
                        productoId
                        nombre
                        descripcion
                        precio
                        url
                        categoriaId
                        proveedorId
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

                if (response.ok && data.data.createProductos) {
                    // Manejar éxito
                    successMessage.innerText = 'Producto guardado con éxito.';
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    productoForm.reset();
                } else {
                    // Manejar error
                    errorMessage.innerText = 'Error al guardar el producto. Inténtalo de nuevo.';
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

    if (productoForm) {
        productoForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const productoId = document.getElementById('ProductoId').value;
            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;
            const precio = document.getElementById('precio').value;
            const url = document.getElementById('imagen').value;

            const categoriaId = document.getElementById('categoria').value;
            const proveedorId = document.getElementById('proveedor').value;

            const mutation = `
                mutation {
                    actualizarProducto(
                        productoId: "${productoId}",
                        nombre: "${nombre}",
                        descripcion: "${descripcion}",
                        precio: "${precio}",
                        url: "${url}",
                        categoriaId: "${categoriaId}",
                        proveedorId: "${proveedorId}"
                    ) {
                        productoId
                        nombre
                        descripcion
                        precio
                        url
                        categoriaId
                        proveedorId
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

                if (response.ok && data.data.actualizarProducto) {
                    // Manejar éxito
                    successMessage.innerText = 'Producto actualizado con éxito.';
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    productoForm.reset();
                } else {
                    // Manejar error
                    errorMessage.innerText = 'Error al actualizar el producto. Inténtalo de nuevo.';
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

    const fetchProductos = async () => {
        const query = `
            query {
                productos {
                    productoId
                    nombre
                    descripcion
                    precio
                    url
                    categoriaId
                    proveedorId
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

            if (response.ok && data.data.productos) {
                if (tableBody) {
                    tableBody.innerHTML = '';
                    data.data.productos.forEach(producto => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${producto.productoId}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.descripcion}</td>
                            <td>${producto.precio}</td>
                            <td><img src="${producto.url}" alt="${producto.nombre}" width="50"></td>
                            <td>${producto.categoriaId}</td>
                            <td>${producto.proveedorId}</td>
                            <td>
                                <button class="btn btn-primary btn-edit" data-producto-id="${producto.productoId}">Editar</button>
                                <button class="btn btn-danger btn-delete" data-producto-id="${producto.productoId}">Eliminar</button>
                            </td>
                        `;
                        tableBody.appendChild(row);
                    });

                    document.querySelectorAll('.btn-edit').forEach(button => {
                        button.addEventListener('click', () => {
                            const productoId = button.getAttribute('data-producto-id');
                            window.location.href = `editar_producto.html?id=${productoId}`;
                        });
                    });

                    const loadProductoData = async (productoId) => {
                        const query = `
                            query {
                                productoPorId(productoId: "${productoId}") {
                                    productoId
                                    nombre
                                    descripcion
                                    precio
                                    url
                                    categoriaId
                                    proveedorId
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

                            if (response.ok && data.data.productoPorId) {
                                const producto = data.data.productoPorId;

                                // Verificación de que si los elementos existen antes de establecer sus valores
                                const productoIdInput = document.getElementById('ProductoId');
                                if (productoIdInput) productoIdInput.value = producto.productoId;

                                const nombreInput = document.getElementById('nombre');
                                if (nombreInput) nombreInput.value = producto.nombre;

                                const descripcionInput = document.getElementById('descripcion');
                                if (descripcionInput) descripcionInput.value = producto.descripcion;

                                const precioInput = document.getElementById('precio');
                                if (precioInput) precioInput.value = producto.precio;

                                const imagenInput = document.getElementById('imagen');
                                if (imagenInput) imagenInput.value = producto.url;

                                const categoriaInput = document.getElementById('categoria');
                                if (categoriaInput) categoriaInput.value = producto.categoriaId;

                                const proveedorInput = document.getElementById('proveedor');
                                if (proveedorInput) proveedorInput.value = producto.proveedorId;
                            } else {
                                console.error('Error al cargar los datos del producto:', data);
                            }
                        } catch (error) {
                            console.error('Error al enviar la solicitud:', error);
                        }
                    };


                    document.querySelectorAll('.btn-delete').forEach(button => {
                        button.addEventListener('click', async () => {
                            const productoId = button.getAttribute('data-producto-id');
                            const confirmation = confirm('¿Estás seguro de que deseas eliminar este producto?');
                            if (confirmation) {
                                await deleteProducto(productoId, fetchProductos);
                            }
                        });
                    });
                } else {
                    console.error('El elemento tableBody no fue encontrado.');
                }
            } else {
                console.error('Error al cargar los productos:', data);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    const deleteProducto = async (productoId, fetchProductos) => {
        const mutation = `
                mutation {
                    eliminarProducto(productoId: "${productoId}") {
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

            if (response.ok && data.data.eliminarProducto) {
                if (data.data.eliminarProducto.success) {
                    await fetchProductos();
                } else {
                    console.error('Error al eliminar el producto:', data.data.eliminarProducto);
                    errorMessage.innerText = 'Error: No se pudo eliminar el producto.';
                    errorMessage.style.display = 'block';
                }
            } else {
                console.error('Error en la respuesta del servidor:', data);
                errorMessage.innerText = 'Error al eliminar el producto. Inténtalo de nuevo.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            errorMessage.innerText = 'Error al enviar la solicitud. Inténtalo de nuevo.';
            errorMessage.style.display = 'block';
        }
    };
    
    const tableBody = document.querySelector('#productosTable tbody');

    if (tableBody) {
        await fetchProductos();
    } else {
        console.error('El elemento tableBody no fue encontrado en el DOM.');
    }
});

