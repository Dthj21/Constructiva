document.addEventListener("DOMContentLoaded", function () {
    actualizarVistaCarrito();
    actualizarContadorCarrito();

    document.getElementById('vaciarCarritoBtn').addEventListener('click', vaciarCarrito);
    document.getElementById('comprarBtn').addEventListener('click', async function() {
        try {
            const pedidoId = generarPedidoId();
            await generarDetallePedido(pedidoId);
        } catch (error) {
            console.error('Error al generar detalle del pedido:', error);
            alert('Hubo un problema al generar el detalle del pedido. Inténtalo de nuevo.');
        }
    });
});

async function generarDetallePedido(pedidoId) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    for (const producto of carrito) {
        console.log('Producto ID:', producto.id);
        try {
            const mutation = `
                mutation {
                    createDetallePedidos(productoId: "${producto.id}", cantidad: ${producto.cantidad}, pedidoId: "${pedidoId}") {
                        detPedidoId
                        nombre
                        cantidad
                        precio
                        total
                        fechaPedido
                        pedidoId
                        productoId
                    }
                }
            `;

            const response = await fetch('http://127.0.0.1:8000/graphql/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: mutation }),
            });

            const data = await response.json();
            if (data.errors) {
                throw new Error(data.errors[0].message);
            }

            console.log('Detalle del pedido registrado:', data);
        } catch (error) {
            console.error('Error al crear detalle del pedido:', error);
            alert(`Hubo un problema al crear el detalle del pedido: ${error.message}`);
            return;
        }
    }
    vaciarCarrito();
    alert('Pedido registrado con éxito');
}

function generarPedidoId() {
    return Date.now().toString();
}

function actualizarVistaCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<tr><td colspan="5" class="text-center">El carrito está vacío.</td></tr>';
        document.getElementById('total').innerText = '';
        return;
    }

    let total = 0;
    carrito.forEach((producto, index) => {
        const precio = parseFloat(producto.precio);
        const cantidad = parseInt(producto.cantidad, 10);

        if (isNaN(precio) || isNaN(cantidad) || cantidad <= 0) {
            console.error('Valor de precio o cantidad inválido:', producto);
            return;
        }

        const subtotal = precio * cantidad;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${precio.toFixed(2)}</td>
            <td>
                <input type="number" value="${cantidad}" min="1" class="form-control" onchange="actualizarCantidad(${index}, this.value)">
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </td>
        `;
        carritoContainer.appendChild(row);
    });

    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
}

function actualizarCantidad(index, cantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevaCantidad = parseInt(cantidad, 10);

    if (isNaN(nuevaCantidad) || nuevaCantidad <= 0) {
        console.error('Cantidad inválida:', cantidad);
        return;
    }

    carrito[index].cantidad = nuevaCantidad;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarVistaCarrito();
    actualizarContadorCarrito();
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarVistaCarrito();
    actualizarContadorCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    actualizarVistaCarrito();
    actualizarContadorCarrito();
}

function obtenerPedidoId() {
    const pedidoId = localStorage.getItem('pedidoId');
    return pedidoId;
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    const contadorElement = document.getElementById('carrito-contador');

    if (contadorElement) {
        contadorElement.innerText = contador;
    }
}
