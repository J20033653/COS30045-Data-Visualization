const drawLineChart = data => {
  const width = 800;
  const height = 500;
  const margin = { top: 50, right: 30, bottom: 70, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#line-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.averagePrice)])
    .range([innerHeight, 0]);

  const lineGenerator = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.averagePrice));

  innerChart
    .append("path")
      .attr("class", "line")
      .attr("d", lineGenerator(data));

  innerChart
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("class", "line-dot")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.averagePrice))
      .attr("r", 3);

  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

  innerChart
    .append("g")
      .call(d3.axisLeft(yScale));

  innerChart
    .append("text")
      .attr("class", "axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 50)
      .attr("text-anchor", "middle")
      .text("Year");

  innerChart
    .append("text")
      .attr("class", "axis-label")
      .attr("x", -innerHeight / 2)
      .attr("y", -55)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Average spot price ($/MWh)");
};

d3.csv("data/spot_prices.csv", d => {
  return {
    year: +d.Year,
    averagePrice: +d["Average Price (notTas-Snowy)"]
  };
}).then(data => {
  console.log(data);
  drawLineChart(data);
}).catch(() => {
  d3.select("#line-chart")
    .append("p")
      .attr("class", "chart-error")
      .text("Spot price data (data/spot_prices.csv) not found.");
});
