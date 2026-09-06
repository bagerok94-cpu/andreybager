# ANDREY BAGER

Персональный веб-сайт и портфолио Андрея Багера.

## Стек технологий

- **Фреймворк**: Next.js 15 (App Router)
- **Язык**: TypeScript
- **Рендеринг**: React 19
- **Линтинг**: ESLint (`next/core-web-vitals`)
- **База данных (архитектурно)**: PostgreSQL
- **Стилизация**: CSS Modules / Vanilla CSS (без Tailwind CSS)

## Архитектура

Проект построен на четком разделении слоев ответственности:

```text
UI (React Components)
  ↓
Content Layer (lib/content)
  ↓
API / Services (lib/api)
  ↓
Data Layer (lib/db) → PostgreSQL
```

- React-компоненты **никогда** не обращаются напрямую к базе данных.
- Контент отделен от визуального представления через типизированные интерфейсы в `types/` и `lib/content/`.
- Переменные окружения безопасно валидируются и считываются на сервере через `lib/env.ts`.

## Структура проекта

```text
app/                 # Next.js App Router страницы и макеты
components/          # Изолированные UI и доменные компоненты
  layout/
  ui/
  cards/
  navigation/
  music/
lib/                 # Бизнес-логика, утилиты и интеграции
  api/               # API контракты и хелперы
  content/           # Слой поставщиков контента
  db/                # Слой доступа к данным (PostgreSQL)
  env.ts             # Серверное чтение переменных окружения
public/              # Статические ассеты
types/               # Общие TypeScript интерфейсы и типы
.agents/             # Архитектурные правила и инструкции для субагентов
```

## Переменные окружения (.env)

Скопируйте пример окружения:
```bash
cp .env.example .env.local
```

Необходимые переменные:
- `DATABASE_URL`: Строка подключения к PostgreSQL
- `TELEGRAM_BOT_TOKEN`: Токен Telegram-бота для уведомлений/интеграций

## Установка и запуск

1. Установка зависимостей:
```bash
npm install
```

2. Запуск в режиме разработки:
```bash
npm run dev
```

3. Проверка типов и сборка:
```bash
npm run build
```

4. Запуск продакшн-сервера:
```bash
npm run start
```
