from django.contrib.auth import get_user_model
import graphene
from graphene_django import DjangoObjectType

class AdminType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        exclude = ('password',)  # Excluimos el campo de contraseña para proteger la información sensible

class Query(graphene.ObjectType):
    admins = graphene.List(AdminType)

    def resolve_admins(self, info):
        return get_user_model().objects.filter()

class CreateAdmin(graphene.Mutation):
    admin = graphene.Field(AdminType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, username, password):
        admin = get_user_model()(
            username=username,
        )
        admin.set_password(password)
        admin.save()

        return CreateAdmin(admin=admin)

class Mutation(graphene.ObjectType):
    create_admin = CreateAdmin.Field()
