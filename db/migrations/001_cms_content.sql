-- CMS content revisions
-- One current draft row and one current published row per section.
-- Apply on VPS: psql "$DATABASE_URL" -f db/migrations/001_cms_content.sql

CREATE TABLE IF NOT EXISTS content_revisions (
  id         BIGSERIAL PRIMARY KEY,
  section    TEXT NOT NULL,
  status     TEXT NOT NULL,
  version    INTEGER NOT NULL DEFAULT 1,
  payload    JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT content_revisions_section_check
    CHECK (section IN (
      'hero',
      'about',
      'portfolio',
      'services',
      'tools',
      'contacts',
      'music',
      'settings'
    )),
  CONSTRAINT content_revisions_status_check
    CHECK (status IN ('draft', 'published')),
  CONSTRAINT content_revisions_section_status_unique
    UNIQUE (section, status)
);

CREATE INDEX IF NOT EXISTS content_revisions_status_idx
  ON content_revisions (status);

CREATE INDEX IF NOT EXISTS content_revisions_section_status_idx
  ON content_revisions (section, status);
