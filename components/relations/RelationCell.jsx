// components/relations/RelationCell.jsx
'use client';

import { useRef, useEffect } from 'react';

const RELATION_SYMBOLS = {
  1: { emoji: '💚', label: 'אהבה עמוקה', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  2: { emoji: '🤝', label: 'שותפות טובה', bg: 'bg-teal-50 text-teal-800 border-teal-200' },
  3: { emoji: '🔹', label: 'חיוב חלקי', bg: 'bg-sky-50 text-sky-800 border-sky-200' },
  4: { emoji: '⚖️', label: 'ניטרלי', bg: 'bg-slate-50 text-slate-700 border-slate-200' },
  5: { emoji: '⚠️', label: 'הסתייגות', bg: 'bg-amber-100 text-amber-800 border-amber-300' },
  6: { emoji: '🛑', label: 'חרם קשה', bg: 'bg-orange-100 text-orange-800 border-orange-300' },
  7: { emoji: '🔥', label: 'חרם מוחלט (טאבו)', bg: 'bg-rose-100 text-rose-800 font-bold border-rose-300' },
};

const LONG_PRESS_MS = 500;
const MOVE_TOLERANCE = 10;

export default function RelationCell({ val, isAsym, onNormalClick, onOpenMenu }) {
  const config = RELATION_SYMBOLS[val] || RELATION_SYMBOLS[4];

  const timerRef = useRef(null);
  const isLongPressRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };


  // Clear the timer when the cell is removed from the DOM
  useEffect(() => clearTimer, []);

  const handleTouchStart = (e) => {
    isLongPressRef.current = false;
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };


    // Read immediately, because e.currentTarget resets after the handler returns
    const rect = e.currentTarget.getBoundingClientRect();

    clearTimer();
    timerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      navigator.vibrate?.(40);

      // Viewport coordinates (the menu is position: fixed)
      onOpenMenu({
        x: rect.left + rect.width / 2,
        y: rect.bottom,
      });
    }, LONG_PRESS_MS);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - startPosRef.current.x);
    const dy = Math.abs(touch.clientY - startPosRef.current.y);
    if (dx > MOVE_TOLERANCE || dy > MOVE_TOLERANCE) clearTimer();
  };

  const handleContextMenu = (e) => {
    e.preventDefault();

    if (isLongPressRef.current) return; // already opened by the timer
    onOpenMenu({ x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    if (isLongPressRef.current) {
      isLongPressRef.current = false;
      return;
    }
    onNormalClick();
  };

  return (
    <td
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={clearTimer}
      onTouchMove={handleTouchMove}
      onTouchCancel={clearTimer}
      className={`border p-2 sm:p-2.5 min-w-[48px] sm:min-w-[54px] h-[48px] sm:h-[54px] select-none cursor-pointer touch-manipulation [-webkit-touch-callout:none] transition-all duration-150 hover:brightness-105 text-center relative ${config.bg} ${
        isAsym ? 'ring-2 ring-amber-500 ring-inset' : ''
      }`}
      title={`${config.label} ${isAsym ? '(א-סימטרי)' : '(סימטרי)'}`}
    >
      <div className="flex items-center justify-center h-full w-full">
        <span className="text-xl sm:text-2xl leading-none select-none">{config.emoji}</span>
      </div>

      {isAsym && (
        <span className="absolute bottom-0.5 right-1/2 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-500" />
      )}
    </td>
  );
}