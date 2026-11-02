# קואליציאטור - Next.js App Router & Tailwind CSS

מערכת סימולציה להרכבת ממשלות וקואליציות בישראל המבוססת על 6 צירי עמדות וטבלת שנאות ויחסים א-סימטריים.

## מבנה האובייקטים והרכיבים:
- `models/`: 5 האובייקטים:
  1. `IssueAxis.js`: אובייקט עמדה / ציר אידיאולוגי
  2. `PositionProfile.js`: אובייקט סל-עמדות וחישוב מרחקים
  3. `Party.js`: ישות מפלגה (שם, מנדטים, סל עמדות)
  4. `RelationsMatrix.js`: מפת יחסים סימטריים וא-סימטריים
  5. `Coalition.js`: ישות קואליציה מנצחת ופירוק בלוקים
- `components/`: מכלול הקומפוננטות מחולקות לפי 5 האובייקטים:
  - `1_issue/`: IssueAxisSlider, IssueAxisLegend
  - `2_position/`: PositionProfileEditor, PositionRadarView
  - `3_party/`: PartyCard, PartyList, CreatePartyForm
  - `4_relations/`: RelationCell (תמיכה בלחיצה ארוכה במובייל + קליק ימני במחשב), RelationsTable, AsymmetricDropdown, RelationsLegend
  - `5_coalition/`: CoalitionCard, CoalitionBreakdown, CoalitionEngineRunner
- `3 הקבצים המקוריים מעודכנים`:
  - `app/page.jsx`
  - `data/parties.js`
  - `utils/coalitionEngine.js`
