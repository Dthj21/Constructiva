# Generated by Django 5.0.6 on 2024-06-07 02:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('links', '0002_alter_inventario_stock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productos',
            name='precio',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]