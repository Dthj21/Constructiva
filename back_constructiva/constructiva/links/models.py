from django.db import models


class Productos(models.Model):
    producto_id = models.TextField(blank=True)
    nombre = models.TextField(blank=True)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    url = models.URLField()
    categoria_id = models.TextField(blank=True)
    proveedor_id = models.TextField(blank=True)

class Categoria(models.Model):
    categoria_id = models.TextField(blank=True)
    nombre_fk = models.TextField(blank=True)
    descripcion = models.TextField(blank=True)

class Inventario(models.Model):
    inventario_id = models.TextField(blank=True)
    nombre = models.TextField(blank=True)
    stock = models.IntegerField(default=0)
    fecha_entrada = models.TextField(blank=True)
    producto_id = models.TextField(blank=True)

class Proveedor(models.Model):
    proveedor_id = models.TextField(blank=True)
    nombre = models.TextField(blank=True)
    direccion = models.TextField(blank=True)
    telefono = models.TextField(blank=True)

class DetallePedido(models.Model):
    det_pedido_id = models.TextField(blank=True)
    nombre = models.TextField(blank=True)
    cantidad = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_pedido = models.TextField(blank=True)
    pedido_id = models.TextField(blank=True)
    producto_id = models.TextField(blank=True)

class HistorialPedidos(models.Model):
    pedido_id = models.TextField(blank=True)
    total = models.TextField(blank=True)
    fecha_pedido = models.TextField(blank=True)
    cliente_id = models.TextField(blank=True)
    producto_id = models.TextField(blank=True)
    det_pedido_id = models.TextField(blank=True)    
 