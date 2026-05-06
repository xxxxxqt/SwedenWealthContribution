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

const STUDY_VERSION = "5.0";
const STORAGE_KEY   = "wealth-study-data-v5";

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

/* ── CONDITION 1: Table vs. visual representations ──────────── */
const C1_INTRO = {
  id: "c1_intro", type: "info",
  title: "Condition 1 — Table vs. Visual Representations",
  content: `
    <p>In this condition you will see <strong>the same 2020 wealth data presented in two different formats</strong>: a bar chart and a data table.</p>
    <p>You will answer three questions: one about the scale of inequality, one about patterns, and one rating the visualizations.</p>
    <p>The axis zoom slider remains usable throughout — feel free to explore the data before answering.</p>`,
  nextLabel: "Start Task 1 →",
};

const C1_T1 = {
  id: "c1_t1", type: "task",
  phase: "Condition 1 — Task 1 of 3", questionType: "Effectiveness",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "linear-zoom" },
  taskText: "This bar chart shows the <strong>average net wealth per person (SEK)</strong> for six population groups in Sweden in 2020. Use the zoom slider if needed to explore the values.",
  questionText: "How would you characterize the scale of wealth inequality shown in this bar chart?",
  options: [
    { label: "The gap is modest — Top 0.001% is roughly 10× wealthier than the lower groups",       value: "a" },
    { label: "The gap is noticeable — roughly 100× difference between top and bottom groups",         value: "b" },
    { label: "The gap is extreme — Top 0.001% is thousands of times wealthier than most groups",      value: "c" },
    { label: "All groups appear roughly similar in wealth — no strong inequality is visible",          value: "d" },
  ],
  correct: "c",
};

