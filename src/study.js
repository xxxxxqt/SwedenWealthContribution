/* ============================================================
   User Study — Wealth & Income Inequality Visualization
   Thesis: Kairui Li, Linköping University

   UNIFIED FLOW (two parts, sequential):
     Part 1  Table vs. other visual representations (C1)
     Part 2  Bar chart with different Y-axis scales (C2)

   PER-STEP QUESTIONS:
     Q1  Estimation   — Top 10% wealth entry threshold (year-specific)
     Q2  Magnitude    — Top 0.001% vs. Bottom 50% ratio (year-specific)
     Q3  Likert (−5–+5) — clarity per chart type
   ============================================================ */

const STUDY_VERSION = "9.0";
const STORAGE_KEY   = "wealth-study-data-v9";

// Paste your OneDrive file-request URL here after creating it in OneDrive
const ONEDRIVE_REQUEST_URL = "https://1drv.ms/f/c/b440acd6517e9d8a/IgAXJfxK03yxSKR_DAq3UjdmAbPCMZVRrbTZJiKHk7NYb7Q?e=LHCxco";

/* ══════════════════════════════════════════════════════════════
   STEP DEFINITIONS
══════════════════════════════════════════════════════════════ */

const STEP_CONSENT = {
  id: "consent", type: "info",
  title: "Participant Information & Consent",
  content: `
    <p>You are invited to take part in a user study for a Master's thesis at Linköping University on <strong>data visualization of wealth inequality in Sweden</strong>.</p>
    <p><strong>What you will do:</strong> Examine interactive charts and answer three short questions. Estimated time: <strong>6–10 minutes</strong>.</p>
    <p><strong>Data:</strong> Your answers and time-on-task are stored only in your browser (localStorage). No personal data is collected.</p>
    <p><strong>Voluntary:</strong> You may close the study at any time without consequence.</p>
    <label class="consent-check">
      <input type="checkbox" id="consent-checkbox"/>
      I have read the above and agree to participate.
    </label>`,
  nextLabel: "Next →",
  requireConsent: true,
};

const STEP_COMPLETE = {
  id: "complete", type: "complete",
  title: "Thank you for participating!",
  content: `<p>Your responses and timing data are recorded below. Click <strong>Download</strong> to save a JSON file — please share it with the researcher.</p>`,
};

/* ══════════════════════════════════════════════════════════════
   PART 1: Table vs. Line / Bar (waffle removed)
   Valid data years: 1980, 1990, 2000, 2010, 2020, 2024 only.
   Q1 — Top 10% entry threshold (WID: thwealj992 p90p100)
   Q2 — Top 0.001% vs Top 1% ratio (Bottom 50% is negative in
        most years, so we compare within the top wealth groups)
══════════════════════════════════════════════════════════════ */
const C1_INTRO = {
  id: "c1_intro", type: "info",
  title: "Part 1 of 2 — Table vs. Visual Representations",
  content: `
    <p>You will first see the Swedish wealth data as a <strong>TABLE</strong>, then as two visual representations — <strong>line chart</strong> and <strong>bar chart</strong> — each shown in different comparison modes.</p>
    <p>Each step displays data for a <strong>different year</strong>. For every step you will answer two factual questions:</p>
    <ul>
      <li><strong>Q1 — Estimation:</strong> "Based on the chart, approximately what was the average per-person wealth for the 'Top 10%' group in [year]?"</li>
      <li><strong>Q2 — Magnitude:</strong> "Roughly how many times larger is the Top 0.001%'s per-person wealth than the Top 1%'s in [year]?"</li>
    </ul>
    <p>After all steps for each chart type you will give a short clarity rating (Q3). Part 2 follows immediately after Part 1.</p>`,
  nextLabel: "View the Table →",
};

/* Q1 — year-specific options so the correct answer is always "c"
   Values are the chart-displayed disjoint "Top 10%" average:
     top9 = (avg_top10 × 10 − avg_top1) / 9
   1980≈2.5M, 1990≈3.1M, 2000≈5.1M, 2010≈9.0M, 2020≈14.8M, 2024≈14.3M */
function makeQ1(year) {
  const opts = {
    1980: [
      { label: "Around 500,000 SEK (≈ 5 × 10⁵)",    value: "a" },
      { label: "Around 1 million SEK (≈ 10⁶)",       value: "b" },
      { label: "Around 2.5 million SEK (≈ 2.5 × 10⁶)", value: "c" },
      { label: "Around 10 million SEK (≈ 10⁷)",      value: "d" },
    ],
    1990: [
      { label: "Around 700,000 SEK (≈ 7 × 10⁵)",    value: "a" },
      { label: "Around 1.5 million SEK (≈ 1.5 × 10⁶)", value: "b" },
      { label: "Around 3 million SEK (≈ 3 × 10⁶)",  value: "c" },
      { label: "Around 12 million SEK (≈ 1.2 × 10⁷)", value: "d" },
    ],
    2000: [
      { label: "Around 1 million SEK (≈ 10⁶)",       value: "a" },
      { label: "Around 2.5 million SEK (≈ 2.5 × 10⁶)", value: "b" },
      { label: "Around 5 million SEK (≈ 5 × 10⁶)",  value: "c" },
      { label: "Around 20 million SEK (≈ 2 × 10⁷)", value: "d" },
    ],
    2010: [
      { label: "Around 2 million SEK (≈ 2 × 10⁶)",  value: "a" },
      { label: "Around 4.5 million SEK (≈ 4.5 × 10⁶)", value: "b" },
      { label: "Around 9 million SEK (≈ 9 × 10⁶)",  value: "c" },
      { label: "Around 35 million SEK (≈ 3.5 × 10⁷)", value: "d" },
    ],
    2020: [
      { label: "Around 3 million SEK (≈ 3 × 10⁶)",  value: "a" },
      { label: "Around 7 million SEK (≈ 7 × 10⁶)",  value: "b" },
      { label: "Around 15 million SEK (≈ 1.5 × 10⁷)", value: "c" },
      { label: "Around 60 million SEK (≈ 6 × 10⁷)", value: "d" },
    ],
    2024: [
      { label: "Around 3 million SEK (≈ 3 × 10⁶)",  value: "a" },
      { label: "Around 7 million SEK (≈ 7 × 10⁶)",  value: "b" },
      { label: "Around 14 million SEK (≈ 1.4 × 10⁷)", value: "c" },
      { label: "Around 55 million SEK (≈ 5.5 × 10⁷)", value: "d" },
    ],
  };
  return {
    text: `Q1 — Estimation: Based on the chart, approximately what was the average per-person wealth for the 'Top 10%' group in ${year}?`,
    options: opts[year] || opts[2024],
    correct: "c",
  };
}

/* Q2 — Top 0.001% vs Top 1% ratio (both always positive)
   Ratios: 1990≈210×, 2000≈225×, 2010≈305×, 2020≈226×, 2024≈282×
   All fall in the "200× or more" bucket → correct always "c" */
function makeQ2(year) {
  return {
    text: `Q2 — Magnitude: Roughly how many times larger is the Top 0.001%'s average per-person wealth than the Top 1%'s average per-person wealth in ${year}?`,
    options: [
      { label: "About 10 times larger",           value: "a" },
      { label: "About 100 times larger",          value: "b" },
      { label: "About 200 times larger or more",  value: "c" },
      { label: "About 10,000 times larger",       value: "d" },
    ],
    correct: "c",
  };
}

/* Q3 Likert shared template (per chart type) */
const C1_Q3 = (chartName) => ([
  { id: "lq1", text: `How clearly does the <strong>${chartName}</strong> convey the wealth inequality pattern?`,
    lo: "−5 Not at all clear", hi: "Extremely clear +5" },
]);

