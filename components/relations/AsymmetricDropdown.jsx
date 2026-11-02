// components/relations/AsymmetricDropdown.jsx
'use client';

import { useEffect, useRef } from 'react';

const OPTIONS = [
  { val: 1, label: '💚 שותפות מלאה', bg: 'hover:bg-emerald-50 text-emerald-800' },
  { val: 2, label: '🤝 יחסים טובים', bg: 'hover:bg-teal-50 text-teal-800' },
  { val: 3, label: '🔹 חיוב חלקי', bg: 'hover:bg-sky-50 text-sky-800' },
  { val: 4, label: '⚖️ ניטרלי', bg: 'hover:bg-slate-50 text-slate-700' },
  { val: 5, label: '⚠️ הסתייגות', bg: 'hover:bg-amber-50 text-amber-800' },
  { val: 6, label: '🛑 חרם קשה', bg: 'hover:bg-orange-50 text-orange-800' },
  { val: 7, label: '🔥 וטו מוחלט (טאבו)', bg: 'hover:bg-rose-50 text-rose-800 font-bold' },
];

const MENU_WIDTH = 240; // w-60
const MENU_HEIGHT = 340; // הערכה: כותרת + 7 אפשרויות + ביטול
const MARGIN = 12;

export default function AsymmetricDropdown({ target, fromParty, toParty, onSelect, onClose }) {
  const menuRef = useRef(null);
  const onCloseRef = useRef(onClose);

  // תמיד הגרסה האחרונה של onClose, בלי לרשום listeners מחדש בכל render
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const handlePointerDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onCloseRef.current();
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    const handleScroll = (e) => {
      // גלילה בתוך התפריט עצמו (max-h + overflow) לא אמורה לסגור אותו
      if (menuRef.current && menuRef.current.contains(e.target)) return;
      onCloseRef.current();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  if (!target || !fromParty || !toParty) return null;

  // Constrain to the screen bounds on all sides
  const left = Math.max(
    MARGIN,
    Math.min(target.x - MENU_WIDTH / 2, window.innerWidth - MENU_WIDTH - MARGIN)
  );
  const top = Math.max(
    MARGIN,
    Math.min(target.y + 6, window.innerHeight - MENU_HEIGHT - MARGIN)
  );

  return (
    <div
      ref={menuRef}
      dir="rtl"
      role="menu"
      style={{ top: `${top}px`, left: `${left}px` }}
      className="fixed z-50 w-60 bg-white/95 backdrop-blur-md border border-sky-300 rounded-2xl shadow-2xl p-2 text-right"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="border-b border-sky-100 pb-2 mb-2 px-1">
        <span className="text-[10px] text-sky-600 font-bold block">הגדרת יחס א-סימטרי חד-כיווני</span>
        <span className="text-xs text-slate-900 font-extrabold block truncate">
          {fromParty.name} ⬅️ {toParty.name}
        </span>
      </div>

      <div className="space-y-1 max-h-56 overflow-y-auto">
        {OPTIONS.map((opt) => (
          <button
            key={opt.val}
            type="button"
            role="menuitem"
            onClick={() => {
              onSelect(opt.val);
              onClose();
            }}
            className={`w-full text-right px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${opt.bg}`}
          >
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-full mt-2 text-center text-[11px] text-slate-400 hover:text-slate-600 py-1 border-t border-sky-100 cursor-pointer font-semibold"
      >
        ביטול
      </button>
    </div>
  );
}
