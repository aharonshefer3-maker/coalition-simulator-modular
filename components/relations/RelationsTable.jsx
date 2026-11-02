// components/relations/RelationsTable.jsx
'use client';

import { useState } from 'react';
import RelationCell from './RelationCell';
import RelationsLegend from './RelationsLegend';
import AsymmetricDropdown from './AsymmetricDropdown';

export default function RelationsTable({ parties, relations, asymmetricPairs, onSetRelation }) {
  const [dropdownData, setDropdownData] = useState(null);

  const handleOpenMenu = (p1, p2, coords) => {
    setDropdownData({
      fromParty: p1,
      toParty: p2,
      coords,
    });
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-sky-200 relative">
      <RelationsLegend />

      <div className="overflow-x-auto rounded-xl border border-sky-200 shadow-2xs max-w-full">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="sticky right-0 z-20 p-2 sm:p-3 border border-sky-200 bg-sky-100 text-[11px] sm:text-xs text-sky-900 font-extrabold whitespace-nowrap shadow-xs min-w-[110px]">
                המחרים ↓ \ המוחרם ←
              </th>
              {parties.map((p) => (
                <th
                  key={p.id}
                  className="p-1 sm:p-1.5 border border-sky-200 text-xs font-bold w-12 sm:w-14 h-28 sm:h-36 bg-sky-50 text-sky-950 align-bottom relative"
                >
                  <span
                    className="absolute bottom-2 right-1/2 translate-x-1/2 whitespace-nowrap text-[11px] sm:text-xs font-extrabold"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {p.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parties.map((p1) => (
              <tr key={p1.id}>
                <th className="sticky right-0 z-10 p-2.5 border border-sky-200 whitespace-nowrap text-xs text-right bg-sky-50 text-sky-950 font-bold shadow-xs">
                  {p1.name}
                </th>

                {parties.map((p2) => {
                  if (p1.id === p2.id) {
                    return <td key={p2.id} className="border border-sky-200 bg-slate-100/70" />;
                  }

                  const isAsym = asymmetricPairs[`${p1.id}-${p2.id}`];
                  const val = isAsym
                    ? relations[`${p1.id}-${p2.id}`] ?? 4
                    : relations[`${p1.id}-${p2.id}`] ?? relations[`${p2.id}-${p1.id}`] ?? 4;

                  const nextVal = val >= 7 ? 1 : val + 1;

                  return (
                    <RelationCell
                      key={p2.id}
                      val={val}
                      isAsym={isAsym}
                      onNormalClick={() => onSetRelation(p1.id, p2.id, nextVal, 'normal')}
                      onOpenMenu={(coords) => handleOpenMenu(p1, p2, coords)}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dropdownData && (
        <AsymmetricDropdown
          target={dropdownData.coords}
          fromParty={dropdownData.fromParty}
          toParty={dropdownData.toParty}
          onSelect={(chosenVal) => {
            onSetRelation(dropdownData.fromParty.id, dropdownData.toParty.id, chosenVal, 'asymmetric');
            setDropdownData(null);
          }}
          onClose={() => setDropdownData(null)}
        />
      )}
    </div>
  );
}