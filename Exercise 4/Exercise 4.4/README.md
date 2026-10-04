# Exercise 4.4 – Loading data

`data/export.csv` is the TV brand count export from KNIME (columns `brand` and `count`).

`main.js` reads it with `d3.csv()`, turning `count` into a number with `+d.count`, then logs the data, its length and the max, min and extent. It sorts the data from highest to lowest and passes it to `drawBarChart()`, which is only a placeholder here.

I used `data/export.csv` instead of `../data/...` because `index.html` sits next to the `data` folder and D3 reads paths relative to the page.

## AI Declaration

Claude (through Claude Code) helped with debugging.
