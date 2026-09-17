// COS30045 Exercise 4.4 — Reading and typing data with D3
// Kept separate from script.js (Exercise 0.2's plain-JS file) as instructed.

// Step 2 (from 4.3): create a responsive svg canvas inside .responsive-svg-container
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

// Step 3 (from 4.3): test rectangle, kept until drawBarChart replaces it with real data
svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

// Step 1-2: read the TV brand count CSV, typing the count column as a number
d3.csv("data/export.csv", d => {
  return {
    brand: d.brand,
    count: +d.count, // => converts to number
  };
}).then(data => {
  console.log(data);

  // Step 3: basic features of the dataset
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  console.log(d3.extent(data, d => d.count)); // => array with min and max

  // Sort so the chart (built in the next exercise) reads high to low
  data.sort((a, b) => d3.descending(a.count, b.count));

  drawBarChart(data);
});

// Stub — will be built out properly in the next exercise (Exercise 4.5)
function drawBarChart(data) {
  console.log("drawBarChart received:", data);
}
