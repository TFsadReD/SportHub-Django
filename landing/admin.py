from django.contrib import admin
from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    """
    Настройка отображения и управления отзывами в админ-панели Django
    """

    list_display = (
        "id",
        "author_name",
        "title",
        "assessment_display",
        "is_published",
        "created_at",
    )

    list_display_links = ("id", "author_name", "title")
    list_editable = ("is_published",)
    list_filter = ("is_published", "assessment", "created_at")
    search_fields = ("author_name", "title", "text")
    ordering = ("-created_at",) # Сортировка по умолчанию
    list_per_page = 20
    readonly_fields = ("created_at", "updated_at")


    @admin.display(description="Оценка")
    def assessment_display(self, obj):
        return f"{obj.assessment} ★"
