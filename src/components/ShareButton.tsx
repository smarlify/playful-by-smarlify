'use client';

import { useState } from 'react';
import { Share2, Copy, Check, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Game } from '@/types';

interface ShareButtonProps {
  game: Game;
  className?: string;
}

export default function ShareButton({ game, className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const gameUrl = `https://playful.smarlify.co/${game.id}`;
  const shareText = `Check out ${game.name} - ${game.shortDescription}. Play for free at Playful by Smarlify! 🎮`;
  const shareTitle = `${game.name} - Play Online | Playful by Smarlify`;

  const handleWebShare = async () => {
    // Track share button click event
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('share_button_click', {
        game_id: game.id,
        game_name: game.name,
        event_category: 'social_interaction'
      });
    }
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: gameUrl,
        });
        setShowShareMenu(false);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const handleCopyLink = async () => {
    // Track copy link event
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('copy_link_click', {
        game_id: game.id,
        game_name: game.name,
        event_category: 'social_interaction'
      });
    }
    
    try {
      await navigator.clipboard.writeText(gameUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setShowShareMenu(false);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSocialShare = (platform: string) => {
    // Track social share event
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('social_share_click', {
        game_id: game.id,
        game_name: game.name,
        platform: platform,
        event_category: 'social_interaction'
      });
    }
    
    let url = '';
    
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(gameUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(gameUrl)}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleWebShare}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
      >
        <Share2 className="w-4 h-4" />
        <span className="font-medium">Share Game</span>
      </button>

      {showShareMenu && (
        <div className="absolute top-full left-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 min-w-[200px]">
          <div className="p-2">
            <div className="text-xs text-gray-400 mb-2 px-2">Share {game.name}</div>
            
            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-800 rounded-md transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
              <span className={copied ? 'text-green-400' : 'text-gray-300'}>
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </button>

            {/* Social Media Shares */}
            <div className="border-t border-gray-700 my-2"></div>
            
            <button
              onClick={() => handleSocialShare('twitter')}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-800 rounded-md transition-colors"
            >
              <Twitter className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">Twitter</span>
            </button>
            
            <button
              onClick={() => handleSocialShare('facebook')}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-800 rounded-md transition-colors"
            >
              <Facebook className="w-4 h-4 text-blue-500" />
              <span className="text-gray-300">Facebook</span>
            </button>
            
            <button
              onClick={() => handleSocialShare('linkedin')}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-800 rounded-md transition-colors"
            >
              <Linkedin className="w-4 h-4 text-blue-600" />
              <span className="text-gray-300">LinkedIn</span>
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close menu */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
}
