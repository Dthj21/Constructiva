document.addEventListener('DOMContentLoaded', async () => {
    const categoriaForm = document.getElementById('categoriaForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const categoriaTableBody = document.getElementById('categoriaTableBody');

    const fetchCategories = async () => {
        const query = `
            query {
                categorias {
                    categoriaId
                    nombreFk
                    descripcion
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
                if (categoriaTableBody) {
                    categoriaTableBody.innerHTML = '';
                    data.data.categorias.forEach(categoria => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${categoria.categoriaId}</td>
                            <td>${categoria.nombreFk}</td>
                            <td>${categoria.descripcion}</td>
                            <td>
                                <button class="btn btn-danger btn-sm delete-btn" data-categoriaid="${categoria.categoriaId}">Eliminar</button>
                            </td>
                        `;
                        categoriaTableBody.appendChild(row);
                    });
                }
            } else {
                errorMessage.innerText = 'Error al cargar las categorías. Inténtalo de nuevo.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            errorMessage.innerText = 'Error al enviar la solicitud. Inténtalo de nuevo.';
            errorMessage.style.display = 'block';
        }
    };

    if (categoriaTableBody) {
        await fetchCategories();
    }

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const categoriaId = btn.getAttribute('data-categoriaid');
            const confirmation = confirm('¿Estás seguro de que deseas eliminar esta categoría?');
            if (confirmation) {
                await eliminarCategoria(categoriaId, fetchCategories);
            }
        });
    });

    if (categoriaForm) {
        categoriaForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const categoriaId = document.getElementById('categoriaId').value;
            const nombreFk = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;

            const mutation = `
                mutation {
                    createCategoria(categoriaId: "${categoriaId}", nombreFk: "${nombreFk}", descripcion: "${descripcion}") {
                        categoriaId
                        nombreFk
                        descripcion
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

                if (response.ok && data.data.createCategoria) {
                    successMessage.innerText = 'Categoría guardada con éxito.';
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    categoriaForm.reset();
                    await fetchCategories();
                } else {
                    errorMessage.innerText = 'Error al guardar la categoría. Inténtalo de nuevo.';
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


const eliminarCategoria = async (categoriaId, fetchCategories) => {
    const mutation = `
        mutation {
            eliminarCategoria(categoriaId: "${categoriaId}") {
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

        if (response.ok && data.data.eliminarCategoria.success) {
            alert('Categoría eliminada exitosamente.');
            await fetchCategories(); 
        } else {
            alert('Error al eliminar la categoría. Inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Error al enviar la solicitud. Inténtalo de nuevo.');
    }
};

