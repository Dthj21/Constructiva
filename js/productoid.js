document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');

    const loadCategorias = async () => {
        const query = `
            query {
                categorias {
                    categoriaId
                    nombreFk
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

            if (response.ok && data.data.categorias) {
                const categorias = data.data.categorias;
                const categoriaSelect = document.getElementById('categoria');
                categorias.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.categoriaId;
                    option.textContent = categoria.nombreFk;
                    categoriaSelect.appendChild(option);
                });
            } else {
                console.error('Error al cargar las categorías:', data);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    const loadProveedores = async () => {
        const query = `
            query {
                proveedores {
                    proveedorId
                    nombre
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
                const proveedores = data.data.proveedores;
                const proveedorSelect = document.getElementById('proveedor');
                proveedores.forEach(proveedor => {
                    const option = document.createElement('option');
                    option.value = proveedor.proveedorId;
                    option.textContent = proveedor.nombre;
                    proveedorSelect.appendChild(option);
                });
            } else {
                console.error('Error al cargar los proveedores:', data);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

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

                document.getElementById('ProductoId').value = producto.productoId;
                document.getElementById('nombre').value = producto.nombre;
                document.getElementById('descripcion').value = producto.descripcion;
                document.getElementById('precio').value = producto.precio;
                document.getElementById('imagen').value = producto.url;

                const categoriaSelect = document.getElementById('categoria');
                if (categoriaSelect) categoriaSelect.value = producto.categoriaId;

                const proveedorSelect = document.getElementById('proveedor');
                if (proveedorSelect) proveedorSelect.value = producto.proveedorId;
            } else {
                console.error('Error al cargar los datos del producto:', data);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    await loadCategorias();
    await loadProveedores();

    if (productoId) {
        await loadProductoData(productoId);
    }

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
});