/* ── Baseline: TABLE — year 2024, threshold 9.17 M SEK ──────────── */
const C1_TABLE = {
  id: "c1_table", type: "task_2q",
  phase: "Part 1 — Baseline", questionType: "Table",
  vizConfig: { representation: "table", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2024" },
  taskText: "This <strong>TABLE</strong> shows the average net wealth per person (SEK) for six population groups in Sweden in <strong>2024</strong>. Read all values carefully before answering.",
  q1: makeQ1(2024),  /* chart top9 ≈ 14.3 M SEK; correct c */
  q2: makeQ2(2024),           /* 24.5 B / 86.9 M ≈ 282×; correct c */
};
const C1_TABLE_RATE = {
  id: "c1_table_rate", type: "task_likert",
  phase: "Part 1 — Baseline Rating", questionType: "Table — Clarity (Q3)",
  vizConfig: { representation: "table", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2024" },
  taskText: "You are still viewing the <strong>TABLE</strong> (2024). Please rate its clarity.",
  questions: C1_Q3("TABLE"),
};

/* ── Line chart cells — both show full range 1980–2024, ask different ref year */
const C1_LINE_JUX = {
  id: "c1_line_jux", type: "task_2q",
  phase: "Part 1 — Line × Juxtaposition", questionType: "Line chart",
  vizConfig: { representation: "line", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "1980,1990,2000,2010,2020,2024", yScale: "linear-zoom" },
  taskText: "This <strong>LINE CHART</strong> shows average per-person wealth from 1980 to 2024 in <strong>separate panels</strong> (juxtaposition). Focus on the <strong>2020</strong> values before answering.",
  q1: makeQ1(2020),  /* chart top9 ≈ 14.8 M SEK; correct c */
  q2: makeQ2(2020),           /* 18.9 B / 83.6 M ≈ 226×; correct c */
};
const C1_LINE_SUPER = {
  id: "c1_line_super", type: "task_2q",
  phase: "Part 1 — Line × Superposition", questionType: "Line chart",
  vizConfig: { representation: "line", comparison: "superposition", metric: "wealth", popEncoding: "without", years: "1980,1990,2000,2010,2020,2024", yScale: "linear-zoom" },
  taskText: "The same data is now shown as a <strong>LINE CHART</strong> with all groups <strong>overlaid</strong> on one chart (superposition). Focus on the <strong>2010</strong> values before answering.",
  q1: makeQ1(2010),  /* chart top9 ≈ 9.0 M SEK; correct c */
  q2: makeQ2(2010),           /* 17.1 B / 56.2 M ≈ 305×; correct c */
};
const C1_LINE_RATE = {
  id: "c1_line_rate", type: "task_likert",
  phase: "Part 1 — Line Chart Rating", questionType: "Line chart — Clarity (Q3)",
  vizConfig: { representation: "line", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "1980,1990,2000,2010,2020,2024", yScale: "linear-zoom" },
  taskText: "You have now seen the <strong>LINE CHART</strong> in two comparison modes. Please rate overall clarity.",
  questions: C1_Q3("LINE CHART"),
};

/* ── Bar chart cells — different single years; Anim uses full range */
const C1_BAR_JUX = {
  id: "c1_bar_jux", type: "task_2q",
  phase: "Part 1 — Bar × Juxtaposition", questionType: "Bar chart",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2000", yScale: "linear-zoom" },
  taskText: "This <strong>BAR CHART</strong> shows average per-person wealth for each group in <strong>2000</strong>, with separate bars shown <strong>side by side</strong> (juxtaposition). Use the zoom slider to explore before answering.",
  q1: makeQ1(2000),  /* chart top9 ≈ 5.1 M SEK; correct c */
  q2: makeQ2(2000),           /* 7.17 B / 31.87 M ≈ 225×; correct c */
};
const C1_BAR_SUPER = {
  id: "c1_bar_super", type: "task_2q",
  phase: "Part 1 — Bar × Superposition", questionType: "Bar chart",
  vizConfig: { representation: "bar", comparison: "superposition", metric: "wealth", popEncoding: "without", years: "1990", yScale: "linear-zoom" },
  taskText: "This <strong>BAR CHART</strong> shows <strong>1990</strong> data with all groups <strong>overlaid</strong> on one axis (superposition). Use the zoom slider to explore before answering.",
  q1: makeQ1(1990),  /* chart top9 ≈ 3.1 M SEK; correct c */
  q2: makeQ2(1990),           /* 3.91 B / 18.63 M ≈ 210×; correct c */
};
const C1_BAR_ANIM = {
  id: "c1_bar_anim", type: "task",
  phase: "Part 1 — Bar × Animation", questionType: "Bar chart — Pattern",
  vizConfig: { representation: "bar", comparison: "animation", metric: "wealth", popEncoding: "without", years: "1980,1990,2000,2010,2020,2024", yScale: "linear-zoom" },
  autoPlay: true,
  taskText: "Watch this <strong>ANIMATED BAR CHART</strong> stepping through years 1980 → 2024. Pay attention to the <strong>Bottom 50%</strong> bar (it turns negative and continues declining). Observe in which decade the decline is steepest.",
  questionText: "In which period shown did the Bottom 50%'s average wealth decline the most?",
  options: [
    { label: "1980–1990 (wealth increased in this period)", value: "a" },
    { label: "1990–2000 (wealth first turned negative)",    value: "b" },
    { label: "2000–2010 (steady decline continues)",        value: "c" },
    { label: "2010–2020 (largest absolute drop: −332 K SEK)", value: "d" },
  ],
  correct: "d", /* 2010→2020: −379 671 to −711 202 = drop of 331 531 SEK */
};
const C1_BAR_RATE = {
  id: "c1_bar_rate", type: "task_likert",
  phase: "Part 1 — Bar Chart Rating", questionType: "Bar chart — Clarity (Q3)",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2000", yScale: "linear-zoom" },
  taskText: "You have now seen the <strong>BAR CHART</strong> in three comparison modes. Please rate overall clarity.",
  questions: C1_Q3("BAR CHART"),
};

/* ══════════════════════════════════════════════════════════════
   PART 2: Y-axis scales — each variant uses a valid-set year.
   Q1 stays the same (Top 0.001% wealth reading, always → "c").
   Q2 asks "What was Bottom 50%'s per-person wealth in [year]?"
   Bottom 50% values: 2020=−711K, 2024=−687K, 2010=−380K, 2000=−114K
══════════════════════════════════════════════════════════════ */
const C2_INTRO = {
  id: "c2_intro", type: "info",
  title: "Part 2 of 2 — Bar Chart Y-axis Scales",
  content: `
    <p>In this final part you will see Swedish wealth data displayed with four different Y-axis scales:</p>
    <ol style="font-size:14px;line-height:1.8;padding-left:20px;margin:8px 0 12px">
      <li><strong>Linear (full range)</strong> — equal spacing, full data range</li>
      <li><strong>Logarithmic</strong> — each step represents a 10× increase</li>
      <li><strong>Scale break (zig-zag)</strong> — axis jumps over the mid-range gap</li>
      <li><strong>Linear with zoom window</strong> — range slider to explore the axis</li>
    </ol>
    <p>For each scale you will answer <strong>two factual questions</strong>: one about the Top 0.001%'s wealth and one about the Bottom 50%'s wealth. A final question asks about overall magnitude.</p>`,
  nextLabel: "Start Scale 1 →",
};

/* C2 Q1: shared options (Top 0.001% wealth) — correct always "c"
   Values: 2020=18.9B, 2024=24.5B, 2010=17.1B, 2000=7.2B */
const C2_Q1_OPTIONS = [
  { label: "Around 20 million SEK  (≈ 2 × 10⁷)",  value: "a" },
  { label: "Around 200 million SEK (≈ 2 × 10⁸)",  value: "b" },
  { label: "Around 15 billion SEK  (≈ 1.5 × 10¹⁰)", value: "c" },
  { label: "Around 200 billion SEK (≈ 2 × 10¹¹)", value: "d" },
];
const C2_Q1_CORRECT = "c";

/* C2 Q2: shared options (Bottom 50% wealth, SEK)
   Correct varies: 2020→b, 2024→b, 2010→c, 2000→d */
const C2_Q2_OPTIONS = [
  { label: "Around −3 million SEK  (≈ −3 × 10⁶)", value: "a" },
  { label: "Around −700,000 SEK   (≈ −7 × 10⁵)", value: "b" },
  { label: "Around −380,000 SEK   (≈ −3.8 × 10⁵)", value: "c" },
  { label: "Around −110,000 SEK   (≈ −1.1 × 10⁵)", value: "d" },
];

const C2_V1 = {
  id: "c2_v1", type: "task_2q",
  phase: "Part 2 — Scale 1 of 4", questionType: "Linear (Full Range)",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "linear" },
  taskText: "This bar chart uses a <strong>LINEAR (full range) Y-axis</strong> for <strong>2020</strong>. Equal vertical distances represent equal SEK amounts across the entire data range, including the negative Bottom 50% bar.",
  q1: { text: "Q1 — Value reading: Looking at this linear-scale chart, approximately what is the Top 0.001%'s average per-person wealth in 2020?", options: C2_Q1_OPTIONS, correct: C2_Q1_CORRECT },
  q2: { text: "Q2 — Value reading: Looking at the same chart, approximately what is the Bottom 50%'s average per-person wealth in 2020?", options: C2_Q2_OPTIONS, correct: "b" }, /* actual ≈ −711 K SEK */
};

const C2_V2 = {
  id: "c2_v2", type: "task_2q",
  phase: "Part 2 — Scale 2 of 4", questionType: "Logarithmic",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2024", yScale: "log" },
  taskText: "This bar chart uses a <strong>LOGARITHMIC Y-axis</strong> for <strong>2024</strong>. Each equal step represents a ×10 increase. <em>Note: groups with negative or near-zero wealth are not visible on a log scale.</em>",
  q1: { text: "Q1 — Value reading: Looking at this logarithmic-scale chart, approximately what is the Top 0.001%'s average per-person wealth in 2024?", options: C2_Q1_OPTIONS, correct: C2_Q1_CORRECT }, /* actual ≈ 24.5 B SEK */
  q2: { text: "Q2 — Recall: Based on what you know from Part 1, approximately what is the Bottom 50%'s average per-person wealth in 2024? (It may not be visible on this scale.)", options: C2_Q2_OPTIONS, correct: "b" }, /* actual ≈ −687 K SEK */
};

const C2_V3 = {
  id: "c2_v3", type: "task_2q",
  phase: "Part 2 — Scale 3 of 4", questionType: "Scale Break (Zig-zag)",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2010", yScale: "break" },
  taskText: "This bar chart uses a <strong>SCALE BREAK</strong> (zig-zag) for <strong>2010</strong>. The axis skips a large range so both the lower groups and the extreme Top 0.001% fit in the same chart.",
  q1: { text: "Q1 — Value reading: Looking at this scale-break chart, approximately what is the Top 0.001%'s average per-person wealth in 2010?", options: C2_Q1_OPTIONS, correct: C2_Q1_CORRECT }, /* actual ≈ 17.1 B SEK */
  q2: { text: "Q2 — Value reading: Looking at the same chart, approximately what is the Bottom 50%'s average per-person wealth in 2010?", options: C2_Q2_OPTIONS, correct: "c" }, /* actual ≈ −380 K SEK */
};

const C2_V4 = {
  id: "c2_v4", type: "task_2q",
  phase: "Part 2 — Scale 4 of 4", questionType: "Linear with Zoom Window",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2000", yScale: "linear-zoom" },
  taskText: "This bar chart uses a <strong>LINEAR Y-axis with a zoom window</strong> for <strong>2000</strong>. Use the range slider to explore different portions of the axis — zoom in for lower groups, zoom out to see the Top 0.001%.",
  q1: { text: "Q1 — Value reading: Using the zoom slider, approximately what is the Top 0.001%'s average per-person wealth in 2000?", options: C2_Q1_OPTIONS, correct: C2_Q1_CORRECT }, /* actual ≈ 7.2 B SEK */
  q2: { text: "Q2 — Value reading: Using the zoom slider, approximately what is the Bottom 50%'s average per-person wealth in 2000?", options: C2_Q2_OPTIONS, correct: "d" }, /* actual ≈ −114 K SEK */
};

/* Final magnitude question — 2020 data, Top 0.001% vs Middle 40% */
const C2_COMPARE = {
  id: "c2_compare", type: "task",
  phase: "Part 2 — Final Question", questionType: "Magnitude Comparison",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "linear-zoom" },
  taskText: "You have now seen the data through all four Y-axis scales. Final question using <strong>2020</strong> data. Use the zoom slider as needed.",
  questionText: "Q3 — Magnitude: Roughly how many times larger is the Top 0.001%'s average per-person wealth compared with the Middle 40%'s in 2020?",
  options: [
    { label: "About 10 times larger",            value: "a" },
    { label: "About 100 times larger",           value: "b" },
    { label: "About 1,000 times larger",         value: "c" },
    { label: "About 5,000 times larger or more", value: "d" },
  ],
  correct: "d", /* 18.9 B / 3.47 M ≈ 5 440× */
};

