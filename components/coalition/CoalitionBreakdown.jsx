export default function CoalitionBreakdown({ brokenDetails, taboosBroken }) {
  if (!brokenDetails || brokenDetails.length === 0) return null;

  return (
    <div className="text-xs sm:text-sm text-yellow-300 mb-4 bg-yellow-900/30 p-3 rounded border border-yellow-700/50 text-right">
      <span className="font-bold block mb-1">
        ⚠️ פירוט החרמים והמשקלים שנבלעו בממשלה זו (ציון משוקלל: {taboosBroken}):
      </span>
      <ul className="list-disc list-inside space-y-1 text-[11px] sm:text-xs text-yellow-200">
        {brokenDetails.map((detail, idx) => (
          <li key={idx}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}
