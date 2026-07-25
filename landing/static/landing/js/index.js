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
