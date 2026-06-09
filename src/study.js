/* ============================================================
   User Study — Wealth & Income Inequality Visualization
   Thesis: Kairui Li, Linköping University  v10.2
   ============================================================ */

const STUDY_VERSION = "10.2";
const STORAGE_KEY   = "wealth-study-data-v10-2";
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeGSR3JrkL8QeYiShP7VL8oUSCe_nSRIsnVCMl4Tm6CU4uISg/viewform?usp=publish-editor";

/* ══════════════════════════════════════════════════════════════
   FIXED STEPS
══════════════════════════════════════════════════════════════ */
const STEP_CONSENT = {
  id: "consent", type: "info",
  title: "Participant Information & Consent",
  content: `
    <p>You are invited to take part in a user study for a Master's thesis at Linköping University on <strong>data visualization of wealth and income inequality in Sweden</strong>.</p>
    <p><strong>What you will do:</strong> Complete a short Y-axis guide, answer two perception questions, then examine interactive charts and answer two factual questions per chart. Estimated time: <strong>20–30 minutes</strong>.</p>
    <p><strong>Data:</strong> Your answers and time-on-task are stored only in your browser. No personal data is collected.</p>
    <p><strong>Voluntary:</strong> You may close the study at any time without consequence.</p>
    <label class="consent-check"><input type="checkbox" id="consent-checkbox"/> I have read the above and agree to participate.</label>`,
  nextLabel: "Next →", requireConsent: true,
};

const STEP_GROUP_SELECT = {
  id: "group_select", type: "group_select",
  title: "Choose your chart type",
  content: `<p>You will examine charts showing Swedish wealth and income data. Please choose which chart type you would like to work with:</p>`,
};

const STEP_COMPLETE = {
  id: "complete", type: "complete",
  title: "Thank you for participating!",
  content: `<p>Your responses and timing data are saved. Click <strong>Download</strong> to save a JSON file — please share it with the researcher.</p>`,
};

/* ══════════════════════════════════════════════════════════════
   EQUALITY LIKERTS
══════════════════════════════════════════════════════════════ */
const EQUALITY_QUESTIONS = [
  { id: "income_eq", text: "On a scale from 0 to 10, how equally do you think <strong>income</strong> is distributed in Sweden?", lo: "0 — Very equal", hi: "Very unequal — 10" },
  { id: "wealth_eq", text: "On a scale from 0 to 10, how equally do you think <strong>wealth</strong> is distributed in Sweden?", lo: "0 — Very equal", hi: "Very unequal — 10" },
];
const PRE_LIKERT  = { id: "pre_likert",  type: "likert_overlay", phase: "Before the charts", title: "Your perceptions — before seeing the data", questions: EQUALITY_QUESTIONS };
const POST_LIKERT = { id: "post_likert", type: "likert_overlay", phase: "After all charts",   title: "Your perceptions — after seeing the data",  questions: EQUALITY_QUESTIONS };

/* ══════════════════════════════════════════════════════════════
   Q1 — WEALTH   (3 group variants, correct always "c")
   v0 = Top 10% (disjoint top9)
   v1 = Top 1%   (direct CSV average)
   v2 = Top 0.1% (direct CSV average)
══════════════════════════════════════════════════════════════ */
function makeQ1(year, variant = 0) {
  if (variant === 1) {
    /* Top 1% direct avg: 1980≈11M, 1990≈19M, 2000≈32M, 2010≈56M, 2020≈84M, 2024≈87M */
    const o = {
      1980: [{ label:"Around 3 million SEK (≈ 3 × 10⁶)",   value:"a"},{ label:"Around 5.5 million SEK (≈ 5.5 × 10⁶)", value:"b"},{ label:"Around 11 million SEK (≈ 1.1 × 10⁷)",   value:"c"},{ label:"Around 44 million SEK (≈ 4.4 × 10⁷)", value:"d"}],
      1990: [{ label:"Around 5 million SEK (≈ 5 × 10⁶)",   value:"a"},{ label:"Around 9 million SEK (≈ 9 × 10⁶)",   value:"b"},{ label:"Around 19 million SEK (≈ 1.9 × 10⁷)",   value:"c"},{ label:"Around 75 million SEK (≈ 7.5 × 10⁷)", value:"d"}],
      2000: [{ label:"Around 8 million SEK (≈ 8 × 10⁶)",   value:"a"},{ label:"Around 16 million SEK (≈ 1.6 × 10⁷)", value:"b"},{ label:"Around 32 million SEK (≈ 3.2 × 10⁷)",  value:"c"},{ label:"Around 130 million SEK (≈ 1.3 × 10⁸)",value:"d"}],
      2010: [{ label:"Around 14 million SEK (≈ 1.4 × 10⁷)",value:"a"},{ label:"Around 28 million SEK (≈ 2.8 × 10⁷)", value:"b"},{ label:"Around 56 million SEK (≈ 5.6 × 10⁷)",  value:"c"},{ label:"Around 225 million SEK (≈ 2.25 × 10⁸)",value:"d"}],
      2020: [{ label:"Around 20 million SEK (≈ 2 × 10⁷)",  value:"a"},{ label:"Around 40 million SEK (≈ 4 × 10⁷)",  value:"b"},{ label:"Around 84 million SEK (≈ 8.4 × 10⁷)",  value:"c"},{ label:"Around 335 million SEK (≈ 3.35 × 10⁸)",value:"d"}],
      2024: [{ label:"Around 22 million SEK (≈ 2.2 × 10⁷)",value:"a"},{ label:"Around 43 million SEK (≈ 4.3 × 10⁷)", value:"b"},{ label:"Around 87 million SEK (≈ 8.7 × 10⁷)",  value:"c"},{ label:"Around 350 million SEK (≈ 3.5 × 10⁸)", value:"d"}],
    };
    return { text:`Q1 — Estimation: Based on the chart, approximately what was the average per-person <strong>wealth</strong> for the 'Top 1%' group in ${year}?`, options: o[year]||o[2024], correct:"c" };
  }
  if (variant === 2) {
    /* Top 0.1% direct avg: 1980≈41M, 1990≈95M, 2000≈153M, 2010≈292M, 2020≈389M, 2024≈438M */
    const o = {
      1980: [{ label:"Around 10 million SEK (≈ 10⁷)",       value:"a"},{ label:"Around 20 million SEK (≈ 2 × 10⁷)",  value:"b"},{ label:"Around 41 million SEK (≈ 4.1 × 10⁷)",  value:"c"},{ label:"Around 165 million SEK (≈ 1.65 × 10⁸)",value:"d"}],
      1990: [{ label:"Around 24 million SEK (≈ 2.4 × 10⁷)", value:"a"},{ label:"Around 47 million SEK (≈ 4.7 × 10⁷)", value:"b"},{ label:"Around 95 million SEK (≈ 9.5 × 10⁷)",  value:"c"},{ label:"Around 380 million SEK (≈ 3.8 × 10⁸)", value:"d"}],
      2000: [{ label:"Around 38 million SEK (≈ 3.8 × 10⁷)", value:"a"},{ label:"Around 76 million SEK (≈ 7.6 × 10⁷)", value:"b"},{ label:"Around 153 million SEK (≈ 1.53 × 10⁸)", value:"c"},{ label:"Around 612 million SEK (≈ 6.12 × 10⁸)",value:"d"}],
      2010: [{ label:"Around 73 million SEK (≈ 7.3 × 10⁷)", value:"a"},{ label:"Around 146 million SEK (≈ 1.46 × 10⁸)",value:"b"},{ label:"Around 292 million SEK (≈ 2.92 × 10⁸)", value:"c"},{ label:"Around 1.2 billion SEK (≈ 1.2 × 10⁹)",  value:"d"}],
      2020: [{ label:"Around 97 million SEK (≈ 9.7 × 10⁷)", value:"a"},{ label:"Around 195 million SEK (≈ 1.95 × 10⁸)",value:"b"},{ label:"Around 389 million SEK (≈ 3.89 × 10⁸)", value:"c"},{ label:"Around 1.6 billion SEK (≈ 1.6 × 10⁹)",  value:"d"}],
      2024: [{ label:"Around 110 million SEK (≈ 1.1 × 10⁸)",value:"a"},{ label:"Around 220 million SEK (≈ 2.2 × 10⁸)",value:"b"},{ label:"Around 438 million SEK (≈ 4.38 × 10⁸)", value:"c"},{ label:"Around 1.75 billion SEK (≈ 1.75 × 10⁹)",value:"d"}],
    };
    return { text:`Q1 — Estimation: Based on the chart, approximately what was the average per-person <strong>wealth</strong> for the 'Top 0.1%' group in ${year}?`, options: o[year]||o[2024], correct:"c" };
  }
  /* variant 0 — Top 10% disjoint (original) */
  const o = {
    1980:[{label:"Around 500,000 SEK (≈ 5 × 10⁵)",value:"a"},{label:"Around 1 million SEK (≈ 10⁶)",value:"b"},{label:"Around 2.5 million SEK (≈ 2.5 × 10⁶)",value:"c"},{label:"Around 10 million SEK (≈ 10⁷)",value:"d"}],
    1990:[{label:"Around 700,000 SEK (≈ 7 × 10⁵)",value:"a"},{label:"Around 1.5 million SEK (≈ 1.5 × 10⁶)",value:"b"},{label:"Around 3 million SEK (≈ 3 × 10⁶)",value:"c"},{label:"Around 12 million SEK (≈ 1.2 × 10⁷)",value:"d"}],
    2000:[{label:"Around 1 million SEK (≈ 10⁶)",value:"a"},{label:"Around 2.5 million SEK (≈ 2.5 × 10⁶)",value:"b"},{label:"Around 5 million SEK (≈ 5 × 10⁶)",value:"c"},{label:"Around 20 million SEK (≈ 2 × 10⁷)",value:"d"}],
    2010:[{label:"Around 2 million SEK (≈ 2 × 10⁶)",value:"a"},{label:"Around 4.5 million SEK (≈ 4.5 × 10⁶)",value:"b"},{label:"Around 9 million SEK (≈ 9 × 10⁶)",value:"c"},{label:"Around 35 million SEK (≈ 3.5 × 10⁷)",value:"d"}],
    2020:[{label:"Around 3 million SEK (≈ 3 × 10⁶)",value:"a"},{label:"Around 7 million SEK (≈ 7 × 10⁶)",value:"b"},{label:"Around 15 million SEK (≈ 1.5 × 10⁷)",value:"c"},{label:"Around 60 million SEK (≈ 6 × 10⁷)",value:"d"}],
    2024:[{label:"Around 3 million SEK (≈ 3 × 10⁶)",value:"a"},{label:"Around 7 million SEK (≈ 7 × 10⁶)",value:"b"},{label:"Around 14 million SEK (≈ 1.4 × 10⁷)",value:"c"},{label:"Around 55 million SEK (≈ 5.5 × 10⁷)",value:"d"}],
  };
  return { text:`Q1 — Estimation: Based on the chart, approximately what was the average per-person <strong>wealth</strong> for the 'Top 10%' group in ${year}?`, options: o[year]||o[2024], correct:"c" };
}

