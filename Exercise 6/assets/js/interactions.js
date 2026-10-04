const summary = d3.select("#histogram-summary");

const updateHistogram = filteredData => {
  const activeTech = filters_screen.find(f => f.isActive).id;
  const updatedBins = binGenerator(filteredData);

  yScale.domain([0, Math.max(1, d3.max(updatedBins, b => b.length))]).nice();

  innerChart
    .selectAll("rect")
    .data(updatedBins)
    .join(
      enter => enter.append("rect")
        .attr("class", "bar")
        .attr("y", innerHeight)
        .attr("height", 0)
    )
      .attr("x", b => xScale(b.x0) + 1)
      .attr("width", b => Math.max(0, xScale(b.x1) - xScale(b.x0) - 2))
      .attr("fill", techColours[activeTech])
    .transition()
      .duration(500)
      .ease(d3.easeCubicInOut)
      .attr("y", b => yScale(b.length))
      .attr("height", b => innerHeight - yScale(b.length));

  yAxisGroup
    .transition()
      .duration(500)
      .call(d3.axisLeft(yScale));

  const median = d3.median(filteredData, d => d.energyConsumption);
  summary.text(filteredData.length
    ? `${filteredData.length} ${filteredData.length === 1 ? "TV" : "TVs"}, median ${median} kWh/year`
    : "No TVs match these filters");
};

const applyFilters = data => {
  const tech = filters_screen.find(f => f.isActive).id;
  const size = filters_size.find(f => f.isActive).id;
  return data.filter(tv =>
    (tech === "all" || tv.screenTech === tech) &&
    (size === "all" || tv.screenSize === size));
};

const buildFilterButtons = (containerId, filters, data) => {
  d3.select(containerId)
    .selectAll("button")
    .data(filters)
    .join("button")
      .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
      .text(d => d.label)
      .on("click", (e, d) => {
        if (!d.isActive) {
          filters.forEach(filter => filter.isActive = d.id === filter.id);
          d3.selectAll(`${containerId} .filter`)
            .classed("active", filter => filter.id === d.id);
          updateHistogram(applyFilters(data));
        }
      });
};

const populateFilters = data => {
  buildFilterButtons("#filters_screen", filters_screen, data);
  buildFilterButtons("#filters_size", filters_size, data);
};

let tooltip;
let tooltipLines;

const createTooltip = () => {
  tooltip = innerChartS
    .append("g")
      .attr("class", "tooltip")
      .style("display", "none")
      .style("pointer-events", "none");

  tooltip
    .append("rect")
      .attr("width", tooltipWidth)
      .attr("height", tooltipHeight)
      .attr("rx", 4);

  tooltipLines = [0, 1, 2].map(i =>
    tooltip
      .append("text")
        .attr("class", i === 0 ? "tooltip-title" : "")
        .attr("x", 10)
        .attr("y", 20 + i * 18));
};

const handleMouseEvents = () => {
  innerChartS
    .selectAll("circle")
    .on("mouseover", (e, d) => {
      d3.select(e.currentTarget).classed("dot-active", true).attr("r", 7);
      tooltipLines[0].text(`Screen size: ${d.screenSize}"`);
      tooltipLines[1].text(`${d.brand} (${d.screenTech})`);
      tooltipLines[2].text(`${d.energyConsumption} kWh, ${d.star} stars`);
      tooltip.style("display", null).raise();
    })
    .on("mousemove", e => {
      const [x, y] = d3.pointer(e, innerChartS.node());
      const tx = Math.min(x + 12, innerWidth - tooltipWidth);
      const ty = Math.max(y - tooltipHeight - 12, 0);
      tooltip.attr("transform", `translate(${tx}, ${ty})`);
    })
    .on("mouseout", e => {
      d3.select(e.currentTarget).classed("dot-active", false).attr("r", 4);
      tooltip.style("display", "none");
    });
};