/* ══════════════════════════════════════════════════════════════
   PART 3: Wealth vs. Income Inequality Perception
   Q1–Q4 shown TWICE (pre-test before viz, post-test after viz).
   Q5–Q8 shown ONCE after the visualization.
   Reference anchors: Bottom 50% avg wealth 1980 ≈ 166,000 SEK.
══════════════════════════════════════════════════════════════ */
const C3_BOTH_VIZ = { representation: "line", comparison: "juxtaposition", metric: "both", popEncoding: "without", years: "1980,1990,2000,2010,2020,2024", yScale: "linear-zoom" };

const C3_INTRO = {
  id: "c3_intro", type: "info",
  title: "Part 3 — Wealth vs. Income Inequality",
  content: `
    <p>In this final part you will first answer some estimation questions, then explore a visualization showing <strong>both wealth and income</strong> for Sweden, and answer the same questions again to see how your estimates change.</p>
    <h3 style="margin-top:16px;font-size:15px">Definitions</h3>
    <p><strong>Income:</strong> Total after-tax income received each month — wages, self-employment, government transfers (pensions, welfare), and investment income.</p>
    <p><strong>Wealth:</strong> Total value of all assets accumulated over time <em>minus</em> debt. Assets include real estate, cars, savings, stocks, and pensions. When two individuals jointly own an asset, each is credited half.</p>
    <p>Answer based on your current knowledge — there are no wrong answers, only honest ones.</p>`,
  nextLabel: "Start pre-test questions →",
};

const C3_PRE_Q12 = {
  id: "c3_pre_q12", type: "estimate",
  phase: "Part 3 — Pre-test", title: "Before seeing the chart: Income & Wealth Shares",
  questions: [
    { id: "q1", type: "pct",
      text: "Q1 — What percentage of total yearly income in Sweden do you think is earned by the top 1% of earners?" },
    { id: "q2", type: "pct",
      text: "Q2 — What percentage of total wealth in Sweden do you think is owned by the richest 10% of the population?" },
  ],
};

const C3_PRE_Q34 = {
  id: "c3_pre_q34", type: "estimate",
  phase: "Part 3 — Pre-test", title: "Before seeing the chart: Wealth Estimates",
  anchor: "Reference anchor: The average wealth of the Bottom 50% in 1980 was approximately <strong>166,000 SEK</strong>.",
  questions: [
    { id: "q3", type: "grid",
      text: "Q3 — Estimate the average wealth (SEK) for each group and year:",
      rows: [ { id: "top10", label: "Top 10%" }, { id: "bot50", label: "Bottom 50%" } ],
      cols: ["1980", "2000", "2020"] },
    { id: "q4", type: "multi_num",
      text: "Q4 — Estimate how many times larger the Top 10%'s average wealth was compared with the Bottom 50%'s:",
      fields: [ { id: "y1980", label: "In 1980" }, { id: "y2000", label: "In 2000" }, { id: "y2020", label: "In 2020" } ],
      unit: "× times" },
  ],
};

const C3_VIZ_INTRO = {
  id: "c3_viz_intro", type: "task_explore",
  phase: "Part 3 — Visualization",
  title: "Explore the Wealth vs. Income Comparison",
  content: `The chart now shows <strong>both average income (solid fill) and average wealth (dashed fill)</strong> per person for each group in Sweden from 1980 to 2024. Explore the panels freely — compare how income and wealth differ across groups and over time. When you are ready, click Continue.`,
  vizConfig: C3_BOTH_VIZ,
};

const C3_POST_Q12 = {
  id: "c3_post_q12", type: "task_estimate",
  phase: "Part 3 — Post-test", questionType: "Wealth vs. Income",
  vizConfig: C3_BOTH_VIZ,
  taskText: "You have explored the visualization. Now answer the same two questions again — use the chart above to help you.",
  questions: [
    { id: "q1", type: "pct",
      text: "Q1 — What percentage of total yearly income in Sweden is earned by the top 1% of earners?" },
    { id: "q2", type: "pct",
      text: "Q2 — What percentage of total wealth in Sweden is owned by the richest 10% of the population?" },
  ],
};

const C3_POST_Q34 = {
  id: "c3_post_q34", type: "task_estimate",
  phase: "Part 3 — Post-test", questionType: "Wealth vs. Income",
  vizConfig: C3_BOTH_VIZ,
  taskText: "Using the chart above as reference, update your wealth estimates for the groups and years below.",
  anchor: "Reference anchor: The average wealth of the Bottom 50% in 1980 was approximately <strong>166,000 SEK</strong>.",
  questions: [
    { id: "q3", type: "grid",
      text: "Q3 — Estimate the average wealth (SEK) for each group and year:",
      rows: [ { id: "top10", label: "Top 10%" }, { id: "bot50", label: "Bottom 50%" } ],
      cols: ["1980", "2000", "2020"] },
    { id: "q4", type: "multi_num",
      text: "Q4 — Estimate how many times larger the Top 10%'s average wealth was compared with the Bottom 50%'s:",
      fields: [ { id: "y1980", label: "In 1980" }, { id: "y2000", label: "In 2000" }, { id: "y2020", label: "In 2020" } ],
      unit: "× times" },
  ],
};

const C3_Q5678 = {
  id: "c3_q5678", type: "task_estimate",
  phase: "Part 3 — Perception", questionType: "Wealth vs. Income",
  vizConfig: C3_BOTH_VIZ,
  taskText: "Final questions about your perceptions of Swedish inequality.",
  questions: [
    { id: "q5", type: "distribution",
      text: "Q5 — Estimate the percentage of Swedes in 2024 whose annual <em>wealth</em> falls into each bracket (must sum to 100%):",
      buckets: [ { id: "neg", label: "Below 0 SEK (net debt)" }, { id: "mid", label: "0 – 2,000,000 SEK" }, { id: "high", label: "Above 2,000,000 SEK" } ] },
    { id: "q6", type: "likert10",
      text: "Q6 — How equally do you think <strong>income</strong> is distributed in Sweden?",
      lo: "0 — Very equal", hi: "Very unequal — 10" },
    { id: "q7", type: "likert10",
      text: "Q7 — How equally do you think <strong>wealth</strong> is distributed in Sweden?",
      lo: "0 — Very equal", hi: "Very unequal — 10" },
    { id: "q8", type: "pct",
      text: "Q8 — What share of total wealth do you think the top 10% <em>should ideally</em> hold?" },
  ],
};

