// COS30045 Exercise 4.5 — D3 binding and drawing with data
// Kept separate from script.js (Exercise 0.2's plain-JS file) as instructed.

// Responsive svg canvas inside .responsive-svg-container (from 4.3)
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Read the TV brand count CSV, typing the count column as a number
d3.csv("data/export.csv", d => {
  return {
    brand: d.brand,
    count: +d.count,
  };
}).then(data => {
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));

  data.sort((a, b) => b.count - a.count);

  drawBarChart(data);
});

// Bind the data to <rect> elements and draw one bar per brand
const drawBarChart = data => {
  const barHeight = 20;
  const barSpacing = 5;

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => {
      console.log(d);
      return `bar bar-${d.count}`;
    })
    .attr("width", d => d.count)
    .attr("height", barHeight)
    .attr("fill", "blue")
    .attr("x", 0)
    .attr("y", (d, i) => i * (barHeight + barSpacing));
};
