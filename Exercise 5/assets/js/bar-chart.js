const drawBarChart = data => {
  const width = 800;
  const height = 500;
  const margin = { top: 50, right: 30, bottom: 70, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#bar-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleBand()
    .domain(data.map(d => d.tech))
    .range([0, innerWidth])
    .padding(0.3);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.avgEnergy)])
    .range([innerHeight, 0]);

  innerChart
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.tech))
      .attr("y", d => yScale(d.avgEnergy))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d.avgEnergy));

  innerChart
    .selectAll(".bar-label")
    .data(data)
    .join("text")
      .attr("class", "bar-label")
      .attr("x", d => xScale(d.tech) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.avgEnergy) - 8)
      .attr("text-anchor", "middle")
      .text(d => Math.round(d.avgEnergy));

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
      .text("Screen technology");

  innerChart
    .append("text")
      .attr("class", "axis-label")
      .attr("x", -innerHeight / 2)
      .attr("y", -55)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Average energy consumption (kWh/year)");
};

d3.csv("data/Data_exercise_5.1.csv", d => {
  return {
    tech: d.Screen_Tech.toUpperCase(),
    avgEnergy: +d["Mean(Labelled energy consumption (kWh/year))"]
  };
}).then(data => {
  console.log(data);
  drawBarChart(data);
});
