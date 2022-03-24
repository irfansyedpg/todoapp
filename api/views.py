from django.shortcuts import render

from django.http import JsonResponse

from .models import Task

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import TaskSerializer

# Create your views here.


@api_view(['GET'])
def apiViews(request):

    routes = {
        'List':'/task-list/',
        'Detail':'/task-detail/<str:pk>/',
        'Create':'/task-create/',
        'Update':'/task-update/<str:pk>/',
        'Delete':'/task-delete/<str:pk>/',
    }

    return Response(routes)

@api_view(['GET'])
def taskList(request):

    tasks = Task.objects.all()

    serailzers = TaskSerializer(tasks,many=True)


    return Response(serailzers.data)

@api_view(['POST'])
def taskCreate(request):
    data = request.data

    serailizers = TaskSerializer (data=data)
    if serailizers.is_valid():
        serailizers.save()


    return Response(serailizers.data)


@api_view(['POST'])
def taskUpdate(request,pk):
    data = request.data

    task = Task.objects.get(id=pk)

    serailizers = TaskSerializer (instance = task,data=data)
    if serailizers.is_valid():
        serailizers.save()


    return Response(serailizers.data)


@api_view(['DELETE'])
def taskDelete(reques,pk):

    task = Task.objects.get(id=pk)
    task.delete()

    return Response('Deleted Sucessfully')