# SportHub-Django

Лендинг фитнес-клуба на Django: разделы «Тренажёрный зал», «СПА-зона», «Тарифы»,
«Тренеры», «Вопросы и ответы» и «Отзывы». Отзывы посетителей отправляются
AJAX-запросом, проходят модерацию в админ-панели и выводятся на главной странице.

Проект использует менеджер пакетов **`uv`** — он подтягивает нужную версию
Python, создаёт `.venv` и ставит точные версии пакетов из `uv.lock`.

---

## 1. Установите `uv`

- **macOS / Linux:**
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

- **Windows (PowerShell):**
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.sh | iex"
  ```

> 📌 **Для Windows:** если после установки команда `uv` не распознаётся,
> перезапустите терминал или добавьте путь в переменную `PATH`:
> ```powershell
> $env:Path += ";$env:USERPROFILE\.cargo\bin"
> ```

---

## 2. Клонируйте репозиторий

```bash
git clone https://github.com/TFsadReD/SportHub-Django.git
cd SportHub-Django
```

---

## 3. Синхронизируйте зависимости

```bash
uv sync
```

---

## 4. Настройте переменные окружения

Скопируйте пример в `.env` и заполните значения:

```bash
cp .env.example .env
```

```ini
# SECRET_KEY — генерируется один раз и хранится в секрете:
#   python -c "from django.core.management.utils import get_random_secret_key as k; print(k())"
SECRET_KEY=Твой_Секретный_Ключ_Для_Джанго

# DEBUG — только True или False. На боевом сервере обязательно False.
DEBUG=True

# ALLOWED_HOSTS — домены через запятую, без протокола.
# Обязателен, если DEBUG=False.
ALLOWED_HOSTS=localhost,127.0.0.1,[::1]
```

---

## 5. Подготовьте базу данных и запустите сервер

1. **Примените миграции:**
   ```bash
   uv run python manage.py migrate
   ```

2. **Создайте учётную запись администратора** (для модерации отзывов):
   ```bash
   uv run python manage.py createsuperuser
   ```

3. **Запустите локальный сервер разработки:**
   ```bash
   uv run python manage.py runserver
   ```

Сайт откроется на <http://127.0.0.1:8000/>, админ-панель — на
<http://127.0.0.1:8000/admin/>.
