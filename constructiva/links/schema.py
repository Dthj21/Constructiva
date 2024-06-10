import graphene
from graphene_django.types import DjangoObjectType
from graphql import GraphQLError
from links.models import (
    Categoria,
    DetallePedidos,
    HistorialPedidos,
    Inventarios,
    MetodoPagos,
    Pagos,
    Productos,
    Proveedores,
    Usuarios,
    Admin
)

class CategoriaType(graphene.ObjectType):
    categoria_id = graphene.String()
    coategoria_id_fk = graphene.String()
    nombre_fk = graphene.String()
    descripcion = graphene.String()


class DetallePedidosType(graphene.ObjectType):
    det_pedido_id = graphene.String()
    nombre_producto = graphene.String()
    cantidad = graphene.String()
    precio_unitario = graphene.String()
    total = graphene.String()
    fecha_pedido = graphene.String()
    pedido_id = graphene.String()
    producto_id = graphene.String()


class HistorialPedidosType(graphene.ObjectType):
    pedido_id = graphene.String()
    total = graphene.String()
    fecha_pedido = graphene.String()
    cliente_id = graphene.String()
    producto_id = graphene.String()
    pago_id = graphene.String()
    det_pedido_id = graphene.String()


class InventariosType(graphene.ObjectType):
    inventario_id = graphene.String()
    nombre = graphene.String()
    stock = graphene.String()
    fecha_entrada = graphene.String()
    producto_id = graphene.String()


class MetodoPagosType(graphene.ObjectType):
    metodo_pago = graphene.String()
    nombre = graphene.String()
    descripcion = graphene.String()


class PagosType(graphene.ObjectType):
    pago_id = graphene.String()
    cantidad = graphene.String()
    fecha_pago = graphene.String()
    estado = graphene.String()
    metodo_pago_id = graphene.String()
    cliente_id = graphene.String()


class ProductosType(graphene.ObjectType):
    producto_id = graphene.String()
    url = graphene.String()
    nombre = graphene.String()
    descripcion = graphene.String()
    precio = graphene.String()
    categoria_id_fk = graphene.String()
    proveedor_id = graphene.String()


class ProveedoresType(graphene.ObjectType):
    proveedor_id = graphene.String()
    nombre = graphene.String()
    direccion = graphene.String()
    telefono = graphene.String()


class UsuariosType(graphene.ObjectType):
    usuario_id = graphene.String()
    nombre = graphene.String()
    apellido = graphene.String()
    direccion = graphene.String()
    ciudad = graphene.String()
    telefono = graphene.String()
    tipo_usuario = graphene.String()


class AdminType(graphene.ObjectType):
    class Meta:
        model = Admin
        fields = ("admin_id", "username", "password")


class Query(graphene.ObjectType):
    categorias = graphene.List(CategoriaType)
    detalle_pedidos = graphene.List(DetallePedidosType)
    historial_pedidos = graphene.List(HistorialPedidosType)
    inventarios = graphene.List(InventariosType)
    metodo_pagos = graphene.List(MetodoPagosType)
    pagos = graphene.List(PagosType)
    productos = graphene.List(ProductosType)
    proveedores = graphene.List(ProveedoresType)
    usuarios = graphene.List(UsuariosType)
    admin = graphene.List(AdminType)

    def resolve_categorias(self, info, **kwargs):
        return Categoria.objects.all()

    def resolve_detalle_pedidos(self, info, **kwargs):
        return DetallePedidos.objects.all()

    def resolve_historial_pedidos(self, info, **kwargs):
        return HistorialPedidos.objects.all()

    def resolve_inventarios(self, info, **kwargs):
        return Inventarios.objects.all()

    def resolve_metodo_pagos(self, info, **kwargs):
        return MetodoPagos.objects.all()

    def resolve_pagos(self, info, **kwargs):
        return Pagos.objects.all()

    def resolve_productos(self, info, **kwargs):
        return Productos.objects.all()

    def resolve_proveedores(self, info, **kwargs):
        return Proveedores.objects.all()

    def resolve_usuarios(self, info, **kwargs):
        return Usuarios.objects.all()

    def resolve_admins(self, info, **kwargs):
        return Admin.objects.all()

