/* ============================================================
   User Study — Wealth & Income Inequality Visualization
   Thesis: Kairui Li, Linköping University

   THREE CONDITIONS (participant chooses one):
     C1  Table vs. other visual representations
     C2  Bar chart with different Y-axis scales
     C3  Visualizations with vs. without population encoding

   THREE QUESTIONS per condition:
     T1  Effectiveness   — how big is the inequality?
     T2  Pattern         — open-ended description + comparison MCQ
     T3  Likert (−5–+5) — ease · clarity · background knowledge
   ============================================================ */

const STUDY_VERSION = "6.0";
const STORAGE_KEY   = "wealth-study-data-v6";

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
  nextLabel: "Next — Choose your condition →",
  requireConsent: true,
};

const STEP_CONDITION_SELECT = { id: "condition_select", type: "condition_select" };

const STEP_COMPLETE = {
  id: "complete", type: "complete",
  title: "Thank you for participating!",
  content: `<p>Your responses and timing data are recorded below. Click <strong>Download</strong> to save a JSON file — please share it with the researcher.</p>`,
};

/* ── CONDITION 1: Table vs. Line / Bar / Waffle ─────────────── */
const C1_INTRO = {
  id: "c1_intro", type: "info",
  title: "Condition 1 — Table vs. Visual Representations",
  content: `
    <p>In this condition you will compare a <strong>data table</strong> with three visual representations of the same wealth data: a <strong>line chart</strong>, a <strong>bar chart</strong>, and a <strong>waffle chart</strong>.</p>
    <p><strong>First</strong> you will see the data as a TABLE — familiarise yourself with the numbers. Then for each visual chart you will answer:</p>
    <ul>
      <li>One question about identifying inequality</li>
      <li>Two rating questions comparing the chart with the table</li>
    </ul>
    <p>The axis zoom slider stays active throughout — feel free to explore before answering.</p>`,
  nextLabel: "View the Table →",
};

