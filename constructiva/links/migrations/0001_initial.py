# Generated by Django 3.1.3 on 2024-05-28 20:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='admin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('admin_id', models.TextField(blank=True)),
                ('username', models.TextField(blank=True)),
                ('password', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='categoria',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categoria_id', models.TextField(blank=True)),
                ('coategoria_id_fk', models.TextField(blank=True)),
                ('nombre_fk', models.TextField(blank=True)),
                ('descripcion', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='detalle_pedidos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('det_pedido_id', models.TextField(blank=True)),
                ('nombre_producto', models.TextField(blank=True)),
                ('cantidad', models.TextField(blank=True)),
                ('precio_unitario', models.TextField(blank=True)),
                ('total', models.TextField(blank=True)),
                ('fecha_pedido', models.TextField(blank=True)),
                ('pedido_id', models.TextField(blank=True)),
                ('producto_id', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='historial_pedidos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pedido_id', models.TextField(blank=True)),
                ('total', models.TextField(blank=True)),
                ('fecha_pedido', models.TextField(blank=True)),
                ('cliente_id', models.TextField(blank=True)),
                ('producto_id', models.TextField(blank=True)),
                ('pago_id', models.TextField(blank=True)),
                ('det_pedido_id', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='inventarios',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inventario_id', models.TextField(blank=True)),
                ('nombre', models.TextField(blank=True)),
                ('stock', models.TextField(blank=True)),
                ('fecha_entrada', models.TextField(blank=True)),
                ('producto_id', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='metodo_pagos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('metodo_pago', models.TextField(blank=True)),
                ('nombre', models.TextField(blank=True)),
                ('descripcion', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='pagos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pago_id', models.TextField(blank=True)),
                ('cantidad', models.TextField(blank=True)),
                ('fecha_pago', models.TextField(blank=True)),
                ('estado', models.TextField(blank=True)),
                ('metodo_pago_id', models.TextField(blank=True)),
                ('cliente_id', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='productos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('producto_id', models.TextField(blank=True)),
                ('url', models.URLField()),
                ('nombre', models.TextField(blank=True)),
                ('descripcion', models.TextField(blank=True)),
                ('precio', models.TextField(blank=True)),
                ('categoria_id_fk', models.TextField(blank=True)),
                ('proveedor_id', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='proveedores',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('proveedor_id', models.TextField(blank=True)),
                ('nombre', models.TextField(blank=True)),
                ('direccion', models.TextField(blank=True)),
                ('telefono', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='usuarios',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usuario_id', models.TextField(blank=True)),
                ('nombre', models.TextField(blank=True)),
                ('apellido', models.TextField(blank=True)),
                ('direccion', models.TextField(blank=True)),
                ('ciudad', models.TextField(blank=True)),
                ('telefono', models.TextField(blank=True)),
                ('tipo_usuario', models.TextField(blank=True)),
            ],
        ),
    ]
