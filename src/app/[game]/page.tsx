import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGameById } from '@/data/games';
import GameIframe from '@/components/GameIframe';

interface GamePageProps {
  params: {
    game: string;
  };
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { game: gameId } = await params;
  const game = getGameById(gameId);
  
  if (!game) {
    return {
      title: 'Game Not Found - Playful',
      description: 'The requested game could not be found.',
    };
  }

  return {
    title: `${game.name} - Playful`,
    description: game.description,
    keywords: [game.name, ...game.tech, 'web game', 'browser game', 'Smarlify', 'Playful'],
    openGraph: {
      title: `${game.name} - Playful`,
      description: game.description,
      type: 'website',
      url: `https://play.smarlify.co/${game.id}`,
      images: [
        {
          url: game.thumbnail,
          width: 1200,
          height: 630,
          alt: `${game.name} - Web Game`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.name} - Playful`,
      description: game.description,
      images: [game.thumbnail],
    },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { game: gameId } = await params;
  const game = getGameById(gameId);
  
  if (!game) {
    notFound();
  }

  return <GameIframe game={game} />;
}
