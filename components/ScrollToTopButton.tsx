import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  style: React.CSSProperties;
  colorClass: string;
}

const PARTICLE_COUNT = 70;
const COLORS = ['bg-red-400', 'bg-orange-400', 'bg-green-400', 'bg-blue-400', 'bg-yellow-300'];

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [explosionStyle, setExplosionStyle] = useState<React.CSSProperties>({ opacity: 0, pointerEvents: 'none' });
  const rocketContainerRef = useRef<HTMLDivElement>(null);

  const sparks = React.useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    style: {
      animationDelay: `${Math.random() * 0.6}s`,
      left: `calc(50% + ${Math.random() * 8 - 4}px)`,
    }
  })), []);

  const createExplosion = () => {
    const newParticles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * 360;
      const distance = Math.random() * 90 + 70;
      const size = Math.random() * 5 + 3;
      const x = distance * Math.cos(angle * Math.PI / 180);
      const y = distance * Math.sin(angle * Math.PI / 180);

      return {
        id: Math.random(),
        colorClass: COLORS[Math.floor(Math.random() * COLORS.length)],
        style: {
          top: '50%',
          left: '50%',
          width: `${size}px`,
          height: `${size}px`,
          marginTop: `-${size / 2}px`,
          marginLeft: `-${size / 2}px`,
          '--transform-end': `translate(${x}px, ${y}px)`,
        } as React.CSSProperties & { [key: string]: any },
      };
    });
    setParticles(newParticles);

    setTimeout(() => {
      setParticles([]);
      setExplosionStyle({ opacity: 0, pointerEvents: 'none' });
      setIsAnimating(false); // Reset animation state after explosion is done
    }, 1000); // Matches particle animation duration
  };

  const toggleVisibility = () => {
    if (window.scrollY > window.innerHeight / 2 && !isAnimating) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };


  const handleClick = () => {
    setIsAnimating(true);

    const startY = window.scrollY;
    const duration = 1500; // Slower speed
    let startTime: number | null = null;
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const heroHeader = document.getElementById('hero-header');
    const heroHeight = heroHeader ? heroHeader.offsetHeight : window.innerHeight * 0.6;
    const finalRocketBottom = window.innerHeight - heroHeight;

    const animationStep = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY * (1 - easedProgress));

      if (rocketContainerRef.current) {
        const startBottom = 20;
        const travelPath = finalRocketBottom - startBottom;
        const currentBottom = startBottom + travelPath * easedProgress;
        rocketContainerRef.current.style.bottom = `${currentBottom}px`;
      }

      if (progress < 1) {
        requestAnimationFrame(animationStep);
      } else {
        if (rocketContainerRef.current) {
          rocketContainerRef.current.style.opacity = '0';
        }

        setExplosionStyle({
          position: 'fixed',
          // Position explosion where rocket ends
          bottom: `${finalRocketBottom}px`,
          right: '40px', // Matches rocket's horizontal position
          transform: 'translateX(50%)', // Centers the explosion origin
          opacity: 1,
          zIndex: 50,
        });

        createExplosion();
      }
    };

    requestAnimationFrame(animationStep);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={handleClick}
          className={`w-12 h-12 flex items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 ease-in-out ${(isVisible && !isAnimating) ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}
          aria-label="Volver arriba"
          title="Volver arriba"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M12 19V5"></path>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>
      </div>

      {isAnimating && (
        <div ref={rocketContainerRef} className="firework-rocket-container transition-opacity duration-200">
          <div className="firework-rocket">
            {sparks.map(spark => (
              <div key={spark.id} className="rocket-spark" style={spark.style} />
            ))}
          </div>
        </div>
      )}

      {/* This div is now positioned by style state */}
      <div style={explosionStyle}>
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full pointer-events-none animate-particle-fly will-change-transform will-change-opacity ${p.colorClass}`}
            style={p.style}
          />
        ))}
      </div>
    </>
  );
};

export default ScrollToTopButton;