/* ── Unified step sequence (all three parts, linear flow) ─────── */
const STEPS = [
  STEP_CONSENT,
  C1_INTRO,
  /* Part 1 — Table */           C1_TABLE, C1_TABLE_RATE,
  /* Part 1 — Line */            C1_LINE_JUX, C1_LINE_SUPER, C1_LINE_RATE,
  /* Part 1 — Bar */             C1_BAR_JUX, C1_BAR_SUPER, C1_BAR_ANIM, C1_BAR_RATE,
  C2_INTRO,
  /* Part 2 — Y-axis scales */   C2_V1, C2_V2, C2_V3, C2_V4, C2_COMPARE,
  C3_INTRO,
  /* Part 3 — Pre-test */        C3_PRE_Q12, C3_PRE_Q34,
  /* Part 3 — Visualization */   C3_VIZ_INTRO,
  /* Part 3 — Post-test */       C3_POST_Q12, C3_POST_Q34, C3_Q5678,
  STEP_COMPLETE,
];

/* ══════════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════════ */
const state = {
  currentStep:   0,
  startTime:     Date.now(),
  stepTimes:     {},
  taskQTimes:    {},
  answers:       {},
  participantId: Math.random().toString(36).slice(2, 9),
};

/* ══════════════════════════════════════════════════════════════
   VIZ / CONTROL HELPERS
══════════════════════════════════════════════════════════════ */
function setViz(config) {
  const rep = document.getElementById("cwi-representation");
  const cmp = document.getElementById("cwi-comparison");
  const met = document.getElementById("cwi-metric");
  const pop = document.getElementById("cwi-pop-encoding");
  const yrs = document.getElementById("cwi-years-input");
  if (!rep) return;
  if (config.representation) rep.value = config.representation;
  if (config.years)    { yrs.value = config.years; yrs.dispatchEvent(new Event("change")); }
  if (config.metric)      met.value = config.metric;
  if (config.comparison)  cmp.value = config.comparison;
  if (config.popEncoding) pop.value = config.popEncoding;
  rep.dispatchEvent(new Event("change"));
  if (config.yScale) {
    const r = document.getElementById(`cwi-yscale-${config.yScale}`);
    if (r) { r.checked = true; r.dispatchEvent(new Event("change")); }
  }
}

function lockControls() {
  ["cwi-representation","cwi-comparison","cwi-metric","cwi-pop-encoding","cwi-years-input"]
    .forEach(id => { const el = document.getElementById(id); if (el) el.disabled = true; });
  document.querySelectorAll("[name='cwiYScale']").forEach(el => el.disabled = true);
  document.querySelector(".cwi-controls-bar")?.style.setProperty("opacity","0.45");
  document.getElementById("cwi-yscale-ctrl")?.style.setProperty("opacity","0.45");
  // Glass pane that survives chart re-renders (e.g. zoom slider): use MutationObserver
  // to re-add the blocker div whenever the render root is cleared and rebuilt.
  const root = document.getElementById("cwi-render-root");
  if (root) {
    root.style.position = "relative";
    root._studyLocked = true;
    if (!_blockerObserver) {
      _blockerObserver = new MutationObserver(_ensureBlocker);
      _blockerObserver.observe(root, { childList: true });
    }
    _ensureBlocker();
  }
}

function unlockControls() {
  ["cwi-representation","cwi-comparison","cwi-metric","cwi-pop-encoding","cwi-years-input"]
    .forEach(id => { const el = document.getElementById(id); if (el) el.disabled = false; });
  document.querySelectorAll("[name='cwiYScale']").forEach(el => el.disabled = false);
  document.querySelector(".cwi-controls-bar")?.style.removeProperty("opacity");
  document.getElementById("cwi-yscale-ctrl")?.style.removeProperty("opacity");
  if (_blockerObserver) { _blockerObserver.disconnect(); _blockerObserver = null; }
  const root = document.getElementById("cwi-render-root");
  if (root) root._studyLocked = false;
  document.getElementById("cwi-interaction-blocker")?.remove();
  document.getElementById("cwi-tooltip")?.style.removeProperty("display");
}

/* ══════════════════════════════════════════════════════════════
   ANSWER SAVING
══════════════════════════════════════════════════════════════ */
function saveAnswer(stepId, value) {
  const t0 = state.stepTimes[stepId] || state.startTime;
  const qt = state.taskQTimes[stepId] || null;
  state.answers[stepId] = {
    ...(state.answers[stepId] || {}),
    value,
    timestamp: Date.now(),
    totalMs:   Date.now() - t0,
    exploreMs: qt ? qt - t0         : null,
    answerMs:  qt ? Date.now() - qt : null,
  };
  persist();
}

function saveSubAnswer(stepId, key, val) {
  if (!state.answers[stepId]) state.answers[stepId] = {};
  state.answers[stepId][key] = val;
  state.answers[stepId].totalMs = Date.now() - (state.stepTimes[stepId] || state.startTime);
  persist();
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, version: STUDY_VERSION }));
}

/* ══════════════════════════════════════════════════════════════
   SUMMARY
══════════════════════════════════════════════════════════════ */
function buildSummary() {
  return STEPS.filter(s => ["task","task_combined","task_likert","task_2q","task_estimate","estimate"].includes(s.type)).map(t => {
    const ans = state.answers[t.id] || {};
    const base = { id: t.id, phase: t.phase, type: t.questionType || t.title };
    if (!Object.keys(ans).length) return { ...base, answered: false };
    const timeFmt = ms => ms != null ? (ms/1000).toFixed(1) + "s" : "—";

    if (t.type === "estimate" || t.type === "task_estimate") {
      const fields = Object.entries(ans).filter(([k]) => k !== "totalMs").map(([k,v]) => `${k}: ${v}`).join(" | ");
      return { ...base, answered: true, answer: fields, correct: null, totalSec: timeFmt(ans.totalMs) };
    }

    if (t.type === "task_likert") {
      return { ...base, answered: true,
        answer: t.questions.map(q => `${q.id}:${ans[q.id]??'—'}`).join(", "),
        correct: null,
        totalSec: timeFmt(ans.totalMs), exploreSec: "—", answerSec: "—" };
    }
    if (t.type === "task_2q") {
      const o1 = (t.q1?.options||[]).find(o=>o.value===ans.q1)?.label ?? ans.q1 ?? "—";
      const o2 = (t.q2?.options||[]).find(o=>o.value===ans.q2)?.label ?? ans.q2 ?? "—";
      const c1 = t.q1?.correct != null ? ans.q1 === t.q1.correct : null;
      const c2 = t.q2?.correct != null ? ans.q2 === t.q2.correct : null;
      return { ...base, answered: true,
        answer: `Q1: ${o1} | Q2: ${o2}`,
        correct: (c1 != null && c2 != null) ? (c1 && c2) : null,
        totalSec: timeFmt(ans.totalMs), exploreSec: timeFmt(ans.exploreMs), answerSec: timeFmt(ans.answerMs) };
    }
    if (t.type === "task_combined") {
      const opt = (t.options||[]).find(o=>o.value===ans.value)?.label ?? ans.value ?? "—";
      const ratings = (t.likertQuestions||[]).map(q=>`${q.id}:${ans[q.id]??'—'}`).join(", ");
      return { ...base, answered: true,
        answer: `MCQ: ${opt} | Ratings: ${ratings}`,
        correct: t.correct != null ? ans.value === t.correct : null,
        totalSec: timeFmt(ans.totalMs), exploreSec: timeFmt(ans.exploreMs), answerSec: timeFmt(ans.answerMs) };
    }
    const opt = (t.options||[]).find(o=>o.value===ans.value)?.label ?? ans.value ?? "—";
    return { ...base, answered: true, answer: opt,
      correct: t.correct != null ? ans.value === t.correct : null,
      totalSec: timeFmt(ans.totalMs), exploreSec: timeFmt(ans.exploreMs), answerSec: timeFmt(ans.answerMs) };
  });
}

