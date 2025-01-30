from django.shortcuts import render
from django.http import JsonResponse
from .SortingsAlgs import bubbleSortASC, bubbleSortDESC
import time, re

def insertionsort(request):
    return render(request, 'insertionsort.html')

def selectionsort(request):
    return render(request, 'selectionsort.html')

def bubblesort(request):
    if request.method == "POST":
        try:
            array_input = request.POST.get("array")
            order = request.POST.get("order")

            # Split input by commas or spaces using regex
            array = re.split(r'[,\s]+', array_input.strip())
            array = [int(x) for x in array if x]  # Convert to integers and ignore empty strings

            start_time = time.time()  # Record start time
            if order == "ascending":
                sorted_array = bubbleSortASC(array)
            else:
                sorted_array = bubbleSortDESC(array)
            end_time = time.time()  # Record end time
            process_time = round((end_time - start_time) * 1000, 2)  # Convert to milliseconds

            return JsonResponse({
                "result": sorted_array,
                "original_array": array,
                "process_time": process_time,
            })
        except ValueError:
            return JsonResponse({"error": "Invalid input. Please enter a valid array."}, status=400)

    return render(request, "bubblesort.html")

