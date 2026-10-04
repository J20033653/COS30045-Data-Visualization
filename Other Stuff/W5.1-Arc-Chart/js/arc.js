/* ===================================================================
   W5.1 Drawing with lines and arcs — ARC (DONUT) CHART
   ===================================================================
   This follows the approach shown in the lecture slides:
     1. Load the CSV data with d3.csv() + d3.autoType
     2. Work out what percentage of days had precipitation
     3. Convert that percentage into an angle (degrees -> radians)
     4. Use d3.arc() to generate the "d" attribute for two <path>
        elements: the coloured arc (days with rain) drawn on top of
        a full "background" arc (365/366 days)
     5. Add a text label at the arc's centroid showing the percentage
   =================================================================== */


/* -------------------------------------------------------------
   STEP 1 - Load the data
   d3.autoType automatically converts:
     - "2024-01-01" (string)  -> a JS Date object
     - "3.8"        (string)  -> a JS number
   so afterwards d.date is a Date and d.rainfall is a number.

   NOTE ON file:// vs http(s)://
   If this page is opened by double-clicking index.html (a file://
   address) instead of being served by a web server, browsers block
   d3.csv()'s underlying fetch() request as a security precaution -
   it isn't a bug, and no console output about it may even be shown.
   To handle that gracefully, we .catch() the failed request and
   fall back to an embedded copy of the exact same data (see
   js/data.js -> RAINFALL_DATA_FALLBACK), so the chart still renders
   either way. Running a local server is still the recommended way
   to view this project, e.g.:
       python3 -m http.server 8000
   then open http://localhost:8000/index.html
------------------------------------------------------------- */
d3.csv("data/2024MelbRainfall.csv", d3.autoType)
  .then((data) => {
    console.log("precipitation data (loaded from CSV)", data);
    drawArc(data);
  })
  .catch((error) => {
    console.warn(
      "Could not fetch data/2024MelbRainfall.csv (likely opened via " +
        "file:// without a local server). Falling back to embedded " +
        "dataset from js/data.js instead.",
      error
    );
    drawArc(RAINFALL_DATA_FALLBACK);
  });


