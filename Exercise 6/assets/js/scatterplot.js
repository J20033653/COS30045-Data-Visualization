const svgS = d3.select("#scatterplot")
  .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

const innerChartS = svgS
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xScaleS = d3.scaleLinear().range([0, innerWidth]);
const yScaleS = d3.scaleLinear().range([innerHeight, 0]);

const drawScatterplot = data => {
  xScaleS.domain([0, d3.max(data, d => d.star) + 0.5]);
  yScaleS.domain([0, d3.max(data, d => d.energyConsumption)]).nice();

  innerChartS
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("class", "dot")
      .attr("cx", d => xScaleS(d.star))
      .attr("cy", d => yScaleS(d.energyConsumption))
      .attr("r", 4)
      .attr("fill", d => colourScale(d.screenTech))
      .attr("opacity", 0.5);

  innerChartS
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScaleS));

  innerChartS
    .append("g")
      .call(d3.axisLeft(yScaleS));

  innerChartS
    .append("text")
      .attr("class", "axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 50)
      .attr("text-anchor", "middle")
      .text("Star rating");

  innerChartS
    .append("text")
      .attr("class", "axis-label")
      .attr("x", -innerHeight / 2)
      .attr("y", -55)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Energy consumption (kWh/year)");

  const legend = innerChartS
    .append("g")
      .attr("transform", `translate(${innerWidth - 90}, 0)`)
    .selectAll("g")
    .data(colourScale.domain())
    .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`);

  legend
    .append("rect")
      .attr("width", 14)
      .attr("height", 14)
      .attr("fill", d => colourScale(d));

  legend
    .append("text")
      .attr("class", "legend-label")
      .attr("x", 22)
      .attr("y", 12)
      .text(d => d);
};
