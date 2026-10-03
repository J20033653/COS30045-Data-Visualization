document.addEventListener("DOMContentLoaded", function () {
  if (typeof Chart === "undefined" || typeof tvData === "undefined") return;

  const solarized = {
    LED: "#268bd2",
    QLED: "#2aa198",
    OLED: "#cb4b16",
    grid: "#93a1a1",
    text: "#586e75",
  };

  const techs = ["LED", "QLED", "OLED"];
  const scatterDatasets = techs.map(function (tech) {
    return {
      label: tech,
      data: tvData
        .filter(function (d) { return d.technology === tech; })
        .map(function (d) { return { x: d.size, y: d.annualKWh }; }),
      backgroundColor: solarized[tech],
      pointRadius: 6,
      pointHoverRadius: 8,
    };
  });

  new Chart(document.getElementById("sizeChart"), {
    type: "scatter",
    data: { datasets: scatterDatasets },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: solarized.text } },
        title: {
          display: true,
          text: "Screen Size vs Annual Energy Consumption",
          color: "#cb4b16",
          font: { size: 16 },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          title: { display: true, text: "Screen size (inches)", color: solarized.text },
          grid: { color: "#eee8d5" },
          ticks: { color: solarized.text },
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: "Estimated annual energy use (kWh)", color: solarized.text },
          grid: { color: "#eee8d5" },
          ticks: { color: solarized.text },
        },
      },
    },
  });

  const byRating = {};
  tvData.forEach(function (d) {
    if (!byRating[d.starRating]) byRating[d.starRating] = [];
    byRating[d.starRating].push(d.annualKWh);
  });
  const ratings = Object.keys(byRating).sort(function (a, b) { return b - a; });
  const averages = ratings.map(function (r) {
    const vals = byRating[r];
    return Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length);
  });

  new Chart(document.getElementById("ratingChart"), {
    type: "bar",
    data: {
      labels: ratings.map(function (r) { return r + " stars"; }),
      datasets: [{
        label: "Average annual energy use (kWh)",
        data: averages,
        backgroundColor: "#268bd2",
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Energy Rating vs Average Annual Energy Use",
          color: "#cb4b16",
          font: { size: 16 },
        },
      },
      scales: {
        x: {
          title: { display: true, text: "Australian Energy Rating (stars)", color: solarized.text },
          grid: { color: "#eee8d5" },
          ticks: { color: solarized.text },
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: "Average annual energy use (kWh)", color: solarized.text },
          grid: { color: "#eee8d5" },
          ticks: { color: solarized.text },
        },
      },
    },
  });
});
