// COS30045 Exercise 4.2 — Manipulate and add elements to a webpage with D3
// Kept separate from script.js (Exercise 0.2's plain-JS file) as instructed.

// Step 2: create a responsive svg canvas inside .responsive-svg-container
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

// Step 3: add a test rectangle to the svg canvas
svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");
