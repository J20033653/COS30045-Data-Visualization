# Exercise 6 – Interactive Visualisations

## Overview
In this exercise you will build **interactive data visualisations using D3.js**. Interaction allows users to explore the data and gain deeper insights through features such as filtering and tooltips.

Use the **same repository you forked earlier for this unit** and complete this exercise inside the **Exercise 6 folder**.

---

## Exercise 6.1 – Interactive Histogram: Filtering

### Aim
Build a histogram and add **interactive filters**.

### Purpose
Interaction is one of the key advantages of visualisations on the web. In this exercise you will build a **histogram using the TV dataset** and allow users to filter the data.

Users should be able to explore energy consumption for different TV screen technologies such as:

- LCD
- LED
- OLED

### Preparation
Before starting, review:

- This week's lecture slides
- **Chapter 7 of Dufour and Meeks (2024)**

---

## Exercise 6.2 – Interactive Scatterplot: Tooltips

### Aim
Build a scatterplot and add **tooltips and colour coding**.

### Purpose
Tooltips are one of the most common interactive features in data visualisations. In this exercise you will create a **scatterplot using the TV dataset**.

The chart should allow users to explore the relationship between:

- Energy consumption
- Star rating
- Screen size
- Screen technology

Tooltips should display additional information such as **screen size**, and colours should represent **screen type**.

### Preparation
Before starting, review:

- This week's lecture slides
- **Chapter 7 of Dufour and Meeks (2024)**

---

## Instructions

1. Open your **existing forked repository**.
2. Navigate to the **Exercise 6 folder**.
3. Add the files needed to implement the histogram and scatterplot.
4. Implement the required interactive features using **D3.js**.
5. Commit and push your changes regularly to GitHub.

Your forked repository will serve as your **submission record**.

---

## What I built

`index.html` has a histogram and a scatterplot, both using `data/Ex6_TVdata_withStar.csv`, the supplied dataset of 4,233 TVs.

**Histogram:** energy use in 100 kWh bins. Two rows of buttons filter by screen technology (All, LED, LCD, OLED) and screen size (All sizes, 24", 32", 55", 65", 98"). The two filters combine, the bars animate to the new data, and a line under the buttons shows the TV count and median energy use. The y axis rescales for each selection.

**Scatterplot:** star rating against energy use, with dots coloured by screen technology (legend top right). Hovering a dot shows a tooltip with its screen size, brand, technology, energy use and star rating.

**Files:** `shared-constants.js` (sizes, colours, filter lists, bin generator), `histogram.js`, `scatterplot.js`, `interactions.js` (filters and tooltip) and `load-data.js` (loads the CSV once and calls everything).

I didn't build the optional extension to filter the scatterplot.

## AI Declaration

Claude (through Claude Code) helped with debugging & writing the page
