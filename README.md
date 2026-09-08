# ANDREY BAGER

Персональный веб-сайт и портфолио Андрея Багера.

Домен: [andreybager.ru](https://andreybager.ru)

## Стек технологий

- **Фреймворк**: Next.js 15 (App Router)
- **Язык**: TypeScript
- **Рендеринг**: React 19
- **Линтинг**: ESLint (`next/core-web-vitals`)
- **Стилизация**: CSS Modules / Vanilla CSS (без Tailwind CSS)

PostgreSQL, CMS и Telegram заложены в архитектуре, но пока не подключены.

## Архитектура

```text
UI (React Components)
  ↓
Content Layer (lib/content)
  ↓
API / Services (lib/api)      ← заглушка
  ↓
Data Layer (lib/db) → PostgreSQL   ← заглушка
```

- React-компоненты **никогда** не обращаются напрямую к базе данных.
- Контент отделён от визуального представления через `lib/content` и `types/`.
- Сейчас контент статический. Позже `ContentProvider` сможет читать PostgreSQL без смены UI.

## Структура проекта

```text
app/                 # Next.js App Router
components/
  layout/
  cards/
  navigation/
  portfolio/
  hero/
lib/
  content/           # слой контента (источник для UI)
  api/               # будущие API-контракты
  db/                # будущий PostgreSQL
  env.ts             # серверные переменные окружения
public/
types/
```

## Переменные окружения

Для локального запуска сайт **не требует** секретов.

```bash
cp .env.example .env.local
```

Поля в `.env.example` нужны только для будущих интеграций:

- `DATABASE_URL`
- `TELEGRAM_BOT_TOKEN`

Не коммитьте реальные `.env` файлы.

## Установка и запуск

```bash
npm install
npm run dev
```

Проверки:

```bash
npm run lint
npm run build
```

Продакшн-сервер после сборки:

```bash
npm run start
```