#1

class CreateCategoria(graphene.Mutation):
    categoria_id = graphene.String()
    coategoria_id_fk = graphene.String()
    nombre_fk = graphene.String()
    descripcion = graphene.String()

    class Arguments:
        categoria_id = graphene.String()
        coategoria_id_fk = graphene.String()
        nombre_fk = graphene.String()
        descripcion = graphene.String()

    def mutate(self, info, categoria_id, coategoria_id_fk, nombre_fk, descripcion):

        categoria_obj = Categoria(
            categoria_id=categoria_id,
            coategoria_id_fk=coategoria_id_fk,
            nombre_fk=nombre_fk,
            descripcion=descripcion
        )
        categoria_obj.save()

        return CreateCategoria(
            categoria_id=categoria_obj.categoria_id,
            coategoria_id_fk=categoria_obj.coategoria_id_fk,
            nombre_fk=categoria_obj.nombre_fk,
            descripcion=categoria_obj.descripcion,
        )



class CreateDetallePedidos(graphene.Mutation):
    det_pedido_id = graphene.String()
    nombre_producto = graphene.String()
    cantidad = graphene.String()
    precio_unitario = graphene.String()
    total = graphene.String()
    fecha_pedido = graphene.String()
    pedido_id = graphene.String()
    producto_id = graphene.String()

    class Arguments:
        det_pedido_id = graphene.String()
        nombre_producto = graphene.String()
        cantidad = graphene.String()
        precio_unitario = graphene.String()
        total = graphene.String()
        fecha_pedido = graphene.String()
        pedido_id = graphene.String()
        producto_id = graphene.String()

    def mutate(self, info, det_pedido_id, nombre_producto, cantidad, precio_unitario, total, fecha_pedido, pedido_id, producto_id):
        detalle_pedidos_obj = DetallePedidos(
            det_pedido_id=det_pedido_id,
            nombre_producto=nombre_producto,
            cantidad=cantidad,
            precio_unitario=precio_unitario,
            total=total,
            fecha_pedido=fecha_pedido,
            pedido_id=pedido_id,
            producto_id=producto_id
        )
        detalle_pedidos_obj.save()

        return CreateDetallePedidos(
            det_pedido_id=detalle_pedidos_obj.det_pedido_id,
            nombre_producto=detalle_pedidos_obj.nombre_producto,
            cantidad=detalle_pedidos_obj.cantidad,
            precio_unitario=detalle_pedidos_obj.precio_unitario,
            total=detalle_pedidos_obj.total,
            fecha_pedido=detalle_pedidos_obj.fecha_pedido,
            pedido_id=detalle_pedidos_obj.pedido_id,
            producto_id=detalle_pedidos_obj.producto_id,
        )


class CreateHistorialPedidos(graphene.Mutation):
    pedido_id = graphene.String()
    total = graphene.String()
    fecha_pedido = graphene.String()
    cliente_id = graphene.String()
    producto_id = graphene.String()
    pago_id = graphene.String()
    det_pedido_id = graphene.String()

    class Arguments:
        pedido_id = graphene.String()
        total = graphene.String()
        fecha_pedido = graphene.String()
        cliente_id = graphene.String()
        producto_id = graphene.String()
        pago_id = graphene.String()
        det_pedido_id = graphene.String()

    def mutate(self, info, pedido_id, total, fecha_pedido, cliente_id, producto_id, pago_id, det_pedido_id):
        historial_pedidos_obj = HistorialPedidos(
            pedido_id=pedido_id,
            total=total,
            fecha_pedido=fecha_pedido,
            cliente_id=cliente_id,
            producto_id=producto_id,
            pago_id=pago_id,
            det_pedido_id=det_pedido_id
        )
        historial_pedidos_obj.save()

        return CreateHistorialPedidos(
            pedido_id=historial_pedidos_obj.pedido_id,
            total=historial_pedidos_obj.total,
            fecha_pedido=historial_pedidos_obj.fecha_pedido,
            cliente_id=historial_pedidos_obj.cliente_id,
            producto_id=historial_pedidos_obj.producto_id,
            pago_id=historial_pedidos_obj.pago_id,
            det_pedido_id=historial_pedidos_obj.det_pedido_id,
        )


