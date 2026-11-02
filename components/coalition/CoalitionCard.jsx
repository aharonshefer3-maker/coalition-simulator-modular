// components/coalition/CoalitionCard.jsx
'use client';

import React from 'react';

/**
 * Coalition card component rendering scores, seats, party tags,
 * and dual parity blocks (blockA vs blockB) when applicable.
 */
export default function CoalitionCard({ coalition, rank }) {
  if (!coalition) return null;

  const {
    parties = [],
    totalSeats = 0,
    totalScore = 0,
    ideologicalGap = 0,
    relationsScore = 0,
    avgRelation = 0,
    isParity = false,
    parityType = '',
    blocks = null,
  } = coalition;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-slate-800 space-y-4">
      {/* Header bar: score, average per pair, parity status, total seats */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-md">
            #{rank}
          </span>
          <span className="text-sm font-bold text-slate-700">סך פערים מצטבר:</span>
          <span className="bg-sky-50 text-sky-700 border border-sky-300 font-extrabold px-3 py-0.5 rounded-full text-sm">
            {totalScore} נק׳
          </span>
          <span className="text-xs text-slate-400">
            ({avgRelation} ממוצע לזוג)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isParity && (
            <span className="bg-purple-100 text-purple-800 border border-purple-300 text-xs px-2.5 py-1 rounded-lg font-bold">
              ⚖️ {parityType || 'ממשלה פריטטית'}
            </span>
          )}
          <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-xl text-xs border border-slate-200">
            {totalSeats} מנדטים
          </span>
        </div>
      </div>

      {/* Parity Layout: Displays Block A and Block B side-by-side */}
      {isParity && blocks ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          {/* Block A container */}
          <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-3 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-purple-900 border-b border-purple-200/60 pb-1.5">
              <span>{blocks.blockA.name}</span>
              <span className="bg-purple-200/80 px-2 py-0.5 rounded-md font-mono">
                {blocks.blockA.totalSeats} מנדטים
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {blocks.blockA.parties.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-1.5 bg-white border border-purple-200 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700"
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: p.color || '#9333ea' }}
                  />
                  <span>{p.name}</span>
                  <span className="text-purple-600 font-mono text-[11px]">({p.seats})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Block B container */}
          <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-3 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-indigo-900 border-b border-indigo-200/60 pb-1.5">
              <span>{blocks.blockB.name}</span>
              <span className="bg-indigo-200/80 px-2 py-0.5 rounded-md font-mono">
                {blocks.blockB.totalSeats} מנדטים
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {blocks.blockB.parties.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-1.5 bg-white border border-indigo-200 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700"
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: p.color || '#4f46e5' }}
                  />
                  <span>{p.name}</span>
                  <span className="text-indigo-600 font-mono text-[11px]">({p.seats})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Standard Coalition Layout: Single group of party tags */
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
          {parties.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl text-xs font-semibold text-slate-700"
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: p.color || '#0284c7' }}
              />
              <span>{p.name}</span>
              <span className="bg-white border border-slate-200 text-slate-500 px-1.5 py-0.2 rounded-md font-mono text-[11px]">
                {p.seats}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}