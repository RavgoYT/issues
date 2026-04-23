// src/components/RadialPalette.jsx
import { useState, useEffect, useRef } from 'react';

const FONT_META = {
  excali:  { label: 'Ex', name: 'Excalifont',  family: "'Excalifont', sans-serif" },
  nunito:  { label: 'Nn', name: 'Nunito',       family: "'Nunito', sans-serif" },
  crimson: { label: 'Cr', name: 'Crimson Pro',  family: "'Crimson Pro', serif" },
  mono:    { label: '<>', name: 'Space Mono',   family: "'Space Mono', monospace" },
};

// Given n items (theme + fonts), spread them in an arc from 240° → 90° (going counterclockwise)
function getPositions(count) {
  const startAngle = 240;
  const endAngle = 90;
  // Go counterclockwise: 240 → 90 means decreasing angle
  const span = startAngle - endAngle; // 150°
  const step = count > 1 ? span / (count - 1) : 0;
  const radius = 62;
  return Array.from({ length: count }, (_, i) => {
    const angle = startAngle - i * step;
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
    };
  });
}

export default function RadialPalette({ theme, setTheme, font, setFont, fontList = ['excali', 'nunito'] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Items: theme toggle first, then each font
  const items = ['__theme__', ...fontList];
  const positions = getPositions(items.length);

  return (
    // Palette anchored bottom-right, overflow visible so items aren't clipped
    <div
      ref={ref}
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 100,
        // give plenty of room for the fan to expand upward/leftward
        width: 44,
        height: 44,
        overflow: 'visible',
      }}
    >
      {items.map((item, i) => {
        const { x, y } = positions[i];
        const delay = open ? i * 0.05 : 0;
        const isTheme = item === '__theme__';

        if (isTheme) {
          const isDark = theme === 'dark';
          return (
            <button
              key="theme"
              title={isDark ? 'Switch to light' : 'Switch to dark'}
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              style={{
                position: 'absolute',
                // center of trigger is at 22,22; offset from there
                left: 22 + x - 19,
                top: 22 - y - 19,  // y goes up (negative screen y)
                width: 38, height: 38, borderRadius: '50%',
                background: 'var(--island-backdrop)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
                boxShadow: 'var(--shadow)',
                opacity: open ? 1 : 0,
                pointerEvents: open ? 'all' : 'none',
                transform: open ? 'scale(1)' : 'scale(0.4)',
                transition: `transform 0.32s cubic-bezier(0.34,1.56,0.64,1) ${delay}s, opacity 0.22s ease ${delay}s`,
              }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          );
        }

        const f = FONT_META[item];
        if (!f) return null;
        const isActive = font === item;

        return (
          <button
            key={item}
            title={f.name}
            onClick={() => setFont(item)}
            style={{
              position: 'absolute',
              left: 22 + x - 19,
              top: 22 - y - 19,
              width: 38, height: 38, borderRadius: '50%',
              background: isActive ? 'var(--accent-dim)' : 'var(--island-backdrop)',
              border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-color)'}`,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700,
              fontFamily: f.family,
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              boxShadow: 'var(--shadow)',
              opacity: open ? 1 : 0,
              pointerEvents: open ? 'all' : 'none',
              transform: open ? 'scale(1)' : 'scale(0.4)',
              transition: `transform 0.32s cubic-bezier(0.34,1.56,0.64,1) ${delay}s, opacity 0.22s ease ${delay}s, border-color 0.15s ease, background 0.15s ease`,
            }}
          >
            {f.label}
          </button>
        );
      })}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Customize appearance"
        style={{
          position: 'absolute',
          left: 0, top: 0,
          width: 44, height: 44, borderRadius: '50%',
          background: 'var(--island-backdrop)',
          border: '1px solid var(--border-color)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18,
          boxShadow: 'var(--shadow)',
          transition: 'border-color 0.2s ease, transform 0.2s ease',
          zIndex: 1,
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? '✕' : '🎨'}
      </button>
    </div>
  );
}