class CreateInventarios(graphene.Mutation):
    inventario_id = graphene.String()
    nombre = graphene.String()
    stock = graphene.String()
    fecha_entrada = graphene.String()
    producto_id = graphene.String()

    class Arguments:
        inventario_id = graphene.String()
        nombre = graphene.String()
        stock = graphene.String()
        fecha_entrada = graphene.String()
        producto_id = graphene.String()

    def mutate(self, info, inventario_id, nombre, stock, fecha_entrada, producto_id):
        inventarios_obj = Inventarios(
            inventario_id=inventario_id,
            nombre=nombre,
            stock=stock,
            fecha_entrada=fecha_entrada,
            producto_id=producto_id
        )
        inventarios_obj.save()

        return CreateInventarios(
            inventario_id=inventarios_obj.inventario_id,
            nombre=inventarios_obj.nombre,
            stock=inventarios_obj.stock,
            fecha_entrada=inventarios_obj.fecha_entrada,
            producto_id=inventarios_obj.producto_id,
        )


class CreateMetodoPagos(graphene.Mutation):
    metodo_pago = graphene.String()
    nombre = graphene.String()
    descripcion = graphene.String()

    class Arguments:
        metodo_pago = graphene.String()
        nombre = graphene.String()
        descripcion = graphene.String()

    def mutate(self, info, metodo_pago, nombre, descripcion):
        metodo_pagos_obj = MetodoPagos(
            metodo_pago=metodo_pago,
            nombre=nombre,
            descripcion=descripcion
        )
        metodo_pagos_obj.save()

        return CreateMetodoPagos(
            metodo_pago=metodo_pagos_obj.metodo_pago,
            nombre=metodo_pagos_obj.nombre,
            descripcion=metodo_pagos_obj.descripcion,
        )


class CreatePagos(graphene.Mutation):
    pago_id = graphene.String()
    cantidad = graphene.String()
    fecha_pago = graphene.String()
    estado = graphene.String()
    metodo_pago_id = graphene.String()
    cliente_id = graphene.String()

    class Arguments:
        pago_id = graphene.String()
        cantidad = graphene.String()
        fecha_pago = graphene.String()
        estado = graphene.String()
        metodo_pago_id = graphene.String()
        cliente_id = graphene.String()

    def mutate(self, info, pago_id, cantidad, fecha_pago, estado, metodo_pago_id, cliente_id):
        pagos_obj = Pagos(
            pago_id=pago_id,
            cantidad=cantidad,
            fecha_pago=fecha_pago,
            estado=estado,
            metodo_pago_id=metodo_pago_id,
            cliente_id=cliente_id
        )
        pagos_obj.save()

        return CreatePagos(
            pago_id=pagos_obj.pago_id,
            cantidad=pagos_obj.cantidad,
            fecha_pago=pagos_obj.fecha_pago,
            estado=pagos_obj.estado,
            metodo_pago_id=pagos_obj.metodo_pago_id,
            cliente_id=pagos_obj.cliente_id,
        )