/* ══════════════════════════════════════════════════════════════
   Q2 — WEALTH   (2 pair variants)
   v0 = Top 0.001% vs Top 1%  (ratios: 1980≈76×, others 210–305×)
   v1 = Top 0.001% vs Top 0.1% (ratios: 1980≈20×, others 41–59×)
══════════════════════════════════════════════════════════════ */
function makeQ2(year, variant = 0) {
  if (variant === 1) {
    return {
      text:`Q2 — Magnitude: Roughly how many times larger is the Top 0.001%'s average per-person <strong>wealth</strong> than the Top 0.1%'s in ${year}?`,
      options:[
        {label:"About 5 times larger",         value:"a"},
        {label:"About 20–50 times larger",      value:"b"},
        {label:"About 500 times larger",        value:"c"},
        {label:"About 5,000 times larger",      value:"d"},
      ], correct:"b",
    };
  }
  /* variant 0 — Top0.001% vs Top1%; 1980 ratio≈76× so correct="b", others≈200+× correct="c" */
  const correct = year === 1980 ? "b" : "c";
  return {
    text:`Q2 — Magnitude: Roughly how many times larger is the Top 0.001%'s average per-person <strong>wealth</strong> than the Top 1%'s in ${year}?`,
    options:[
      {label:"About 10 times larger",          value:"a"},
      {label:"About 100 times larger",          value:"b"},
      {label:"About 200 times larger or more",  value:"c"},
      {label:"About 10,000 times larger",       value:"d"},
    ], correct,
  };
}

