// data/parties.js

export const INITIAL_PARTIES = [
  {
    id: 'eisenkot',
    name: 'ישר! עם איזנקוט',
    seats: 22,
    color: '#1e3a8a', // גוש איזנקוט
    // [מדיני, כלכלי, דת ומדינה, משפט, זהות לאומית, יחסי חוץ]
    pos: [5, 5, 3, 2, 6, 4],
  },
  {
    id: 'likud',
    name: 'הליכוד',
    seats: 20,
    color: '#ea580c', // גוש נתניהו
    pos: [6, 7, 6, 7, 7, 6],
  },
  {
    id: 'beyachad',
    name: 'ביחד',
    seats: 14,
    color: '#1e293b', // גוש איזנקוט / מרכז
    pos: [5, 6, 4, 3, 6, 4],
  },
  {
    id: 'meshutefet',
    name: 'הרשימה המשותפת',
    seats: 9,
    color: '#64748b', // מפלגות ערביות
    pos: [1, 2, 3, 2, 1, 1],
  },
  {
    id: 'demokratim',
    name: 'הדמוקרטים',
    seats: 8,
    color: '#1e1b4b', // גוש איזנקוט / שמאל ציוני
    pos: [2, 3, 1, 1, 3, 2],
  },
  {
    id: 'otzma_yehudit',
    name: 'עוצמה יהודית',
    seats: 8,
    color: '#c2410c', // גוש נתניהו
    pos: [10, 5, 8, 9, 10, 9],
  },
  {
    id: 'yahadut_hatorah',
    name: 'יהדות התורה',
    seats: 8,
    color: '#f97316', // גוש נתניהו
    pos: [5, 2, 10, 7, 6, 5],
  },
  {
    id: 'yisrael_beytenu',
    name: 'ישראל ביתנו',
    seats: 8,
    color: '#0f172a', // גוש איזנקוט / ימין חילוני
    pos: [7, 8, 2, 6, 7, 6],
  },
  {
    id: 'shas',
    name: 'ש"ס',
    seats: 7,
    color: '#ea580c', // גוש נתניהו
    pos: [5, 3, 9, 7, 7, 5],
  },
  {
    id: 'tziyonut_zehut',
    name: 'הציונות הדתית וזהות',
    seats: 7,
    color: '#9a3412', // גוש נתניהו
    pos: [9, 8, 8, 9, 9, 8],
  },
  {
    id: 'raam',
    name: 'רע"מ',
    seats: 5,
    color: '#475569', // מפלגות ערביות
    pos: [3, 4, 8, 5, 2, 3],
  },
  {
    id: 'miluim_calcalit',
    name: 'המילואימניקים והכלכלית',
    seats: 4,
    color: '#94a3b8', // אחר / מרכז-ימין חברתי
    pos: [6, 7, 3, 4, 6, 5],
  },
];

export const INITIAL_RELATIONS = {
  // גוש נתניהו
  'likud-tziyonut_zehut': 2,
  'tziyonut_zehut-likud': 2,
  'likud-otzma_yehudit': 3,
  'otzma_yehudit-likud': 3,
  'likud-shas': 1,
  'shas-likud': 1,
  'likud-yahadut_hatorah': 1,
  'yahadut_hatorah-likud': 1,
  'shas-yahadut_hatorah': 1,
  'yahadut_hatorah-shas': 1,

  // גוש איזנקוט / מרכז-שמאל
  'eisenkot-beyachad': 2,
  'beyachad-eisenkot': 2,
  'eisenkot-demokratim': 3,
  'demokratim-eisenkot': 3,
  'eisenkot-yisrael_beytenu': 3,
  'yisrael_beytenu-eisenkot': 3,
  'beyachad-demokratim': 3,
  'demokratim-beyachad': 3,

  // מתח חילוני-חרדי
  'yisrael_beytenu-shas': 6,
  'shas-yisrael_beytenu': 6,
  'yisrael_beytenu-yahadut_hatorah': 6,
  'yahadut_hatorah-yisrael_beytenu': 6,

  // חרמות ווטו מוחלטים (7 = לא יושבים יחד)
  'otzma_yehudit-meshutefet': 7,
  'meshutefet-otzma_yehudit': 7,
  'otzma_yehudit-raam': 7,
  'raam-otzma_yehudit': 7,
  'tziyonut_zehut-meshutefet': 7,
  'meshutefet-tziyonut_zehut': 7,
  'tziyonut_zehut-raam': 7,
  'raam-tziyonut_zehut': 7,
  'yisrael_beytenu-meshutefet': 7,
  'meshutefet-yisrael_beytenu': 7,
  'demokratim-otzma_yehudit': 7,
  'otzma_yehudit-demokratim': 7,
};