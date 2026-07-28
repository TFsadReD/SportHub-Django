from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Review(models.Model):
    RATING_CHOICES = [
        (1, "1 ★ - Ужасно"),
        (2, "2 ★★ - Плохо"),
        (3, "3 ★★★ - Удовлетворительно"),
        (4, "4 ★★★★ - Хорошо"),
        (5, "5 ★★★★★ - Идеально"),
    ]


    # >>> Поля данных БД <<<

    author_name = models.CharField(
        max_length=100,
        verbose_name="Имя автора",
        help_text="Как к вам обращаться?"
    )

    assessment = models.PositiveSmallIntegerField(
        choices=RATING_CHOICES,
        validators=[
            MinValueValidator(1, message="Минимальная оценка - 1"),
            MaxValueValidator(5, message="Максимальная оценка - 5")
        ],
        verbose_name="Оценка",
        help_text="Оценка от 1 до 5 звёзд"
    )

    title = models.CharField(
        max_length=50,
        verbose_name="Заголовок отзыва"
    )

    text = models.TextField(
        verbose_name="Текст отзыва",
        help_text="Опишите ваши впечатления от посещения клуба"
    )


    # >>> Флаги для БД <<<

    is_published = models.BooleanField(
        default=False,
        db_index=True,
        verbose_name="Опубликован",
        help_text="Отображать ли отзыв на сайте"
    )

    created_at = models.DateTimeField(
        db_index=True,
        auto_now_add=True,
        verbose_name="Дата создания"
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления"
    )


    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.author_name} — {self.title} ({self.assessment}★)"
