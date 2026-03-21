
import React from 'react';

const CONFETTI_COUNT = 37;
const COLORS = ['bg-red-400', 'bg-orange-400', 'bg-green-400', 'bg-blue-400', 'bg-yellow-300'];

const ConfettiBackground: React.FC = () => {
  const confettiPieces = React.useMemo(() => {
    return Array.from({ length: CONFETTI_COUNT }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 5 + 8}s`, // 8 to 13 seconds
        animationDelay: `${Math.random() * 10}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      },
      colorClass: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none overflow-hidden" aria-hidden="true">
      {confettiPieces.map(piece => (
        <div
          key={piece.id}
          className={`fixed top-[-20px] w-1.5 h-2.5 animate-fall will-change-transform will-change-opacity ${piece.colorClass}`}
          style={piece.style}
        />
      ))}
    </div>
  );
};

export default ConfettiBackground;