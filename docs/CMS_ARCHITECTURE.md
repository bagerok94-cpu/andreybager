# CMS Architecture

Фундамент управления контентом ANDREY BAGER.  
Telegram-бот и PostgreSQL подключаются позже. Публичный UI не меняется.

## Слои

```text
Telegram bot (future)
  → CMS API contracts (lib/api/cms.ts)
    → Draft / Publish domain (lib/content/draft.ts, publish.ts)
      → PostgreSQL (future)

Public UI
  → contentLayer (lib/content/index.ts)
    → только published
```

Public UI никогда не читает draft.

## Источники контента

| Режим | Источник | Кто читает |
|---|---|---|
| Published | `lib/content/data.ts` + `projects.ts` через `contentLayer` | сайт |
| Draft | in-memory adapter в `lib/content/draft.ts` | CMS / `/preview` |
| Preview | `getDraftContent()` | `/preview`, `noindex` |

In-memory draft не переживает рестарт процесса. После PostgreSQL snapshot будет в БД.

## Модель публикации: Publish All

```text
EDIT → SAVE DRAFT → PREVIEW → CONFIRM → PUBLISH ALL → public updated
DRAFT → DISCARD (confirm) → published version
```

Несколько разделов копятся в одном draft. Публикация — одна операция `publishAll({ confirmed: true })`.

Опасные действия (`publish`, `discard`, `delete`, `mass-change`) требуют `confirmed: true`.

## Секции Telegram-меню

`hero` `about` `portfolio` `services` `tools` `contacts` `music` `settings`

Список: `CMS_SECTIONS` в `types/cms.ts`.

## Preview

- Маршрут `/preview` не в навигации и не в sitemap
- `robots: noindex`
- Не подменяет production-контент
- Полноценный preview сайта появится вместе с авторизацией владельца

## Будущий PostgreSQL

Одна таблица ревизий / snapshots:

- `status`: `draft` | `published`
- `version`
- `payload` jsonb (`SiteContentSnapshot`)
- `changed_sections`
- timestamps

`contentLayer` начнёт читать `status = published`.  
CMS API будет писать `status = draft`, затем `publishAll` атомарно меняет published.

## Будущий Telegram-бот

1. Только владелец (`TELEGRAM_OWNER_ID`).
2. Меню по `CMS_SECTIONS`.
3. Сохранение всегда в draft.
4. Preview-ссылка на `/preview`.
5. Publish All и delete — только после подтверждения в чате.

## Медиа

`CmsMediaAsset.source`: `telegram` | `url`.  
Портфолио: cover + gallery. Музыка: `audioUrl` (mp3) + cover.  
Файлы пока не загружаются.

## Безопасность

- Public UI = published only
- `/preview` не индексируется
- Нет публичных CMS mutation endpoints
- Секреты только в env: `DATABASE_URL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_OWNER_ID`, `CMS_PREVIEW_SECRET`
- Подтверждение опасных операций обязательно
