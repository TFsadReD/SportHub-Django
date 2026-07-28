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

            // Закрываем все открытые вопросы (раскомментируй, если нужен строго 1 открытый элемент)
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Если текущий был закрыт — открываем его
            if (!isActive) {
                currentItem.classList.add('active');
                currentAnswer.style.maxHeight = currentAnswer.scrollHeight + 'px';
            }
        });
    });
});
