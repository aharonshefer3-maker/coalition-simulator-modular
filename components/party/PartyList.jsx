// components/3_party/PartyList.jsx
'use client';

import PartyCard from './PartyCard';

export default function PartyList({ parties, onSeatChange, onDeleteParty }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-sky-200">
      <h3 className="text-xs sm:text-sm font-bold text-sky-900 mb-4 pb-2 border-b border-sky-100">
        רשימת המפלגות הפעילות (סה"כ: {parties.length} מפלגות):
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {parties.map((p) => (
          <PartyCard
            key={p.id}
            party={p}
            onSeatChange={onSeatChange}
            onDelete={onDeleteParty}
          />
        ))}
      </div>
    </div>
  );
}