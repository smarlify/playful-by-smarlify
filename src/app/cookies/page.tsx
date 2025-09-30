'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CookiesPage() {
  const router = useRouter();
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase(1);
    }, 1000);

    const timer2 = setTimeout(() => {
      setAnimationPhase(2);
    }, 3000);

    const timer3 = setTimeout(() => {
      setAnimationPhase(3);
    }, 5000);

    const timer4 = setTimeout(() => {
      setShowRedirectMessage(true);
    }, 7000);

    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white opacity-20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Cookie */}
        <div className="relative mb-8">
          <div
            className={`w-32 h-32 bg-amber-200 rounded-full border-4 border-amber-300 mx-auto transition-all duration-1000 ${
              animationPhase >= 1 ? 'scale-110' : 'scale-100'
            }`}
          >
            {/* Cookie texture */}
            <div className="absolute inset-2 bg-amber-100 rounded-full opacity-50"></div>
            
            {/* Chocolate chips */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 bg-amber-800 rounded-full transition-all duration-500 ${
                  animationPhase >= 2 ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
                style={{
                  left: `${20 + (i % 4) * 20}%`,
                  top: `${20 + Math.floor(i / 4) * 20}%`,
                }}
              />
            ))}
          </div>

          {/* Bite marks */}
          {animationPhase >= 2 && (
            <>
              <div className="absolute top-8 right-8 w-8 h-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-4 w-6 h-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-full animate-pulse"></div>
              <div className="absolute top-16 right-8 w-4 h-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-full animate-pulse"></div>
            </>
          )}
        </div>

        {/* Robot */}
        <div className="relative mb-8">
          <div
            className={`w-24 h-24 bg-gray-300 rounded-lg mx-auto transition-all duration-1000 ${
              animationPhase >= 1 ? 'animate-bounce' : ''
            }`}
          >
            {/* Robot face */}
            <div className="absolute inset-2 bg-gray-200 rounded-md">
              {/* Eyes */}
              <div className="absolute top-2 left-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              
              {/* Mouth */}
              <div
                className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-400 rounded-full transition-all duration-500 ${
                  animationPhase >= 1 ? 'scale-x-150' : 'scale-x-100'
                }`}
              ></div>
            </div>

            {/* Arms */}
            <div className="absolute -left-4 top-4 w-8 h-2 bg-gray-300 rounded-full"></div>
            <div className="absolute -right-4 top-4 w-8 h-2 bg-gray-300 rounded-full"></div>
          </div>

          {/* Nom nom text */}
          {animationPhase >= 1 && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold animate-bounce">
              NOM NOM NOM! 🍪
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="text-white space-y-4">
          <h1 className="text-4xl font-bold mb-4">
            {animationPhase === 0 && "🍪 Cookie Time! 🍪"}
            {animationPhase === 1 && "🤖 Robot Found Cookies! 🤖"}
            {animationPhase === 2 && "😋 Munching Away... 😋"}
            {animationPhase >= 3 && "✨ All Done! ✨"}
          </h1>
          
          <p className="text-xl opacity-90">
            {animationPhase === 0 && "Our friendly robot is about to enjoy some cookies..."}
            {animationPhase === 1 && "Look at that enthusiasm! The robot loves cookies!"}
            {animationPhase === 2 && "Crunch crunch crunch... delicious!"}
            {animationPhase >= 3 && "The robot is satisfied and ready to continue!"}
          </p>

          {showRedirectMessage && (
            <div className="mt-8 p-4 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
              <p className="text-lg font-semibold">
                Redirecting you back to the homepage in 3 seconds...
              </p>
              <div className="mt-2 w-full bg-white bg-opacity-30 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full animate-pulse w-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Floating cookie crumbs */}
        {animationPhase >= 2 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-amber-300 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* GA Event Tracking */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && window.trackEvent) {
              window.trackEvent('cookies_page_visit', {
                game_id: 'playful',
                game_name: 'Playful',
                event_category: 'page_interaction'
              });
            }
          `,
        }}
      />
    </div>
  );
}
