// components/coalition/CoalitionEngineRunner.jsx
'use client';

import { useMemo } from 'react';
import { findBestCoalitions } from '@/utils/coalitionEngine';
import CoalitionCard from './CoalitionCard';

export default function CoalitionEngineRunner({
  parties = [],
  relations = {},
  asymmetricPairs = {},
  is120 = false,
  totalSeats = 0,
}) {
  // המרת מנדטים נקייה ממחרוזות למספרים
  const sanitizedParties = useMemo(() => {
    return parties.map((p) => ({
      ...p,
      seats: p.seats === '' || p.seats == null ? 0 : Number(p.seats),
    }));
  }, [parties]);

  // חישוב הקואליציות רץ רק כאשר המנדטים מאוזנים בדיוק ל-120
  const coalitions = useMemo(() => {
    if (!is120) return [];
    console.log('Running findBestCoalitions with:', {
      parties: sanitizedParties,
      relations,
      asymmetricPairs,
    });
    return findBestCoalitions(sanitizedParties, relations, asymmetricPairs, 61) || [];
  }, [sanitizedParties, relations, asymmetricPairs, is120]);

  return (
    <div className="space-y-4">
      <div className="bg-sky-950/40 p-4 rounded-2xl border border-sky-500/30 flex justify-between items-center">
        <div>
          <h2 className="text-base font-extrabold text-sky-200">שילובי ממשלה אפשריים (61+ מנדטים)</h2>
          <p className="text-xs text-sky-400 mt-0.5">
            ממוינים לפי סכום הפערים האידיאולוגי הנמוך ביותר (ללא חרמות ווטו)
          </p>
        </div>
        <span className="bg-sky-900 text-sky-200 border border-sky-400/40 px-3 py-1 rounded-xl font-black text-xs">
          נמצאו {coalitions.length} שילובים
        </span>
      </div>

      {!is120 ? (
        <div className="bg-amber-950/40 p-8 rounded-2xl border border-dashed border-amber-500/40 text-center text-amber-300 text-sm">
          ⚠️ סך המנדטים כרגע הוא <strong>{totalSeats}</strong> מתוך 120.
          <br />
          יש לעבור ללשונית "מנדטים (סקר)" ולאזן את המנדטים בדיוק ל-120 כדי לחשב אפשרויות קואליציה.
        </div>
      ) : coalitions.length === 0 ? (
        <div className="bg-gray-800/40 p-8 rounded-2xl border border-dashed border-gray-600 text-center text-gray-400 text-sm">
          לא נמצאה אף קואליציה של 61 מנדטים ללא חרמות. נסה למתן יחסי וטו בלשונית "טבלת שנאות ויחסים".
        </div>
      ) : (
        <div className="space-y-3">
          {coalitions.slice(0, 20).map((coalition, idx) => (
            <CoalitionCard key={coalition.id || idx} coalition={coalition} rank={idx + 1} />
          ))}
        </div>
      )}
    </div>
  );
}