/* ══════════════════════════════════════════════════════════════
   Q1 — INCOME   (3 group variants, correct always "c")
   v0 = Top 10% disjoint  v1 = Top 1%  v2 = Top 0.1%
══════════════════════════════════════════════════════════════ */
function makeQ1Income(year, variant = 0) {
  if (variant === 1) {
    /* Top 1% direct avg: 1980≈2.7M,1990≈3.5M,2000≈5.2M,2010≈6.9M,2020≈6.9M,2024≈6.8M */
    const o = {
      1980:[{label:"Around 700,000 SEK (≈ 7 × 10⁵)",value:"a"},{label:"Around 1.3 million SEK (≈ 1.3 × 10⁶)",value:"b"},{label:"Around 2.7 million SEK (≈ 2.7 × 10⁶)",value:"c"},{label:"Around 11 million SEK (≈ 1.1 × 10⁷)",value:"d"}],
      1990:[{label:"Around 900,000 SEK (≈ 9 × 10⁵)",value:"a"},{label:"Around 1.8 million SEK (≈ 1.8 × 10⁶)",value:"b"},{label:"Around 3.5 million SEK (≈ 3.5 × 10⁶)",value:"c"},{label:"Around 14 million SEK (≈ 1.4 × 10⁷)",value:"d"}],
      2000:[{label:"Around 1.3 million SEK (≈ 1.3 × 10⁶)",value:"a"},{label:"Around 2.6 million SEK (≈ 2.6 × 10⁶)",value:"b"},{label:"Around 5.2 million SEK (≈ 5.2 × 10⁶)",value:"c"},{label:"Around 21 million SEK (≈ 2.1 × 10⁷)",value:"d"}],
      2010:[{label:"Around 1.7 million SEK (≈ 1.7 × 10⁶)",value:"a"},{label:"Around 3.5 million SEK (≈ 3.5 × 10⁶)",value:"b"},{label:"Around 6.9 million SEK (≈ 6.9 × 10⁶)",value:"c"},{label:"Around 28 million SEK (≈ 2.8 × 10⁷)",value:"d"}],
      2020:[{label:"Around 1.7 million SEK (≈ 1.7 × 10⁶)",value:"a"},{label:"Around 3.4 million SEK (≈ 3.4 × 10⁶)",value:"b"},{label:"Around 6.9 million SEK (≈ 6.9 × 10⁶)",value:"c"},{label:"Around 27 million SEK (≈ 2.7 × 10⁷)",value:"d"}],
      2024:[{label:"Around 1.7 million SEK (≈ 1.7 × 10⁶)",value:"a"},{label:"Around 3.4 million SEK (≈ 3.4 × 10⁶)",value:"b"},{label:"Around 6.8 million SEK (≈ 6.8 × 10⁶)",value:"c"},{label:"Around 27 million SEK (≈ 2.7 × 10⁷)",value:"d"}],
    };
    return { text:`Q1 — Estimation: Based on the chart, approximately what was the average per-person <strong>income</strong> for the 'Top 1%' group in ${year}?`, options: o[year]||o[2024], correct:"c" };
  }
  if (variant === 2) {
    /* Top 0.1% avg: 1980≈9.4M,1990≈13.4M,2000≈18.2M,2010≈29.3M,2020≈26.7M,2024≈26.3M */
    const o = {
      1980:[{label:"Around 2.4 million SEK (≈ 2.4 × 10⁶)",value:"a"},{label:"Around 4.7 million SEK (≈ 4.7 × 10⁶)",value:"b"},{label:"Around 9.4 million SEK (≈ 9.4 × 10⁶)",value:"c"},{label:"Around 38 million SEK (≈ 3.8 × 10⁷)",value:"d"}],
      1990:[{label:"Around 3.3 million SEK (≈ 3.3 × 10⁶)",value:"a"},{label:"Around 6.7 million SEK (≈ 6.7 × 10⁶)",value:"b"},{label:"Around 13.4 million SEK (≈ 1.34 × 10⁷)",value:"c"},{label:"Around 54 million SEK (≈ 5.4 × 10⁷)",value:"d"}],
      2000:[{label:"Around 4.6 million SEK (≈ 4.6 × 10⁶)",value:"a"},{label:"Around 9.1 million SEK (≈ 9.1 × 10⁶)",value:"b"},{label:"Around 18.2 million SEK (≈ 1.82 × 10⁷)",value:"c"},{label:"Around 73 million SEK (≈ 7.3 × 10⁷)",value:"d"}],
      2010:[{label:"Around 7.3 million SEK (≈ 7.3 × 10⁶)",value:"a"},{label:"Around 14.6 million SEK (≈ 1.46 × 10⁷)",value:"b"},{label:"Around 29.3 million SEK (≈ 2.93 × 10⁷)",value:"c"},{label:"Around 117 million SEK (≈ 1.17 × 10⁸)",value:"d"}],
      2020:[{label:"Around 6.7 million SEK (≈ 6.7 × 10⁶)",value:"a"},{label:"Around 13.4 million SEK (≈ 1.34 × 10⁷)",value:"b"},{label:"Around 26.7 million SEK (≈ 2.67 × 10⁷)",value:"c"},{label:"Around 107 million SEK (≈ 1.07 × 10⁸)",value:"d"}],
      2024:[{label:"Around 6.6 million SEK (≈ 6.6 × 10⁶)",value:"a"},{label:"Around 13.2 million SEK (≈ 1.32 × 10⁷)",value:"b"},{label:"Around 26.3 million SEK (≈ 2.63 × 10⁷)",value:"c"},{label:"Around 105 million SEK (≈ 1.05 × 10⁸)",value:"d"}],
    };
    return { text:`Q1 — Estimation: Based on the chart, approximately what was the average per-person <strong>income</strong> for the 'Top 0.1%' group in ${year}?`, options: o[year]||o[2024], correct:"c" };
  }
  /* variant 0 — Top 10% disjoint (original) */
  const o = {
    1980:[{label:"Around 200,000 SEK (≈ 2 × 10⁵)",value:"a"},{label:"Around 500,000 SEK (≈ 5 × 10⁵)",value:"b"},{label:"Around 800,000 SEK (≈ 8 × 10⁵)",value:"c"},{label:"Around 3 million SEK (≈ 3 × 10⁶)",value:"d"}],
    1990:[{label:"Around 300,000 SEK (≈ 3 × 10⁵)",value:"a"},{label:"Around 600,000 SEK (≈ 6 × 10⁵)",value:"b"},{label:"Around 900,000 SEK (≈ 9 × 10⁵)",value:"c"},{label:"Around 3 million SEK (≈ 3 × 10⁶)",value:"d"}],
    2000:[{label:"Around 400,000 SEK (≈ 4 × 10⁵)",value:"a"},{label:"Around 800,000 SEK (≈ 8 × 10⁵)",value:"b"},{label:"Around 1.2 million SEK (≈ 1.2 × 10⁶)",value:"c"},{label:"Around 5 million SEK (≈ 5 × 10⁶)",value:"d"}],
    2010:[{label:"Around 500,000 SEK (≈ 5 × 10⁵)",value:"a"},{label:"Around 900,000 SEK (≈ 9 × 10⁵)",value:"b"},{label:"Around 1.4 million SEK (≈ 1.4 × 10⁶)",value:"c"},{label:"Around 6 million SEK (≈ 6 × 10⁶)",value:"d"}],
    2020:[{label:"Around 600,000 SEK (≈ 6 × 10⁵)",value:"a"},{label:"Around 1 million SEK (≈ 10⁶)",value:"b"},{label:"Around 1.5 million SEK (≈ 1.5 × 10⁶)",value:"c"},{label:"Around 7 million SEK (≈ 7 × 10⁶)",value:"d"}],
    2024:[{label:"Around 700,000 SEK (≈ 7 × 10⁵)",value:"a"},{label:"Around 1.1 million SEK (≈ 1.1 × 10⁶)",value:"b"},{label:"Around 1.6 million SEK (≈ 1.6 × 10⁶)",value:"c"},{label:"Around 6 million SEK (≈ 6 × 10⁶)",value:"d"}],
  };
  return { text:`Q1 — Estimation: Based on the chart, approximately what was the average per-person <strong>income</strong> for the 'Top 10%' group in ${year}?`, options: o[year]||o[2024], correct:"c" };
}

/* ══════════════════════════════════════════════════════════════
   Q2 — INCOME   (2 pair variants)
   v0 = Top 0.001% vs Top 1%  (ratios ≈45–85×, correct "b")
   v1 = Top 0.001% vs Top 0.1% (ratios ≈13–20×, correct "b")
══════════════════════════════════════════════════════════════ */
function makeQ2Income(year, variant = 0) {
  if (variant === 1) {
    return {
      text:`Q2 — Magnitude: Roughly how many times larger is the Top 0.001%'s average per-person <strong>income</strong> than the Top 0.1%'s in ${year}?`,
      options:[
        {label:"About 3 times larger",        value:"a"},
        {label:"About 10–20 times larger",     value:"b"},
        {label:"About 100 times larger",       value:"c"},
        {label:"About 1,000 times larger",     value:"d"},
      ], correct:"b",
    };
  }
  return {
    text:`Q2 — Magnitude: Roughly how many times larger is the Top 0.001%'s average per-person <strong>income</strong> than the Top 1%'s in ${year}?`,
    options:[
      {label:"About 5 times larger",        value:"a"},
      {label:"About 50–100 times larger",   value:"b"},
      {label:"About 500 times larger",      value:"c"},
      {label:"About 5,000 times larger",    value:"d"},
    ], correct:"b",
  };
}

/* ══════════════════════════════════════════════════════════════
   BASELINE TABLE
══════════════════════════════════════════════════════════════ */
const STEP_TABLE = {
  id:"table_wealth", type:"task_2q",
  phase:"Baseline — Table", questionType:"Table",
  vizConfig:{ representation:"table", comparison:"juxtaposition", metric:"wealth", popEncoding:"without", years:"2024" },
  taskText:"This <strong>TABLE</strong> shows the average net wealth per person (SEK) for six population groups in Sweden in <strong>2024</strong>. Read all values carefully before answering.",
  q1: makeQ1(2024, 0), q2: makeQ2(2024, 0),
};