/* -------------------------------------------------------------
   STEP 2 - The chart-drawing function
------------------------------------------------------------- */
const drawArc = (data) => {

  /* -------------------------------------------------------
     2a. Basic dimensions.
     An arc/pie/donut chart is drawn in POLAR coordinates
     (radius + angle) rather than cartesian (x + y), so unlike
     a line/bar chart we don't need to reserve margin space for
     axes, ticks or axis labels — the whole square can be used.
  ------------------------------------------------------- */
  const pieChartWidth = 300;
  const pieChartHeight = 300;

  /* -------------------------------------------------------
     2b. Create the svg container.
     A viewBox (rather than fixed width/height attributes) is
     used so the chart scales responsively with its parent
     container (see .responsive-svg-container in style.css).
  ------------------------------------------------------- */
  const svg = d3
    .select("#arc")
    .append("svg")
    .attr("viewBox", [0, 0, pieChartWidth, pieChartHeight]);

  /* -------------------------------------------------------
     2c. Polar coordinate system.
     d3.arc() draws around an origin of (0, 0), with angle 0
     pointing straight up (12 o'clock) and increasing clockwise.
     We translate a <g> group to the middle of the svg so that
     origin (0,0) becomes the centre of our chart.
  ------------------------------------------------------- */
  const innerChart = svg
    .append("g")
    .attr(
      "transform",
      `translate(${pieChartWidth / 2}, ${pieChartHeight / 2})`
    );

  /* -------------------------------------------------------
     STEP 3 - Calculate the angle for "days with rain"
  ------------------------------------------------------- */

  // Total number of rows (days) in the dataset
  const numberOfDays = data.length;

  // Count how many days recorded rainfall greater than 0mm
  const numberOfDaysWithPrecipitation = data.filter(
    (d) => d.rainfall > 0
  ).length;

  // Percentage of the year that had rain, rounded to whole number
  const percentageDaysWithPrecipitation = Math.round(
    (numberOfDaysWithPrecipitation / numberOfDays) * 100
  );

  // Convert percentage -> degrees (360 degrees = full circle)
  const angleDaysWithPrecipitation_deg =
    (percentageDaysWithPrecipitation * 360) / 100;

  // d3.arc() expects angles in RADIANS, not degrees, so convert
  const angleDaysWithPrecipitation_rad =
    (angleDaysWithPrecipitation_deg * Math.PI) / 180;

  /* -------------------------------------------------------
     STEP 4 - Arc generator
     To draw an arc we need:
       - innerRadius: distance from centre to the arc's inner edge
                      (0 would make it a pie chart instead of a donut)
       - outerRadius: distance from centre to the arc's outer edge
     Optional styling:
       - padAngle:    small gap (in radians) between arc segments
       - cornerRadius: rounds off the corners of the arc
  ------------------------------------------------------- */
  const arcGenerator = d3
    .arc()
    .innerRadius(80)
    .outerRadius(120)
    .padAngle(0.02)
    .cornerRadius(6);

  /* -------------------------------------------------------
     STEP 5 - Draw the two arcs
     We draw two separate paths:
       1. Background arc — spans the REMAINING angle
          (days without rain), drawn in a light neutral colour,
          drawn FIRST so it sits underneath.
       2. Value arc — spans from 0 to the calculated angle
          (days with rain), drawn in the accent colour, on top.
     Each path's "d" attribute comes from calling the
     arcGenerator with a {startAngle, endAngle} object.
  ------------------------------------------------------- */

  // Colours used for the two arc segments
  const arcColour = "#6EB7C2"; // days WITH precipitation
  const backgroundColour = "#DCE2E2"; // days WITHOUT precipitation

  // 5a. Background arc: from the end of the value arc all the way
  //     around to a full circle (2 * PI radians = 360 degrees)
  innerChart
    .append("path")
    .attr("class", "arc-background")
    .attr("d", () => {
      return arcGenerator({
        startAngle: angleDaysWithPrecipitation_rad,
        endAngle: 2 * Math.PI,
      });
    })
    .attr("fill", backgroundColour);

  // 5b. Value arc: from the top of the circle (12 o'clock, angle 0)
  //     around to the angle representing days with precipitation
  innerChart
    .append("path")
    .attr("class", "arc-value")
    .attr("d", () => {
      return arcGenerator({
        startAngle: 0,
        endAngle: angleDaysWithPrecipitation_rad,
      });
    })
    .attr("fill", arcColour);

  /* -------------------------------------------------------
     STEP 6 - Label at the centroid
     arcGenerator.centroid() returns the [x, y] point at the
     "centre of mass" of an arc — useful for placing a label
     in the middle of the coloured segment. We temporarily set
     the same start/end angles on the generator before calling
     .centroid() so it knows which arc to measure.
  ------------------------------------------------------- */
  const centroid = arcGenerator
    .startAngle(0)
    .endAngle(angleDaysWithPrecipitation_rad)
    .centroid();

  innerChart
    .append("text")
    .attr("class", "arc-label")
    .text(d3.format(".0%")(percentageDaysWithPrecipitation / 100))
    .attr("x", centroid[0])
    .attr("y", centroid[1])
    .attr("text-anchor", "middle") // centre horizontally on x
    .attr("dominant-baseline", "middle") // centre vertically on y
    .attr("fill", "white")
    .style("font-weight", 200);

  /* -------------------------------------------------------
     STEP 7 - Caption underneath the donut explaining the arc
  ------------------------------------------------------- */
  innerChart
    .append("text")
    .attr("class", "arc-caption")
    .text("of days in 2024 had rain")
    .attr("x", 0)
    .attr("y", pieChartHeight / 2 - 15) // just below the donut
    .attr("text-anchor", "middle")
    .attr("fill", "#555")
    .style("font-size", "11px");
};
