// COS30045 Exercise 4.6 — Scaling charts
// Kept separate from script.js (Exercise 0.2's plain-JS file) as instructed.

// Responsive svg canvas inside .responsive-svg-container (from 4.3)
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 500 500")
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

// Bind the data to <rect> elements, scaled to fit the svg canvas
const drawBarChart = data => {
  // maps a count value (0-1100, comfortably above our max of 1096) to an
  // x position/width in the svg's 500-unit coordinate space
  const xScale = d3.scaleLinear()
    .domain([0, 1100])
    .range([0, 500]);

  // maps each brand to its own band along the y axis, with padding
  // between bars, so bar height/position no longer needs to be hand-tuned
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 500])
    .padding(0.1);

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")
    .attr("x", 0)
    .attr("y", (d, i) => yScale(d.brand));
};
