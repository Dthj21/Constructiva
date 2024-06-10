document.addEventListener("DOMContentLoaded", function () {
    cargarVentas();
});

async function cargarVentas() {
    try {
        const query = `
            query {
                detallePedidos {
                    detPedidoId
                    pedidoId
                    fechaPedido
                    total
                }
            }
        `;

        const response = await fetch('http://127.0.0.1:8000/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        const ventasPorPedido = agruparPorPedido(data.data.detallePedidos);

        const ventasBody = document.getElementById('ventas-body');

        ventasPorPedido.forEach(venta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${venta.pedidoId}</td>
                <td>${venta.fechaPedido}</td>
                <td>${venta.total}</td>
                <td>
                    <button class="btn btn-primary ver-detalles-btn" data-bs-toggle="modal" data-bs-target="#detallesVentaModal" data-pedido-id="${venta.pedidoId}">Ver Detalles</button>
                </td>
            `;
            ventasBody.appendChild(row);
        });

        const verDetallesButtons = document.querySelectorAll('.ver-detalles-btn');
        verDetallesButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const pedidoId = button.getAttribute('data-pedido-id');
                await mostrarDetallesVenta(pedidoId);
            });
        });
    } catch (error) {
        console.error('Error al cargar las ventas:', error);
    }
}

async function mostrarDetallesVenta(pedidoId) {
    try {
        const query = `
            query {
                detallePedidosPorPedido(pedidoId: "${pedidoId}") {
                    detPedidoId
                    nombre
                    cantidad
                    precio
                    total
                }
            }
        `;

        const response = await fetch('http://127.0.0.1:8000/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        const detallesVenta = data.data.detallePedidosPorPedido;

        const modalBody = document.getElementById('detallesVentaModalBody');
        modalBody.innerHTML = '';

        detallesVenta.forEach(detalle => {
            const detalleHTML = `
                <p><strong>${detalle.nombre}</strong></p>
                <p>Cantidad: ${detalle.cantidad}</p>
                <p>Precio: $${detalle.precio}</p>
                <p>Total: $${detalle.total}</p>
                <hr>
            `;
            modalBody.innerHTML += detalleHTML;
        });
    } catch (error) {
        console.error('Error al cargar los detalles de la venta:', error);
    }
}


function agruparPorPedido(detallePedidos) {
    const ventasPorPedido = {};

    detallePedidos.forEach(detalle => {
        const { pedidoId, fechaPedido, total } = detalle;
        if (!ventasPorPedido[pedidoId]) {
            ventasPorPedido[pedidoId] = {
                pedidoId,
                fechaPedido,
                total: parseFloat(total) 
            };
        } else {
            ventasPorPedido[pedidoId].total += parseFloat(total); 
        }
    });

    return Object.values(ventasPorPedido);
}
