from django import forms

from .models import Review


class ReviewForm(forms.ModelForm):
    assessment = forms.TypedChoiceField(
        choices=list(reversed(Review.RATING_CHOICES)),
        coerce=int,
        empty_value=None,
        label="Оценка",
        error_messages={
            "invalid_choice": "Выберите оценку от 1 до 5 звёзд.",
            "required": "Выберите оценку от 1 до 5 звёзд.",
        },
        widget=forms.Select(attrs={"class": "form-select-custom"}),
    )

    class Meta:
        model = Review
        fields = ["author_name", "assessment", "title", "text"]

        widgets = {
            "author_name": forms.TextInput(
                attrs={
                    "class": "form-input-custom",
                    "placeholder": "Иван Иванов",
                    "maxlength": Review._meta.get_field("author_name").max_length,
                }
            ),
            "title": forms.TextInput(
                attrs={
                    "class": "form-input-custom",
                    "placeholder": "Например: Отличный зал и отзывчивый персонал",
                    "maxlength": Review._meta.get_field("title").max_length,
                }
            ),
            "text": forms.Textarea(
                attrs={
                    "class": "form-textarea-custom",
                    "rows": 4,
                    "placeholder": "Опишите ваши впечатления от посещения клуба...",
                    "maxlength": Review._meta.get_field("text").max_length,
                }
            ),
        }

    def clean_author_name(self):
        """Срезаем лишние пробелы по краям имени"""
        return (self.cleaned_data.get("author_name") or "").strip()

    def clean_text(self):
        """Срезаем лишние пробелы по краям текста отзыва"""
        return (self.cleaned_data.get("text") or "").strip()
