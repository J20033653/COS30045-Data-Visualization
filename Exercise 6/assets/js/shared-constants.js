const width = 900;
const height = 500;
const margin = { top: 50, right: 30, bottom: 70, left: 80 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const techColours = {
  "all": "#268bd2",
  "LCD": "#6c71c4",
  "LED": "#2aa198",
  "OLED": "#cb4b16"
};

const filters_screen = [
  { id: "all", label: "All", isActive: true },
  { id: "LED", label: "LED", isActive: false },
  { id: "LCD", label: "LCD", isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

const filters_size = [
  { id: "all", label: "All sizes", isActive: true },
  { id: 24, label: '24"', isActive: false },
  { id: 32, label: '32"', isActive: false },
  { id: 55, label: '55"', isActive: false },
  { id: 65, label: '65"', isActive: false },
  { id: 98, label: '98"', isActive: false }
];

const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .domain([0, 2800])
  .thresholds(d3.range(0, 2800, 100));

const colourScale = d3.scaleOrdinal()
  .domain(["LED", "LCD", "OLED"])
  .range([techColours["LED"], techColours["LCD"], techColours["OLED"]]);

const tooltipWidth = 190;
const tooltipHeight = 62;
