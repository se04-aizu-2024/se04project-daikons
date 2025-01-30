from django.urls import path
from . import views

urlpatterns = [
    path('bubblesort/', views.bubblesort, name='bubblesort'),
    path('insertionsort/', views.insertionsort, name='insertionsort'),
    path('selectionsort/', views.selectionsort, name='selectionsort'),
]
