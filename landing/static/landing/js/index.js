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


function formatReviewErrors(result) {
    const errors = result.errors || {};
    const messages = [];

    Object.values(errors).forEach(fieldErrors => {
        fieldErrors.forEach(error => messages.push(error));
    });

    (result.non_field_errors || []).forEach(error => messages.push(error));

    return messages;
}


async function submitReview(event) {
    event.preventDefault();

    const form = document.getElementById('add-review-form');
    const formData = new FormData(form);
    const successMsg = document.getElementById('review-success-msg');
    const errorMsg = document.getElementById('review-error-msg');
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitBtnText = submitBtn.textContent;

    successMsg.classList.add('d-none');
    errorMsg.classList.add('d-none');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: formData
        });

        let result = null;
        try {
            result = await response.json();
        } catch (parseError) {
            result = null;
        }

        if (response.ok && result && result.status === 'success') {
            successMsg.classList.remove('d-none');
            form.reset();

            setTimeout(() => {
                successMsg.classList.add('d-none');
            }, 5000);
        } else {
            const messages = result ? formatReviewErrors(result) : [];
            const summary = result && result.message
                ? result.message
                : `Сервер вернул ошибку ${response.status}`;

            errorMsg.innerHTML = '';

            const title = document.createElement('div');
            title.textContent = summary;
            errorMsg.appendChild(title);

            messages.forEach(message => {
                const line = document.createElement('div');
                line.textContent = `• ${message}`;
                errorMsg.appendChild(line);
            });

            errorMsg.classList.remove('d-none');
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
        errorMsg.textContent = 'Не удалось отправить отзыв. Проверьте подключение к интернету.';
        errorMsg.classList.remove('d-none');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtnText;
    }
}
