document.addEventListener("DOMContentLoaded", function () {
    cargarProductos();
});

async function cargarProductos() {
    const query = `
        query {
            productos {
                id
                nombre
                precio
                url
                productoId
            }
        }
    `;

    try {
        const response = await fetch('http://127.0.0.1:8000/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        const container = document.getElementById('productos-container');
        container.innerHTML = '';
        data.data.productos.forEach(producto => {
            const col = document.createElement('div');
            col.className = 'col';
            col.innerHTML = `
                <div class="card shadow-sm">
                    <img src="${producto.url}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$ ${producto.precio}</p>
                        <div class="btn-group">
                            <a href="#" class="btn btn-primary">Detalles</a>
                        </div>
                        <button class="btn btn-success" onclick="agregarAlCarrito(${producto.productoId}, '${producto.nombre}', ${producto.precio})">Agregar</button>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
    } catch (error) {
        console.error('Error fetching productos:', error);
    }
}

function agregarAlCarrito(id, nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    let pedidoId = localStorage.getItem('pedidoId');
    if (!pedidoId) {
        pedidoId = generarPedidoId();
        localStorage.setItem('pedidoId', pedidoId);
    }
    
    const index = carrito.findIndex(producto => producto.id === id);
    if (index > -1) {
        carrito[index].cantidad += 1;
    } else {
        const producto = { id, nombre, precio, cantidad: 1 };
        carrito.push(producto);
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    alert(`${nombre} ha sido agregado al carrito.`);
    
    actualizarContadorCarrito();
}

function generarPedidoId() {
    return Date.now().toString();
}

function obtenerPedidoId() {
    return localStorage.getItem('pedidoId');
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    document.getElementById('carrito-contador').innerText = contador;
}