import graphene
from graphene_django import DjangoObjectType
from datetime import date
from decimal import Decimal
from .models import Productos, Categoria, Inventario, Proveedor, DetallePedido, HistorialPedidos


class ProductosType(DjangoObjectType):
    class Meta:
        model = Productos

class CategoriaType(DjangoObjectType):
    class Meta:
        model = Categoria

class InventarioType(DjangoObjectType):
    class Meta:
        model = Inventario

class ProveedorType(DjangoObjectType):
    class Meta:
        model = Proveedor

class DetallePedidoType(DjangoObjectType):
    class Meta:
        model = DetallePedido

class HistorialPedidosType(DjangoObjectType):
    class Meta:
        model = HistorialPedidos       

class ProductoYInventarioType(graphene.ObjectType):
    producto = graphene.Field(ProductosType)
    inventario = graphene.Field(InventarioType)       


class Query(graphene.ObjectType):
    categorias = graphene.List(CategoriaType)
    detalle_pedidos = graphene.List(DetallePedidoType)
    historial_pedidos = graphene.List(HistorialPedidosType)
    inventarios = graphene.List(InventarioType)
    productos = graphene.List(ProductosType)
    proveedores = graphene.List(ProveedorType)
    producto_por_id = graphene.Field(ProductosType, producto_id=graphene.String())
    producto_por_nombre = graphene.Field(ProductosType, nombre=graphene.String())
    producto_y_inventario_por_nombre = graphene.Field(ProductoYInventarioType, nombre=graphene.String())
    detalle_pedidos_por_pedido = graphene.List(DetallePedidoType, pedido_id=graphene.String())


    def resolve_categorias(self, info, **kwargs):
        return Categoria.objects.all()

    def resolve_detalle_pedidos(self, info, **kwargs):
        return DetallePedido.objects.all()

    def resolve_historial_pedidos(self, info, **kwargs):
        return HistorialPedidos.objects.all()

    def resolve_inventarios(self, info, **kwargs):
        return Inventario.objects.all()

    def resolve_productos(self, info, **kwargs):
        return Productos.objects.all()
    
    def resolve_producto_por_id(self, info, producto_id):
        try:
            return Productos.objects.get(producto_id=producto_id)
        except Productos.DoesNotExist:
            return None

    def resolve_producto_por_nombre(self, info, nombre):
        try:
            return Productos.objects.get(nombre=nombre)
        except Productos.DoesNotExist:
            return None    

    def resolve_producto_y_inventario_por_nombre(self, info, nombre):
        try:
            producto = Productos.objects.get(nombre=nombre)
            inventario = Inventario.objects.filter(producto_id=producto.producto_id).first()  # Usamos filter() y first() para manejar el caso en que no haya inventario
            return {
                'producto': producto,
                'inventario': inventario
            }
        except Productos.DoesNotExist:
            return None


    def resolve_proveedores(self, info, **kwargs):
        return Proveedor.objects.all()
    
    def resolve_detalle_pedidos_por_pedido(self, info, pedido_id):
        try:
            return DetallePedido.objects.filter(pedido_id=pedido_id)
        except DetallePedido.DoesNotExist:
            return None
    
    
    

class CreateCategoria(graphene.Mutation):
    categoria_id = graphene.String()
    nombre_fk = graphene.String()
    descripcion = graphene.String()

    class Arguments:
        categoria_id = graphene.String()
        nombre_fk = graphene.String()
        descripcion = graphene.String()

    def mutate(self, info, categoria_id, nombre_fk, descripcion):

        categoria_obj = Categoria(
            categoria_id=categoria_id,
            nombre_fk=nombre_fk,
            descripcion=descripcion
        )
        categoria_obj.save()

        return CreateCategoria(
            categoria_id=categoria_obj.categoria_id,
            nombre_fk=categoria_obj.nombre_fk,
            descripcion=categoria_obj.descripcion,
        )

