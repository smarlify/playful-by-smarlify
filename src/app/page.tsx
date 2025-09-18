'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gamepad2, Zap, Star, Trophy, Users } from 'lucide-react';
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
              <h1 className="mb-6 text-white font-bold">
                <span className="inline-block -rotate-1 text-5xl md:text-7xl relative -left-2">Playful</span>
                <span className="inline-block rotate-0 text-2xl md:text-3xl px-4 -top-1 relative opacity-50">by</span>
                <span className="inline-block rotate-1 text-3xl md:text-5xl text-gradient">Smarlify</span>
              </h1>
              <p className="text-xl md:text-2xl text-gaming max-w-3xl mx-auto mb-8">
                Experience the ultimate gaming hub with cutting-edge games<br />
                built with Three.js, WebGL, Unity 3D and other.
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
                  <div className="aspect-video w-full md:w-1/2 rounded-xl relative overflow-hidden">
                    <img 
                      src={featuredGame.thumbnail} 
                      alt={featuredGame.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 ${featuredGame.gradient} opacity-30`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Gamepad2 className="w-16 h-16 text-white/80" />
                    </div>
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
                      <Gamepad2 className="w-5 h-5 inline mr-2" />
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
              From high-speed racing to endless running and dodging, discover our collection of premium games.
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
              Built with cutting-edge technologies for the best gaming experience.
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
      <footer className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                <span className="inline-block -rotate-1 text-3xl md:text-4xl">Playful</span>
                <span className="inline-block rotate-0 text-lg md:text-xl px-3 -top-1 relative opacity-50">by</span>
                <span className="inline-block rotate-1 text-2xl md:text-3xl text-gradient">Smarlify</span>
              </h3>
              <p className="text-gray-200">The ultimate gaming hub for modern games</p>
            </div>
            
            {/* Credits */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <span>Designed by</span>
                <a 
                  href="https://lovable.dev?utm_source=playful&utm_medium=referral&utm_campaign=footer"
            target="_blank"
            rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-200 hover:text-pink-500 transition-colors duration-300 group"
          >
                  <img src="/lovable-logo.svg" alt="Lovable" className="w-4 h-4 brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                  Lovable
          </a>
        </div>
              
              <div className="flex items-center gap-2">
                <span>Fine-tuned with</span>
        <a
                  href="https://cursor.sh?utm_source=playful&utm_medium=referral&utm_campaign=footer"
          target="_blank"
          rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-200 hover:text-pink-500 transition-colors duration-300 group"
                >
                  <img src="/cursor-logo.svg" alt="Cursor" className="w-4 h-4 brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                  Cursor
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <span>Powered by</span>
                <a 
                  href="https://heroku.com?utm_source=playful&utm_medium=referral&utm_campaign=footer"
          target="_blank"
          rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-200 hover:text-pink-500 transition-colors duration-300 group"
                >
                  <img src="/heroku-logo.svg" alt="Heroku" className="w-4 h-4 brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                  Heroku
                </a>
              </div>
            </div>
            
            {/* Copyright */}
            {/*
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-4">
                <span>Made by</span>
                <a 
                  href="https://smarlify.co?utm_source=playful&utm_medium=referral&utm_campaign=footer"
          target="_blank"
          rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-400 hover:text-pink-500 transition-colors duration-300 group"
                >
                  <img src="/smarlify-white.svg" alt="Smarlify" className="w-4 h-4 brightness-0 invert group-hover:scale-110 transition-transform duration-300" />
                  Smarlify
                </a>
              </div>
            */}
            
            <div className="text-xs text-gray-400">
              <p>All games are free to play. No registration required.</p>
              <p className='mt-2'>&copy; {new Date().getFullYear()} Smarlify.co. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
