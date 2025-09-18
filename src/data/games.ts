import { Game } from '@/types';

export const games: Game[] = [
  {
    id: 'traffic-run',
    name: 'Traffic Run',
    description: 'Experience the thrill of high-speed racing in this 2.5D racing game. Navigate through busy traffic, avoid collisions, and reach the finish line as fast as possible. Built with Three.js for stunning 3D graphics and smooth gameplay.',
    shortDescription: 'High-speed 2.5D racing through busy traffic',
    thumbnail: '/game-assets/traffic-run-thumb.jpg',
    url: 'https://traffic-run.play.smarlify.co',
    status: 'published',
    tech: ['Three.js', 'TypeScript', 'WebGL'],
    features: ['3D Graphics', 'Realistic Physics', 'Multiple Levels', 'Score System'],
    color: 'from-pink-500 to-rose-600',
    gradient: 'bg-gradient-to-br from-pink-500 to-rose-600'
  },
  {
    id: 'crossy-road',
    name: 'Crossy Road',
    description: 'Jump, dodge, and survive in this endless runner inspired by the classic Crossy Road. Navigate through obstacles, collect coins, and see how far you can go. Features beautiful 2.5D graphics and addictive gameplay.',
    shortDescription: 'Endless runner with obstacles and coins',
    thumbnail: '/game-assets/crossy-road-thumb.jpg',
    url: 'https://crossy-road.play.smarlify.co',
    status: 'published',
    tech: ['React Three Fiber', 'Zustand', 'TypeScript'],
    features: ['Endless Gameplay', 'Coin Collection', 'Obstacle Avoidance', 'High Scores'],
    color: 'from-blue-500 to-cyan-600',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600'
  },
  {
    id: 'space-shooter',
    name: 'Space Shooter',
    description: 'Defend Earth from alien invaders in this classic 2D space shooter. Pilot your spacecraft, destroy enemies, and survive wave after wave of attacks. Built with WebGL for smooth 60fps gameplay.',
    shortDescription: 'Classic 2D space shooter with WebGL graphics',
    thumbnail: '/game-assets/space-shooter-thumb.jpg',
    url: 'https://space-shooter.play.smarlify.co',
    status: 'published',
    tech: ['WebGL', 'Vanilla JS', 'Three.js'],
    features: ['2D Graphics', 'Wave-based Gameplay', 'Power-ups', 'Boss Battles'],
    color: 'from-purple-500 to-indigo-600',
    gradient: 'bg-gradient-to-br from-purple-500 to-indigo-600'
  },
  {
    id: 'crazy-vacuum-3d',
    name: 'Crazy Vacuum 3D',
    description: 'Coming soon! Experience the ultimate 3D vacuum cleaning adventure. Navigate through challenging levels, collect debris, and master the art of cleaning in this innovative 3D puzzle game.',
    shortDescription: '3D vacuum cleaning puzzle adventure',
    thumbnail: '/game-assets/crazy-vacuum-thumb.jpg',
    url: '#',
    status: 'coming-soon',
    tech: ['Three.js', 'WebGL', 'TypeScript'],
    features: ['3D Graphics', 'Puzzle Solving', 'Physics Simulation', 'Level Progression'],
    color: 'from-yellow-500 to-orange-600',
    gradient: 'bg-gradient-to-br from-yellow-500 to-orange-600'
  }
];

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};

export const getPublishedGames = (): Game[] => {
  return games.filter(game => game.status === 'published');
};

export const getComingSoonGames = (): Game[] => {
  return games.filter(game => game.status === 'coming-soon');
};