/* ══════════════════════════════════════════════════════════════
   Y-AXIS GUIDE STEPS  (isGuide:true — controls stay unlocked)
══════════════════════════════════════════════════════════════ */
const GUIDE_LINEARZOOM = {
  id:"guide_lz", type:"task_2q", isGuide:true,
  phase:"Y-axis Guide", questionType:"Linear + Zoom",
  vizConfig:{ representation:"bar", comparison:"juxtaposition", metric:"wealth", popEncoding:"without", years:"2020", yScale:"linear-zoom" },
  taskText:`<strong>📐 Linear + Zoom Y-axis</strong> — The axis has equal spacing: every step up represents the same SEK increase. A range slider lets you <strong>zoom in</strong> (slide left) to see low-value groups clearly, or <strong>zoom out</strong> (slide right) to see the full range.<br><br>Try the slider now before clicking "show questions".`,
  q1:{
    text:"Q1 — Practice: After zooming out to see all groups, which group has the highest average wealth in 2020?",
    options:[{label:"Bottom 50%",value:"a"},{label:"Top 10%",value:"b"},{label:"Top 0.01%",value:"c"},{label:"Top 0.001%",value:"d"}],
    correct:"d",
  },
  q2:{
    text:"Q2 — Practice: After sliding the zoom slider LEFT (zooming in), which group's bar appears BELOW zero (negative wealth)?",
    options:[{label:"Top 10%",value:"a"},{label:"Top 1%",value:"b"},{label:"Top 0.1%",value:"c"},{label:"Bottom 50%",value:"d"}],
    correct:"d",
  },
};

const GUIDE_BREAK = {
  id:"guide_brk", type:"task_2q", isGuide:true,
  phase:"Y-axis Guide", questionType:"Scale Break",
  vizConfig:{ representation:"bar", comparison:"juxtaposition", metric:"wealth", popEncoding:"without", years:"2020", yScale:"break" },
  taskText:`<strong>〰️ Scale Break (zig-zag) Y-axis</strong> — A large gap in the middle of the Y-axis range is skipped. This lets both very low-value groups (bottom section) and the extreme Top 0.001% (top section) appear in the same chart. The <strong>zig-zag symbol</strong> marks where the axis jumps.`,
  q1:{
    text:"Q1 — Practice: On this scale break chart, which group's bar appears in the UPPER section (above the zig-zag symbol)?",
    options:[{label:"Top 10%",value:"a"},{label:"Top 0.1%",value:"b"},{label:"Top 0.01%",value:"c"},{label:"Top 0.001%",value:"d"}],
    correct:"d",
  },
  q2:{
    text:"Q2 — Practice: What does the zig-zag symbol on the Y-axis indicate?",
    options:[
      {label:"The values in that range are estimated",value:"a"},
      {label:"A large range of values is skipped so both low and high groups fit in one chart",value:"b"},
      {label:"The axis switches to a logarithmic scale",value:"c"},
      {label:"Data is missing for those values",value:"d"},
    ],
    correct:"b",
  },
};

const GUIDE_LOG = {
  id:"guide_log", type:"task_2q", isGuide:true,
  phase:"Y-axis Guide", questionType:"Logarithmic",
  vizConfig:{ representation:"bar", comparison:"juxtaposition", metric:"wealth", popEncoding:"without", years:"2020", yScale:"log" },
  taskText:`<strong>📊 Logarithmic Y-axis</strong> — Each major step on this axis represents a <strong>multiplication by ~10</strong>, not a fixed SEK addition. This makes it possible to compare groups whose values differ by thousands of times on the same chart. <em>Note: groups with zero or negative wealth cannot be shown.</em>`,
  q1:{
    text:"Q1 — Practice: On a logarithmic scale, moving up one major tick mark represents approximately...",
    options:[
      {label:"An increase of 1 million SEK",value:"a"},
      {label:"A multiplication by approximately 10",value:"b"},
      {label:"A doubling (×2) of the value",value:"c"},
      {label:"An increase of 50%",value:"d"},
    ],
    correct:"b",
  },
  q2:{
    text:"Q2 — Practice: On this logarithmic chart (wealth 2020), which group is NOT visible because its value cannot be shown on a log scale?",
    options:[{label:"Top 0.001% (very high positive)",value:"a"},{label:"Top 1% (positive)",value:"b"},{label:"Top 10% (positive)",value:"c"},{label:"Bottom 50% (negative wealth — net debt)",value:"d"}],
    correct:"d",
  },
};

/* ══════════════════════════════════════════════════════════════
   CHART STEP FACTORIES
   Year assignments (jux/sup share same year per Y-axis type):
     Wealth: linear-zoom→2020, linear→2010, break→2000, log→1990
     Income: linear-zoom→1980, linear→2000, break→2010, log→2020
   Animation uses a different year to prevent carryover:
     Wealth anim: linear-zoom→2024, linear→1980, break→2024, log→1980
     Income anim: linear-zoom→2024, linear→1990, break→2024, log→1990
   Q1 variant = qi%3 (cycles Top10%→Top1%→Top0.1%)
   Q2 variant = qi%2 (cycles pair A→pair B)
══════════════════════════════════════════════════════════════ */
const ALL_YEARS = "1980,1990,2000,2010,2020,2024";
const WEALTH_YEARS      = {"linear-zoom":2020, linear:2010, break:2000, log:1990};
const INCOME_YEARS      = {"linear-zoom":1980, linear:2000, break:2010, log:2020};
const WEALTH_ANIM_YEARS = {"linear-zoom":2024, linear:1980, break:2024, log:1980};
const INCOME_ANIM_YEARS = {"linear-zoom":2024, linear:1990, break:2024, log:1990};
const YSCALE_LABELS = {"linear-zoom":"Linear + Zoom", linear:"Linear", break:"Scale Break", log:"Logarithmic"};

function makeLineStep(metric, yScale, comparison, qi) {
  const year = metric === "wealth" ? WEALTH_YEARS[yScale] : INCOME_YEARS[yScale];
  const pos  = comparison === "juxtaposition" ? "Juxtaposition" : "Superposition";
  const mLbl = metric === "wealth" ? "Wealth" : "Income";
  const id   = `line_${metric[0]}_${yScale.replace(/-/g,"")}_${comparison.slice(0,3)}`;
  return {
    id, type:"task_2q",
    phase:`${mLbl} — Line Chart`,
    questionType:`${pos} · ${YSCALE_LABELS[yScale]}`,
    vizConfig:{ representation:"line", comparison, metric, popEncoding:"without", years:ALL_YEARS, yScale },
    taskText:`This <strong>LINE CHART</strong> shows average per-person <strong>${mLbl.toLowerCase()}</strong> from 1980 to 2024 with groups in <strong>${pos}</strong> and a <strong>${YSCALE_LABELS[yScale]}</strong> Y-axis. Focus on the <strong>${year}</strong> values before answering.`,
    q1: metric==="wealth" ? makeQ1(year, qi%3)       : makeQ1Income(year, qi%3),
    q2: metric==="wealth" ? makeQ2(year, qi%2)       : makeQ2Income(year, qi%2),
  };
}

function makeBarStep(metric, yScale, comparison, qi) {
  const isAnim = comparison === "animation";
  const yearMap = isAnim
    ? (metric==="wealth" ? WEALTH_ANIM_YEARS : INCOME_ANIM_YEARS)
    : (metric==="wealth" ? WEALTH_YEARS       : INCOME_YEARS);
  const year = yearMap[yScale];
  const mLbl = metric==="wealth" ? "Wealth" : "Income";
  const pos  = {juxtaposition:"Juxtaposition", superposition:"Superposition", animation:"Animation"}[comparison];
  const id   = `bar_${metric[0]}_${yScale.replace(/-/g,"")}_${comparison.slice(0,3)}`;
  const step = {
    id, type:"task_2q",
    phase:`${mLbl} — Bar Chart`,
    questionType:`${pos} · ${YSCALE_LABELS[yScale]}`,
    vizConfig:{ representation:"bar", comparison, metric, popEncoding:"without", years:isAnim?ALL_YEARS:String(year), yScale },
    taskText: isAnim
      ? `Watch this <strong>ANIMATED BAR CHART</strong> cycling through years 1980 → 2024. The animation uses a <strong>${YSCALE_LABELS[yScale]}</strong> Y-axis. Pay attention to the <strong>${year}</strong> values before answering.`
      : `This <strong>BAR CHART</strong> shows average per-person <strong>${mLbl.toLowerCase()}</strong> for <strong>${year}</strong> with groups in <strong>${pos}</strong> and a <strong>${YSCALE_LABELS[yScale]}</strong> Y-axis. Use the zoom/scale controls to explore before answering.`,
    q1: metric==="wealth" ? makeQ1(year, qi%3)       : makeQ1Income(year, qi%3),
    q2: metric==="wealth" ? makeQ2(year, qi%2)       : makeQ2Income(year, qi%2),
  };
  if (isAnim) step.autoPlay = true;
  return step;
}

