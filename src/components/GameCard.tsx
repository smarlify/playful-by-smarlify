'use client';

import { Game } from '@/types';
import { Gamepad2, Clock, Zap, Github } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  const isComingSoon = game.status === 'coming-soon';

  return (
    <div 
      className={`game-card group ${isComingSoon ? 'opacity-75' : ''} overflow-hidden`}
      onClick={isComingSoon ? undefined : onClick}
    >
      {/* Game Thumbnail */}
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <div className={`aspect-video ${game.gradient} flex items-center justify-center relative`}>
          {isComingSoon ? (
            <div className="text-center">
              <Clock className="w-16 h-16 mx-auto mb-2 text-white/80" />
              <p className="text-white font-semibold">Coming Soon</p>
            </div>
          ) : (
            <div className="text-center">
              {/*
              <Play className="w-16 h-16 mx-auto mb-2 text-white/80 group-hover:text-white transition-colors" />
              <p className="text-white/80 group-hover:text-white font-semibold transition-colors">Play Now</p>
              */}
            </div>
          )}
          
                  {/* Hover Overlay */}
                  {!isComingSoon && (
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <Gamepad2 className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}
        </div>
        
        {/* Status Badge */}
        {/* <div className="absolute top-3 right-3">
          {isComingSoon ? (
            <span className="bg-yellow-500/90 text-black px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              Coming Soon
            </span>
          ) : (
            <span className="bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              Ready to play
            </span>
          )}
        </div> */}
      </div>

      {/* Game Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-colors">
            {game.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {game.shortDescription}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {game.tech.map((tech, index) => (
            <span 
              key={index}
              className="bg-white/10 text-white/80 px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4" />
            <span>Key Features</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {game.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium"
              >
                {feature}
              </span>
            ))}
            {game.features.length > 3 && (
              <span className="text-muted-foreground text-xs">
                +{game.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2">
          {isComingSoon ? (
            <button 
              disabled
              className="w-full text-white px-3 py-2 rounded-lg font-semibold text-sm cursor-not-allowed bg-gray-300/20 border-none inline-flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, hsl(0 0% 30%), hsl(0 0% 25%))',
                boxShadow: '0 25px 50px -12px hsl(0 0% 30% / 0.25)'
              }}
            >
              <Clock className="w-3 h-3 inline mr-1" />
              Coming Soon
            </button>
          ) : (
            <div className="flex gap-4">
              <button 
                className="w-[40%] text-white px-3 py-2 rounded-lg font-semibold text-sm cursor-pointer bg-gray-500/20 border-none inline-flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, hsl(330 91% 65%), hsl(340 82% 52%))',
                  boxShadow: '0 10px 25px -5px hsl(330 91% 65% / 0.25)'
                }}
                onClick={onClick}
              >
                        <Gamepad2 className="w-3 h-3 inline mr-1" />
                        Play {game.name}
              </button>
              {game.githubUrl && (
                <a
                  href={game.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[40%] text-white px-3 py-2 rounded-lg font-semibold text-sm cursor-pointer border-none inline-flex items-center justify-center transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, hsl(0 0% 20%), hsl(0 0% 15%))',
                    boxShadow: '0 10px 25px -5px hsl(0 0% 20% / 0.25)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-3 h-3 inline mr-1" />
                  Contribute on GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl ${game.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
    </div>
  );
}
