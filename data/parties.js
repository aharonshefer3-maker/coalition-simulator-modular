// data/parties.js

export const INITIAL_PARTIES = [
  {
    id: 'eisenkot',
    name: 'ישר! עם איזנקוט',
    seats: 21,
    color: '#1e3a8a',
    // [מדיני, כלכלי, דת ומדינה, משפט, זהות לאומית, יחסי חוץ]
    pos: [7, 7, 8, 10, 6, 7],
  },
  {
    id: 'likud',
    name: 'הליכוד',
    seats: 27,
    color: '#ea580c',
    pos: [2, 4, 3, 1, 3, 4],
  },
  {
    id: 'beyachad',
    name: 'ביחד',
    seats: 12,
    color: '#1e293b',
    pos: [3, 7, 9, 8, 9, 9],
  },
  {
    id: 'meshutefet',
    name: 'הרשימה המשותפת',
    seats: 11,
    color: '#64748b',
    pos: [10, 6, 6, 10, 10, 10],
  },
  {
    id: 'demokratim',
    name: 'הדמוקרטים',
    seats: 8,
    color: '#1e1b4b',
    pos: [10, 9, 9, 10, 10, 10],
  },
  {
    id: 'otzma_yehudit',
    name: 'עוצמה יהודית',
    seats: 8,
    color: '#c2410c',
    pos: [1, 6, 4, 1, 1, 2],
  },
  {
    id: 'yahadut_hatorah',
    name: 'יהדות התורה',
    seats: 7,
    color: '#f97316',
    pos: [6, 9, 1, 4, 5, 7],
  },
  {
    id: 'yisrael_beytenu',
    name: 'ישראל ביתנו',
    seats: 6,
    color: '#0f172a',
    pos: [4, 3, 9, 4, 7, 3],
  },
  {
    id: 'shas',
    name: 'ש"ס',
    seats: 6,
    color: '#ea580c',
    pos: [6, 8, 2, 3, 4, 6],
  },
  {
    id: 'tziyonut_zehut',
    name: 'הציונות הדתית וזהות',
    seats: 6,
    color: '#9a3412',
    pos: [2, 3, 2, 2, 2, 3],
  },
  {
    id: 'raam',
    name: 'רע"מ',
    seats: 8, // שים לב: סך המושבים כרגע 114
    color: '#475569',
    pos: [8, 8, 2, 7, 9, 7],
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
  'yisrael_beytenu-shas': 4,
  'shas-yisrael_beytenu': 4,
  'yisrael_beytenu-yahadut_hatorah': 6,
  'yahadut_hatorah-yisrael_beytenu': 7,
  'demokratim-yahadut_hatorah': 7,
  'yahadut_hatorah-demokratim': 6,

  // יחסי ליכוד מול מפלגות אחרות (כולל א-סימטריה)
  'eisenkot-likud': 7,
  'beyachad-likud': 7,
  'likud-beyachad': 3,
  'demokratim-likud': 7,
  'likud-demokratim': 2,
  'meshutefet-likud': 7,

  // חרמות ווטו מוחלטים ויחסים מורכבים נוספים
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
  'shas-meshutefet': 7,
  'meshutefet-shas': 6,
};

export const INITIAL_ASYMMETRIC_PAIRS = {
  'likud-raam': true,
  'demokratim-shas': true,
  'eisenkot-likud': true,
  'beyachad-likud': true,
  'meshutefet-likud': true,
  'likud-beyachad': true,
  'demokratim-likud': true,
  'demokratim-yahadut_hatorah': true,
  'shas-meshutefet': true,
  'yahadut_hatorah-yisrael_beytenu': true,
};