from django.http import JsonResponse
from django.shortcuts import render

from .models import Review


def index(request):
    if request.method == "POST":
        author_name = request.POST.get("author_name")
        assessment = request.POST.get("assessment")
        title = request.POST.get("title")
        text = request.POST.get("text")

        if author_name and assessment and title and text:
            Review.objects.create(
                author_name=author_name,
                assessment=int(assessment),
                title=title,
                text=text,
                is_published=False
            )

            return JsonResponse({"status": "success", "message": "Отзыв отправлен на модерацию"})
        return JsonResponse({"status": "error", "message": "Заполните все поля"}, status=400)

    approved_reviews = Review.objects.filter(is_published=True)
    context = {
        "reviews": approved_reviews
    }
    return render(request, "landing/index.html", context)
