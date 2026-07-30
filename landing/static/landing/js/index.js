/**
 * ### Переключает активные табы и их контент в секции тренажёрного зала
 *
 * - `tabName` - Имя таба (`'standards'` или `'amenities'`)
 */
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    if (tabName === 'standards') {
        document.getElementById('tab-standards-btn').classList.add('active');
        document.getElementById('tab-standards').classList.add('active');
    } else {
        document.getElementById('tab-amenities-btn').classList.add('active');
        document.getElementById('tab-amenities').classList.add('active');
    }
}


/**
 * ### Инициализация аккордеона в секции FAQ
 * Обеспечивает плавное открытие ответа и поворот иконки плюсика в крестик
 */
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.parentElement;
            const currentAnswer = currentItem.querySelector('.faq-answer');
            const isActive = currentItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                currentItem.classList.add('active');
                currentAnswer.style.maxHeight = currentAnswer.scrollHeight + 'px';
            }
        });
    });
});


/**
 * Обрабатывает отправку формы создания отзыва через AJAX (fetch)
 * Собирает данные формы, отправляет POST-запрос на сервер,
 * обрабатывает ответ и выводит уведомление об успехе или ошибке
 *
 * `event` - Событие отправки формы
 */
async function submitReview(event) {
    event.preventDefault();

    const form = document.getElementById('add-review-form');
    const formData = new FormData(form);
    const successMsg = document.getElementById('review-success-msg');

    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': formData.get('csrfmiddlewaretoken')
            },
            body: formData
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
            successMsg.classList.remove('d-none');
            form.reset();

            setTimeout(() => {
                successMsg.classList.add('d-none');
            }, 5000);
        } else {
            alert('Ошибка при отправке: ' + JSON.stringify(result.errors || result.message));
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
        alert('Не удалось отправить отзыв. Проверьте подключение к интернету.');
    }
}