const C1_T2 = {
  id: "c1_t2", type: "task_insight",
  phase: "Condition 1 — Task 2 of 3", questionType: "Pattern recognition",
  vizConfig: { representation: "table", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020" },
  taskText: "The same 2020 wealth data is now displayed as a <strong>TABLE</strong>. Read through the values and reflect on both this table and the bar chart from Task 1.",
  openText: "Describe what patterns you see in the wealth distribution. What stands out most?",
  questionText: "Comparing the TABLE (now) and the BAR CHART (Task 1) — which better communicates the degree of wealth inequality?",
  options: [
    { label: "The TABLE — exact numbers make the differences obvious",                       value: "a" },
    { label: "The BAR CHART — the visual height difference makes inequality immediately apparent", value: "b" },
    { label: "Both are equally effective",                                                    value: "c" },
    { label: "Neither is effective for showing the full scale of inequality",                 value: "d" },
  ],
  correct: "b",
};

const C1_T3 = {
  id: "c1_t3", type: "task_likert",
  phase: "Condition 1 — Task 3 of 3", questionType: "Subjective Rating (−5 to +5)",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "linear-zoom" },
  taskText: "Rate the <strong>bar chart</strong> you have been working with in this condition.",
  questions: [
    { id: "l1", text: "This visualization is easy to understand",                       lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
    { id: "l2", text: "The information is clearly presented",                            lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
    { id: "l3", text: "This visualization requires a lot of background knowledge",       lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
  ],
};

/* ── CONDITION 2: Y-axis scales ─────────────────────────────── */
const C2_INTRO = {
  id: "c2_intro", type: "info",
  title: "Condition 2 — Bar Chart Y-axis Scales",
  content: `
    <p>In this condition you will see the same 2020 wealth data displayed with <strong>two different Y-axis scales</strong>: a linear scale and a scale break.</p>
    <p>You will answer three questions: one about what each scale reveals about inequality, one about patterns and which scale is more effective, and one rating.</p>`,
  nextLabel: "Start Task 1 →",
};

const C2_T1 = {
  id: "c2_t1", type: "task",
  phase: "Condition 2 — Task 1 of 3", questionType: "Effectiveness",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "linear" },
  taskText: "This bar chart uses a <strong>LINEAR Y-axis</strong> for 2020 wealth data. On a linear scale, equal distances represent equal amounts in SEK. Use the zoom slider to explore.",
  questionText: "What does the LINEAR scale reveal about how the wealth is distributed across the six groups?",
  options: [
    { label: "All six groups are clearly distinguishable — differences are easy to compare",          value: "a" },
    { label: "Most groups are visible with gradual steps, one outlier at the top",                     value: "b" },
    { label: "The lower groups are nearly invisible — the Top 0.001% bar dominates so completely that other differences are hidden", value: "c" },
    { label: "The chart shows roughly equal wealth across all groups",                                 value: "d" },
  ],
  correct: "c",
};

const C2_T2 = {
  id: "c2_t2", type: "task_insight",
  phase: "Condition 2 — Task 2 of 3", questionType: "Pattern recognition",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "break" },
  taskText: "The same data now uses a <strong>SCALE BREAK</strong> (zig-zag symbol on the Y-axis). The break skips a range of values so both the small lower-group bars and the extreme Top 0.001% bar are visible.",
  openText: "Describe what patterns you see in this scale break chart. What does the break help you observe that the linear scale hid?",
  questionText: "Comparing the LINEAR scale (Task 1) and the SCALE BREAK (this chart) — which better shows the inequality between groups?",
  options: [
    { label: "Linear scale — a single consistent axis is easier to interpret",                          value: "a" },
    { label: "Scale break — I can now see both fine differences among lower groups AND the extreme top", value: "b" },
    { label: "Both are equally effective",                                                               value: "c" },
    { label: "Neither — a logarithmic scale would be better for this data",                             value: "d" },
  ],
  correct: "b",
};

const C2_T3 = {
  id: "c2_t3", type: "task_likert",
  phase: "Condition 2 — Task 3 of 3", questionType: "Subjective Rating (−5 to +5)",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "break" },
  taskText: "Rate the <strong>scale break chart</strong> you are currently viewing.",
  questions: [
    { id: "l1", text: "This visualization is easy to understand",                    lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
    { id: "l2", text: "The information is clearly presented",                         lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
    { id: "l3", text: "This visualization requires a lot of background knowledge",    lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
  ],
};

/* ── CONDITION 3: Population encoding ───────────────────────── */
const C3_INTRO = {
  id: "c3_intro", type: "info",
  title: "Condition 3 — Population-Size Encoding",
  content: `
    <p>In this condition you will compare bar charts <strong>without</strong> and <strong>with</strong> population-size encoding.</p>
    <p><strong>Without encoding:</strong> All bars are the same width — only height encodes information.<br>
    <strong>With encoding:</strong> Bar width is proportional to the group's share of Sweden's total population.</p>
    <p>You will answer three questions about what each version reveals about wealth concentration.</p>`,
  nextLabel: "Start Task 1 →",
};

const C3_T1 = {
  id: "c3_t1", type: "task",
  phase: "Condition 3 — Task 1 of 3", questionType: "Effectiveness",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "without", years: "2020", yScale: "linear-zoom" },
  taskText: "Standard bar chart <strong>WITHOUT population-size encoding</strong>. All bars have the same width — only bar HEIGHT encodes average wealth per person.",
  questionText: "Looking at this standard chart, how would you characterize the scale of wealth inequality between the groups?",
  options: [
    { label: "The gap is modest — Top 0.001% is roughly 10× wealthier than the lower groups",       value: "a" },
    { label: "The gap is noticeable — roughly 100× difference between top and bottom groups",         value: "b" },
    { label: "The gap is extreme — Top 0.001% is thousands of times wealthier than most groups",      value: "c" },
    { label: "All groups appear roughly similar in wealth — no strong inequality is visible",          value: "d" },
  ],
  correct: "c",
};

const C3_T2 = {
  id: "c3_t2", type: "task_insight",
  phase: "Condition 3 — Task 2 of 3", questionType: "Pattern recognition",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "with", years: "2020", yScale: "linear-zoom" },
  taskText: "The same data now has <strong>population-size encoding</strong>. Bar WIDTH is proportional to the group's share of Sweden's population — a wider bar means a larger group. Notice how bar widths change, especially for the extreme top groups.",
  openText: "Describe what patterns you see. What does combining bar HEIGHT (wealth) and bar WIDTH (population share) reveal about wealth concentration?",
  questionText: "Comparing the STANDARD chart (Task 1) and this POPULATION-ENCODED chart — which better communicates the true concentration of wealth?",
  options: [
    { label: "Standard chart — equal widths make heights easier to compare",                                                         value: "a" },
    { label: "Population-encoded chart — seeing how tiny the top group's population share is makes the inequality far more striking", value: "b" },
    { label: "Both are equally effective",                                                                                            value: "c" },
    { label: "The encoding adds confusion rather than insight",                                                                      value: "d" },
  ],
  correct: "b",
};

const C3_T3 = {
  id: "c3_t3", type: "task_likert",
  phase: "Condition 3 — Task 3 of 3", questionType: "Subjective Rating (−5 to +5)",
  vizConfig: { representation: "bar", comparison: "juxtaposition", metric: "wealth", popEncoding: "with", years: "2020", yScale: "linear-zoom" },
  taskText: "Rate the <strong>population-encoded chart</strong> you are currently viewing.",
  questions: [
    { id: "l1", text: "This visualization is easy to understand",                    lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
    { id: "l2", text: "The information is clearly presented",                         lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
    { id: "l3", text: "This visualization requires a lot of background knowledge",    lo: "−5 Strongly disagree", hi: "Strongly agree +5" },
  ],
};

/* ── Dynamic STEPS ──────────────────────────────────────────── */
let STEPS = [STEP_CONSENT, STEP_CONDITION_SELECT, STEP_COMPLETE];

function applyCondition(c) {
  state.condition = c;
  const map = {
    1: [STEP_CONSENT, STEP_CONDITION_SELECT, C1_INTRO, C1_T1, C1_T2, C1_T3, STEP_COMPLETE],
    2: [STEP_CONSENT, STEP_CONDITION_SELECT, C2_INTRO, C2_T1, C2_T2, C2_T3, STEP_COMPLETE],
    3: [STEP_CONSENT, STEP_CONDITION_SELECT, C3_INTRO, C3_T1, C3_T2, C3_T3, STEP_COMPLETE],
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
  return STEPS.filter(s => ["task","task_insight","task_likert"].includes(s.type)).map(t => {
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
    if (t.type === "task_insight") {
      const opt = (t.options||[]).find(o=>o.value===ans.value)?.label ?? ans.value ?? "—";
      return { ...base, answered: true,
        answer: opt, openAnswer: ans.openText ? ans.openText.slice(0,80)+"…" : "—",
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
  const isTask = ["task","task_insight","task_likert"].includes(step.type);
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
        <p>Explore how linear and scale-break axes affect perception of extreme inequality.</p>
      </button>
      <button class="cond-card" data-c="3">
        <span class="cond-num">C3</span>
        <strong>Population-Size Encoding</strong>
        <p>See what population-size bar encoding reveals that a standard chart hides.</p>
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
  const timer = `<span class="task-timer-inline" id="task-timer-label">⏱ 0 s</span>`;

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

  /* Insight: open-ended textarea + comparison MCQ side by side */
  if (step.type === "task_insight") {
    const saved = ans.value;
    return `<div class="task-banner-inner">
      <button class="study-close-btn" id="task-close-btn">✕</button>
      <div class="task-phase-tag">${step.phase} — ${step.questionType} ${timer}</div>
      <div class="task-insight-split">
        <div class="task-insight-open">
          <p class="task-question"><strong>Open-ended</strong><br>${step.openText}</p>
          <textarea id="task-open-ta" placeholder="Describe your observations…" rows="4">${ans.openText||""}</textarea>
        </div>
        <div class="task-insight-mcq">
          <p class="task-question"><strong>Multiple choice</strong><br>${step.questionText}</p>
          <div class="task-options-col">
            ${step.options.map(o=>`
              <label class="task-option ${saved===o.value?"selected":""}">
                <input type="radio" name="tq" value="${o.value}" ${saved===o.value?"checked":""}/>
                ${o.label}
              </label>`).join("")}
          </div>
        </div>
      </div>
      <div class="task-banner-nav">
        <button class="study-btn secondary" id="task-back-q">← Re-read description</button>
        <button class="study-btn primary" id="task-submit" ${saved?"":"disabled"}>Submit →</button>
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
  if (step.type === "task" || step.type === "task_insight") {
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
  if (step.type === "task_insight") {
    const ta = banner.querySelector("#task-open-ta");
    ta?.addEventListener("input", () => saveSubAnswer(step.id, "openText", ta.value));
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
  const condLabel = {1:"Table vs. Visual (C1)",2:"Y-axis Scales (C2)",3:"Population Encoding (C3)"};
  const rows = summary.map(r => {
    if (!r.answered) return `<tr><td>${r.phase||r.id}</td><td>${r.type}</td><td colspan="3"><em>—</em></td></tr>`;
    const mark  = r.correct===true?"✓":r.correct===false?"✗":"—";
    const style = r.correct===true?"color:#276749;font-weight:700":r.correct===false?"color:#c53030;font-weight:700":"";
    const open  = r.openAnswer?`<br><em style="font-size:11px;color:#718096">${r.openAnswer}</em>`:"";
    return `<tr>
      <td style="font-size:11px">${(r.phase||r.id).split("—").pop().trim()}</td>
      <td style="font-size:11px;color:#718096">${r.type}</td>
      <td>${r.answer}${open}</td>
      <td style="${style}">${mark}</td>
      <td style="font-size:11px">${r.exploreSec} / ${r.answerSec}</td>
    </tr>`;
  }).join("");
  panel.innerHTML = `
    <div class="study-phase-tag">Complete — ${condLabel[state.condition]||""}</div>
    <h2 class="study-title">${step.title}</h2>
    <div class="study-body">${step.content}</div>
    <div class="study-summary">
      <table class="summary-table">
        <thead><tr><th>Task</th><th>Type</th><th>Answer</th><th>✓?</th><th>Explore / Answer</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="study-nav centered">
      <button class="study-btn primary large" id="study-download">⬇ Download data (JSON)</button>
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