// Baseline: participants see the TABLE first and answer a simple reading task
const C1_TABLE = {
  id: "c1_table", type: "task",
  phase: "Condition 1 — Baseline", questionType: "Table reading",
  vizConfig: { representation: "table", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020" },
  taskText: "This <strong>TABLE</strong> shows average net wealth per person (SEK) for six population groups in Sweden in 2020. Read all values carefully — you will compare this table with visual charts in the next tasks.",
  questionText: "According to the table, which group had the HIGHEST average net wealth per person in 2020?",
  options: [
    { label: "Bottom 50%",  value: "a" },
    { label: "Top 10%",     value: "b" },
    { label: "Top 0.01%",   value: "c" },
    { label: "Top 0.001%",  value: "d" },
  ],
  correct: "d",
};

// task_combined: MCQ (low-level) + 2 Likert questions in one step
const C1_T1 = {
  id: "c1_t1", type: "task_combined",
  phase: "Condition 1 — Task 1 of 3", questionType: "Line chart vs Table",
  vizConfig: { representation: "line", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "1980,1990,2000,2010,2020,2024", yScale: "linear-zoom" },
  taskText: "This <strong>LINE CHART</strong> shows average wealth per person for each group from 1980 to 2024. Compare it with the TABLE you just saw.",
  questionText: "Looking at the line chart, which group shows the most dramatic INCREASE in wealth over time?",
  options: [
    { label: "Bottom 50% — it grew the fastest from 1980",   value: "a" },
    { label: "Top 10% — steady consistent growth",            value: "b" },
    { label: "Top 1% — the steepest rise overall",            value: "c" },
    { label: "Top 0.001% — an extreme spike far above others", value: "d" },
  ],
  correct: "d",
  likertQuestions: [
    { id: "lq1", text: "This LINE CHART is easy to understand",                                              lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
    { id: "lq2", text: "Compared to the TABLE, this LINE CHART shows wealth inequality more clearly",        lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
  ],
};

const C1_T2 = {
  id: "c1_t2", type: "task_combined",
  phase: "Condition 1 — Task 2 of 3", questionType: "Bar chart vs Table",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "linear-zoom" },
  taskText: "This <strong>BAR CHART</strong> shows average wealth per person for each group in 2020. Compare it with the TABLE from the baseline step.",
  questionText: "Looking at the bar chart, how would you describe the scale of wealth inequality across the six groups?",
  options: [
    { label: "Differences are modest — groups are within a factor of 10 of each other",           value: "a" },
    { label: "Differences are noticeable — roughly 100× between top and bottom",                   value: "b" },
    { label: "Differences are extreme — Top 0.001% towers so high that all others are invisible",  value: "c" },
    { label: "All groups appear roughly equal in wealth",                                           value: "d" },
  ],
  correct: "c",
  likertQuestions: [
    { id: "lq1", text: "This BAR CHART is easy to understand",                                           lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
    { id: "lq2", text: "Compared to the TABLE, this BAR CHART shows wealth inequality more clearly",     lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
  ],
};

const C1_T3 = {
  id: "c1_t3", type: "task_combined",
  phase: "Condition 1 — Task 3 of 3", questionType: "Waffle chart vs Table",
  vizConfig: { representation: "waffle", comparison: "juxtaposition", metric: "income", popEncoding: "without", years: "2020" },
  taskText: "This <strong>WAFFLE CHART</strong> shows each group's share of Sweden's total income in 2020. Each cell = 1% of total income. Compare it with the TABLE from the baseline step.",
  questionText: "What does the waffle chart reveal about income distribution in Sweden?",
  options: [
    { label: "Income is distributed roughly equally — all groups fill a similar number of cells",                          value: "a" },
    { label: "The top groups control a disproportionately large income share despite being tiny in population",            value: "b" },
    { label: "The Bottom 50% controls most of Sweden's total income",                                                      value: "c" },
    { label: "The waffle chart makes it impossible to identify any inequality",                                            value: "d" },
  ],
  correct: "b",
  likertQuestions: [
    { id: "lq1", text: "This WAFFLE CHART is easy to understand",                                              lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
    { id: "lq2", text: "Compared to the TABLE, this WAFFLE CHART shows income inequality more clearly",       lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
  ],
};

/* ── CONDITION 2: Y-axis scales (4 variants × 3 questions = 12) ─── */
const C2_INTRO = {
  id: "c2_intro", type: "info",
  title: "Condition 2 — Bar Chart Y-axis Scales",
  content: `
    <p>In this condition you will see the <strong>same 2020 Swedish wealth data</strong> displayed with four different Y-axis scales:</p>
    <ol style="font-size:14px;line-height:1.8;padding-left:20px;margin:8px 0 12px">
      <li><strong>Linear (full range)</strong> — equal spacing, full data range</li>
      <li><strong>Logarithmic</strong> — each step represents a 10× increase</li>
      <li><strong>Scale break (zig-zag)</strong> — axis jumps over the mid-range gap</li>
      <li><strong>Linear with zoom window</strong> — range slider to explore the axis</li>
    </ol>
    <p>For each scale you will answer <strong>one value-reading question</strong> and rate the scale on <strong>two Likert items</strong>. A final question then asks about the overall magnitude of inequality.</p>`,
  nextLabel: "Start Scale 1 →",
};

/* Q1 options are identical across all four variants so accuracy is comparable */
const C2_Q1_OPTIONS = [
  { label: "Around 19 million SEK  (≈ 1.9 × 10⁷)",   value: "a" },
  { label: "Around 190 million SEK (≈ 1.9 × 10⁸)",   value: "b" },
  { label: "Around 19 billion SEK  (≈ 1.9 × 10¹⁰)",  value: "c" },
  { label: "Around 190 billion SEK (≈ 1.9 × 10¹¹)",  value: "d" },
];
const C2_Q1_CORRECT = "c"; /* actual value ≈ 18.9 billion SEK */

const C2_V1 = {
  id: "c2_v1", type: "task_combined",
  phase: "Condition 2 — Scale 1 of 4", questionType: "Linear (Full Range)",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "linear" },
  taskText: "This bar chart uses a <strong>LINEAR (full range) Y-axis</strong>. Equal vertical distances represent equal SEK amounts across the entire data range — from the most negative value to the highest. No break or zoom is applied.",
  questionText: "Q1 — Value reading: Looking at this linear-scale chart, approximately what is the Top 0.001%'s average per-person wealth in 2020?",
  options: C2_Q1_OPTIONS,
  correct: C2_Q1_CORRECT,
  likertQuestions: [
    { id: "lq1", text: "This linear Y-axis makes the Top 0.001%'s extreme wealth clearly visible relative to the other groups",  lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
    { id: "lq2", text: "This Y-axis scale is easy to understand",                                                                lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
  ],
};

const C2_V2 = {
  id: "c2_v2", type: "task_combined",
  phase: "Condition 2 — Scale 2 of 4", questionType: "Logarithmic",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "log" },
  taskText: "This bar chart uses a <strong>LOGARITHMIC Y-axis</strong>. Each equal step on the axis represents a ×10 increase in wealth — not a fixed SEK amount. Groups with near-zero or negative wealth cannot be shown on a log scale.",
  questionText: "Q1 — Value reading: Looking at this logarithmic-scale chart, approximately what is the Top 0.001%'s average per-person wealth in 2020?",
  options: C2_Q1_OPTIONS,
  correct: C2_Q1_CORRECT,
  likertQuestions: [
    { id: "lq1", text: "This logarithmic Y-axis makes wealth differences across all visible groups clearly comparable",  lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
    { id: "lq2", text: "This Y-axis scale is easy to understand",                                                       lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
  ],
};

const C2_V3 = {
  id: "c2_v3", type: "task_combined",
  phase: "Condition 2 — Scale 3 of 4", questionType: "Scale Break (Zig-zag)",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "break" },
  taskText: "This bar chart uses a <strong>SCALE BREAK</strong> (the zig-zag symbol on the Y-axis). The axis skips a large range of values so that both the lower-group bars and the extreme Top 0.001% bar fit within the same chart.",
  questionText: "Q1 — Value reading: Looking at this scale-break chart, approximately what is the Top 0.001%'s average per-person wealth in 2020?",
  options: C2_Q1_OPTIONS,
  correct: C2_Q1_CORRECT,
  likertQuestions: [
    { id: "lq1", text: "The scale break makes it easy to compare both the lower groups and the extreme top group simultaneously", lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
    { id: "lq2", text: "This Y-axis (with its break) is easy to understand",                                                      lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
  ],
};

const C2_V4 = {
  id: "c2_v4", type: "task_combined",
  phase: "Condition 2 — Scale 4 of 4", questionType: "Linear with Zoom Window",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "linear-zoom" },
  taskText: "This bar chart uses a <strong>LINEAR Y-axis with a zoom window</strong>. The range slider (above the chart) controls which portion of the Y-axis is visible — zoom in to see lower groups in detail, or zoom out to reveal the full range including the Top 0.001%.",
  questionText: "Q1 — Value reading: Using the zoom slider to explore, approximately what is the Top 0.001%'s average per-person wealth in 2020?",
  options: C2_Q1_OPTIONS,
  correct: C2_Q1_CORRECT,
  likertQuestions: [
    { id: "lq1", text: "The zoom slider helps me understand the full scale of wealth inequality across all groups",  lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
    { id: "lq2", text: "This Y-axis approach (with the zoom slider) is easy to use",                               lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
  ],
};

/* Q2 — Magnitude comparison: shown once after all four scales, on zoom chart */
const C2_COMPARE = {
  id: "c2_compare", type: "task",
  phase: "Condition 2 — Final Question", questionType: "Magnitude Comparison (Q2)",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "linear-zoom" },
  taskText: "Now that you have seen the same data through all four Y-axis scales, here is a final question. Use the zoom slider to explore the chart as needed. <em>Data: Top 0.001% ≈ 19 billion SEK per person; Middle 40% ≈ 3.5 million SEK per person (2020).</em>",
  questionText: "Q2 — Magnitude comparison: Roughly how many times larger is the Top 0.001%'s average per-person wealth compared with the Middle 40%'s average per-person wealth in 2020?",
  options: [
    { label: "About 10 times larger",              value: "a" },
    { label: "About 100 times larger",             value: "b" },
    { label: "About 1,000 times larger",           value: "c" },
    { label: "About 5,000 times larger or more",   value: "d" },
  ],
  correct: "d", /* actual ratio ≈ 18.9B / 3.47M ≈ 5,430× */
};

/* ── Dynamic STEPS ──────────────────────────────────────────── */
let STEPS = [STEP_CONSENT, STEP_CONDITION_SELECT, STEP_COMPLETE];

function applyCondition(c) {
  state.condition = c;
  const map = {
    1: [STEP_CONSENT, STEP_CONDITION_SELECT, C1_INTRO, C1_TABLE, C1_T1, C1_T2, C1_T3, STEP_COMPLETE],
    2: [STEP_CONSENT, STEP_CONDITION_SELECT, C2_INTRO, C2_V1, C2_V2, C2_V3, C2_V4, C2_COMPARE, STEP_COMPLETE],
  };
  STEPS = map[c] || STEPS;
  state.currentStep = 2;
  persist();
  render();
}

/* ══════════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════════ */
const state = {
  currentStep:   0,
  condition:     null,
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
}

function unlockControls() {
  ["cwi-representation","cwi-comparison","cwi-metric","cwi-pop-encoding","cwi-years-input"]
    .forEach(id => { const el = document.getElementById(id); if (el) el.disabled = false; });
  document.querySelectorAll("[name='cwiYScale']").forEach(el => el.disabled = false);
  document.querySelector(".cwi-controls-bar")?.style.removeProperty("opacity");
  document.getElementById("cwi-yscale-ctrl")?.style.removeProperty("opacity");
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
  return STEPS.filter(s => ["task","task_combined","task_likert"].includes(s.type)).map(t => {
    const ans = state.answers[t.id] || {};
    const base = { id: t.id, phase: t.phase, type: t.questionType };
    if (!Object.keys(ans).length) return { ...base, answered: false };
    const timeFmt = ms => ms != null ? (ms/1000).toFixed(1) + "s" : "—";

    if (t.type === "task_likert") {
      return { ...base, answered: true,
        answer: t.questions.map(q => `${q.id}:${ans[q.id]??'—'}`).join(", "),
        correct: null,
        totalSec: timeFmt(ans.totalMs), exploreSec: "—", answerSec: "—" };
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
    condition: state.condition, startTime: new Date(state.startTime).toISOString(),
    completedTime: new Date().toISOString(), answers: state.answers, summary: buildSummary(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `study-c${state.condition}-${state.participantId}.json`; a.click();
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
  const isTask = ["task","task_combined","task_likert"].includes(step.type);
  if (isTask) {
    overlay.classList.add("hidden");
    taskBanner.classList.remove("hidden");
    setViz(step.vizConfig);
    lockControls();
    renderTaskBanner(step, taskBanner);
  } else {
    taskBanner.classList.add("hidden");
    overlay.classList.remove("hidden");
    if (step.type === "info")             renderInfo(step, panel);
    if (step.type === "condition_select") renderConditionSelect(panel);
    if (step.type === "complete")         renderComplete(step, panel);
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

function renderConditionSelect(panel) {
  panel.innerHTML = `
    <div class="study-phase-tag">Choose Your Condition</div>
    <h2 class="study-title">Select one study condition to participate in</h2>
    <p style="font-size:14px;color:#5f6368;margin:0 0 16px">Each condition focuses on a different aspect of data visualization. Choose the one that interests you most.</p>
    <div class="cond-cards">
      <button class="cond-card" data-c="1">
        <span class="cond-num">C1</span>
        <strong>Table vs. Visual Representations</strong>
        <p>Compare how a data table and a bar chart differ in conveying wealth inequality.</p>
      </button>
      <button class="cond-card" data-c="2">
        <span class="cond-num">C2</span>
        <strong>Bar Chart Y-axis Scales</strong>
        <p>Compare four Y-axis designs — linear, logarithmic, scale break, and zoom window — and how each reveals extreme wealth inequality.</p>
      </button>
    </div>
    <div class="study-nav">
      <button class="study-btn secondary" id="study-prev">← Back</button>
    </div>`;
  panel.querySelectorAll(".cond-card").forEach(btn =>
    btn.addEventListener("click", () => applyCondition(Number(btn.dataset.c)))
  );
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

  if (taskPhase === "description") {
    return `<div class="task-banner-inner">
      <button class="study-close-btn" id="task-close-btn">✕</button>
      <div class="task-phase-tag">
        ${step.phase} <span class="task-qtype-tag">${step.questionType}</span> ${timer}
      </div>
      <p class="task-desc">${step.taskText}</p>
      <div class="task-banner-nav">
        ${state.currentStep > 2 ? `<button class="study-btn secondary" id="task-back">← Back</button>` : ""}
        <button class="study-btn primary" id="task-ready">I've examined the chart — show question →</button>
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
  banner.querySelector("#task-submit")?.addEventListener("click", () => { unlockControls(); advance(); });
  startTaskTimer(banner, state.stepTimes[step.id]);
}

/* ── Timer ───────────────────────────────────────────────────── */
let _timerInterval = null;
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

/* ── Complete ────────────────────────────────────────────────── */
function renderComplete(step, panel) {
  const summary = buildSummary();
  const condLabel = {1:"Table vs. Visual (C1)",2:"Y-axis Scales (C2)"};
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
    <div class="study-phase-tag">Complete — ${condLabel[state.condition]||""}</div>
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
        if (state.condition) applyCondition(state.condition);
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
