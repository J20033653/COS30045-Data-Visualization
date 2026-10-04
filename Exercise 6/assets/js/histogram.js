const svg = d3.select("#histogram")
  .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

const innerChart = svg
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xScale = d3.scaleLinear()
  .domain([0, 2800])
  .range([0, innerWidth]);

const yScale = d3.scaleLinear()
  .range([innerHeight, 0]);

const yAxisGroup = innerChart.append("g");

const drawHistogram = data => {
  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));

  innerChart
    .append("text")
      .attr("class", "axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 50)
      .attr("text-anchor", "middle")
      .text("Energy consumption (kWh/year)");

  innerChart
    .append("text")
      .attr("class", "axis-label")
      .attr("x", -innerHeight / 2)
      .attr("y", -55)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Number of TVs");

  updateHistogram(data);
};