class CreateProductos(graphene.Mutation):
    producto_id = graphene.String()
    url = graphene.String()
    nombre = graphene.String()
    descripcion = graphene.String()
    precio = graphene.String()
    categoria_id_fk = graphene.String()
    proveedor_id = graphene.String()

    class Arguments:
        producto_id = graphene.String()
        url = graphene.String()
        nombre = graphene.String()
        descripcion = graphene.String()
        precio = graphene.String()
        categoria_id_fk = graphene.String()
        proveedor_id = graphene.String()

    def mutate(self, info, producto_id, url, nombre, descripcion, precio, categoria_id_fk, proveedor_id):
        productos_obj = Productos(
            producto_id=producto_id,
            url=url,
            nombre=nombre,
            descripcion=descripcion,
            precio=precio,
            categoria_id_fk=categoria_id_fk,
            proveedor_id=proveedor_id
        )
        productos_obj.save()

        return CreateProductos(
            producto_id=productos_obj.producto_id,
            url=productos_obj.url,
            nombre=productos_obj.nombre,
            descripcion=productos_obj.descripcion,
            precio=productos_obj.precio,
            categoria_id_fk=productos_obj.categoria_id_fk,
            proveedor_id=productos_obj.proveedor_id,
        )


class CreateProveedores(graphene.Mutation):
    proveedor_id = graphene.String()
    nombre = graphene.String()
    direccion = graphene.String()
    telefono = graphene.String()

    class Arguments:
        proveedor_id = graphene.String()
        nombre = graphene.String()
        direccion = graphene.String()
        telefono = graphene.String()

    def mutate(self, info, proveedor_id, nombre, direccion, telefono):
        proveedores_obj = Proveedores(
            proveedor_id=proveedor_id,
            nombre=nombre,
            direccion=direccion,
            telefono=telefono
        )
        proveedores_obj.save()

        return CreateProveedores(
            proveedor_id=proveedores_obj.proveedor_id,
            nombre=proveedores_obj.nombre,
            direccion=proveedores_obj.direccion,
            telefono=proveedores_obj.telefono,
        )


class CreateUsuarios(graphene.Mutation):
    usuario_id = graphene.String()
    nombre = graphene.String()
    apellido = graphene.String()
    direccion = graphene.String()
    ciudad = graphene.String()
    telefono = graphene.String()
    tipo_usuario = graphene.String()

    class Arguments:
        usuario_id = graphene.String()
        nombre = graphene.String()
        apellido = graphene.String()
        direccion = graphene.String()
        ciudad = graphene.String()
        telefono = graphene.String()
        tipo_usuario = graphene.String()

    def mutate(self, info, usuario_id, nombre, apellido, direccion, ciudad, telefono, tipo_usuario):
        usuarios_obj = Usuarios(
            usuario_id=usuario_id,
            nombre=nombre,
            apellido=apellido,
            direccion=direccion,
            ciudad=ciudad,
            telefono=telefono,
            tipo_usuario=tipo_usuario
        )
        usuarios_obj.save()

        return CreateUsuarios(
            usuario_id=usuarios_obj.usuario_id,
            nombre=usuarios_obj.nombre,
            apellido=usuarios_obj.apellido,
            direccion=usuarios_obj.direccion,
            ciudad=usuarios_obj.ciudad,
            telefono=usuarios_obj.telefono,
            tipo_usuario=usuarios_obj.tipo_usuario,
        )


class CreateAdmin(graphene.Mutation):
    admin_id = graphene.String()
    username = graphene.String()
    password = graphene.String()

    class Arguments:
        admin_id = graphene.String()
        username = graphene.String()
        password = graphene.String()

    def mutate(self, info, admin_id, username, password):
        admin_obj = Admin(
            admin_id=admin_id,
            username=username,
            password=password
        )
        admin_obj.save()

        return CreateAdmin(
            admin_id=admin_obj.admin_id,
            username=admin_obj.username,
            password=admin_obj.password,
        )


class Mutation(graphene.ObjectType):
    create_categoria = CreateCategoria.Field()
    create_detalle_pedidos = CreateDetallePedidos.Field()
    create_historial_pedidos = CreateHistorialPedidos.Field()
    create_inventarios = CreateInventarios.Field()
    create_metodo_pagos = CreateMetodoPagos.Field()
    create_pagos = CreatePagos.Field()
    create_productos = CreateProductos.Field()
    create_proveedores = CreateProveedores.Field()
    create_usuarios = CreateUsuarios.Field()
    create_admin = CreateAdmin.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
