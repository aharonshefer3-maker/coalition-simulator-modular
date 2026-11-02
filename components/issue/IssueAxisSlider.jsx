// components/issue/IssueAxisSlider.jsx
'use client';

import React from 'react';

export default function IssueAxisSlider({
  value = 5,
  min = 1,
  max = 10,
  step = 1,
  leftLabel = '',
  rightLabel = '',
  onChange,
}) {
  const numericValue = Number(value) || 5;

  return (
    <div className="w-full space-y-1.5" dir="ltr">
      <input
        key={numericValue} // כופה על הדפדפן לצייר מחדש את מיקום העיגול
        type="range"
        min={min}
        max={max}
        step={step}
        value={numericValue}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />

      <div className="flex justify-between text-[11px] text-gray-400 select-none" dir="rtl">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}