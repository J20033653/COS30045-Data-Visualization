const drawScatterPlot = data => {
  const width = 800;
  const height = 500;
  const margin = { top: 50, right: 30, bottom: 70, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#scatter-plot")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.star) + 0.5])
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.energy)])
    .range([innerHeight, 0]);

  innerChart
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.star))
      .attr("cy", d => yScale(d.energy))
      .attr("r", 4);

  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));

  innerChart
    .append("g")
      .call(d3.axisLeft(yScale));

  innerChart
    .append("text")
      .attr("class", "axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 50)
      .attr("text-anchor", "middle")
      .text("Star rating");

  innerChart
    .append("text")
      .attr("class", "axis-label")
      .attr("x", -innerHeight / 2)
      .attr("y", -55)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Energy consumption (kWh/year)");
};

d3.csv("data/scatter.csv", d => {
  return {
    star: +d.star,
    energy: +d.energy
  };
}).then(data => {
  console.log(data.length);
  drawScatterPlot(data);
});
