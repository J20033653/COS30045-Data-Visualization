# Exercise 5 – Multi-chart page

One page, `index.html`, with four D3 charts. Each chart has its own script in `assets/js/` and its own CSV in `data/`.

| Chart | Script | Data |
|---|---|---|
| Scatter: energy vs star rating | `scatter-plot.js` | `scatter.csv` |
| Donut: TVs by screen size | `donut-chart.js` | `Data_exercise_5.3.csv` |
| Bar: average energy by screen technology, 55-inch TVs | `bar-chart.js` | `Data_exercise_5.1.csv` |
| Line: average spot price, 1998–2024 | `line-chart.js` | `spot_prices.csv` |

## Data

The donut, bar and line charts use the files supplied for the exercise. The line chart plots the `Average Price (notTas-Snowy)` column rather than one line per state.

`scatter.csv` is my own cut of the registry export from KNIME (`tv_2026_02_15.csv`, 4,724 TVs): star rating and labelled energy use for every TV. The other files come from a cleaned copy, so totals differ a little between charts.

## Notes

- Star ratings are discrete, so the scatter dots stack in columns.
- The donut counts TVs, not energy use.

## AI Declaration

Claude (through Claude Code) helped with debugging & writing the page
