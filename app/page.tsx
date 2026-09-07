import { Hero } from '@/components/hero';
import { CardsDashboard } from '@/components/cards';
import { contentLayer } from '@/lib/content';

export default async function HomePage() {
  const [home, projects, tracks] = await Promise.all([
    contentLayer.getHome(),
    contentLayer.getPortfolioProjects(),
    contentLayer.getMusicTracks(),
  ]);

  return (
    <>
      <Hero content={home.hero} />
      <CardsDashboard content={home} projects={projects} tracks={tracks} />
    </>
  );
}
