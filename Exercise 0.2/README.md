# COS30045 – Data Visualisation  
## Exercise 0.2 – Energy Website

Welcome to **Exercise 0.2** for COS30045 Data Visualisation.

In this exercise, you will build a simple **Energy Data Webpage** using **HTML, CSS, and JavaScript**. The purpose of this exercise is to familiarise you with the development workflow using **GitHub and VS Code**, while preparing the foundation for future data visualisation tasks.

---

# Objective

The objectives of this exercise are:

- Understand how to use **GitHub for version control**
- Practice **web development structure**
- Build a **basic website**
- Maintain **regular commits**
- Identify commits that include **GenAI-generated code**

---

# Step 1 – Fork the Repository

1. Open this repository.
2. Click **Fork** at the top right of the page.
3. This will create a copy of the repository in your GitHub account.

Example:

Original repository : "github.com/rishmaf/COS30045-Data-Visualization/energy-webpage"

Your forked repository : "github.com/yourusername/COS30045-Data-Visualization/energy-webpage"


---

# Step 2 – Clone the Repository

Clone your forked repository to your local machine using **VS Code** or the terminal.



# Step 3 – Project Structure


Your project must follow the structure below.

```bash
energy-webpage-v1
│
├── css
│   └── styles.css
│
├── js
│   └── scripts.js
│
├── images
│   └── PowerIcon.png
│
├── data
│   └── data.csv
│
├── index.html
└── README.md
```

---

## Generative AI Reflection

**Tool(s) used:** Claude (Anthropic), used through the Claude Code CLI.

**What I used it for:** I used Claude to help scaffold the multi-page site — generating the initial HTML structure for the Home, Televisions, and About Us pages, the external stylesheet, and the JavaScript for the FAQ accordion. It also helped me pick a colour palette that matches the Solarized Light theme and put together the placeholder logo (SVG) and placeholder text about appliance energy consumption, since the real provided logo file wasn't accessible to it.

**What I changed or adapted after generation:** I reviewed the generated markup and CSS class names to make sure they matched across all three pages consistently (e.g. the `active` nav state, shared header/footer). I swapped in my own name and details in the footer and About page, checked the accordion behaviour actually worked in the browser, and I still need to replace the placeholder power-logo SVG with the actual logo file provided in the unit materials.

**What I learned:** Seeing the accordion implemented with `aria-expanded` and `aria-controls` showed me a simple, accessible pattern for toggling content with JavaScript that I hadn't used before. I also got a clearer sense of how to structure a small static site with a shared external stylesheet so styling stays consistent across pages.

**Limitations / issues encountered:** Claude couldn't download the actual logo image from the Canvas link since it required authentication, so it generated a placeholder SVG icon instead — I need to swap this for the real logo before final submission. I also had to manually verify the pages in a browser myself to confirm the styling, hover states, and active-page highlighting actually worked as intended, since generated code isn't guaranteed to be correct without checking.