const Y_SCALES      = ["linear-zoom","linear","break","log"];
const POSITIONS     = ["juxtaposition","superposition"];
const BAR_POSITIONS = ["juxtaposition","superposition","animation"];

const LINE_CONFIGS = Y_SCALES.flatMap(ys => POSITIONS.flatMap(pos => ["income","wealth"].map(m => ({m,ys,pos}))));
const LINE_STEPS   = LINE_CONFIGS.map((c,i) => makeLineStep(c.m, c.ys, c.pos, i));

const BAR_CONFIGS  = Y_SCALES.flatMap(ys => BAR_POSITIONS.flatMap(pos => ["income","wealth"].map(m => ({m,ys,pos}))));
const BAR_STEPS    = BAR_CONFIGS.map((c,i) => makeBarStep(c.m, c.ys, c.pos, i));

/* ── Dynamic step sequence ───────────────────────────────────── */
const STEP_DEFINITIONS = {
  id:"definitions", type:"info",
  title:"Definitions: Income and Wealth",
  content:`
    <p>By an individual's <strong>income</strong>, we mean the total after-tax income received each month. This includes income from labor, such as after-tax salary and self-employment earnings; income from the government, such as Social Security benefits, pensions, and welfare payments; and income from assets and investments.</p>
    <p>By an individual's <strong>wealth</strong>, we mean the total value of all assets accumulated over time minus debt. Assets include possessions such as real estate, cars, savings, stocks, pensions, and other forms of capital. When two individuals jointly own an asset, we consider each individual to own half of the asset's value.</p>`,
  nextLabel:"Continue to Y-axis guide →",
};

function buildSteps(group) {
  return [
    STEP_CONSENT, STEP_GROUP_SELECT,
    STEP_DEFINITIONS,
    GUIDE_LINEARZOOM, GUIDE_BREAK, GUIDE_LOG,
    PRE_LIKERT, STEP_TABLE,
    ...(group==="bar" ? BAR_STEPS : LINE_STEPS),
    POST_LIKERT, STEP_COMPLETE,
  ];
}

let STEPS = [STEP_CONSENT, STEP_GROUP_SELECT];

/* ══════════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════════ */
const state = {
  currentStep:0, startTime:Date.now(), stepTimes:{}, taskQTimes:{},
  answers:{}, participantId:Math.random().toString(36).slice(2,9), group:null,
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
  if (config.years)    { yrs.value=config.years; yrs.dispatchEvent(new Event("change")); }
  if (config.metric)      met.value = config.metric;
  if (config.comparison)  cmp.value = config.comparison;
  if (config.popEncoding) pop.value = config.popEncoding;
  rep.dispatchEvent(new Event("change"));
  if (config.yScale) {
    const r = document.getElementById(`cwi-yscale-${config.yScale}`);
    if (r) { r.checked=true; r.dispatchEvent(new Event("change")); }
  }
}

function lockControls() {
  ["cwi-representation","cwi-comparison","cwi-metric","cwi-pop-encoding","cwi-years-input"]
    .forEach(id => { const el=document.getElementById(id); if(el) el.disabled=true; });
  document.querySelectorAll("[name='cwiYScale']").forEach(el => el.disabled=true);
  document.querySelector(".cwi-controls-bar")?.style.setProperty("opacity","0.45");
  document.getElementById("cwi-yscale-ctrl")?.style.setProperty("opacity","0.45");
  const root = document.getElementById("cwi-render-root");
  if (root) {
    root.style.position="relative"; root._studyLocked=true;
    if (!_blockerObserver) { _blockerObserver=new MutationObserver(_ensureBlocker); _blockerObserver.observe(root,{childList:true}); }
    _ensureBlocker();
  }
}

function unlockControls() {
  ["cwi-representation","cwi-comparison","cwi-metric","cwi-pop-encoding","cwi-years-input"]
    .forEach(id => { const el=document.getElementById(id); if(el) el.disabled=false; });
  document.querySelectorAll("[name='cwiYScale']").forEach(el => el.disabled=false);
  document.querySelector(".cwi-controls-bar")?.style.removeProperty("opacity");
  document.getElementById("cwi-yscale-ctrl")?.style.removeProperty("opacity");
  if (_blockerObserver) { _blockerObserver.disconnect(); _blockerObserver=null; }
  const root=document.getElementById("cwi-render-root");
  if (root) root._studyLocked=false;
  document.getElementById("cwi-interaction-blocker")?.remove();
  document.getElementById("cwi-tooltip")?.style.removeProperty("display");
}

/* ══════════════════════════════════════════════════════════════
   ANSWER SAVING
══════════════════════════════════════════════════════════════ */
function saveAnswer(stepId, value) {
  const t0=state.stepTimes[stepId]||state.startTime, qt=state.taskQTimes[stepId]||null;
  state.answers[stepId]={ ...(state.answers[stepId]||{}), value, timestamp:Date.now(),
    totalMs:Date.now()-t0, exploreMs:qt?qt-t0:null, answerMs:qt?Date.now()-qt:null };
  persist();
}
function saveSubAnswer(stepId, key, val) {
  if (!state.answers[stepId]) state.answers[stepId]={};
  state.answers[stepId][key]=val;
  state.answers[stepId].totalMs=Date.now()-(state.stepTimes[stepId]||state.startTime);
  persist();
}
function persist() {} /* no localStorage — each session starts fresh */

/* ══════════════════════════════════════════════════════════════
   SUMMARY (used for download only — not shown on screen)
══════════════════════════════════════════════════════════════ */
function timeFmt(ms) { return ms==null?"—":(ms/1000).toFixed(1)+"s"; }

function buildSummary() {
  return STEPS.filter(t=>t.type!=="info"&&t.type!=="complete"&&t.type!=="group_select").map(t => {
    const ans=state.answers[t.id]||{};
    const base={id:t.id,phase:t.phase||t.id,type:t.type,isGuide:!!t.isGuide,
      answered:!!Object.keys(ans).filter(k=>k!=="totalMs").length};
    if (!base.answered) return {...base,answer:"—",correct:null,totalSec:"—",exploreSec:"—",answerSec:"—"};
    if (t.type==="likert_overlay") return {...base,answered:true,
      answer:`Income eq: ${ans.income_eq??"—"}/10 | Wealth eq: ${ans.wealth_eq??"—"}/10`,
      correct:null,totalSec:timeFmt(ans.totalMs),exploreSec:"—",answerSec:"—"};
    if (t.type==="task_2q") {
      const o1=(t.q1?.options||[]).find(o=>o.value===ans.q1)?.label??ans.q1??"—";
      const o2=(t.q2?.options||[]).find(o=>o.value===ans.q2)?.label??ans.q2??"—";
      const c1=t.q1?.correct!=null?ans.q1===t.q1.correct:null;
      const c2=t.q2?.correct!=null?ans.q2===t.q2.correct:null;
      return {...base,answered:true,answer:`Q1: ${o1} | Q2: ${o2}`,
        correct:(c1!=null&&c2!=null)?(c1&&c2):null,
        totalSec:timeFmt(ans.totalMs),exploreSec:timeFmt(ans.exploreMs),answerSec:timeFmt(ans.answerMs)};
    }
    return {...base,answer:JSON.stringify(ans),correct:null,totalSec:timeFmt(ans.totalMs),exploreSec:"—",answerSec:"—"};
  });
}

