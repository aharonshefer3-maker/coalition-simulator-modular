export default function IssueAxisLegend({ axis }) {
  return (
    <div className="flex justify-between text-xs text-gray-400 px-1 py-0.5">
      <span className="text-emerald-400 font-semibold">1: {axis.left}</span>
      <span className="text-gray-400 font-bold">{axis.label}</span>
      <span className="text-orange-400 font-semibold">7: {axis.right}</span>
    </div>
  );
}
