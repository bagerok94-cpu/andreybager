import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { CMS_SECTIONS } from '@/types';
import {
  applySectionPayload,
  hasDraftChanges,
  mergeSectionPayloads,
  requireConfirmation,
} from './logic';
import { createStaticPublishedSnapshot } from './snapshot';

describe('CMS confirmation', () => {
  it('rejects publish without confirmation', () => {
    const result = requireConfirmation(false, 'publish');
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.error, /confirmation/i);
    }
  });

  it('rejects discard without confirmation', () => {
    const result = requireConfirmation(false, 'discard');
    assert.equal(result.ok, false);
  });

  it('allows publish with confirmation', () => {
    const result = requireConfirmation(true, 'publish');
    assert.equal(result.ok, true);
  });

  it('allows discard with confirmation', () => {
    const result = requireConfirmation(true, 'discard');
    assert.equal(result.ok, true);
  });
});

describe('draft / published separation', () => {
  it('hasDraftChanges is false for an empty list', () => {
    assert.equal(hasDraftChanges([]), false);
  });

  it('hasDraftChanges is true when a section changed', () => {
    assert.equal(hasDraftChanges(['hero']), true);
  });

  it('applying a hero draft does not mutate about in the published snapshot', () => {
    const published = createStaticPublishedSnapshot();
    const aboutBefore = published.about.openLead;
    const draftHero = {
      ...published.hero,
      taglineAccent: 'draft-only',
    };

    const draft = applySectionPayload(published, 'hero', draftHero);

    assert.equal(draft.hero.taglineAccent, 'draft-only');
    assert.equal(published.hero.taglineAccent, 'результат.');
    assert.equal(draft.about.openLead, aboutBefore);
    assert.equal(published.about.openLead, aboutBefore);
  });

  it('merge keeps static published values for sections without draft payload', () => {
    const published = createStaticPublishedSnapshot();
    const merged = mergeSectionPayloads(published, {
      settings: { ...published.settings, title: 'DRAFT TITLE' },
    });

    assert.equal(merged.settings.title, 'DRAFT TITLE');
    assert.deepEqual(merged.hero, published.hero);
    assert.equal(merged.projects.length, 0);
  });

  it('covers every CMS section', () => {
    assert.deepEqual([...CMS_SECTIONS], [
      'hero',
      'about',
      'portfolio',
      'services',
      'tools',
      'contacts',
      'music',
      'settings',
    ]);
  });
});
