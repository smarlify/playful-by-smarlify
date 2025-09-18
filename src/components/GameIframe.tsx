'use client';

import { Game } from '@/types';
import { ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface GameIframeProps {
  game: Game;
}

export default function GameIframe({ game }: GameIframeProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleBack = () => {
    router.push('/');
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    // Force iframe reload by changing key
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Games</span>
              </button>
              
              <div className="h-6 w-px bg-white/20" />
              
              <div>
                <h1 className="text-xl font-bold text-white">{game.name}</h1>
                <p className="text-sm text-muted-foreground">{game.shortDescription}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Open in New Tab</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Game Container */}
      <div className="relative">
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/80 backdrop-blur-md">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-white/80">Loading {game.name}...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/80 backdrop-blur-md">
            <div className="text-center max-w-md mx-auto p-6">
              <div className="bg-destructive/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Game Failed to Load</h3>
              <p className="text-muted-foreground mb-6">
                There was an error loading {game.name}. Please check your connection and try again.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleRefresh}
                  className="btn-gaming"
                >
                  <RefreshCw className="w-4 h-4 inline mr-2" />
                  Try Again
                </button>
                <button
                  onClick={handleBack}
                  className="btn-neon"
                >
                  <ArrowLeft className="w-4 h-4 inline mr-2" />
                  Back to Games
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Iframe */}
        <div className="relative w-full h-[calc(100vh-4rem)]">
          <iframe
            src={game.url}
            className="game-iframe w-full h-full"
            title={game.name}
            onLoad={handleLoad}
            onError={handleError}
            allow="fullscreen; gamepad; microphone; camera"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation"
          />
        </div>
      </div>

      {/* Game Info Footer */}
      <div className="bg-card/50 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>Tech: {game.tech.join(', ')}</span>
              <span>•</span>
              <span>Features: {game.features.slice(0, 2).join(', ')}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Powered by Smarlify</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
