'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  sparkle: boolean;
  sparkleTimer: number;
  shape: 'circle' | 'square' | 'triangle';
  rotation: number;
  rotationSpeed: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Gaming-themed colors - balanced transparency
    const colors = [
      'rgba(236, 72, 153, 0.2)', // Pink
      'rgba(59, 130, 246, 0.2)',  // Blue
      'rgba(245, 158, 11, 0.2)',  // Yellow
      'rgba(34, 197, 94, 0.2)',   // Green
      'rgba(168, 85, 247, 0.2)',  // Purple
      'rgba(239, 68, 68, 0.2)',   // Red
      'rgba(14, 165, 233, 0.2)',  // Sky Blue
      'rgba(251, 191, 36, 0.2)',  // Amber
    ];

    const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
    const numParticles = 80;

    // Resize canvas
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };

    // Create particles
    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < numParticles; i++) {
        const size = Math.random() * 6 + 2;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = (Math.random() - 0.5) * 1.5;
        const speedY = (Math.random() - 0.5) * 1.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.3 + 0.1;
        const sparkle = Math.random() < 0.1; // 10% chance to sparkle
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const rotation = Math.random() * Math.PI * 2;
        const rotationSpeed = (Math.random() - 0.5) * 0.1;

        particlesRef.current.push({
          x,
          y,
          size,
          speedX,
          speedY,
          color,
          opacity,
          sparkle,
          sparkleTimer: 0,
          shape,
          rotation,
          rotationSpeed,
        });
      }
    };

    // Update particle
    const updateParticle = (particle: Particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.rotation += particle.rotationSpeed;

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX *= -1;
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY *= -1;
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      }

      // Update sparkle effect
      if (particle.sparkle) {
        particle.sparkleTimer += 0.1;
        particle.opacity = 0.1 + Math.sin(particle.sparkleTimer) * 0.2;
      }
    };

    // Draw particle
    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);

      if (particle.sparkle) {
        // Add sparkle effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
      }

      switch (particle.shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'square':
          ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -particle.size);
          ctx.lineTo(-particle.size, particle.size);
          ctx.lineTo(particle.size, particle.size);
          ctx.closePath();
          ctx.fill();
          break;
      }

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particlesRef.current.forEach(particle => {
        updateParticle(particle);
        drawParticle(particle);
      });

      // Draw connections between nearby particles
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = (120 - distance) / 120 * 0.03;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    createParticles();
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ 
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ 
          background: 'transparent',
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}
