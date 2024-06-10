from django.db import models
from django.conf import settings

class Categoria(models.Model):
    categoria_id = models.TextField(blank=True, primary_key=True)
    coategoria_id_fk = models.TextField(blank=True)
    nombre_fk = models.TextField(blank=True)
    descripcion = models.TextField(blank=True)

    class Meta:
        db_table = 'categoria'


class DetallePedidos(models.Model):
    det_pedido_id = models.TextField(blank=True, primary_key=True)
    nombre_producto = models.TextField(blank=True)
    cantidad = models.TextField(blank=True)
    precio_unitario = models.TextField(blank=True)
    total = models.TextField(blank=True)
    fecha_pedido = models.TextField(blank=True)
    pedido_id = models.TextField(blank=True)
    producto_id = models.TextField(blank=True)

    class Meta:
        db_table = 'detalle_pedidos'


class HistorialPedidos(models.Model):
    pedido_id = models.TextField(blank=True, primary_key=True)
    total = models.TextField(blank=True)
    fecha_pedido = models.TextField(blank=True)
    cliente_id = models.TextField(blank=True)
    producto_id = models.TextField(blank=True)
    pago_id = models.TextField(blank=True)
    det_pedido_id = models.TextField(blank=True)

    class Meta:
        db_table = 'historial_pedidos'


class Inventarios(models.Model):
    inventario_id = models.TextField(blank=True, primary_key=True)
    nombre = models.TextField(blank=True)
    stock = models.TextField(blank=True)
    fecha_entrada = models.TextField(blank=True)
    producto_id = models.TextField(blank=True)

    class Meta:
        db_table = 'inventarios'


class MetodoPagos(models.Model):
    metodo_pago = models.TextField(blank=True, primary_key=True)
    nombre = models.TextField(blank=True)
    descripcion = models.TextField(blank=True)

    class Meta:
        db_table = 'metodo_pagos'


class Pagos(models.Model):
    pago_id = models.TextField(blank=True, primary_key=True)
    cantidad = models.TextField(blank=True)
    fecha_pago = models.TextField(blank=True)
    estado = models.TextField(blank=True)
    metodo_pago_id = models.TextField(blank=True)
    cliente_id = models.TextField(blank=True)

    class Meta:
        db_table = 'pagos'


class Productos(models.Model):
    producto_id = models.TextField(blank=True, primary_key=True)
    url = models.URLField()
    nombre = models.TextField(blank=True)
    descripcion = models.TextField(blank=True)
    precio = models.TextField(blank=True)
    categoria_id_fk = models.TextField(blank=True)
    proveedor_id = models.TextField(blank=True)

    class Meta:
        db_table = 'productos'


class Proveedores(models.Model):
    proveedor_id = models.TextField(blank=True, primary_key=True)
    nombre = models.TextField(blank=True)
    direccion = models.TextField(blank=True)
    telefono = models.TextField(blank=True)

    class Meta:
        db_table = 'proveedores'


class Usuarios(models.Model):
    usuario_id = models.TextField(blank=True, primary_key=True)
    nombre = models.TextField(blank=True)
    apellido = models.TextField(blank=True)
    direccion = models.TextField(blank=True)
    ciudad = models.TextField(blank=True)
    telefono = models.TextField(blank=True)
    tipo_usuario = models.TextField(blank=True)

    class Meta:
        db_table = 'usuarios'


class Admin(models.Model):
    admin_id = models.TextField(blank=True, primary_key=True)
    username = models.TextField(blank=True)
    password = models.TextField(blank=True)
