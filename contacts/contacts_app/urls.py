from django.urls import path
from . import views

app_name = "contacts_app"   

urlpatterns = [
    path("", views.homepage, name="homepage"),
    path("delete/<str:telephone1>",views.deleteContact,name="deleteContact"),
    path("update/<str:telephone1>",views.updateContact,name="updateContact"),
    path("search",views.search,name="search"),
    path("compareNames",views.compareNames,name="compareNames")
]