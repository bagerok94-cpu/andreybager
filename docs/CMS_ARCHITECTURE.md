# CMS Architecture

Управление контентом ANDREY BAGER.  
Telegram-бот подключается позже. Публичный UI не меняется.

## Слои

```text
Telegram bot (future)
  → CMS API contracts (lib/api/cms.ts)
    → draft / publish (lib/content/draft.ts, publish.ts)
      → CMS repository (lib/content/repository.ts)
        → PostgreSQL (lib/db)

Public UI
  → contentLayer (lib/content/index.ts)
    → published snapshot
      → PostgreSQL если есть DATABASE_URL
      → иначе static lib/content/data.ts
```

Public UI никогда не читает draft и не ходит в SQL напрямую.

## PostgreSQL schema

Таблица `content_revisions` — `db/migrations/001_cms_content.sql`

| Колонка | Назначение |
|---|---|
| `id` | unique revision id |
| `section` | hero, about, portfolio, services, tools, contacts, music, settings |
| `status` | `draft` \| `published` |
| `version` | монотонный номер |
| `payload` | JSONB секции |
| `created_at` / `updated_at` | timestamps |

Unique `(section, status)`: одна текущая draft и одна published запись на раздел.

Миграция на VPS:

```bash
npm run db:migrate
# или: psql "$DATABASE_URL" -f db/migrations/001_cms_content.sql
```

ORM не используется — только `pg` + SQL.

## Repository

`lib/content/repository.ts` — единственный слой SQL.

Операции:

- `getPublishedContent()`
- `getDraftContent()`
- `getDraftSection(section)`
- `saveDraftSection(section, payload)`
- `hasDraftChanges()`
- `publishAll({ confirmed })`
- `discardDraft({ confirmed })`

Telegram-бот на следующем этапе должен вызывать этот слой, не SQL.

## Publish All (транзакция)

```text
EDIT → SAVE DRAFT → PREVIEW → CONFIRM → PUBLISH ALL → public updated
DRAFT → DISCARD (confirm) → published version
```

`publishAll` в одной PostgreSQL-транзакции:

1. `SELECT … WHERE status = 'draft' FOR UPDATE`
2. upsert каждой секции в `status = 'published'`
3. `DELETE` всех draft
4. `COMMIT`

Ошибка → `ROLLBACK`. Частичной публикации нет.

Без `confirmed: true` операция не выполняется.

## Fallback без DATABASE_URL

- Public UI берёт static published (`data.ts` / `projects.ts`)
- CMS-операции идут в in-memory store (не переживает рестарт)
- `npm run build` / CI не подключаются к Postgres
- Пустая таблица после миграции тоже даёт static fallback, пока не будет Publish All

## Server-only

`import 'server-only'` в:

- `lib/env.ts`
- `lib/db/index.ts`
- `lib/content/repository.ts`
- `lib/content/draft.ts`
- `lib/content/publish.ts`
- `lib/content/index.ts`

`DATABASE_URL` не попадает в client bundle. Секреты только в env, не в git.

## Preview

`/preview` — `noindex`, не в nav/sitemap.  
Repository уже отдаёт draft; полноценный авторизованный preview сайта — следующий этап.

## Безопасность

- Public UI = published only
- Нет публичных CMS mutation endpoints
- Опасные операции только с confirmation
- `.env` / `.env.local` в `.gitignore`

## Тесты

Чистая логика без Postgres:

```bash
npm test
```

Проверяет confirmation, hasDraftChanges и то, что draft одной секции не портит published другой.
