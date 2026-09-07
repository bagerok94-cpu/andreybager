import type { Metadata } from 'next';
import { PageShell } from '@/components/layout';
import pageStyles from '@/components/layout/PageShell.module.css';
import { contentLayer } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const music = await contentLayer.getMusic();
  return {
    title: music.title,
    description: music.previewDesc,
  };
}

export default async function MusicPage() {
  const [music, tracks] = await Promise.all([
    contentLayer.getMusic(),
    contentLayer.getMusicTracks(),
  ]);

  return (
    <PageShell title={music.title} lead={music.previewDesc}>
      {tracks.length > 0 ? (
        <div className={pageStyles.list}>
          {tracks.map((track) => (
            <div key={track.id} className={pageStyles.item}>
              <span className={pageStyles.itemTitle}>{track.title}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className={pageStyles.empty}>
          <p className={pageStyles.emptyText}>{music.previewDesc}</p>
        </div>
      )}
    </PageShell>
  );
}
