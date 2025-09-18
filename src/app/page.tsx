'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Zap, Star, Gamepad2, Trophy, Users } from 'lucide-react';
import GameCard from '@/components/GameCard';
import { games } from '@/data/games';

export default function Home() {
  const router = useRouter();
  const [featuredGame] = useState(games[0]); // Traffic Run as featured

  const handleGameClick = (gameId: string) => {
    router.push(`/${gameId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gaming">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                <span className="text-gradient">Playful</span>
              </h1>
              <p className="text-xl md:text-2xl text-gaming max-w-3xl mx-auto mb-8">
                Experience the ultimate gaming hub with cutting-edge web games built with Three.js, WebGL, and modern web technologies.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="gaming-card p-6 text-center">
                <Gamepad2 className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-sm text-muted-foreground">Games</div>
              </div>
              <div className="gaming-card p-6 text-center">
                <Zap className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">60fps</div>
                <div className="text-sm text-muted-foreground">Performance</div>
              </div>
              <div className="gaming-card p-6 text-center">
                <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-sm text-muted-foreground">High Scores</div>
              </div>
              <div className="gaming-card p-6 text-center">
                <Users className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">Free</div>
                <div className="text-sm text-muted-foreground">To Play</div>
              </div>
            </div>

            {/* Featured Game */}
            <div className="max-w-4xl mx-auto">
              <div className="gaming-card p-8 text-left">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className={`aspect-video w-full md:w-1/2 ${featuredGame.gradient} rounded-xl flex items-center justify-center`}>
                    <Play className="w-16 h-16 text-white/80" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-accent" />
                      <span className="text-accent font-semibold">Featured Game</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3">{featuredGame.name}</h2>
                    <p className="text-gaming mb-4">{featuredGame.description}</p>
                    <button
                      onClick={() => handleGameClick(featuredGame.id)}
                      className="btn-gaming"
                    >
                      <Play className="w-5 h-5 inline mr-2" />
                      Play {featuredGame.name}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your <span className="text-gradient">Adventure</span>
            </h2>
            <p className="text-xl text-gaming max-w-2xl mx-auto">
              From high-speed racing to endless running, discover our collection of premium web games.
            </p>
          </div>

          <div className="games-grid">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => handleGameClick(game.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-gradient">Our Games</span>
            </h2>
            <p className="text-xl text-gaming max-w-2xl mx-auto">
              Built with cutting-edge web technologies for the best gaming experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="gaming-card p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-gaming">
                Optimized for 60fps gameplay with WebGL and Three.js for smooth, responsive gaming.
              </p>
            </div>

            <div className="gaming-card p-8 text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gamepad2 className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">No Downloads</h3>
              <p className="text-gaming">
                Play instantly in your browser - no downloads, no installations, just pure gaming fun.
              </p>
            </div>

            <div className="gaming-card p-8 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Global Leaderboards</h3>
              <p className="text-gaming">
                Compete with players worldwide and climb the leaderboards in each game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gradient mb-2">Playful</h3>
              <p className="text-gaming">The ultimate gaming hub for web games</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-6">
              <span>Built by Smarlify</span>
              <span>•</span>
              <span>Powered by Heroku</span>
              <span>•</span>
              <span>© 2025 Smarlify.co</span>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>All games are free to play. No registration required.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