function downloadData() {
  const data = {
    participantId: state.participantId, studyVersion: STUDY_VERSION,
    startTime: new Date(state.startTime).toISOString(),
    completedTime: new Date().toISOString(), answers: state.answers, summary: buildSummary(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `study-${state.participantId}.json`; a.click();
  URL.revokeObjectURL(url);
}

/* ══════════════════════════════════════════════════════════════
   RENDER
══════════════════════════════════════════════════════════════ */
function render() {
  const step = STEPS[state.currentStep];
  if (!state.stepTimes[step.id]) state.stepTimes[step.id] = Date.now();
  const overlay    = document.getElementById("study-overlay");
  const panel      = document.getElementById("study-panel");
  const taskBanner = document.getElementById("study-task-banner");
  const isTask = ["task","task_combined","task_likert","task_2q","task_estimate","task_explore"].includes(step.type);
  if (isTask) {
    overlay.classList.add("hidden");
    taskBanner.classList.remove("hidden");
    setViz(step.vizConfig);
    if (step.autoPlay) {
      setTimeout(() => document.getElementById("cwi-race-play")?.click(), 300);
    }
    if (step.type !== "task_explore") lockControls();
    renderTaskBanner(step, taskBanner);
  } else {
    taskBanner.classList.add("hidden");
    overlay.classList.remove("hidden");
    unlockControls();
    if (step.type === "info")     renderInfo(step, panel);
    if (step.type === "estimate") renderEstimate(step, panel);
    if (step.type === "complete") renderComplete(step, panel);
  }
  updateProgress();
}

/* ── Overlay screens ─────────────────────────────────────────── */
function renderInfo(step, panel) {
  panel.innerHTML = `
    <div class="study-phase-tag">Information</div>
    <h2 class="study-title">${step.title}</h2>
    <div class="study-body">${step.content}</div>
    <div class="study-nav">
      ${state.currentStep > 0 ? `<button class="study-btn secondary" id="study-prev">← Back</button>` : ""}
      <button class="study-btn primary" id="study-next" ${step.requireConsent?"disabled":""}>${step.nextLabel||"Next →"}</button>
    </div>`;
  if (step.requireConsent) {
    const cb = panel.querySelector("#consent-checkbox");
    const btn = panel.querySelector("#study-next");
    cb.addEventListener("change", () => { btn.disabled = !cb.checked; });
  }
  panel.querySelector("#study-next")?.addEventListener("click", advance);
  panel.querySelector("#study-prev")?.addEventListener("click", retreat);
}

/* ── Task banner ─────────────────────────────────────────────── */
let taskPhase = "description";

function renderTaskBanner(step, banner) {
  taskPhase = "description";
  banner.innerHTML = buildTaskHTML(step);
  wireTask(step, banner);
  startTaskTimer(banner, state.stepTimes[step.id]);
}

function buildTaskHTML(step) {
  const ans   = state.answers[step.id] || {};
  const timer = `<span id="task-timer-label" style="display:none"></span>`;

  /* task_explore: single-phase "explore and continue" banner */
  if (step.type === "task_explore") {
    return `<div class="task-banner-inner">
      <div class="task-phase-tag">${step.phase}</div>
      <p class="task-desc"><strong>${step.title}</strong> — ${step.content}</p>
      <div class="task-banner-nav">
        ${state.currentStep > 1 ? `<button class="study-btn secondary" id="task-back">← Back</button>` : ""}
        <button class="study-btn primary" id="task-submit">I've explored the chart → Continue</button>
      </div>
    </div>`;
  }

  if (taskPhase === "description") {
    const readyLabel = step.type === "task_estimate"
      ? "Show questions →"
      : "I've examined the chart — show question →";
    return `<div class="task-banner-inner">
      <button class="study-close-btn" id="task-close-btn">✕</button>
      <div class="task-phase-tag">
        ${step.phase} <span class="task-qtype-tag">${step.questionType}</span> ${timer}
      </div>
      <p class="task-desc">${step.taskText}</p>
      <div class="task-banner-nav">
        ${state.currentStep > 1 ? `<button class="study-btn secondary" id="task-back">← Back</button>` : ""}
        <button class="study-btn primary" id="task-ready">${readyLabel}</button>
      </div>
    </div>`;
  }

  /* Standard MCQ */
  if (step.type === "task") {
    const saved = ans.value;
    return `<div class="task-banner-inner">
      <button class="study-close-btn" id="task-close-btn">✕</button>
      <div class="task-phase-tag">${step.phase} — ${step.questionType} ${timer}</div>
      <p class="task-question"><strong>${step.questionText}</strong></p>
      <div class="task-options-col">
        ${step.options.map(o=>`
          <label class="task-option ${saved===o.value?"selected":""}">
            <input type="radio" name="tq" value="${o.value}" ${saved===o.value?"checked":""}/>
            ${o.label}
          </label>`).join("")}
      </div>
      <div class="task-banner-nav">
        <button class="study-btn secondary" id="task-back-q">← Re-read description</button>
        <button class="study-btn primary" id="task-submit" ${saved?"":"disabled"}>Submit →</button>
      </div>
    </div>`;
  }

  /* Combined: MCQ + 2 rating questions */
  if (step.type === "task_combined") {
    const saved  = ans.value;
    const SCALE  = [-5,-4,-3,-2,-1,0,1,2,3,4,5];
    const allDone = saved && (step.likertQuestions||[]).every(q => ans[q.id] != null);
    return `<div class="task-banner-inner">
      <button class="study-close-btn" id="task-close-btn">✕</button>
      <div class="task-phase-tag">${step.phase} — ${step.questionType} ${timer}</div>
      <p class="task-question"><strong>Q1 — Identify the inequality:</strong> ${step.questionText}</p>
      <div class="task-options-col" style="margin-bottom:12px">
        ${step.options.map(o=>`
          <label class="task-option ${saved===o.value?"selected":""}">
            <input type="radio" name="tq" value="${o.value}" ${saved===o.value?"checked":""}/>
            ${o.label}
          </label>`).join("")}
      </div>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:8px 0">
      <p style="font-size:12px;font-weight:700;color:#2b6cb0;text-transform:uppercase;letter-spacing:.06em;margin:0 0 8px">Q2 &amp; Q3 — Rate this chart (−5 to +5)</p>
      ${(step.likertQuestions||[]).map(q=>`
        <div class="task-likert-row">
          <p class="task-likert-label">${q.text}</p>
          <div class="task-likert-scale">
            <span class="likert-end">${q.lo}</span>
            ${SCALE.map(n=>`
              <label class="likert-cell ${ans[q.id]===String(n)?"sel":""}">
                <input type="radio" name="${q.id}" value="${n}" ${ans[q.id]===String(n)?"checked":""}/>
                <span>${n}</span>
              </label>`).join("")}
            <span class="likert-end">${q.hi}</span>
          </div>
        </div>`).join("")}
      <div class="task-banner-nav" style="margin-top:8px">
        <button class="study-btn secondary" id="task-back-q">← Re-read description</button>
        <button class="study-btn primary" id="task-submit" ${allDone?"":"disabled"}>Submit →</button>
      </div>
    </div>`;
  }

  /* Likert −5 to +5 */
  if (step.type === "task_likert") {
    const allDone = step.questions.every(q => ans[q.id] != null);
    const SCALE = [-5,-4,-3,-2,-1,0,1,2,3,4,5];
    return `<div class="task-banner-inner">
      <button class="study-close-btn" id="task-close-btn">✕</button>
      <div class="task-phase-tag">${step.phase} — ${step.questionType} ${timer}</div>
      <p class="task-desc-sm">${step.taskText}</p>
      ${step.questions.map(q=>`
        <div class="task-likert-row">
          <p class="task-likert-label">${q.text}</p>
          <div class="task-likert-scale">
            <span class="likert-end">${q.lo}</span>
            ${SCALE.map(n=>`
              <label class="likert-cell ${ans[q.id]===String(n)?"sel":""}">
                <input type="radio" name="${q.id}" value="${n}" ${ans[q.id]===String(n)?"checked":""}/>
                <span>${n}</span>
              </label>`).join("")}
            <span class="likert-end">${q.hi}</span>
          </div>
        </div>`).join("")}
      <div class="task-banner-nav" style="margin-top:8px">
        <button class="study-btn secondary" id="task-back-q">← Re-read description</button>
        <button class="study-btn primary" id="task-submit" ${allDone?"":"disabled"}>Submit →</button>
      </div>
    </div>`;
  }

  /* Dual MCQ: Q1 (estimation) + Q2 (magnitude comparison) */
  if (step.type === "task_2q") {
    const s1 = ans.q1 ?? null;
    const s2 = ans.q2 ?? null;
    const allDone = s1 != null && s2 != null;
    return `<div class="task-banner-inner">
      <button class="study-close-btn" id="task-close-btn">✕</button>
      <div class="task-phase-tag">${step.phase} — ${step.questionType} ${timer}</div>
      <p class="task-question"><strong>${step.q1.text}</strong></p>
      <div class="task-options-col tq1-opts" style="margin-bottom:12px">
        ${step.q1.options.map(o=>`
          <label class="task-option ${s1===o.value?"selected":""}">
            <input type="radio" name="tq1" value="${o.value}" ${s1===o.value?"checked":""}/>
            ${o.label}
          </label>`).join("")}
      </div>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:8px 0">
      <p class="task-question"><strong>${step.q2.text}</strong></p>
      <div class="task-options-col tq2-opts">
        ${step.q2.options.map(o=>`
          <label class="task-option ${s2===o.value?"selected":""}">
            <input type="radio" name="tq2" value="${o.value}" ${s2===o.value?"checked":""}/>
            ${o.label}
          </label>`).join("")}
      </div>
      <div class="task-banner-nav" style="margin-top:8px">
        <button class="study-btn secondary" id="task-back-q">← Re-read description</button>
        <button class="study-btn primary" id="task-submit" ${allDone?"":"disabled"}>Submit →</button>
      </div>
    </div>`;
  }
  /* Free-form estimation form (C3 post-test with viz visible) */
  if (step.type === "task_estimate") {
    const saved = state.answers[step.id] || {};
    const allFilled = step.questions.every(q => isEstimateFilled(q, saved));
    return `<div class="task-banner-inner">
      <button class="study-close-btn" id="task-close-btn">✕</button>
      <div class="task-phase-tag">${step.phase} — ${step.questionType} ${timer}</div>
      ${step.anchor ? `<div style="font-size:11px;color:#555;background:#f8f9fa;border-radius:4px;padding:5px 10px;margin-bottom:6px">${step.anchor}</div>` : ""}
      <div class="task-estimate-form">
        ${step.questions.map(q => buildEstimateQHTML(q, saved)).join(`<hr style="border:none;border-top:1px solid #e2e8f0;margin:6px 0">`)}
      </div>
      <div class="task-banner-nav" style="margin-top:8px">
        <button class="study-btn secondary" id="task-back-q">← Re-read description</button>
        <button class="study-btn primary" id="task-submit" ${allFilled?"":"disabled"}>Submit →</button>
      </div>
    </div>`;
  }
  return "";
}

/* ── Wire task ───────────────────────────────────────────────── */
function wireTask(step, banner) {
  banner.querySelector("#task-close-btn")?.addEventListener("click", closeStudy);
  banner.querySelector("#task-back")?.addEventListener("click", () => { unlockControls(); retreat(); });
  banner.querySelector("#task-ready")?.addEventListener("click", () => {
    state.taskQTimes[step.id] = Date.now();
    taskPhase = "question";
    banner.innerHTML = buildTaskHTML(step);
    wireTask(step, banner);
  });
  banner.querySelector("#task-back-q")?.addEventListener("click", () => {
    taskPhase = "description";
    banner.innerHTML = buildTaskHTML(step);
    wireTask(step, banner);
  });
  if (step.type === "task") {
    banner.querySelectorAll(".task-option").forEach(lbl => {
      lbl.addEventListener("click", () => {
        banner.querySelectorAll(".task-option").forEach(l => l.classList.remove("selected"));
        lbl.classList.add("selected");
        saveAnswer(step.id, lbl.querySelector("input").value);
        const btn = banner.querySelector("#task-submit");
        if (btn) btn.disabled = false;
      });
    });
  }
  if (step.type === "task_combined") {
    // MCQ options
    banner.querySelectorAll("[name='tq']").forEach(radio => {
      radio.closest("label")?.addEventListener("click", () => {
        banner.querySelectorAll(".task-option").forEach(l => l.classList.remove("selected"));
        radio.closest("label").classList.add("selected");
        saveAnswer(step.id, radio.value);
        const allDone = !!(state.answers[step.id]?.value) &&
          (step.likertQuestions||[]).every(q => (state.answers[step.id]||{})[q.id] != null);
        const btn = banner.querySelector("#task-submit");
        if (btn) btn.disabled = !allDone;
      });
    });
    // Rating questions
    (step.likertQuestions||[]).forEach(q => {
      banner.querySelectorAll(`[name="${q.id}"]`).forEach(radio => {
        radio.addEventListener("change", () => {
          banner.querySelectorAll(`[name="${q.id}"]`).forEach(r => r.closest(".likert-cell")?.classList.remove("sel"));
          radio.closest(".likert-cell")?.classList.add("sel");
          saveSubAnswer(step.id, q.id, radio.value);
          const allDone = !!(state.answers[step.id]?.value) &&
            (step.likertQuestions||[]).every(qq => (state.answers[step.id]||{})[qq.id] != null);
          const btn = banner.querySelector("#task-submit");
          if (btn) btn.disabled = !allDone;
        });
      });
    });
  }
  if (step.type === "task_likert") {
    step.questions.forEach(q => {
      banner.querySelectorAll(`[name="${q.id}"]`).forEach(radio => {
        radio.addEventListener("change", () => {
          banner.querySelectorAll(`[name="${q.id}"]`).forEach(r => r.closest(".likert-cell")?.classList.remove("sel"));
          radio.closest(".likert-cell")?.classList.add("sel");
          saveSubAnswer(step.id, q.id, radio.value);
          const allDone = step.questions.every(qq => (state.answers[step.id]||{})[qq.id] != null);
          const btn = banner.querySelector("#task-submit");
          if (btn) btn.disabled = !allDone;
        });
      });
    });
  }
  if (step.type === "task_2q") {
    const checkAllDone = () => {
      const a = state.answers[step.id] || {};
      const allDone = a.q1 != null && a.q2 != null;
      const btn = banner.querySelector("#task-submit");
      if (btn) btn.disabled = !allDone;
    };
    banner.querySelectorAll("[name='tq1']").forEach(radio => {
      radio.closest("label")?.addEventListener("click", () => {
        banner.querySelectorAll("[name='tq1']").forEach(r => r.closest("label")?.classList.remove("selected"));
        radio.closest("label")?.classList.add("selected");
        saveSubAnswer(step.id, "q1", radio.value);
        checkAllDone();
      });
    });
    banner.querySelectorAll("[name='tq2']").forEach(radio => {
      radio.closest("label")?.addEventListener("click", () => {
        banner.querySelectorAll("[name='tq2']").forEach(r => r.closest("label")?.classList.remove("selected"));
        radio.closest("label")?.classList.add("selected");
        saveSubAnswer(step.id, "q2", radio.value);
        checkAllDone();
      });
    });
  }
  if (step.type === "task_explore") {
    banner.querySelector("#task-back")?.addEventListener("click", () => retreat());
    banner.querySelector("#task-submit")?.addEventListener("click", () => advance());
    return;
  }
  if (step.type === "task_estimate") {
    wireEstimateInputs(step, banner, true);
  }
  banner.querySelector("#task-submit")?.addEventListener("click", () => { unlockControls(); advance(); });
  startTaskTimer(banner, state.stepTimes[step.id]);
}

/* ── Timer ───────────────────────────────────────────────────── */
let _timerInterval = null;
let _blockerObserver = null;

function _ensureBlocker() {
  const root = document.getElementById("cwi-render-root");
  if (!root || !root._studyLocked) return;
  if (!document.getElementById("cwi-interaction-blocker")) {
    const pane = document.createElement("div");
    pane.id = "cwi-interaction-blocker";
    pane.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:200;cursor:default;";
    root.appendChild(pane);
  }
  document.getElementById("cwi-tooltip")?.style.setProperty("display","none");
}
function startTaskTimer(banner, t0) {
  if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
  const lbl = banner.querySelector("#task-timer-label");
  if (!lbl) return;
  const start = t0 || Date.now();
  _timerInterval = setInterval(() => {
    if (!lbl.isConnected) { clearInterval(_timerInterval); return; }
    lbl.textContent = `⏱ ${((Date.now()-start)/1000).toFixed(0)} s`;
  }, 500);
}

/* ── C3 estimate helpers ─────────────────────────────────────── */

function isEstimateFilled(q, saved) {
  if (q.type === "pct") return saved[q.id] != null && saved[q.id] !== "";
  if (q.type === "grid")
    return q.rows.every(r => q.cols.every(c => { const k = `${q.id}_${r.id}_${c}`; return saved[k] != null && saved[k] !== ""; }));
  if (q.type === "multi_num")
    return q.fields.every(f => { const k = `${q.id}_${f.id}`; return saved[k] != null && saved[k] !== ""; });
  if (q.type === "distribution") {
    if (!q.buckets.every(b => { const k = `${q.id}_${b.id}`; return saved[k] != null && saved[k] !== ""; })) return false;
    const sum = q.buckets.reduce((s, b) => s + (Number(saved[`${q.id}_${b.id}`]) || 0), 0);
    return Math.abs(sum - 100) < 0.5;
  }
  if (q.type === "likert10") return saved[q.id] != null;
  return false;
}

function buildEstimateQHTML(q, saved) {
  const v = k => saved[k] ?? "";
  if (q.type === "pct") {
    return `<p class="estimate-q-text">${q.text}</p>
      <div class="estimate-field-row">
        <input type="number" id="eq_${q.id}" class="estimate-input" min="0" max="100" step="0.1" value="${v(q.id)}" placeholder="0–100">
        <span class="estimate-unit">%</span>
      </div>`;
  }
  if (q.type === "grid") {
    return `<p class="estimate-q-text">${q.text}</p>
      <table class="estimate-grid">
        <thead><tr><th></th>${q.cols.map(c => `<th>${c}</th>`).join("")}</tr></thead>
        <tbody>${q.rows.map(r => `
          <tr><td><strong>${r.label}</strong></td>
            ${q.cols.map(c => { const k = `${q.id}_${r.id}_${c}`; return `<td><input type="number" id="eq_${k}" class="estimate-input" step="1000" value="${v(k)}" placeholder="SEK"> <span class="estimate-unit" style="font-size:10px">SEK</span></td>`; }).join("")}
          </tr>`).join("")}
        </tbody>
      </table>`;
  }
  if (q.type === "multi_num") {
    return `<p class="estimate-q-text">${q.text}</p>
      <div class="estimate-multi">
        ${q.fields.map(f => { const k = `${q.id}_${f.id}`; return `
          <div class="estimate-field-row">
            <label class="estimate-field-label">${f.label}:</label>
            <input type="number" id="eq_${k}" class="estimate-input" min="0" step="0.1" value="${v(k)}" placeholder="e.g. 5">
            <span class="estimate-unit">${q.unit || ""}</span>
          </div>`; }).join("")}
      </div>`;
  }
  if (q.type === "distribution") {
    const sum = q.buckets.reduce((s, b) => s + (Number(v(`${q.id}_${b.id}`)) || 0), 0);
    const ok  = Math.abs(sum - 100) < 0.5;
    return `<p class="estimate-q-text">${q.text}</p>
      <div class="estimate-multi">
        ${q.buckets.map(b => { const k = `${q.id}_${b.id}`; return `
          <div class="estimate-field-row">
            <label class="estimate-field-label" style="min-width:220px">${b.label}:</label>
            <input type="number" id="eq_${k}" class="estimate-input" min="0" max="100" step="1" value="${v(k)}" placeholder="0–100">
            <span class="estimate-unit">%</span>
          </div>`; }).join("")}
        <div id="dist-sum-${q.id}" style="font-size:12px;margin-top:4px;color:${ok?"#2d6a4f":"#c0392b"}">
          Sum: ${sum.toFixed(0)}% ${ok ? "✓" : "(must equal 100%)"}
        </div>
      </div>`;
  }
  if (q.type === "likert10") {
    const sv = saved[q.id];
    return `<p class="estimate-q-text">${q.text}</p>
      <div class="task-likert-scale" style="flex-wrap:wrap;gap:2px">
        <span class="likert-end">${q.lo || "0 — Very equal"}</span>
        ${[0,1,2,3,4,5,6,7,8,9,10].map(n => `
          <label class="likert-cell ${String(sv)===String(n)?"sel":""}">
            <input type="radio" name="eq_${q.id}" value="${n}" ${String(sv)===String(n)?"checked":""}/>
            <span>${n}</span>
          </label>`).join("")}
        <span class="likert-end">${q.hi || "Very unequal — 10"}</span>
      </div>`;
  }
  return "";
}

function wireEstimateInputs(step, container, isTask) {
  const checkAll = () => {
    const saved = state.answers[step.id] || {};
    const done = step.questions.every(q => isEstimateFilled(q, saved));
    const btn = container.querySelector("#" + (isTask ? "task-submit" : "study-next"));
    if (btn) btn.disabled = !done;
  };
  container.querySelectorAll(".estimate-input").forEach(input => {
    const key = input.id.replace("eq_", "");
    const restore = () => { if (input.value !== "") saveSubAnswer(step.id, key, input.value); };
    restore();
    input.addEventListener("input", () => {
      saveSubAnswer(step.id, key, input.value);
      // refresh distribution sum label if needed
      const q = step.questions.find(q => q.type === "distribution" && input.id.startsWith(`eq_${q.id}_`));
      if (q) {
        const saved = state.answers[step.id] || {};
        const sum = q.buckets.reduce((s, b) => s + (Number(saved[`${q.id}_${b.id}`]) || 0), 0);
        const ok  = Math.abs(sum - 100) < 0.5;
        const lbl = container.querySelector(`#dist-sum-${q.id}`);
        if (lbl) { lbl.textContent = `Sum: ${sum.toFixed(0)}% ${ok ? "✓" : "(must equal 100%)"}`; lbl.style.color = ok ? "#2d6a4f" : "#c0392b"; }
      }
      checkAll();
    });
  });
  container.querySelectorAll("[name^='eq_']").forEach(radio => {
    const key = radio.name.replace("eq_", "");
    radio.addEventListener("change", () => {
      container.querySelectorAll(`[name="${radio.name}"]`).forEach(r => r.closest(".likert-cell")?.classList.remove("sel"));
      radio.closest(".likert-cell")?.classList.add("sel");
      saveSubAnswer(step.id, key, radio.value);
      checkAll();
    });
  });
  checkAll();
}

function renderEstimate(step, panel) {
  const saved = state.answers[step.id] || {};
  panel.innerHTML = `
    <div class="study-phase-tag">${step.phase || "Estimation"}</div>
    <h2 class="study-title">${step.title}</h2>
    ${step.anchor ? `<div class="study-anchor" style="font-size:13px;background:#f0f4ff;border-left:3px solid #4c6ef5;padding:8px 12px;margin:8px 0;border-radius:4px">${step.anchor}</div>` : ""}
    <div class="study-body" style="max-height:60vh;overflow-y:auto">
      ${step.questions.map(q => `<div style="margin-bottom:16px">${buildEstimateQHTML(q, saved)}</div>`).join("")}
    </div>
    <div class="study-nav">
      ${state.currentStep > 0 ? `<button class="study-btn secondary" id="study-prev">← Back</button>` : ""}
      <button class="study-btn primary" id="study-next" disabled>Next →</button>
    </div>`;
  wireEstimateInputs(step, panel, false);
  panel.querySelector("#study-prev")?.addEventListener("click", retreat);
  panel.querySelector("#study-next")?.addEventListener("click", advance);
}

/* ── Complete ────────────────────────────────────────────────── */
function renderComplete(step, panel) {
  const summary = buildSummary();
  const rows = summary.map(r => {
    if (!r.answered) return `<tr><td>${r.phase||r.id}</td><td>${r.type}</td><td colspan="2"><em>—</em></td></tr>`;
    return `<tr>
      <td style="font-size:11px">${(r.phase||r.id).split("—").pop().trim()}</td>
      <td style="font-size:11px;color:#718096">${r.type}</td>
      <td>${r.answer}</td>
      <td style="font-size:11px">${r.exploreSec} / ${r.answerSec}</td>
    </tr>`;
  }).join("");
  panel.innerHTML = `
    <div class="study-phase-tag">Complete — All Parts Done</div>
    <h2 class="study-title">${step.title}</h2>
    <div class="study-body">${step.content}</div>
    <div class="study-summary">
      <table class="summary-table">
        <thead><tr><th>Task</th><th>Type</th><th>Answer</th><th>Explore / Answer</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="study-complete-steps">
      <div class="complete-step">
        <span class="complete-step-num">1</span>
        <div>
          <strong>Download your data</strong>
          <p>Save the JSON file to your computer.</p>
          <button class="study-btn primary" id="study-download">⬇ Download data (JSON)</button>
        </div>
      </div>
      <div class="complete-step">
        <span class="complete-step-num">2</span>
        <div>
          <strong>Upload to researcher</strong>
          <p>Click the button below to open the upload folder, then drag your JSON file in.</p>
          ${ONEDRIVE_REQUEST_URL
            ? `<a class="study-btn primary" href="${ONEDRIVE_REQUEST_URL}" target="_blank" rel="noopener">⬆ Upload via OneDrive</a>`
            : `<p class="upload-note">Upload link not configured yet — please send the JSON file directly to the researcher.</p>`}
        </div>
      </div>
    </div>
    <div class="study-nav centered" style="margin-top:16px">
      <button class="study-btn secondary" id="study-close-complete">Close</button>
    </div>`;
  panel.querySelector("#study-download").addEventListener("click", downloadData);
  panel.querySelector("#study-close-complete").addEventListener("click", closeStudy);
}

/* ══════════════════════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════════════════════ */
function updateProgress() {
  const bar = document.getElementById("study-progress-bar");
  const lbl = document.getElementById("study-progress-label");
  const pct = Math.round((state.currentStep/(STEPS.length-1))*100);
  if (bar) bar.style.width = pct+"%";
  if (lbl) lbl.textContent = `Step ${state.currentStep+1} of ${STEPS.length}`;
}
function advance() {
  if (_timerInterval) { clearInterval(_timerInterval); _timerInterval=null; }
  if (state.currentStep < STEPS.length-1) { state.currentStep++; render(); }
}
function retreat() {
  if (_timerInterval) { clearInterval(_timerInterval); _timerInterval=null; }
  if (state.currentStep > 0) { state.currentStep--; render(); }
}

/* ══════════════════════════════════════════════════════════════
   BOOTSTRAP
══════════════════════════════════════════════════════════════ */
export function initStudy() {
  injectStudyHTML();
  injectStudyCSS();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const p = JSON.parse(saved);
      if (p.version === STUDY_VERSION && p.state) {
        Object.assign(state, p.state);
        state.taskQTimes = state.taskQTimes || {};
      }
    }
  } catch(_) {}
  document.getElementById("study-launch-btn").addEventListener("click", () => {
    document.getElementById("study-launcher").classList.add("hidden");
    document.getElementById("study-overlay").classList.remove("hidden");
    render();
  });
  document.getElementById("study-close-btn").addEventListener("click", closeStudy);
}

