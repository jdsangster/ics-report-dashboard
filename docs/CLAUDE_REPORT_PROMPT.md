# Prompt para generar el JSON del reporte ICS

Pega este bloque en tu chat/proyecto de Claude (donde ya subes el Excel exportado de Power BI), como instrucción permanente o justo después de pedir el reporte semanal. Claude debe generar el reporte de Word/Teams como ya lo hace, **y además** un bloque de JSON con este formato exacto, listo para pegar en `/admin` del dashboard.

---

## Instrucción para Claude

```
Además del reporte narrativo de siempre, genera un bloque de JSON con esta
estructura EXACTA (no cambies nombres de campos, no agregues campos nuevos).
Usa los mismos datos y análisis que usaste para el reporte narrativo —
el JSON debe representar la misma información, solo en formato estructurado.

Reglas:
- "cadence" es "Weekly", "Daily", o "Weekend" según el periodo del reporte.
- "totalLabel" cambia según cadence: "Weekly Total", "Daily Total", o "Weekend Total".
- "status" en summary es "growth" si currentValue > previousValue, "decline" si es
  menor, "flat" si es igual.
- "badge" en cada fila de comparisonTable:
  - "🔺" si diff es positivo
  - "🔻" si diff es negativo
  - "➖" si diff es 0.0
  - "New" si el contribuidor no tenía prevAvg la semana anterior (prevAvg: 0)
- "diff" es un string con signo, ej. "+4.2", "-5.2", "0.0", o "New" cuando badge es "New".
- outstandingPerformers incluye solo contribuidores con avgDay >= 10.0.
- organizationalChanges es OPCIONAL — solo inclúyelo si hubo promociones, renuncias,
  o transiciones esa semana (igual que la sección "Organizational Changes &
  Transition Report" del Word). Si no hay ninguna, omite el campo por completo.
- highlights.mostImproved y biggestDeclines: máximo 5 cada uno, mismo formato que
  usas en el Word ("Nombre 🔺+X.X").
- conclusion: el mismo párrafo de cierre que escribes en el reporte de Word.

Devuelve el JSON en un bloque de código separado, sin texto adicional dentro
del bloque, para que lo pueda copiar directo.
```

---

## Esquema de referencia (con ejemplo real basado en Week 5)

```json
{
  "metadata": {
    "reportType": "Power BI ICS Report",
    "cadence": "Weekly",
    "periodLabel": "07/27 – 08/02",
    "filename": "Power BI ICS Report (07/27 – 08/02).docx"
  },
  "summary": {
    "totalLabel": "Weekly Total",
    "currentValue": 1285,
    "previousValue": 1543,
    "diffText": "-258 IC (-16.7%)",
    "status": "decline"
  },
  "outstandingPerformers": [
    { "cdr": "Lucia Tellez", "team": "Team Angelo", "totalIC": 60, "workedDays": 5, "avgDay": 12.0 }
  ],
  "comparisonTable": [
    { "cdr": "Marialys Ramirez", "team": "Team Mairenis", "prevAvg": 5.6, "currentAvg": 9.8, "diff": "+4.2", "badge": "🔺" },
    { "cdr": "Ianis Gavriz", "team": "Team Angelo", "prevAvg": 7.8, "currentAvg": 7.8, "diff": "0.0", "badge": "➖" },
    { "cdr": "Alejandro Portillo", "team": "Team Angelo", "prevAvg": 13.8, "currentAvg": 8.6, "diff": "-5.2", "badge": "🔻" },
    { "cdr": "Diego Brandan", "team": "Team Ruth", "prevAvg": 0, "currentAvg": 6.5, "diff": "New", "badge": "New" }
  ],
  "teamTotals": [
    { "team": "Team Angelo", "total": 493 },
    { "team": "Team Ruth", "total": 393 },
    { "team": "Team Mairenis", "total": 387 },
    { "team": "Team Martin", "total": 12 }
  ],
  "highlights": {
    "mostImproved": ["Marialys Ramirez 🔺+4.2", "Valentina Mateluna 🔺+1.4"],
    "biggestDeclines": ["Alejandro Portillo 🔻-5.2", "Salome Gutierrez 🔻-5.2"],
    "observations": [
      "Company total fell sharply to 1,285 IC (-16.7%), the steepest weekly drop of the period.",
      "Only one contributor (Lucia Tellez, 12.0 avg) hit the Outstanding threshold this week."
    ]
  },
  "organizationalChanges": [
    { "contributor": "Joshua Schmitz", "icGenerated": 34, "status": "Confirmed promoted (excluded from team totals)" },
    { "contributor": "Santiago Peralta", "icGenerated": 21, "status": "Confirmed resigned (excluded from team totals)" }
  ],
  "conclusion": "The operation closed Week 5 with 1,285 IC, a 16.7% decline from Week 4..."
}
```

**Campos y tipos:**

| Campo | Tipo | Notas |
| --- | --- | --- |
| `metadata.cadence` | `"Weekly" \| "Daily" \| "Weekend"` | Determina el título del KPI principal |
| `metadata.periodLabel` | string | El rango de fechas tal como aparece en el reporte |
| `summary.status` | `"growth" \| "decline" \| "flat"` | Colorea el KPI (verde/rojo/gris) |
| `comparisonTable[].badge` | `"🔺" \| "🔻" \| "➖" \| "New"` | Colorea el badge en la tabla |
| `organizationalChanges` | array, **opcional** | Omitir si no hubo cambios esa semana |

## Cómo publicarlo

1. Copia el bloque de JSON completo que Claude generó.
2. Ve a `https://tu-app.vercel.app/admin` (o `http://localhost:3000/admin` en local).
3. Ingresa la contraseña de admin.
4. Pega el JSON en el cuadro de texto y da clic en **Publicar reporte**.
5. El reporte aparece de inmediato en el dashboard (`/reports/ics`).

Si el JSON no tiene el formato correcto, la página te mostrará un error explicando qué falta — no se publica nada roto al dashboard.
