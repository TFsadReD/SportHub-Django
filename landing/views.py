from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET, require_POST

from .forms import ReviewForm
from .models import Review


@require_GET
def index(request):
    reviews = Review.objects.filter(is_published=True)
    return render(
        request,
        "landing/index.html",
        {
            "reviews": reviews,
            "review_form": ReviewForm(),
        },
    )


@require_POST
def review_create(request):
    form = ReviewForm(request.POST)

    if not form.is_valid():
        return JsonResponse(
            {
                "status": "error",
                "message": "Проверьте правильность заполнения формы",
                "errors": form.errors,
                "non_field_errors": form.non_field_errors(),
            },
            status=400,
        )

    review = form.save(commit=False)
    review.is_published = False
    review.save()

    return JsonResponse(
        {"status": "success", "message": "Отзыв отправлен на модерацию"},
        status=201,
    )