function downloadData() {
  const data={ participantId:state.participantId, studyVersion:STUDY_VERSION, group:state.group,
    startTime:new Date(state.startTime).toISOString(), completedTime:new Date().toISOString(),
    answers:state.answers, summary:buildSummary() };
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url; a.download=`study-${state.group}-${state.participantId}.json`; a.click();
  URL.revokeObjectURL(url);
}

/* ══════════════════════════════════════════════════════════════
   RENDER
══════════════════════════════════════════════════════════════ */
function render() {
  const step=STEPS[state.currentStep];
  if (!state.stepTimes[step.id]) state.stepTimes[step.id]=Date.now();
  const overlay=document.getElementById("study-overlay");
  const panel=document.getElementById("study-panel");
  const taskBanner=document.getElementById("study-task-banner");

  /* 1. Update page title */
  const storyTitle=document.querySelector(".story-title");
  if (storyTitle) {
    storyTitle.textContent = step.type==="task_2q" && step.phase && step.questionType
      ? `${step.phase} — ${step.questionType}`
      : "Wealth vs. Income Inequality — Sweden";
  }

  const isTask=step.type==="task_2q";
  if (isTask) {
    overlay.classList.add("hidden");
    taskBanner.classList.remove("hidden");
    setViz(step.vizConfig);
    if (step.autoPlay) setTimeout(()=>document.getElementById("cwi-race-play")?.click(),300);
    if (!step.isGuide) lockControls(); // guide steps stay unlocked for exploration
    renderTaskBanner(step, taskBanner);
  } else {
    taskBanner.classList.add("hidden");
    overlay.classList.remove("hidden");
    unlockControls();
    if (step.type==="info")           renderInfo(step, panel);
    if (step.type==="group_select")   renderGroupSelect(step, panel);
    if (step.type==="likert_overlay") renderLikertOverlay(step, panel);
    if (step.type==="complete")       renderComplete(step, panel);
  }
  updateProgress();
}

/* ── Overlay: info ───────────────────────────────────────────── */
function renderInfo(step, panel) {
  panel.innerHTML=`<div class="study-phase-tag">Information</div>
    <h2 class="study-title">${step.title}</h2>
    <div class="study-body">${step.content}</div>
    <div class="study-nav">
      ${state.currentStep>0?`<button class="study-btn secondary" id="study-prev">← Back</button>`:""}
      <button class="study-btn primary" id="study-next" ${step.requireConsent?"disabled":""}>${step.nextLabel||"Next →"}</button>
    </div>`;
  if (step.requireConsent) {
    const cb=panel.querySelector("#consent-checkbox"), btn=panel.querySelector("#study-next");
    cb.addEventListener("change",()=>{ btn.disabled=!cb.checked; });
  }
  panel.querySelector("#study-next")?.addEventListener("click",advance);
  panel.querySelector("#study-prev")?.addEventListener("click",retreat);
}

/* ── Overlay: group selection ────────────────────────────────── */
function renderGroupSelect(step, panel) {
  panel.innerHTML=`<div class="study-phase-tag">Setup</div>
    <h2 class="study-title">${step.title}</h2>
    <div class="study-body">${step.content}</div>
    <div class="group-cards">
      <button class="group-card" id="gc-line">
        <div class="gc-icon">📈</div><strong>Line Charts</strong>
        <p>Continuous lines over time. Juxtaposition &amp; superposition. 4 Y-axis scales × 2 metrics = <strong>16 chart tasks</strong>.</p>
      </button>
      <button class="group-card" id="gc-bar">
        <div class="gc-icon">📊</div><strong>Bar Charts</strong>
        <p>Grouped bars including animation. 4 Y-axis scales × 2 metrics = <strong>24 chart tasks</strong>.</p>
      </button>
    </div>
    <div class="study-nav"><button class="study-btn secondary" id="study-prev">← Back</button></div>`;
  panel.querySelector("#gc-line")?.addEventListener("click",()=>handleGroupSelect("line"));
  panel.querySelector("#gc-bar")?.addEventListener("click",()=>handleGroupSelect("bar"));
  panel.querySelector("#study-prev")?.addEventListener("click",retreat);
}

function handleGroupSelect(group) {
  state.group=group; STEPS=buildSteps(group); persist(); advance();
}

/* ── Overlay: equality Likerts ───────────────────────────────── */
function renderLikertOverlay(step, panel) {
  const SCALE=[0,1,2,3,4,5,6,7,8,9,10];
  const ans=state.answers[step.id]||{};
  const allDone=()=>step.questions.every(q=>(state.answers[step.id]||{})[q.id]!=null);
  panel.innerHTML=`<div class="study-phase-tag">${step.phase}</div>
    <h2 class="study-title">${step.title}</h2>
    <div class="study-body">${step.questions.map(q=>`
      <div class="task-likert-row" style="margin-bottom:20px">
        <p class="task-likert-label">${q.text}</p>
        <div class="task-likert-scale" style="flex-wrap:wrap;gap:4px;margin-top:6px">
          <span class="likert-end">${q.lo}</span>
          ${SCALE.map(n=>`<label class="likert-cell ${String(ans[q.id])===String(n)?"sel":""}">
            <input type="radio" name="lo_${q.id}" value="${n}" ${String(ans[q.id])===String(n)?"checked":""}/>
            <span>${n}</span></label>`).join("")}
          <span class="likert-end">${q.hi}</span>
        </div></div>`).join("")}
    </div>
    <div class="study-nav">
      ${state.currentStep>0?`<button class="study-btn secondary" id="study-prev">← Back</button>`:""}
      <button class="study-btn primary" id="study-next" ${allDone()?"":"disabled"}>Next →</button>
    </div>`;
  step.questions.forEach(q=>{
    panel.querySelectorAll(`[name="lo_${q.id}"]`).forEach(radio=>{
      radio.addEventListener("change",()=>{
        panel.querySelectorAll(`[name="lo_${q.id}"]`).forEach(r=>r.closest(".likert-cell")?.classList.remove("sel"));
        radio.closest(".likert-cell")?.classList.add("sel");
        saveSubAnswer(step.id,q.id,radio.value);
        panel.querySelector("#study-next").disabled=!allDone();
      });
    });
  });
  panel.querySelector("#study-next")?.addEventListener("click",advance);
  panel.querySelector("#study-prev")?.addEventListener("click",retreat);
}

/* ── Task banner ─────────────────────────────────────────────── */
let taskPhase="description";

function renderTaskBanner(step, banner) {
  taskPhase="description"; banner.innerHTML=buildTaskHTML(step);
  wireTask(step, banner); startTaskTimer(banner, state.stepTimes[step.id]);
}

