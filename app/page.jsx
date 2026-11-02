// app/page.jsx
'use client';

import { useState } from 'react';
import { INITIAL_PARTIES, INITIAL_RELATIONS } from '@/data/parties';

import PartyList from '@/components/party/PartyList';
import CreatePartyForm from '@/components/party/CreatePartyForm';
import PositionProfileEditor from '@/components/position/PositionProfileEditor';
import RelationsTable from '@/components/relations/RelationsTable';
import CoalitionEngineRunner from '@/components/coalition/CoalitionEngineRunner';

export default function Home() {
  const [parties, setParties] = useState(INITIAL_PARTIES);
  const [relations, setRelations] = useState(INITIAL_RELATIONS);
  const [asymmetricPairs, setAsymmetricPairs] = useState({
    'likud-raam': true,
    'demokratim-shas': true,
    'demokratim-yahadut_hatorah': true,
  });
  const [activeTab, setActiveTab] = useState('parties');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const totalSeats = parties.reduce(
    (sum, p) => sum + (p.seats === '' || p.seats == null ? 0 : Number(p.seats)),
    0
  );
  const is120 = totalSeats === 120;

  const handleSeatChange = (id, value) => {
    const newSeats = value === '' ? '' : Number(value);
    setParties(parties.map((p) => (p.id === id ? { ...p, seats: newSeats } : p)));
  };

  const handlePositionChange = (partyId, posIndex, value) => {
    setParties(
      parties.map((p) => {
        if (p.id === partyId) {
          const newPos = [...p.pos];
          newPos[posIndex] = Number(value);
          return { ...p, pos: newPos };
        }
        return p;
      })
    );
  };

  const handleAddNewParty = (newParty) => {
    setParties((prev) => [...prev, newParty]);
    setRelations((prev) => {
      const updated = { ...prev };
      parties.forEach((p) => {
        updated[`${newParty.id}-${p.id}`] = 4;
        updated[`${p.id}-${newParty.id}`] = 4;
      });
      return updated;
    });
  };

  const handleDeleteParty = (partyId) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק מפלגה זו?')) return;
    setParties((prev) => prev.filter((p) => p.id !== partyId));
    setRelations((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        if (k.startsWith(`${partyId}-`) || k.endsWith(`-${partyId}`)) delete updated[k];
      });
      return updated;
    });
  };

  const setRelation = (id1, id2, val, actionType = 'normal') => {
    if (actionType === 'asymmetric') {
      setAsymmetricPairs((prev) => ({ ...prev, [`${id1}-${id2}`]: true }));
      setRelations((prev) => ({ ...prev, [`${id1}-${id2}`]: val }));
    } else {
      setAsymmetricPairs((prev) => {
        const updated = { ...prev };
        delete updated[`${id1}-${id2}`];
        delete updated[`${id2}-${id1}`];
        return updated;
      });
      setRelations((prev) => ({
        ...prev,
        [`${id1}-${id2}`]: val,
        [`${id2}-${id1}`]: val,
      }));
    }
  };

  const handleExportData = () => {
    const dataToExport = { parties, relations, asymmetricPairs };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'coalition-state.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.parties) setParties(imported.parties);
        if (imported.relations) setRelations(imported.relations);
        if (imported.asymmetricPairs) setAsymmetricPairs(imported.asymmetricPairs);
        alert('הנתונים נטענו בהצלחה!');
      } catch (err) {
        alert('שגיאה בקריאת הקובץ. וודא שהוא תקין.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <main dir="rtl" className="min-h-screen bg-gray-900 text-white p-3 sm:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-400 mb-2">קואליציאטור Next.js 🗳️</h1>
          <p className="text-xs sm:text-sm text-gray-400">סימולטור הרכבת ממשלה על פי 6 צירי עמדות וטבלת שנאות</p>

          <div
            className={`mt-4 inline-block px-4 py-2 rounded-full font-bold text-sm ${
              is120 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
            }`}
          >
            סה"כ מנדטים: {totalSeats} / 120
            {!is120 && <span className="mr-2">⚠️ חובה לאזן ל-120</span>}
          </div>
        </header>

        {/* כפתורי שמירה וטעינה */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-6 flex-wrap">
          <button
            onClick={handleExportData}
            className="bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500/40 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
          >
            📥 שמור מצב (JSON)
          </button>

          <label className="bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-500/40 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer">
            📤 טען מצב (JSON)
            <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
          </label>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveTab('parties')}
            className={`px-3 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
              activeTab === 'parties' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            מנדטים (סקר)
          </button>
          <button
            onClick={() => setActiveTab('positions')}
            className={`px-3 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
              activeTab === 'positions' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            עמדות פוליטיות (6 צירים)
          </button>
          <button
            onClick={() => setActiveTab('relations')}
            className={`px-3 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
              activeTab === 'relations' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            טבלת שנאות ויחסים
          </button>
          <button
            onClick={() => setActiveTab('algorithm')}
            className={`px-3 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
              activeTab === 'algorithm' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            הרכב ממשלה
          </button>
        </div>

        {activeTab === 'parties' && (
          <div className="space-y-6">
            <button
              onClick={() => setIsAddFormOpen(!isAddFormOpen)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>{isAddFormOpen ? '✖️ סגור טופס' : '➕ הקמת מפלגה חדשה'}</span>
            </button>

            <CreatePartyForm
              isOpen={isAddFormOpen}
              onClose={() => setIsAddFormOpen(false)}
              onAddParty={handleAddNewParty}
            />

            <PartyList
              parties={parties}
              onSeatChange={handleSeatChange}
              onDeleteParty={handleDeleteParty}
            />
          </div>
        )}

        {activeTab === 'positions' && (
          <div className="space-y-4 sm:space-y-6">
            {parties.map((p) => (
              <PositionProfileEditor
                key={p.id}
                title={`${p.name} (${p.seats} מנדטים)`}
                profileValues={p.pos}
                onAxisChange={(axisIndex, val) => handlePositionChange(p.id, axisIndex, val)}
              />
            ))}
          </div>
        )}

        {activeTab === 'relations' && (
          <RelationsTable
            parties={parties}
            relations={relations}
            asymmetricPairs={asymmetricPairs}
            onSetRelation={setRelation}
          />
        )}

        {activeTab === 'algorithm' && (
          <CoalitionEngineRunner
            parties={parties}
            relations={relations}
            asymmetricPairs={asymmetricPairs}
            is120={is120}
            totalSeats={totalSeats}
          />
        )}
      </div>
    </main>
  );
}      {/* Header row with primary metrics */}
      // ... existing code ...
        {/* Display metrics and scores */}        {/* Save and load buttons */}