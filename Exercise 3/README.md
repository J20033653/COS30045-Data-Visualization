# Exercise 3 – Data Story: TV Energy Consumption

This is the Exercise 0.2 site with a new page, [`data-story.html`](data-story.html), that tells a short story with two charts (Chart.js).

## Data Story

**Audience:** people buying a TV who want a quick way to compare running costs, policy makers checking whether the star label means anything, and researchers looking at efficiency in consumer electronics.

**Questions:**
1. Does a bigger screen always use more energy, or does panel type (LED, QLED, OLED) matter too?
2. Does a higher star rating actually mean lower energy use?

**Charts:**
- Screen size against annual energy use, coloured by technology.
- Average annual energy use for each star rating.

Each chart has a short paragraph explaining what it shows and why it matters to the audience.

## About the Data

- **Source:** the 12 TV models in `assets/js/tv-data.js` are illustrative. I didn't have a real dataset for this exercise, so the figures were made up to look like typical Australian Energy Rating values. The page says this too.
- **Processing:** the script groups the data by technology for the first chart and averages kWh per star rating for the second.
- **Privacy:** there's no personal data, only product specs and energy figures.
- **Accuracy and limitations:** it's only 12 models and ignores brand, usage hours and standby power, so it shows the idea, not real market numbers.
- **Ethics:** axes start at zero so the differences aren't exaggerated, and the figures are labelled as illustrative so no one mistakes them for measurements.

## AI Declaration

Claude (through Claude Code) helped with debugging & writing the page