class EliminarCategoria(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        categoria_id = graphene.String()

    def mutate(self, info, categoria_id):
        try:
            categoria = Categoria.objects.get(categoria_id=categoria_id)
            categoria.delete()
            return EliminarCategoria(success=True)
        except Categoria.DoesNotExist:
            return EliminarCategoria(success=False)
        

class CreateDetallePedidos(graphene.Mutation):
    det_pedido_id = graphene.String()
    nombre = graphene.String()
    cantidad = graphene.Int()
    precio = graphene.Decimal()
    total = graphene.Decimal()
    fecha_pedido = graphene.String()
    pedido_id = graphene.String()
    producto_id = graphene.String()

    class Arguments:
        producto_id = graphene.String(required=True)
        cantidad = graphene.Int(required=True)
        pedido_id = graphene.String(required=True)  # Id del pedido al que pertenece este detalle

    def mutate(self, info, producto_id, cantidad, pedido_id):
        try:
            producto = Productos.objects.get(producto_id=producto_id)
        except Productos.DoesNotExist:
            raise Exception("Producto no encontrado")

        precio = producto.precio
        total = precio * Decimal(cantidad)
        fecha_pedido = date.today().isoformat()
        det_pedido_id = f"DP-{producto_id}-{pedido_id}"

        # Verificar y actualizar el inventario
        try:
            inventario = Inventario.objects.get(producto_id=producto_id)
            if inventario.stock < cantidad:
                raise Exception("Stock insuficiente para el producto")
            inventario.stock -= cantidad
            inventario.save()
        except Inventario.DoesNotExist:
            raise Exception("Inventario no encontrado para el producto")

        detalle_pedido = DetallePedido(
            det_pedido_id=det_pedido_id,
            nombre=producto.nombre,
            cantidad=cantidad,
            precio=precio,
            total=total,
            fecha_pedido=fecha_pedido,
            pedido_id=pedido_id,
            producto_id=producto_id
        )
        detalle_pedido.save()

        return CreateDetallePedidos(
            det_pedido_id=detalle_pedido.det_pedido_id,
            nombre=detalle_pedido.nombre,
            cantidad=detalle_pedido.cantidad,
            precio=detalle_pedido.precio,
            total=detalle_pedido.total,
            fecha_pedido=detalle_pedido.fecha_pedido,
            pedido_id=detalle_pedido.pedido_id,
            producto_id=detalle_pedido.producto_id,
        )



class CreateHistorialPedidos(graphene.Mutation):
    pedido_id = graphene.String()
    total = graphene.String()
    fecha_pedido = graphene.String()
    cliente_id = graphene.String()
    producto_id = graphene.String()
    det_pedido_id = graphene.String()

    class Arguments:
        pedido_id = graphene.String()
        total = graphene.String()
        fecha_pedido = graphene.String()
        cliente_id = graphene.String()
        producto_id = graphene.String()
        det_pedido_id = graphene.String()

    def mutate(self, info, pedido_id, total, fecha_pedido, cliente_id, producto_id, det_pedido_id):
        historial_pedidos_obj = HistorialPedidos(
            pedido_id=pedido_id,
            total=total,
            fecha_pedido=fecha_pedido,
            cliente_id=cliente_id,
            producto_id=producto_id,
            det_pedido_id=det_pedido_id
        )
        historial_pedidos_obj.save()

        return CreateHistorialPedidos(
            pedido_id=historial_pedidos_obj.pedido_id,
            total=historial_pedidos_obj.total,
            fecha_pedido=historial_pedidos_obj.fecha_pedido,
            cliente_id=historial_pedidos_obj.cliente_id,
            producto_id=historial_pedidos_obj.producto_id,
            det_pedido_id=historial_pedidos_obj.det_pedido_id,
        )


class CreateInventarios(graphene.Mutation):
    inventario_id = graphene.String()
    nombre = graphene.String()
    stock = graphene.Int()  # Cambiar de graphene.String a graphene.Int
    fecha_entrada = graphene.String()
    producto_id = graphene.String()

    class Arguments:
        stock = graphene.Int()  # Cambiar de graphene.String a graphene.Int
        producto_id = graphene.String()

    def mutate(self, info, stock, producto_id):
        inventarios_obj = Inventario(
            stock=stock,
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




class CreateProducto(graphene.Mutation):
    producto_id = graphene.String()
    nombre = graphene.String()
    descripcion = graphene.String()
    precio = graphene.Decimal()
    url = graphene.String()
    categoria_id = graphene.String()
    proveedor_id = graphene.String()   

    class Arguments:
        producto_id = graphene.String()
        nombre = graphene.String()
        descripcion = graphene.String()
        precio = graphene.Decimal()
        url = graphene.String()
        categoria_id= graphene.String()
        proveedor_id = graphene.String()

    def mutate(self, info, producto_id, nombre, descripcion, precio, url, categoria_id, proveedor_id):
        productos_obj = Productos(
            producto_id=producto_id,
            nombre=nombre,
            descripcion=descripcion,
            precio=Decimal(precio),
            url=url,
            categoria_id=categoria_id,
            proveedor_id=proveedor_id
        )
        productos_obj.save()

        return CreateProducto(
            producto_id=productos_obj.producto_id,
            nombre=productos_obj.nombre,
            descripcion=productos_obj.descripcion,
            precio=productos_obj.precio,
            url=productos_obj.url,
            categoria_id=productos_obj.categoria_id,
            proveedor_id=productos_obj.proveedor_id,
        )

class EliminarProducto(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        producto_id = graphene.String()

    def mutate(self, info, producto_id):
        try:
            producto = Productos.objects.get(producto_id=producto_id)
            producto.delete()
            return EliminarProducto(success=True)
        except Productos.DoesNotExist:
            return EliminarProducto(success=False)

class actualizarProducto(graphene.Mutation):
    producto_id = graphene.String()
    nombre = graphene.String()
    descripcion = graphene.String()
    precio = graphene.String()
    url = graphene.String()
    categoria_id = graphene.String()
    proveedor_id = graphene.String()   

    class Arguments:
        producto_id = graphene.String(required=True)
        nombre = graphene.String()
        descripcion = graphene.String()
        precio = graphene.String()
        url = graphene.String()
        categoria_id = graphene.String()
        proveedor_id = graphene.String()

    def mutate(self, info, producto_id, nombre=None, descripcion=None, precio=None, url=None, categoria_id=None, proveedor_id=None):
        try:
            productos_obj = Productos.objects.get(producto_id=producto_id)
            
            if nombre is not None:
                productos_obj.nombre = nombre
            if descripcion is not None:
                productos_obj.descripcion = descripcion
            if precio is not None:
                productos_obj.precio = precio
            if url is not None:
                productos_obj.url = url
            if categoria_id is not None:
                productos_obj.categoria_id = categoria_id
            if proveedor_id is not None:
                productos_obj.proveedor_id = proveedor_id

            productos_obj.save()

            return actualizarProducto(
                producto_id=productos_obj.producto_id,
                nombre=productos_obj.nombre,
                descripcion=productos_obj.descripcion,
                precio=productos_obj.precio,
                url=productos_obj.url,
                categoria_id=productos_obj.categoria_id,
                proveedor_id=productos_obj.proveedor_id,
            )
        except Productos.DoesNotExist:
            raise Exception("Producto not found")



class CreateProveedor(graphene.Mutation):
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
        proveedores_obj = Proveedor(
            proveedor_id=proveedor_id,
            nombre=nombre,
            direccion=direccion,
            telefono=telefono
        )
        proveedores_obj.save()

        return CreateProveedor(
            proveedor_id=proveedores_obj.proveedor_id,
            nombre=proveedores_obj.nombre,
            direccion=proveedores_obj.direccion,
            telefono=proveedores_obj.telefono,
        )
    
class EliminarProveedor(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        proveedor_id = graphene.String()

    def mutate(self, info, proveedor_id):
        try:
            proveedor = Proveedor.objects.get(proveedor_id=proveedor_id)
            proveedor.delete()
            return EliminarProveedor(success=True)
        except Proveedor.DoesNotExist:
            return EliminarProveedor(success=False)
        

class AgregarStock(graphene.Mutation):
    inventario = graphene.Field(InventarioType)

    class Arguments:
        producto_id = graphene.String(required=True)
        cantidad = graphene.Int(required=True)

    def mutate(self, info, producto_id, cantidad):
        try:
            inventario = Inventario.objects.get(producto_id=producto_id)
            inventario.stock += cantidad
            inventario.save()
            return AgregarStock(inventario=inventario)
        except Inventario.DoesNotExist:
            # Si no se encuentra el inventario, puedes crear uno nuevo con la cantidad especificada
            nuevo_inventario = Inventario.objects.create(producto_id=producto_id, stock=cantidad)
            return AgregarStock(inventario=nuevo_inventario)

   
class Mutation(graphene.ObjectType):
    create_categoria = CreateCategoria.Field()
    create_detalle_pedidos = CreateDetallePedidos.Field()
    create_historial_pedidos = CreateHistorialPedidos.Field()
    create_inventarios = CreateInventarios.Field()
    create_productos = CreateProducto.Field()
    create_proveedor = CreateProveedor.Field()


    eliminar_categoria = EliminarCategoria.Field()
    eliminar_proveedor = EliminarProveedor.Field()
    eliminar_producto = EliminarProducto.Field()

    actualizar_producto = actualizarProducto.Field()
    agregar_stock = AgregarStock.Field()