function buildTaskHTML(step) {
  const ans=state.answers[step.id]||{};
  const timer=`<span id="task-timer-label" style="display:none"></span>`;
  if (taskPhase==="description") {
    const guideTag=step.isGuide?`<span class="task-guide-tag">Practice</span>`:"";
    return `<div class="task-banner-inner">
      <button class="study-close-btn" id="task-close-btn">✕</button>
      <div class="task-phase-tag">${step.phase} <span class="task-qtype-tag">${step.questionType}</span>${guideTag} ${timer}</div>
      <p class="task-desc">${step.taskText}</p>
      <div class="task-banner-nav">
        ${state.currentStep>1?`<button class="study-btn secondary" id="task-back">← Back</button>`:""}
        <button class="study-btn primary" id="task-ready">I've examined the chart — show questions →</button>
      </div></div>`;
  }
  /* Guide feedback phase */
  if (taskPhase==="feedback" && step.isGuide) {
    const c1=ans.q1===step.q1.correct, c2=ans.q2===step.q2.correct;
    const lbl=(q,v)=>q.options.find(o=>o.value===v)?.label||v||"—";
    return `<div class="task-banner-inner">
      <div class="task-phase-tag">${step.phase} <span class="task-qtype-tag">${step.questionType}</span> <span class="task-guide-tag">Practice Feedback</span></div>
      <div class="guide-feedback">
        <div class="guide-fb-item ${c1?"fb-correct":"fb-wrong"}">
          <span class="fb-icon">${c1?"✓":"✗"}</span>
          <div><strong>Q1:</strong> ${c1?"Correct!":"Incorrect."}
            ${!c1?`<div class="fb-answer">Correct answer: <em>${lbl(step.q1,step.q1.correct)}</em></div>`:""}
          </div>
        </div>
        <div class="guide-fb-item ${c2?"fb-correct":"fb-wrong"}">
          <span class="fb-icon">${c2?"✓":"✗"}</span>
          <div><strong>Q2:</strong> ${c2?"Correct!":"Incorrect."}
            ${!c2?`<div class="fb-answer">Correct answer: <em>${lbl(step.q2,step.q2.correct)}</em></div>`:""}
          </div>
        </div>
      </div>
      <div class="task-banner-nav"><button class="study-btn primary" id="task-continue">Continue →</button></div>
    </div>`;
  }

  const s1=ans.q1??null, s2=ans.q2??null;
  return `<div class="task-banner-inner">
    <button class="study-close-btn" id="task-close-btn">✕</button>
    <div class="task-phase-tag">${step.phase} — ${step.questionType} ${timer}</div>
    <p class="task-question"><strong>${step.q1.text}</strong></p>
    <div class="task-options-col tq1-opts" style="margin-bottom:10px">
      ${step.q1.options.map(o=>`<label class="task-option ${s1===o.value?"selected":""}">
        <input type="radio" name="tq1" value="${o.value}" ${s1===o.value?"checked":""}/>
        ${o.label}</label>`).join("")}
    </div>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:6px 0">
    <p class="task-question"><strong>${step.q2.text}</strong></p>
    <div class="task-options-col tq2-opts">
      ${step.q2.options.map(o=>`<label class="task-option ${s2===o.value?"selected":""}">
        <input type="radio" name="tq2" value="${o.value}" ${s2===o.value?"checked":""}/>
        ${o.label}</label>`).join("")}
    </div>
    <div class="task-banner-nav" style="margin-top:8px">
      <button class="study-btn secondary" id="task-back-q">← Re-read description</button>
      <button class="study-btn primary" id="task-submit" ${s1!=null&&s2!=null?"":"disabled"}>Submit →</button>
    </div></div>`;
}

function wireTask(step, banner) {
  banner.querySelector("#task-close-btn")?.addEventListener("click",closeStudy);
  banner.querySelector("#task-back")?.addEventListener("click",()=>{ unlockControls(); retreat(); });
  banner.querySelector("#task-ready")?.addEventListener("click",()=>{
    if (step.isGuide) lockControls(); // lock during question phase even for guides
    state.taskQTimes[step.id]=Date.now();
    taskPhase="question"; banner.innerHTML=buildTaskHTML(step); wireTask(step,banner);
  });
  banner.querySelector("#task-back-q")?.addEventListener("click",()=>{
    if (step.isGuide) unlockControls(); // unlock again so they can re-explore
    taskPhase="description"; banner.innerHTML=buildTaskHTML(step); wireTask(step,banner);
  });
  const checkDone=()=>{
    const a=state.answers[step.id]||{};
    const btn=banner.querySelector("#task-submit"); if(btn) btn.disabled=!(a.q1!=null&&a.q2!=null);
  };
  banner.querySelectorAll("[name='tq1']").forEach(radio=>{
    radio.closest("label")?.addEventListener("click",()=>{
      banner.querySelectorAll("[name='tq1']").forEach(r=>r.closest("label")?.classList.remove("selected"));
      radio.closest("label")?.classList.add("selected");
      saveSubAnswer(step.id,"q1",radio.value); checkDone();
    });
  });
  banner.querySelectorAll("[name='tq2']").forEach(radio=>{
    radio.closest("label")?.addEventListener("click",()=>{
      banner.querySelectorAll("[name='tq2']").forEach(r=>r.closest("label")?.classList.remove("selected"));
      radio.closest("label")?.classList.add("selected");
      saveSubAnswer(step.id,"q2",radio.value); checkDone();
    });
  });
  banner.querySelector("#task-submit")?.addEventListener("click",()=>{
    unlockControls();
    if (step.isGuide) {
      taskPhase="feedback"; banner.innerHTML=buildTaskHTML(step); wireTask(step,banner);
    } else {
      advance();
    }
  });
  banner.querySelector("#task-continue")?.addEventListener("click",()=>{ advance(); });
  startTaskTimer(banner, state.stepTimes[step.id]);
}

/* ── Timer & blocker ─────────────────────────────────────────── */
let _timerInterval=null, _blockerObserver=null;
function _ensureBlocker() {
  const root=document.getElementById("cwi-render-root");
  if (!root||!root._studyLocked) return;
  if (!document.getElementById("cwi-interaction-blocker")) {
    const pane=document.createElement("div");
    pane.id="cwi-interaction-blocker";
    pane.style.cssText="position:absolute;top:0;left:0;width:100%;height:100%;z-index:200;cursor:default;";
    root.appendChild(pane);
  }
  document.getElementById("cwi-tooltip")?.style.setProperty("display","none");
}
function startTaskTimer(banner, t0) {
  if (_timerInterval) { clearInterval(_timerInterval); _timerInterval=null; }
  const lbl=banner.querySelector("#task-timer-label"); if(!lbl) return;
  const start=t0||Date.now();
  _timerInterval=setInterval(()=>{ if(!lbl.isConnected){clearInterval(_timerInterval);return;} lbl.textContent=`⏱ ${((Date.now()-start)/1000).toFixed(0)} s`; },500);
}

/* ── Complete (no summary table — data is in the download) ───── */
function renderComplete(step, panel) {
  panel.innerHTML=`<div class="study-phase-tag">Complete</div>
    <h2 class="study-title">${step.title}</h2>
    <div class="study-body">${step.content}</div>
    <div class="study-complete-steps">
      <div class="complete-step">
        <span class="complete-step-num">1</span>
        <div><strong>Download your data</strong>
          <p>Save the JSON file to your computer.</p>
          <button class="study-btn primary" id="study-download">⬇ Download data (JSON)</button>
        </div>
      </div>
      <div class="complete-step">
        <span class="complete-step-num">2</span>
        <div><strong>Submit via Google Form</strong>
          <p>Click the link below to open the Google Form, then upload your JSON file there.</p>
          <a class="study-btn primary" href="${GOOGLE_FORM_URL}" target="_blank" rel="noopener">⬆ Open Google Form to submit</a>
        </div>
      </div>
    </div>
    <div class="study-nav centered" style="margin-top:16px">
      <button class="study-btn secondary" id="study-close-complete">Close</button>
    </div>`;
  panel.querySelector("#study-download").addEventListener("click",downloadData);
  panel.querySelector("#study-close-complete").addEventListener("click",closeStudy);
}

/* ══════════════════════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════════════════════ */
function updateProgress() {
  const bar=document.getElementById("study-progress-bar");
  const lbl=document.getElementById("study-progress-label");
  const pct=Math.round((state.currentStep/(STEPS.length-1))*100);
  if(bar) bar.style.width=pct+"%";
  if(lbl) lbl.textContent=`Step ${state.currentStep+1} of ${STEPS.length}`;
}
function advance() {
  if(_timerInterval){clearInterval(_timerInterval);_timerInterval=null;}
  if(state.currentStep<STEPS.length-1){state.currentStep++;render();}
}
function retreat() {
  if(_timerInterval){clearInterval(_timerInterval);_timerInterval=null;}
  if(state.currentStep>0){state.currentStep--;render();}
}

