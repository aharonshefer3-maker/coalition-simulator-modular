// components/position/PositionProfileEditor.jsx
'use client';

import React from 'react';
import IssueAxisSlider from '../issue/IssueAxisSlider';

const AXES = [
  { index: 0, name: 'מדיני-ביטחוני', left: '1 (פשרה/2 מדינות)', right: '10 (סיפוח/התיישבות)' },
  { index: 1, name: 'כלכלי-חברתי', left: '1 (סוציאליזם/רווחה)', right: '10 (שוק חופשי)' },
  { index: 2, name: 'דת ומדינה', left: '1 (הפרדת דת/חופש)', right: '10 (הלכה/סטטוס-קוו)' },
  { index: 3, name: 'מערכת המשפט', left: '1 (עצמאות ביהמ"ש)', right: '10 (רפורמה/משילות)' },
  { index: 4, name: 'זהות אזרחית / לאומית', left: '1 (מדינת כל אזרחיה)', right: '10 (לאום יהודי בלעדי)' },
  { index: 5, name: 'יחסי חוץ ואזור', left: '1 (השתלבות אזורית)', right: '10 (הסתמכות עצמית)' },
];

export default function PositionProfileEditor({
  title,
  profileValues = [],
  onAxisChange,
}) {
  const valuesArray = Array.isArray(profileValues) ? profileValues : [];

  return (
    <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-700/60 pb-3">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <span className="text-xs bg-gray-900 border border-gray-700 text-blue-400 px-2.5 py-1 rounded-lg">
          פרופיל עמדות (1–10)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
        {AXES.map((axis) => {
          const rawVal = valuesArray[axis.index];
          // אם קיים ערך, משתמשים בו; אחרת ברירת מחדל 5
          const currentValue = rawVal != null && !isNaN(Number(rawVal)) ? Number(rawVal) : 5;

          return (
            <div
              key={axis.index}
              className="bg-gray-900/60 p-4 rounded-xl border border-gray-700/50 space-y-2"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-gray-200">
                  {axis.name}
                </span>
                <span className="font-mono text-xs font-bold text-blue-300 bg-blue-900/60 border border-blue-600/50 px-2.5 py-0.5 rounded-md">
                  {currentValue}
                </span>
              </div>

              <IssueAxisSlider
                value={currentValue}
                min={1}
                max={10}
                step={1}
                leftLabel={axis.left}
                rightLabel={axis.right}
                onChange={(newVal) => {
                  if (onAxisChange) {
                    onAxisChange(axis.index, newVal);
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}