'use client';

import { useState } from 'react';
import PositionProfileEditor from '@/components/position/PositionProfileEditor';

export default function CreatePartyForm({ isOpen, onClose, onAddParty }) {
  const [name, setName] = useState('');
  const [seats, setSeats] = useState(4);
  const [pos, setPos] = useState([4, 4, 4, 4, 4, 4]);

  if (!isOpen) return null;

  const handleAxisChange = (index, val) => {
    const updated = [...pos];
    updated[index] = val;
    setPos(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddParty({
      id: `party_${Date.now()}`,
      name: name.trim(),
      seats: Number(seats) || 0,
      pos: pos,
    });

    setName('');
    setSeats(4);
    setPos([4, 4, 4, 4, 4, 4]);
    onClose();
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-emerald-500/50 shadow-2xl transition-all mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base sm:text-lg font-bold text-emerald-400 flex items-center gap-2">
          <span>➕</span> הקמת מפלגה חדשה
        </h3>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-white text-sm p-1">
          ביטול ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">שם המפלגה</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="למשל: תנועת העתיד (פה)"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">מנדטים ראשוניים</label>
            <input
              type="number"
              min="0"
              max="120"
              required
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <PositionProfileEditor
          profileValues={pos}
          onAxisChange={handleAxisChange}
          title="עמדות פוליטיות ב-6 הצירים"
          subtitle="קבע את ערכי המפלגה מראש טרם ההזנה למערכת"
        />

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold px-4 py-2 rounded-lg text-sm transition"
          >
            ביטול
          </button>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2 rounded-lg text-sm transition shadow-lg shadow-emerald-900/40"
          >
            הוסף מפלגה למאגר 🗳️
          </button>
        </div>
      </form>
    </div>
  );
}
