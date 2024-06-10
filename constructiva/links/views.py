from django.http import JsonResponse
from .models import Productos

def productos_api(request):
    productos = Productos.objects.all()
    data = [
        {
            'producto_id': producto.producto_id,
            'url': producto.url,
            'nombre': producto.nombre,
            'descripcion': producto.descripcion,
            'precio': producto.precio,
            'categoria_id_fk': producto.categoria_id_fk,
            'proveedor_id': producto.proveedor_id,
        }
        for producto in productos
    ]
    return JsonResponse(data, safe=False)
