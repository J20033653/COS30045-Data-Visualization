// COS30045 Exercise 4.7 — Grouping bars with labels using <g>
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

const drawBarChart = data => {
  const xScale = d3.scaleLinear()
    .domain([0, 1100])
    .range([0, 500]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 500])
    .padding(0.1);

  // group each brand's bar + labels into a single <g>, positioned by
  // translating the whole group to its y band — the bar and both text
  // elements inside it can then use coordinates relative to that group
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // the bar itself, offset x=100 to leave room for the brand label to its left
  barAndLabel
    .append("rect")
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue")
        .attr("x", 100)
        .attr("y", 0);

  // brand name, right-aligned just before the bar starts
  barAndLabel
    .append("text")
        .text(d => d.brand)
        .attr("x", 90)
        .attr("y", 15)
        .attr("text-anchor", "end")
        .style("font-size", "13px");

  // count value, placed just after the end of each bar
  barAndLabel
    .append("text")
        .text(d => d.count)
        .attr("x", d => 100 + xScale(d.count) + 4)
        .attr("y", 12)
        .style("font-size", "13px");
};
