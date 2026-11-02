// components/4_relations/RelationsLegend.jsx
'use client';

export default function RelationsLegend() {
  return (
    <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 mb-4 text-center">
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs font-semibold text-slate-700">
        <span className="bg-white px-2 py-1 rounded-lg border border-sky-100 shadow-2xs">💚 שותפות מלאה</span>
        <span className="bg-white px-2 py-1 rounded-lg border border-sky-100 shadow-2xs">🤝 יחסים טובים</span>
        <span className="bg-white px-2 py-1 rounded-lg border border-sky-100 shadow-2xs">🔹 חיוב</span>
        <span className="bg-white px-2 py-1 rounded-lg border border-sky-100 shadow-2xs">⚖️ ניטרלי</span>
        <span className="bg-white px-2 py-1 rounded-lg border border-sky-100 shadow-2xs">⚠️ הסתייגות</span>
        <span className="bg-white px-2 py-1 rounded-lg border border-sky-100 shadow-2xs">🛑 חרם</span>
        <span className="bg-white px-2 py-1 rounded-lg border border-sky-100 shadow-2xs">🔥 וטו מוחלט</span>
      </div>

      <div className="flex justify-center items-center gap-3 mt-2 text-[11px] text-slate-500 font-medium">
        <span>🖱️ <strong>קליק שמאלי:</strong> שינוי מחזורי הדדי</span>
        <span>•</span>
        <span>⚡ <strong>קליק ימני / לחיצה ארוכה:</strong> הגדרת חרם חד-כיווני</span>
      </div>
    </div>
  );
}