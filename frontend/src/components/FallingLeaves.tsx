import { useMemo } from 'react';

const LEAF_COUNT = 25;

const LEAF_COLORS = [
  '#2d5a27',
  '#1e4d2b',
  '#3a7d32',
  '#336b2c',
  '#245a1e',
  '#4a8c3f',
];

// Several distinct leaf SVG shapes for variety
const LEAF_PATHS = [
  // Broad oval leaf
  'M10 0 C15 4, 18 12, 15 22 C13 28, 10 30, 10 30 C10 30, 7 28, 5 22 C2 12, 5 4, 10 0 Z',
  // Pointed maple-ish leaf
  'M10 0 C12 5, 18 8, 16 14 C14 18, 12 16, 10 20 C8 16, 6 18, 4 14 C2 8, 8 5, 10 0 Z',
  // Elongated willow leaf
  'M10 0 C13 6, 14 14, 12 24 C11 28, 10 30, 10 30 C10 30, 9 28, 8 24 C6 14, 7 6, 10 0 Z',
  // Round leaf
  'M10 2 C16 2, 20 8, 18 16 C16 22, 12 26, 10 28 C8 26, 4 22, 2 16 C0 8, 4 2, 10 2 Z',
];

interface LeafData {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayAmount: number;
  rotation: number;
  opacity: number;
  color: string;
  path: string;
}

function generateLeaves(): LeafData[] {
  return Array.from({ length: LEAF_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 14 + Math.random() * 18,
    duration: 10 + Math.random() * 14,
    delay: -(Math.random() * 20),
    swayAmount: 30 + Math.random() * 60,
    rotation: Math.random() * 360,
    opacity: 0.25 + Math.random() * 0.45,
    color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
    path: LEAF_PATHS[Math.floor(Math.random() * LEAF_PATHS.length)],
  }));
}

export default function FallingLeaves() {
  const leaves = useMemo(generateLeaves, []);

  return (
    <>
      <style>{`
        .falling-leaves-container {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        @keyframes leafFall {
          0% {
            transform: translateY(-5vh) rotate(var(--start-rot));
          }
          100% {
            transform: translateY(105vh) rotate(calc(var(--start-rot) + 720deg));
          }
        }

        @keyframes leafSway {
          0%, 100% {
            translate: calc(var(--sway) * -0.5) 0;
          }
          50% {
            translate: calc(var(--sway) * 0.5) 0;
          }
        }

        .leaf-wrapper {
          position: absolute;
          top: 0;
          animation: leafFall var(--fall-duration) linear infinite;
          animation-delay: var(--fall-delay);
        }

        .leaf-inner {
          animation: leafSway var(--sway-duration) ease-in-out infinite;
          animation-delay: var(--fall-delay);
          will-change: translate;
        }
      `}</style>
      <div className="falling-leaves-container">
        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            className="leaf-wrapper"
            style={{
              left: `${leaf.left}%`,
              '--fall-duration': `${leaf.duration}s`,
              '--fall-delay': `${leaf.delay}s`,
              '--start-rot': `${leaf.rotation}deg`,
              '--sway': `${leaf.swayAmount}px`,
              '--sway-duration': `${leaf.duration * 0.4}s`,
            } as React.CSSProperties}
          >
            <div className="leaf-inner">
              <svg
                width={leaf.size}
                height={leaf.size * 1.5}
                viewBox="0 0 20 30"
                fill="none"
                style={{ opacity: leaf.opacity }}
              >
                <path d={leaf.path} fill={leaf.color} />
                {/* Leaf vein */}
                <line
                  x1="10"
                  y1="2"
                  x2="10"
                  y2="26"
                  stroke={leaf.color}
                  strokeWidth="0.5"
                  opacity="0.5"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
