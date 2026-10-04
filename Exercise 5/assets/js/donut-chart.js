const drawDonutChart = data => {
  const width = 600;
  const height = 500;
  const radius = Math.min(width, height) / 2 - 40;

  const svg = d3.select("#donut-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const colourScale = d3.scaleOrdinal()
    .domain(data.map(d => d.tech))
    .range(["#268bd2", "#2aa198", "#cb4b16"]);

  const pie = d3.pie()
    .value(d => d.total)
    .sort(null);

  const arcGenerator = d3.arc()
    .innerRadius(radius * 0.6)
    .outerRadius(radius)
    .padAngle(0.02)
    .cornerRadius(4);

  const total = d3.sum(data, d => d.total);

  const arcs = innerChart
    .selectAll("g")
    .data(pie(data))
    .join("g");

  arcs
    .append("path")
      .attr("d", arcGenerator)
      .attr("fill", d => colourScale(d.data.tech));

  arcs
    .append("text")
      .attr("class", "donut-label")
      .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text(d => d.data.total / total > 0.05 ? `${d.data.tech}` : "");

  innerChart
    .append("text")
      .attr("class", "donut-total")
      .attr("text-anchor", "middle")
      .attr("y", -4)
      .text(d3.format(",")(total));

  innerChart
    .append("text")
      .attr("class", "donut-caption")
      .attr("text-anchor", "middle")
      .attr("y", 20)
      .text("TVs in total");

  const legend = svg
    .append("g")
      .attr("transform", `translate(20, 20)`)
    .selectAll("g")
    .data(data)
    .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * 24})`);

  legend
    .append("rect")
      .attr("width", 14)
      .attr("height", 14)
      .attr("fill", d => colourScale(d.tech));

  legend
    .append("text")
      .attr("class", "legend-label")
      .attr("x", 22)
      .attr("y", 12)
      .text(d => `${d.tech} (${Math.round(d.total / total * 100)}%)`);
};

d3.csv("data/Data_exercise_5.3.csv", d => {
  return {
    tech: d.Screensize_Category[0].toUpperCase() + d.Screensize_Category.slice(1),
    total: +d.Count
  };
}).then(data => {
  console.log(data);
  drawDonutChart(data);
});