function closeStudy() {
  if (_timerInterval) { clearInterval(_timerInterval); _timerInterval=null; }
  unlockControls();
  document.getElementById("study-overlay").classList.add("hidden");
  document.getElementById("study-task-banner").classList.add("hidden");
  document.getElementById("study-progress-container").classList.add("hidden");
  document.getElementById("study-launcher").classList.remove("hidden");
  state.currentStep = 0;
}

/* ══════════════════════════════════════════════════════════════
   INJECT HTML + CSS
══════════════════════════════════════════════════════════════ */
function injectStudyHTML() {
  document.body.insertAdjacentHTML("beforeend", `
    <div id="study-launcher" class="study-launcher">
      <button id="study-launch-btn" class="study-launch-btn">Start User Study</button>
    </div>
    <div id="study-progress-container" class="study-progress-container hidden">
      <div id="study-progress-bar" class="study-progress-bar" style="width:0%"></div>
      <span id="study-progress-label" class="study-progress-label"></span>
    </div>
    <div id="study-overlay" class="study-overlay hidden">
      <button id="study-close-btn" class="study-close-btn" title="Close study">✕</button>
      <div id="study-panel" class="study-panel"></div>
    </div>
    <div id="study-task-banner" class="study-task-banner hidden"></div>
  `);
  const obs = new MutationObserver(() => {
    const o=document.getElementById("study-overlay"),b=document.getElementById("study-task-banner"),
          p=document.getElementById("study-progress-container");
    if (o.classList.contains("hidden")&&b.classList.contains("hidden")&&state.currentStep===0) p.classList.add("hidden");
    else p.classList.remove("hidden");
  });
  obs.observe(document.getElementById("study-overlay"),{attributes:true});
}

