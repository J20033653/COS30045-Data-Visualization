# Exercise 4.5 – Drawing with data

`drawBarChart()` now draws a horizontal bar for each brand by binding the data to rects with `selectAll("rect").data(data).join("rect")`. Bar width is the raw count, and each bar is moved down by its index.

There are no scales yet, so Samsung (1096) almost fills the 1200-wide canvas. Scales come in 4.6.

## AI Declaration

Claude (through Claude Code) wrote the code and this README.
