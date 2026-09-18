# Telegram-сповіщення про заявки

Сайт лишається статичним. Усі `form[data-lead]` надсилають заявку в окремий Cloudflare Worker, який перевіряє Turnstile та публікує повідомлення в закритому Telegram-чаті. Успіх на сайті з'являється лише після відпові Telegram. Заявки не зберігаються в окремій базі.

## Підготовка

1. Створіть **нового окремого** бота через `@BotFather`. Не використовуйте клієнтського `@astraispbot` для цих заявок.
2. Створіть закриту групу менеджерів, додайте до неї бота й надішліть команду `/start` (за потреби `/start@НазваБота`). ID групи можна отримати через `getUpdates` у локальному терміналі. Наприклад, у PowerShell: `$token = Read-Host 'Bot token'`, потім `(Invoke-RestMethod "https://api.telegram.org/bot$token/getUpdates").result.message.chat.id`. Збережіть від'ємний ID групи. Нікому не надсилайте токен у чат і не додавайте його в URL сайту.
3. У Cloudflare Turnstile створіть widget для домену сайту (наприклад, `astra.in.ua`). Збережіть публічний **site key** і приватний **secret key**. Для іншого домену після переїзду додайте його до дозволених hostname.

## Worker

У каталозі `b2b-cms/worker` виконайте `npx wrangler login`, а потім `npx wrangler deploy`. Перший деплой створить адресу виду `https://astra-b2b-leads.<ваш-субдомен>.workers.dev`.

Задайте секрети для Worker (кожна команда запитає значення, не пишіть його у файлах):

```powershell
npx wrangler secret put TG_BOT_TOKEN
npx wrangler secret put TG_CHAT_ID
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put ALLOWED_ORIGINS
```

`ALLOWED_ORIGINS` має містити точні origin сайту через кому, без шляху й кінцевого `/`, наприклад `https://astra.in.ua,https://www.astra.in.ua`. Для локального тесту можна додати `http://127.0.0.1:4321`. CORS не є захистом від спаму сам по собі: Worker також перевіряє токен Turnstile на сервері та його hostname.

## Сайт

У змінних середовища хостингу сайту задайте:

```text
PUBLIC_LEAD_ENDPOINT=https://astra-b2b-leads.<ваш-субдомен>.workers.dev
PUBLIC_TURNSTILE_SITE_KEY=<публічний site key>
```

Після цього перебудуйте й опублікуйте статичний сайт. Для локальної розробки ті самі значення можна записати в `b2b-cms/.env` (він ігнорується Git). **Не** додавайте туди токен Telegram або Turnstile secret: вони мають жити лише в секретах Worker.

Перевірте тестову заявку з модалки й інлайн-форми: повідомлення має з'явитися в групі, а сайт показати «Вашу заявку прийнято». Потім тимчасово вимкніть бота або вкажіть тестовий недійсний ID чату: сайт має показати помилку, не успіх. Поверніть правильний ID після перевірки.

При зміні хостингу сайту Worker і Telegram-чат залишаються окремими. Потрібно оновити `ALLOWED_ORIGINS`, hostname Turnstile та `PUBLIC_*` змінні на новому хостингу. Також доповніть політику конфіденційності інформацією про передавання даних заявки до Telegram.