function injectStudyCSS() {
  const s = document.createElement("style");
  s.textContent = `
.study-launcher{position:fixed;bottom:24px;right:24px;z-index:9000}
.study-launch-btn{background:#2b6cb0;color:#fff;border:none;border-radius:8px;
  padding:14px 22px;font-size:15px;font-weight:600;cursor:pointer;
  box-shadow:0 4px 16px rgba(0,0,0,.25);transition:background .2s}
.study-launch-btn:hover{background:#2c5282}
.study-close-btn{position:absolute;top:16px;right:20px;background:transparent;
  border:none;color:#6c757d;font-size:20px;cursor:pointer;padding:4px 8px;border-radius:4px;z-index:10}
.study-close-btn:hover{background:#f1f3f5;color:#212529}
.study-progress-container{position:fixed;top:0;left:0;right:0;height:5px;background:#e2e8f0;z-index:9100}
.study-progress-bar{height:100%;background:#2b6cb0;transition:width .4s ease}
.study-progress-label{position:fixed;top:8px;right:12px;font-size:11px;color:#718096;z-index:9101}
.study-overlay{position:fixed;inset:0;background:rgba(247,250,252,.97);z-index:9200;
  display:flex;align-items:center;justify-content:center;overflow-y:auto;padding:40px 16px}
.study-panel{background:#fff;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,.12);
  padding:36px 44px;max-width:700px;width:100%}
.study-phase-tag{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  color:#2b6cb0;margin-bottom:8px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.task-qtype-tag{background:#ebf8ff;color:#2b6cb0;border-radius:4px;padding:2px 7px;
  font-size:10px;font-weight:700;letter-spacing:.04em}
.task-timer-inline{font-size:12px;color:#718096;font-variant-numeric:tabular-nums;
  font-weight:400;letter-spacing:0;text-transform:none;margin-left:auto}
.study-title{font-size:20px;font-weight:700;color:#1a202c;margin:0 0 16px;line-height:1.4}
.study-body{font-size:14px;color:#2d3748;line-height:1.7}
.study-body p{margin:0 0 12px}
.task-desc-sm{font-size:13px;color:#2d3748;line-height:1.55;margin:0 0 8px}
.consent-check{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#2d3748;cursor:pointer;margin-top:16px}
.consent-check input{margin-top:3px;flex-shrink:0;width:16px;height:16px}
.study-nav{display:flex;gap:12px;justify-content:flex-end;margin-top:20px}
.study-nav.centered{justify-content:center}
.study-btn{padding:10px 20px;border-radius:7px;font-size:14px;font-weight:600;border:none;cursor:pointer;transition:.15s}
.study-btn.primary{background:#2b6cb0;color:#fff}
.study-btn.primary:hover:not(:disabled){background:#2c5282}
.study-btn.primary:disabled{background:#a0aec0;cursor:not-allowed}
.study-btn.secondary{background:#edf2f7;color:#2d3748}
.study-btn.secondary:hover{background:#e2e8f0}
.study-btn.large{padding:14px 30px;font-size:16px}
.cond-cards{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin:16px 0}
.cond-card{background:#f8f9fa;border:2px solid #dee2e6;border-radius:10px;padding:16px;
  text-align:left;cursor:pointer;transition:border-color .2s,background .2s;
  display:flex;flex-direction:column;gap:6px}
.cond-card:hover{border-color:#2b6cb0;background:#ebf8ff}
.cond-card strong{font-size:14px;color:#1a202c}
.cond-card p{font-size:12px;color:#5f6368;margin:0;line-height:1.45}
.cond-num{font-size:22px;font-weight:800;color:#2b6cb0;line-height:1}
.study-task-banner{position:fixed;bottom:0;left:0;right:0;background:rgba(255,255,255,.97);
  border-top:3px solid #2b6cb0;z-index:9200;box-shadow:0 -4px 24px rgba(0,0,0,.12);
  max-height:54vh;overflow-y:auto}
.task-banner-inner{padding:12px 24px;max-width:1200px;margin:0 auto}
.task-desc{font-size:13.5px;color:#2d3748;line-height:1.6;margin:0 0 10px}
.task-question{font-size:13.5px;color:#1a202c;margin:0 0 6px;line-height:1.5}
.task-options-col{display:flex;flex-direction:column;gap:5px;margin-bottom:8px}
.task-option{display:flex;align-items:flex-start;gap:8px;padding:7px 12px;
  border:2px solid #e2e8f0;border-radius:7px;cursor:pointer;font-size:13px;
  color:#2d3748;transition:border-color .15s,background .15s;line-height:1.4}
.task-option:hover{border-color:#90cdf4;background:#ebf8ff}
.task-option.selected{border-color:#2b6cb0;background:#ebf8ff;font-weight:600}
.task-option input{accent-color:#2b6cb0;width:14px;height:14px;flex-shrink:0;margin-top:2px}
.task-insight-split{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:8px}
.task-insight-open textarea{width:100%;border:1.5px solid #ced4da;border-radius:6px;
  padding:8px;font-size:13px;resize:vertical;font-family:inherit;color:#2d3748;
  box-sizing:border-box;margin-top:4px}
.task-insight-open textarea:focus{outline:none;border-color:#2b6cb0}
/* Likert -5 to +5 */
.task-likert-row{margin-bottom:10px}
.task-likert-label{font-size:13px;color:#1a202c;margin:0 0 4px;font-weight:500}
.task-likert-scale{display:flex;align-items:center;gap:3px;flex-wrap:nowrap}
.likert-end{font-size:11px;color:#718096;flex-shrink:0;max-width:110px;line-height:1.2}
.likert-cell{display:flex;flex-direction:column;align-items:center;cursor:pointer;
  padding:3px 5px;border-radius:5px;border:1.5px solid transparent;transition:background .15s;min-width:28px}
.likert-cell:hover{background:#ebf8ff;border-color:#90cdf4}
.likert-cell.sel{background:#ebf8ff;border-color:#2b6cb0;font-weight:700}
.likert-cell input{position:absolute;opacity:0;pointer-events:none}
.likert-cell span{font-size:12px;color:#2d3748;text-align:center}
.task-banner-nav{display:flex;gap:10px;justify-content:flex-end}
.study-complete-steps{display:flex;flex-direction:column;gap:16px;margin:20px 0}
.complete-step{display:flex;gap:14px;align-items:flex-start}
.complete-step-num{background:#2b6cb0;color:#fff;border-radius:50%;width:28px;height:28px;
  display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0;margin-top:2px}
.complete-step strong{display:block;font-size:14px;color:#1a202c;margin-bottom:4px}
.complete-step p{margin:0 0 8px;font-size:13px;color:#5f6368}
.upload-note{color:#c53030!important;font-style:italic}
.study-summary{margin:16px 0;overflow-x:auto}
.summary-table{width:100%;border-collapse:collapse;font-size:12px}
.summary-table th,.summary-table td{text-align:left;padding:6px 9px;border-bottom:1px solid #e2e8f0}
.summary-table th{color:#718096;font-weight:600;background:#f8f9fa}
body:has(#study-task-banner:not(.hidden)) #app{padding-bottom:54vh}
.hidden{display:none !important}
@media(max-width:700px){.cond-cards{grid-template-columns:1fr}.task-insight-split{grid-template-columns:1fr}}
  `;
  document.head.appendChild(s);
}