/* ══════════════════════════════════════════════════════════════
   BOOTSTRAP
══════════════════════════════════════════════════════════════ */
export function initStudy() {
  injectStudyHTML(); injectStudyCSS();
  document.getElementById("study-launch-btn").addEventListener("click",()=>{
    document.getElementById("study-launcher").classList.add("hidden");
    document.getElementById("study-overlay").classList.remove("hidden");
    render();
  });
  document.getElementById("study-close-btn").addEventListener("click",closeStudy);
}
function closeStudy() {
  if(_timerInterval){clearInterval(_timerInterval);_timerInterval=null;}
  unlockControls();
  document.getElementById("study-overlay").classList.add("hidden");
  document.getElementById("study-task-banner").classList.add("hidden");
  document.getElementById("study-progress-container").classList.add("hidden");
  document.getElementById("study-launcher").classList.remove("hidden");
  state.currentStep=0;
}

/* ══════════════════════════════════════════════════════════════
   INJECT HTML + CSS
══════════════════════════════════════════════════════════════ */
function injectStudyHTML() {
  document.body.insertAdjacentHTML("beforeend",`
    <div id="study-launcher" class="study-launcher"><button id="study-launch-btn" class="study-launch-btn">Start User Study</button></div>
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
  const obs=new MutationObserver(()=>{
    const o=document.getElementById("study-overlay"),b=document.getElementById("study-task-banner"),p=document.getElementById("study-progress-container");
    if(o.classList.contains("hidden")&&b.classList.contains("hidden")&&state.currentStep===0) p.classList.add("hidden");
    else p.classList.remove("hidden");
  });
  obs.observe(document.getElementById("study-overlay"),{attributes:true});
}

function injectStudyCSS() {
  const s=document.createElement("style");
  s.textContent=`
.study-launcher{position:fixed;bottom:24px;right:24px;z-index:9000}
.study-launch-btn{background:#2b6cb0;color:#fff;border:none;border-radius:8px;padding:14px 22px;font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.25);transition:background .2s}
.study-launch-btn:hover{background:#2c5282}
.study-close-btn{position:absolute;top:16px;right:20px;background:transparent;border:none;color:#6c757d;font-size:20px;cursor:pointer;padding:4px 8px;border-radius:4px;z-index:10}
.study-close-btn:hover{background:#f1f3f5;color:#212529}
.study-progress-container{position:fixed;top:0;left:0;right:0;height:5px;background:#e2e8f0;z-index:9100}
.study-progress-bar{height:100%;background:#2b6cb0;transition:width .4s ease}
.study-progress-label{position:fixed;top:8px;right:12px;font-size:11px;color:#718096;z-index:9101}
.study-overlay{position:fixed;inset:0;background:rgba(247,250,252,.97);z-index:9200;display:flex;align-items:center;justify-content:center;overflow-y:auto;padding:40px 16px}
.study-panel{background:#fff;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,.12);padding:36px 44px;max-width:700px;width:100%}
.study-phase-tag{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#2b6cb0;margin-bottom:8px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.task-qtype-tag{background:#ebf8ff;color:#2b6cb0;border-radius:4px;padding:2px 7px;font-size:10px;font-weight:700;letter-spacing:.04em}
.task-guide-tag{background:#fff3cd;color:#856404;border-radius:4px;padding:2px 7px;font-size:10px;font-weight:700;letter-spacing:.04em}
.study-title{font-size:20px;font-weight:700;color:#1a202c;margin:0 0 16px;line-height:1.4}
.study-body{font-size:14px;color:#2d3748;line-height:1.7}
.study-body p{margin:0 0 12px}
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
.group-cards{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0}
.group-card{background:#f8f9fa;border:2.5px solid #dee2e6;border-radius:12px;padding:20px 16px;text-align:left;cursor:pointer;transition:border-color .2s,background .2s,transform .15s;display:flex;flex-direction:column;gap:8px;font-family:inherit}
.group-card:hover{border-color:#2b6cb0;background:#ebf8ff;transform:translateY(-2px)}
.gc-icon{font-size:28px;line-height:1}
.group-card strong{font-size:15px;color:#1a202c;display:block}
.group-card p{font-size:13px;color:#5f6368;margin:0;line-height:1.5}
.study-task-banner{position:fixed;bottom:0;left:0;right:0;background:rgba(255,255,255,.97);border-top:3px solid #2b6cb0;z-index:9200;box-shadow:0 -4px 24px rgba(0,0,0,.12);max-height:54vh;overflow-y:auto}
.task-banner-inner{padding:12px 24px;max-width:1200px;margin:0 auto}
.task-desc{font-size:13.5px;color:#2d3748;line-height:1.6;margin:0 0 10px}
.task-question{font-size:13.5px;color:#1a202c;margin:0 0 6px;line-height:1.5}
.task-options-col{display:flex;flex-direction:column;gap:5px;margin-bottom:8px}
.task-option{display:flex;align-items:flex-start;gap:8px;padding:7px 12px;border:2px solid #e2e8f0;border-radius:7px;cursor:pointer;font-size:13px;color:#2d3748;transition:border-color .15s,background .15s;line-height:1.4}
.task-option:hover{border-color:#90cdf4;background:#ebf8ff}
.task-option.selected{border-color:#2b6cb0;background:#ebf8ff;font-weight:600}
.task-option input{accent-color:#2b6cb0;width:14px;height:14px;flex-shrink:0;margin-top:2px}
.task-likert-row{margin-bottom:10px}
.task-likert-label{font-size:13px;color:#1a202c;margin:0 0 4px;font-weight:500}
.task-likert-scale{display:flex;align-items:center;gap:3px;flex-wrap:nowrap}
.likert-end{font-size:11px;color:#718096;flex-shrink:0;max-width:110px;line-height:1.2}
.likert-cell{display:flex;flex-direction:column;align-items:center;cursor:pointer;padding:3px 5px;border-radius:5px;border:1.5px solid transparent;transition:background .15s;min-width:28px}
.likert-cell:hover{background:#ebf8ff;border-color:#90cdf4}
.likert-cell.sel{background:#ebf8ff;border-color:#2b6cb0;font-weight:700}
.likert-cell input{position:absolute;opacity:0;pointer-events:none}
.likert-cell span{font-size:12px;color:#2d3748;text-align:center}
.task-banner-nav{display:flex;gap:10px;justify-content:flex-end}
.study-complete-steps{display:flex;flex-direction:column;gap:16px;margin:20px 0}
.complete-step{display:flex;gap:14px;align-items:flex-start}
.complete-step-num{background:#2b6cb0;color:#fff;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0;margin-top:2px}
.complete-step strong{display:block;font-size:14px;color:#1a202c;margin-bottom:4px}
.complete-step p{margin:0 0 8px;font-size:13px;color:#5f6368}
.upload-note{color:#c53030!important;font-style:italic}
.guide-feedback{display:flex;flex-direction:column;gap:10px;margin:10px 0}
.guide-fb-item{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border-radius:8px;font-size:13px}
.fb-correct{background:#d1fae5;border:1.5px solid #6ee7b7}
.fb-wrong{background:#fee2e2;border:1.5px solid #fca5a5}
.fb-icon{font-size:16px;font-weight:700;flex-shrink:0;margin-top:1px}
.fb-answer{margin-top:4px;color:#374151;font-size:12px}
body:has(#study-task-banner:not(.hidden)) #app{padding-bottom:54vh}
.hidden{display:none !important}
@media(max-width:600px){.group-cards{grid-template-columns:1fr}}
  `;
  document.head.appendChild(s);
}
