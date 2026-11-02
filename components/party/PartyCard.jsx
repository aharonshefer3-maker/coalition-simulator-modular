// components/3_party/PartyCard.jsx
'use client';

export default function PartyCard({ party, onSeatChange, onDelete }) {
  return (
    <div className="bg-white border border-sky-200 rounded-xl p-3 flex justify-between items-center gap-2 shadow-2xs hover:border-sky-400 transition">
      <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
        {onDelete && (
          <button
            onClick={() => onDelete(party.id)}
            title="מחק מפלגה"
            className="text-slate-400 hover:text-rose-600 transition text-sm p-1 cursor-pointer shrink-0"
          >
            🗑️
          </button>
        )}
        <span className="font-bold text-xs sm:text-sm text-slate-800 truncate" title={party.name}>
          {party.name}
        </span>
      </div>
      <input
        type="number"
        min="0"
        max="120"
        value={party.seats}
        onChange={(e) => onSeatChange(party.id, e.target.value)}
        onFocus={(e) => e.target.select()}
        className="w-14 h-8 bg-sky-50 text-sky-900 border border-sky-300 rounded-lg text-center font-extrabold text-sm shrink-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );
}