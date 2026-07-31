# 🚀 Быстрый запуск и установка

Проект использует менеджер пакетов **`uv`**, что обеспечивает мгновенную установку зависимостей и изоляцию окружения без необходимости вручную активировать виртуальное окружение.

---

### 1. Установите `uv`, если ещё этого не сделали

- **macOS / Linux:**
  ```bash
  curl -LsSf [https://astral.sh/uv/install.sh](https://astral.sh/uv/install.sh) | sh
  ```



- **Windows (PowerShell):**
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm [https://astral.sh/uv/install.sh](https://astral.sh/uv/install.sh) | iex"
  ```



> 📌 **Примечание для пользователей Windows:** Если после установки команда `uv` не распознаётся, перезапустите терминал или добавьте путь к `uv` в переменную `PATH`:
> ```powershell
> $env:Path += ";$env:USERPROFILE\.cargo\bin"
> ```

---

### 2. Клонируйте репозиторий

```bash
git clone https://github.com/TFsadReD/SportHub-Django.git
cd sporthub
```

---

### 3. Синхронизируйте зависимости

Запустите команду синхронизации. `uv` автоматически подтянет нужную версию Python, создаст `.venv` и установит точные версии пакетов из `uv.lock`:

```bash
uv sync
```

---

### 4. Установите переменные окружения в .env по примеру из файла

```toml
# settings.py
SECRET_KEY=Твой_Секретный_Ключ_Для_Джанго
DEBUG=True_или_False
```

---

### 5. Настройте базу данных и запустите сервер

1. **Примените миграции:**
```bash
uv run python manage.py migrate
```


2. **Создайте учетную запись администратора:**
```bash
uv run python manage.py createsuperuser
```


3. **Запустите локальный сервер разработки:**
```bash
uv run python manage.py runserver
```