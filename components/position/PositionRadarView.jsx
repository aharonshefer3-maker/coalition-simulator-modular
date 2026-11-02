import { ISSUE_AXES } from '@/data/parties';

export default function PositionRadarView({ profileValues, partyName }) {
  return (
    <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-700">
      <span className="text-xs font-bold text-gray-300 block mb-2">{partyName} - וקטור עמדות:</span>
      <div className="flex flex-wrap gap-2">
        {ISSUE_AXES.map((axis) => {
          const val = profileValues[Number(axis.id)] ?? 4;
          return (
            <span key={axis.id} className="text-[11px] bg-gray-800 border border-gray-700 px-2 py-1 rounded">
              <span className="text-gray-400">{axis.label.split(' ')[0]}:</span>{' '}
              <strong className="text-yellow-300">{val}</strong>
            </span>
          );
        })}
      </div>
    </div>
  );
}
