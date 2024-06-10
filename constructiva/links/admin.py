from django.contrib import admin
from .models import Categoria, DetallePedidos, HistorialPedidos, Inventarios, MetodoPagos, Pagos, Productos, Proveedores, Usuarios, Admin

admin.site.register(Categoria)
admin.site.register(DetallePedidos)
admin.site.register(HistorialPedidos)
admin.site.register(Inventarios)
admin.site.register(MetodoPagos)
admin.site.register(Pagos)
admin.site.register(Productos)
admin.site.register(Proveedores)
admin.site.register(Usuarios)
admin.site.register(Admin)