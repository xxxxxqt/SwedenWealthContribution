const d3 = window.d3;

const COLORS = {
  bottom50: "#2b6cb0",
  top10: "#dd6b20",
  top1: "#c53030",
  other: "#ced4c4"
};

const KEY_YEARS = [1995, 2000, 2010, 2020, 2023];
const DECADE_YEARS = [1990, 2000, 2010, 2020];

let wealthSeries = [];
let seriesByYear = new Map();
let billionaireData = [];

let waffleTimer = null;
let flowTimer = null;
let raceTimer = null;

function clampPercent(v) {
  return Math.max(0, v);
}

function roundToCells(values) {
  const floors = values.map(Math.floor);
  let remain = 100 - d3.sum(floors);
  const fractions = values.map((v, i) => ({ i, frac: v - Math.floor(v) })).sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < fractions.length && remain > 0; k += 1) {
    floors[fractions[k].i] += 1;
    remain -= 1;
  }
  return floors;
}

function buildDisplayShares(d) {
  const bottom50 = clampPercent(d.bottom50);
  const top10 = clampPercent(d.top10);
  const top1 = clampPercent(d.top1);
  const top10Ex = Math.max(0, top10 - top1);
  const other = Math.max(0, 100 - bottom50 - top10Ex - top1);
  return { bottom50, top10, top1, top10Ex, other };
}

function getYearData(year) {
  return seriesByYear.get(year);
}

function legendItem(color, label) {
  return `<div class="legend-item"><span class="legend-swatch" style="background:${color}"></span>${label}</div>`;
}

function parseNetWorthToBillions(raw) {
  if (!raw) return NaN;
  const cleaned = String(raw).replace(/[$,]/g, "").trim();
  const match = cleaned.match(/^([0-9.]+)\s*([BMT])$/i);
  if (!match) return NaN;
  const num = Number(match[1]);
  const unit = match[2].toUpperCase();
  if (!Number.isFinite(num)) return NaN;
  if (unit === "T") return num * 1000;
  if (unit === "M") return num / 1000;
  return num;
}

function initLegend() {
  document.getElementById("waffle-legend").innerHTML = [
    legendItem(COLORS.bottom50, "Bottom 50%"),
    legendItem(COLORS.top10, "Top 10% (excl. Top 1%)"),
    legendItem(COLORS.top1, "Top 1%"),
    legendItem(COLORS.other, "Other groups")
  ].join("");
}

function initWaffle() {
  const svg = d3.select("#waffle-chart");
  const width = 460;
  const height = 460;
  const padding = 24;
  const cellSize = 38;

  svg.attr("viewBox", `0 0 ${width} ${height}`);

  const cells = d3.range(100).map((i) => {
    const col = i % 10;
    const row = Math.floor(i / 10);
    return {
      i,
      x: padding + col * cellSize,
      y: padding + (9 - row) * cellSize
    };
  });

  svg
    .append("g")
    .selectAll("rect")
    .data(cells)
    .join("rect")
    .attr("class", "waffle-cell")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("width", cellSize - 3)
    .attr("height", cellSize - 3)
    .attr("rx", 4)
    .attr("fill", COLORS.other)
    .attr("stroke", "#ffffff");

  function updateWaffle(year) {
    const d = getYearData(year);
    if (!d) {
      return;
    }
    const shares = buildDisplayShares(d);
    const counts = roundToCells([shares.bottom50, shares.top10Ex, shares.top1, shares.other]);
    const labels = d3.select("#waffle-year-label");
    labels.text(String(year));

    const top1End = counts[2];
    const top10End = counts[2] + counts[1];
    const bottomEnd = counts[2] + counts[1] + counts[0];

    svg
      .selectAll(".waffle-cell")
      .data(cells)
      .transition()
      .duration(350)
      .attr("fill", (cell) => {
        if (cell.i < top1End) return COLORS.top1;
        if (cell.i < top10End) return COLORS.top10;
        if (cell.i < bottomEnd) return COLORS.bottom50;
        return COLORS.other;
      });
  }

  const yearInput = document.getElementById("waffle-year");
  const playButton = document.getElementById("waffle-play");

  yearInput.addEventListener("input", () => {
    updateWaffle(Number(yearInput.value));
  });

  playButton.addEventListener("click", () => {
    if (waffleTimer) {
      window.clearInterval(waffleTimer);
      waffleTimer = null;
      playButton.textContent = "Play";
      return;
    }
    playButton.textContent = "Pause";
    waffleTimer = window.setInterval(() => {
      let year = Number(yearInput.value);
      year = year >= 2023 ? 1995 : year + 1;
      yearInput.value = String(year);
      updateWaffle(year);
    }, 700);
  });

  updateWaffle(1995);
}

function renderSmallMultiples() {
  const root = d3.select("#small-multiples");
  root.selectAll("*").remove();

  DECADE_YEARS.forEach((year) => {
    const d = getYearData(year);
    if (!d) return;

    const shares = buildDisplayShares(d);
    const card = root.append("div").attr("class", "small-cell");
    card.append("h3").text(String(year));

    const size = 220;
    const svg = card.append("svg").attr("viewBox", `0 0 ${size} ${size}`);

    const rootNode = d3.hierarchy({
      children: [
        { name: "Bottom 50%", value: shares.bottom50 },
        { name: "Top 10%", value: shares.top10 },
        { name: "Other", value: Math.max(0, 100 - shares.bottom50 - shares.top10) }
      ]
    }).sum((x) => x.value);

    d3.treemap().size([size, size]).padding(2)(rootNode);

    const colors = {
      "Bottom 50%": COLORS.bottom50,
      "Top 10%": COLORS.top10,
      Other: COLORS.other
    };

    const leaves = rootNode.leaves();

    svg
      .selectAll("rect.main")
      .data(leaves)
      .join("rect")
      .attr("class", "main")
      .attr("x", (n) => n.x0)
      .attr("y", (n) => n.y0)
      .attr("width", (n) => n.x1 - n.x0)
      .attr("height", (n) => n.y1 - n.y0)
      .attr("fill", (n) => colors[n.data.name])
      .attr("stroke", "#fff");

    const top10Node = leaves.find((n) => n.data.name === "Top 10%");
    if (top10Node && shares.top10 > 0) {
      const x = top10Node.x0;
      const y = top10Node.y0;
      const w = top10Node.x1 - top10Node.x0;
      const h = top10Node.y1 - top10Node.y0;
      const top1Area = (shares.top1 / shares.top10) * w * h;
      const top1Height = Math.max(0, Math.min(h, top1Area / Math.max(1, w)));

      svg
        .append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", w)
        .attr("height", top1Height)
        .attr("fill", COLORS.top1)
        .attr("stroke", "#fff");

      svg
        .append("text")
        .attr("x", x + 4)
        .attr("y", y + Math.min(16, top1Height - 2))
        .attr("fill", "#fff")
        .attr("font-size", "10")
        .attr("font-weight", 700)
        .text(`Top 1% ${shares.top1.toFixed(1)}%`);
    }

    svg
      .append("text")
      .attr("x", 6)
      .attr("y", size - 7)
      .attr("fill", "#203021")
      .attr("font-size", "10")
      .text(`Bottom 50% ${shares.bottom50.toFixed(1)}%`);

    svg
      .append("text")
      .attr("x", 6)
      .attr("y", 14)
      .attr("fill", "#2c1a0b")
      .attr("font-size", "10")
      .text(`Top 10% ${shares.top10.toFixed(1)}%`);
  });
}

function initScrolly() {
  const sections = [
    { year: 1995, text: "Bottom 50% still holds a small positive share; Top 10% dominates wealth." },
    { year: 2000, text: "Bottom 50% turns negative in this dataset, while Top 10% rises." },
    { year: 2010, text: "Post-crisis decade: concentration remains high and Top 1% stays elevated." },
    { year: 2020, text: "Top groups gain further share; broad-base ownership remains compressed." },
    { year: 2023, text: "The latest point continues the long-run concentration trend." }
  ];

  const sectionsRoot = d3.select("#scrolly-sections");

  sectionsRoot
    .selectAll("section")
    .data(sections)
    .join("section")
    .attr("class", "scrolly-section")
    .attr("data-year", (d) => d.year)
    .html((d) => `<h3>${d.year}</h3><p>${d.text}</p>`);

  const barSvg = d3.select("#scrolly-bar").attr("viewBox", "0 0 5000 62");

  function updateScrolly(year) {
    const d = getYearData(year);
    if (!d) return;
    const s = buildDisplayShares(d);
    const segs = [
      { key: "Bottom 50%", value: s.bottom50, color: COLORS.bottom50 },
      { key: "Top 10% (excl. Top 1%)", value: s.top10Ex, color: COLORS.top10 },
      { key: "Top 1%", value: s.top1, color: COLORS.top1 },
      { key: "Other", value: s.other, color: COLORS.other }
    ];

    let x = 0;
    const data = segs.map((seg) => {
      const w = seg.value * 50;
      const out = { ...seg, x, w };
      x += w;
      return out;
    });

    barSvg.selectAll("*").remove();

    barSvg
      .append("rect")
      .attr("x", 0)
      .attr("y", 12)
      .attr("width", 5000)
      .attr("height", 38)
      .attr("fill", "#f0f3ea");

    barSvg
      .selectAll("rect.seg")
      .data(data)
      .join("rect")
      .attr("class", "seg")
      .attr("x", (p) => p.x)
      .attr("y", 12)
      .attr("width", (p) => p.w)
      .attr("height", 38)
      .attr("fill", (p) => p.color)
      .append("title")
      .text((p) => `${p.key}: ${p.value.toFixed(2)}%`);

    barSvg
      .selectAll("text.lab")
      .data(data.filter((p) => p.w > 140))
      .join("text")
      .attr("class", "lab")
      .attr("x", (p) => p.x + 8)
      .attr("y", 35)
      .attr("fill", (p) => (p.key === "Bottom 50%" || p.key === "Top 1%" ? "#fff" : "#1b1b1b"))
      .attr("font-size", 14)
      .attr("font-weight", 700)
      .text((p) => `${p.key}: ${p.value.toFixed(1)}%`);

    document.getElementById("scrolly-current-year").textContent = String(year);
  }

  updateScrolly(1995);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const year = Number(entry.target.getAttribute("data-year"));
          updateScrolly(year);
        }
      });
    },
    { threshold: 0.55 }
  );

  document.querySelectorAll(".scrolly-section").forEach((node) => io.observe(node));
}

function renderSlopegraph() {
  const svg = d3.select("#slopegraph");
  const width = 980;
  const height = 380;
  const margin = { top: 30, right: 140, bottom: 40, left: 55 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  svg.attr("viewBox", `0 0 ${width} ${height}`);
  svg.selectAll("*").remove();

  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scalePoint().domain(["1995", "2010", "2023"]).range([0, innerW]);
  const y = d3.scaleLinear().domain([0, 80]).range([innerH, 0]);

  const groups = [
    { key: "bottom50", name: "Bottom 50%", color: COLORS.bottom50, width: 3 },
    { key: "top10", name: "Top 10%", color: COLORS.top10, width: 4 },
    { key: "top1", name: "Top 1%", color: COLORS.top1, width: 3 }
  ];

  g.append("g").attr("class", "axis").call(d3.axisLeft(y).tickValues(d3.range(0, 81, 10)).tickFormat((d) => `${d}%`));

  ["1995", "2010", "2023"].forEach((yr) => {
    g.append("line").attr("x1", x(yr)).attr("x2", x(yr)).attr("y1", 0).attr("y2", innerH).attr("stroke", "#ccd4c5");
    g.append("text").attr("x", x(yr)).attr("y", innerH + 24).attr("text-anchor", "middle").attr("fill", "#556257").text(yr);
  });

  groups.forEach((grp) => {
    const points = [1995, 2010, 2023]
      .map((yr) => getYearData(yr))
      .filter(Boolean)
      .map((d) => ({ year: d.year, value: clampPercent(d[grp.key]) }));

    g.append("path")
      .datum(points)
      .attr("fill", "none")
      .attr("stroke", grp.color)
      .attr("stroke-width", grp.width)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x(String(d.year)))
          .y((d) => y(d.value))
      );

    points.forEach((p) => {
      g.append("circle").attr("cx", x(String(p.year))).attr("cy", y(p.value)).attr("r", 4).attr("fill", grp.color);
    });

    const last = points[points.length - 1];
    if (last) {
      g
        .append("text")
        .attr("x", x(String(last.year)) + 8)
        .attr("y", y(last.value))
        .attr("dy", "0.35em")
        .attr("fill", grp.color)
        .attr("font-size", 12)
        .text(`${grp.name}: ${last.value.toFixed(2)}%`);
    }
  });
}

function renderDualPanel() {
  const data = wealthSeries.filter((d) => d.year >= 1995 && d.year <= 2023);
  const svg = d3.select("#dual-panel");
  const tooltip = d3.select("#dual-tooltip");

  const width = 1050;
  const height = 520;
  const margin = { top: 34, right: 70, bottom: 40, left: 55 };
  const innerW = width - margin.left - margin.right;

  const topH = 210;
  const gap = 60;
  const bottomH = 160;

  const topY0 = margin.top;
  const bottomY0 = margin.top + topH + gap;

  svg.attr("viewBox", `0 0 ${width} ${height}`);
  svg.selectAll("*").remove();

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.year))
    .range([margin.left, margin.left + innerW]);
  const yTop = d3.scaleLinear().domain([0, 80]).range([topY0 + topH, topY0]);
  const yBottom = d3.scaleLinear().domain([0, 10]).range([bottomY0 + bottomH, bottomY0]);

  const lineTop10 = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => yTop(clampPercent(d.top10)));

  const lineTop1 = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => yTop(clampPercent(d.top1)));

  const lineBottom50 = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => yBottom(Math.min(10, clampPercent(d.bottom50))));

  const areaGap = d3
    .area()
    .x((d) => x(d.year))
    .y0((d) => yTop(clampPercent(d.top10)))
    .y1((d) => yBottom(Math.min(10, clampPercent(d.bottom50))));

  svg
    .append("path")
    .datum(data)
    .attr("d", areaGap)
    .attr("fill", "#f0c9a7")
    .attr("opacity", 0.26);

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yTop).tickValues(d3.range(0, 81, 10)).tickFormat((d) => `${d}%`));

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yBottom).tickValues(d3.range(0, 11, 2)).tickFormat((d) => `${d}%`));

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${bottomY0 + bottomH})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  svg
    .append("text")
    .attr("x", margin.left)
    .attr("y", topY0 - 10)
    .attr("fill", "#6a513f")
    .attr("font-weight", 700)
    .text("Top panel: Top 10% and Top 1% (0-80%)");

  svg
    .append("text")
    .attr("x", margin.left)
    .attr("y", bottomY0 - 10)
    .attr("fill", "#3a4d68")
    .attr("font-weight", 700)
    .text("Bottom panel: Bottom 50% (0-10%, clamped)");

  svg.append("path").datum(data).attr("d", lineTop10).attr("fill", "none").attr("stroke", COLORS.top10).attr("stroke-width", 3);
  svg.append("path").datum(data).attr("d", lineTop1).attr("fill", "none").attr("stroke", COLORS.top1).attr("stroke-width", 2.5);
  svg.append("path").datum(data).attr("d", lineBottom50).attr("fill", "none").attr("stroke", COLORS.bottom50).attr("stroke-width", 3);

  const hoverLine = svg
    .append("line")
    .attr("stroke", "#7e8a79")
    .attr("stroke-dasharray", "4 4")
    .attr("y1", margin.top)
    .attr("y2", bottomY0 + bottomH)
    .style("opacity", 0);

  svg
    .append("rect")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", innerW)
    .attr("height", topH + gap + bottomH)
    .attr("fill", "transparent")
    .on("mousemove", (event) => {
      const [mx] = d3.pointer(event);
      const year = Math.round(x.invert(mx));
      const d = getYearData(Math.max(1995, Math.min(2023, year)));
      if (!d) return;
      const sx = x(d.year);
      hoverLine.attr("x1", sx).attr("x2", sx).style("opacity", 1);

      tooltip
        .style("display", "block")
        .style("left", `${event.pageX + 12}px`)
        .style("top", `${event.pageY - 18}px`)
        .html(
          `Year ${d.year}<br>Top 10%: ${d.top10.toFixed(2)}%<br>Top 1%: ${d.top1.toFixed(2)}%<br>Bottom 50%: ${d.bottom50.toFixed(2)}%`
        );
    })
    .on("mouseleave", () => {
      hoverLine.style("opacity", 0);
      tooltip.style("display", "none");
    });
}

function initUnitFlow() {
  const svg = d3.select("#unit-flow");
  const width = 1020;
  const height = 350;
  svg.attr("viewBox", `0 0 ${width} ${height}`);
  svg.selectAll("*").remove();

  const boxes = {
    bottom: { label: "Bottom 50%", x: 30, y: 85, w: 300, h: 200, color: "#dfeafb" },
    top10: { label: "Top 10%", x: 360, y: 85, w: 300, h: 200, color: "#fde6d4" },
    top1: { label: "Top 1%", x: 690, y: 85, w: 300, h: 200, color: "#f8d7d7" },
    other: { label: "Other", x: 30, y: 300, w: 960, h: 40, color: "#f1f3ec" }
  };

  Object.values(boxes).forEach((b) => {
    svg
      .append("rect")
      .attr("x", b.x)
      .attr("y", b.y)
      .attr("width", b.w)
      .attr("height", b.h)
      .attr("fill", b.color)
      .attr("stroke", "#c9d2bf");

    if (b.label !== "Other") {
      svg.append("text").attr("x", b.x + 8).attr("y", b.y - 8).attr("fill", "#4d5b4f").attr("font-size", 12).text(b.label);
    }
  });

  function slotPosition(group, idxInGroup) {
    const b = boxes[group];
    const cols = group === "other" ? 48 : 12;
    const stepX = (b.w - 18) / cols;
    const stepY = group === "other" ? 12 : 17;
    const col = idxInGroup % cols;
    const row = Math.floor(idxInGroup / cols);
    return {
      x: b.x + 9 + col * stepX,
      y: b.y + 10 + row * stepY
    };
  }

  let iconState = new Array(100).fill("other");
  const circles = svg
    .append("g")
    .selectAll("circle")
    .data(d3.range(100))
    .join("circle")
    .attr("r", 4)
    .attr("stroke", "#fff")
    .attr("stroke-width", 0.8);

  function targetCounts(d) {
    const s = buildDisplayShares(d);
    const [bottom, top10, top1, other] = roundToCells([s.bottom50, s.top10Ex, s.top1, s.other]);
    return { bottom, top10, top1, other };
  }

  function buildTargetGroups(counts) {
    const target = new Array(100).fill("other");
    let idx = 0;
    for (let i = 0; i < counts.bottom; i += 1) target[idx++] = "bottom";
    for (let i = 0; i < counts.top10; i += 1) target[idx++] = "top10";
    for (let i = 0; i < counts.top1; i += 1) target[idx++] = "top1";
    while (idx < 100) target[idx++] = "other";
    return target;
  }

  function rebalanceToTarget(targetGroups) {
    const desired = d3.rollup(targetGroups, (arr) => arr.length, (v) => v);

    function countNow(group) {
      return iconState.filter((g) => g === group).length;
    }

    const groups = ["bottom", "top10", "top1", "other"];
    groups.forEach((receiver) => {
      let need = (desired.get(receiver) || 0) - countNow(receiver);
      while (need > 0) {
        const donor = groups.find((g) => countNow(g) > (desired.get(g) || 0));
        if (!donor) break;
        const ix = iconState.findIndex((g) => g === donor);
        if (ix >= 0) {
          iconState[ix] = receiver;
          need -= 1;
        } else {
          break;
        }
      }
    });
  }

  function updateFlow(year) {
    const d = getYearData(year);
    if (!d) return;

    const counts = targetCounts(d);
    const targets = buildTargetGroups(counts);
    const prev = iconState.slice();
    rebalanceToTarget(targets);

    const buckets = {
      bottom: [],
      top10: [],
      top1: [],
      other: []
    };

    iconState.forEach((g, i) => buckets[g].push(i));

    const position = {};
    ["bottom", "top10", "top1", "other"].forEach((g) => {
      buckets[g].forEach((iconId, idx) => {
        position[iconId] = slotPosition(g, idx);
      });
    });

    circles
      .transition()
      .duration(520)
      .delay((id) => (prev[id] === iconState[id] ? 0 : id * 18))
      .attr("cx", (id) => position[id].x)
      .attr("cy", (id) => position[id].y)
      .attr("fill", (id) => {
        if (iconState[id] === "bottom") return COLORS.bottom50;
        if (iconState[id] === "top10") return COLORS.top10;
        if (iconState[id] === "top1") return COLORS.top1;
        return COLORS.other;
      });

    document.getElementById("flow-year-label").textContent = String(year);
    document.getElementById("flow-bottom-counter").textContent = `${buildDisplayShares(d).bottom50.toFixed(2)}%`;
    document.getElementById("flow-top10-counter").textContent = `${buildDisplayShares(d).top10Ex.toFixed(2)}%`;
    document.getElementById("flow-top1-counter").textContent = `${buildDisplayShares(d).top1.toFixed(2)}%`;
  }

  const slider = document.getElementById("flow-year");
  const play = document.getElementById("flow-play");

  slider.addEventListener("input", () => updateFlow(Number(slider.value)));

  play.addEventListener("click", () => {
    if (flowTimer) {
      window.clearInterval(flowTimer);
      flowTimer = null;
      play.textContent = "Play";
      return;
    }

    play.textContent = "Pause";
    flowTimer = window.setInterval(() => {
      let y = Number(slider.value);
      y = y >= 2023 ? 1995 : y + 1;
      slider.value = String(y);
      updateFlow(y);
    }, 900);
  });

  updateFlow(1995);
}

function initRaceChart() {
  const svg = d3.select("#race-chart");
  const width = 980;
  const height = 260;
  const margin = { top: 22, right: 65, bottom: 35, left: 180 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  svg.attr("viewBox", `0 0 ${width} ${height}`);

  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([0, 80]).range([0, innerW]);
  const y = d3.scaleBand().domain([]).range([0, innerH]).padding(0.35);

  const xAxis = g.append("g").attr("class", "axis").attr("transform", `translate(0,${innerH})`).call(d3.axisBottom(x).ticks(8).tickFormat((d) => `${d}%`));
  const yAxis = g.append("g").attr("class", "axis");

  const layer = g.append("g");

  function frame(year, duration = 700) {
    const d = getYearData(year);
    if (!d) return;

    const rows = [
      { key: "Bottom 50%", value: clampPercent(d.bottom50), color: COLORS.bottom50 },
      { key: "Top 10%", value: clampPercent(d.top10), color: COLORS.top10 },
      { key: "Top 1%", value: clampPercent(d.top1), color: COLORS.top1 }
    ].sort((a, b) => b.value - a.value);

    y.domain(rows.map((r) => r.key));
    yAxis.transition().duration(duration).call(d3.axisLeft(y).tickSize(0));

    const bars = layer.selectAll("g.row").data(rows, (r) => r.key);
    const enter = bars.enter().append("g").attr("class", "row");
    enter.append("rect").attr("height", y.bandwidth()).attr("x", 0);
    enter.append("text").attr("class", "val").attr("dy", "0.35em").attr("font-size", 12).attr("fill", "#2b2f2b");

    const merged = enter.merge(bars);

    merged
      .transition()
      .duration(duration)
      .attr("transform", (r) => `translate(0,${y(r.key)})`);

    merged
      .select("rect")
      .transition()
      .duration(duration)
      .attr("width", (r) => x(r.value))
      .attr("height", y.bandwidth())
      .attr("fill", (r) => r.color);

    merged
      .select("text.val")
      .transition()
      .duration(duration)
      .attr("x", (r) => x(r.value) + 8)
      .attr("y", y.bandwidth() / 2)
      .text((r) => `${r.value.toFixed(2)}%`);

    bars.exit().remove();

    document.getElementById("race-year").textContent = String(year);
    xAxis.call(d3.axisBottom(x).ticks(8).tickFormat((v) => `${v}%`));
  }

  const speedInput = document.getElementById("race-speed");
  const speedLabel = document.getElementById("race-speed-label");
  const playBtn = document.getElementById("race-play");

  let raceYear = 1995;

  speedInput.addEventListener("input", () => {
    speedLabel.textContent = `${speedInput.value} ms`;
  });

  playBtn.addEventListener("click", () => {
    if (raceTimer) {
      window.clearInterval(raceTimer);
      raceTimer = null;
      playBtn.textContent = "Play";
      return;
    }

    const tick = () => {
      frame(raceYear, Math.max(120, Number(speedInput.value) - 120));
      raceYear = raceYear >= 2023 ? 1995 : raceYear + 1;
    };

    playBtn.textContent = "Pause";
    tick();
    raceTimer = window.setInterval(tick, Number(speedInput.value));
  });

  frame(1995, 0);
}

function initWealthStoryApp() {
  const storyYears = [1995, 2000, 2008, 2020, 2023];
  const transitionMs = 600;
  const ease = d3.easeCubicInOut;

  const chartSvg = d3.select("#story-main-chart");
  const tooltip = d3.select("#story-tooltip");
  const phase2Panel = document.getElementById("phase2-panel");
  const yearLabel = document.getElementById("story-current-year");
  const phase2YearSlider = document.getElementById("phase2-year");
  const phase2YearText = document.getElementById("phase2-year-label");
  const phase2Play = document.getElementById("phase2-play");
  const phase2View = document.getElementById("phase2-view");
  const compareButton = document.getElementById("phase2-compare");
  const compareWrap = document.getElementById("phase2-compare-wrap");
  const compareYearA = document.getElementById("compare-year-a");
  const compareYearB = document.getElementById("compare-year-b");

  let phase2Timer = null;
  let compareMode = false;
  let currentYear = 1995;
  let currentView = "diverging";
  const trendVisible = new Map([
    ["bottom50", true],
    ["top10", true],
    ["top1", true]
  ]);

  const years = d3.range(1995, 2024);

  d3.select("#story-legend").html(
    [
      legendItem(COLORS.bottom50, "Bottom 50%"),
      legendItem(COLORS.top10, "Top 10% (excl. Top 1%)"),
      legendItem(COLORS.top1, "Top 1%")
    ].join("")
  );

  d3.select(compareYearA)
    .selectAll("option")
    .data(years)
    .join("option")
    .attr("value", (d) => d)
    .text((d) => d);
  d3.select(compareYearB)
    .selectAll("option")
    .data(years)
    .join("option")
    .attr("value", (d) => d)
    .text((d) => d);
  compareYearA.value = "1995";
  compareYearB.value = "2023";

  function groupSeries(d, nonNegative = false) {
    const v = (x) => (nonNegative ? Math.max(0, x) : x);
    return [
      { key: "bottom50", label: "Bottom 50%", value: v(d.bottom50), color: COLORS.bottom50 },
      { key: "top10", label: "Top 10%", value: v(d.top10), color: COLORS.top10 },
      { key: "top1", label: "Top 1%", value: v(d.top1), color: COLORS.top1 }
    ];
  }

  function previousValue(year, key) {
    const prev = getYearData(year - 1);
    if (!prev) return null;
    return prev[key];
  }

  function showTooltip(event, year, item) {
    const prev = previousValue(year, item.key);
    const changeText = prev === null ? "n/a" : `${(item.value - prev >= 0 ? "+" : "")}${(item.value - prev).toFixed(2)} pp`;
    tooltip
      .style("display", "block")
      .style("left", `${event.pageX + 12}px`)
      .style("top", `${event.pageY - 16}px`)
      .html(`${item.label}<br>${item.value.toFixed(2)}%<br>Change vs prev year: ${changeText}`);
  }

  function hideTooltip() {
    tooltip.style("display", "none");
  }

  function drawDivergingBars(svg, year, width = 720, height = 420, compact = false) {
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove();

    const margin = compact
      ? { top: 20, right: 16, bottom: 34, left: 52 }
      : { top: 24, right: 20, bottom: 44, left: 120 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const row = getYearData(year);
    if (!row) return;

    const data = groupSeries(row, false);
    const maxAbs = Math.max(
      10,
      ...wealthSeries
        .filter((d) => d.year >= 1995 && d.year <= 2023)
        .flatMap((d) => [Math.abs(d.bottom50), Math.abs(d.top10), Math.abs(d.top1)])
    );
    const x = d3
      .scaleLinear()
      .domain([-Math.ceil(maxAbs / 5) * 5, Math.ceil(maxAbs / 5) * 5])
      .range([margin.left, margin.left + innerW]);
    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.top, margin.top + innerH])
      .padding(0.3);

    const g = svg.append("g");
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${margin.top + innerH + 2})`)
      .call(d3.axisBottom(x).ticks(9).tickFormat((v) => `${v}%`));
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSize(0));

    g.append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", margin.top - 6)
      .attr("y2", margin.top + innerH + 6)
      .attr("stroke", "#202124")
      .attr("stroke-width", 1.4)
      .attr("opacity", 0.6);

    if (!compact) {
      g.append("text")
        .attr("x", x(0) - 2)
        .attr("y", margin.top - 10)
        .attr("text-anchor", "end")
        .attr("fill", "#5f6368")
        .attr("font-size", 11)
        .text("Debt (left of zero)");
      g.append("text")
        .attr("x", x(0) + 2)
        .attr("y", margin.top - 10)
        .attr("text-anchor", "start")
        .attr("fill", "#5f6368")
        .attr("font-size", 11)
        .text("Positive wealth share (right of zero)");
    }

    g.selectAll("rect.story-div-bar")
      .data(data, (d) => d.key)
      .join("rect")
      .attr("class", "story-div-bar")
      .attr("y", (d) => y(d.label))
      .attr("height", y.bandwidth())
      .on("mousemove", (event, d) => showTooltip(event, year, d))
      .on("mouseleave", hideTooltip)
      .transition()
      .duration(transitionMs)
      .ease(ease)
      .attr("x", (d) => Math.min(x(0), x(d.value)))
      .attr("width", (d) => Math.abs(x(d.value) - x(0)))
      .attr("fill", (d) => d.color);

    g.selectAll("text.story-div-value")
      .data(data, (d) => d.key)
      .join("text")
      .attr("class", "story-div-value")
      .transition()
      .duration(transitionMs)
      .ease(ease)
      .attr("x", (d) => (d.value >= 0 ? x(d.value) + 8 : x(d.value) - 8))
      .attr("y", (d) => (y(d.label) || 0) + y.bandwidth() / 2 + 4)
      .attr("text-anchor", (d) => (d.value >= 0 ? "start" : "end"))
      .attr("fill", "#202124")
      .attr("font-size", compact ? 11 : 13)
      .text((d) => `${d.value.toFixed(2)}%`);

    if (!compact) {
      g.append("text")
        .attr("x", margin.left)
        .attr("y", margin.top + innerH + 34)
        .attr("fill", "#5f6368")
        .attr("font-size", 12)
        .text(`Year ${year} (Bottom 50% below zero means net debt)`);
    }
  }

  function renderTrendLine() {
    const svg = d3.select("#story-trend-line");
    const controls = d3.select("#story-trend-controls");
    const width = 980;
    const height = 320;
    const margin = { top: 18, right: 18, bottom: 36, left: 54 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;
    const series = wealthSeries.filter((d) => d.year >= 1995 && d.year <= 2023);

    svg.attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove();

    const x = d3.scaleLinear().domain([1995, 2023]).range([margin.left, margin.left + innerW]);
    const y = d3
      .scaleLinear()
      .domain([
        d3.min(series, (d) => Math.min(d.bottom50, d.top10, d.top1)) - 2,
        d3.max(series, (d) => Math.max(d.bottom50, d.top10, d.top1)) + 2
      ])
      .nice()
      .range([margin.top + innerH, margin.top]);

    const g = svg.append("g");
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${margin.top + innerH})`)
      .call(d3.axisBottom(x).tickValues([1995, 2000, 2008, 2010, 2020, 2023]).tickFormat(d3.format("d")));
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(8).tickFormat((v) => `${v}%`));
    g.append("line")
      .attr("x1", margin.left)
      .attr("x2", margin.left + innerW)
      .attr("y1", y(0))
      .attr("y2", y(0))
      .attr("stroke", "rgba(255,255,255,0.45)")
      .attr("stroke-dasharray", "3 3");

    const lines = [
      { key: "bottom50", label: "Bottom 50%", color: COLORS.bottom50 },
      { key: "top10", label: "Top 10%", color: COLORS.top10 },
      { key: "top1", label: "Top 1%", color: COLORS.top1 }
    ];
    const visibleLines = lines.filter((l) => trendVisible.get(l.key));

    controls.selectAll("*").remove();
    controls
      .selectAll("button.toggle")
      .data(lines)
      .join("button")
      .attr("type", "button")
      .attr("class", (l) => `story-trend-btn${trendVisible.get(l.key) ? "" : " off"}`)
      .style("border-color", (l) => l.color)
      .text((l) => l.label)
      .on("click", (_, l) => {
        trendVisible.set(l.key, !trendVisible.get(l.key));
        renderTrendLine();
      });
    controls
      .append("button")
      .attr("type", "button")
      .attr("class", "story-trend-btn")
      .text("Reset Lines")
      .on("click", () => {
        trendVisible.set("bottom50", true);
        trendVisible.set("top10", true);
        trendVisible.set("top1", true);
        renderTrendLine();
      });

    const lineGen = (key) =>
      d3
        .line()
        .curve(d3.curveMonotoneX)
        .x((d) => x(d.year))
        .y((d) => y(d[key]));

    g.selectAll("path.story-trend")
      .data(visibleLines, (l) => l.key)
      .join("path")
      .attr("class", "story-trend")
      .attr("d", (l) => lineGen(l.key)(series))
      .attr("fill", "none")
      .attr("stroke", (l) => l.color)
      .attr("stroke-width", 2.4);

    visibleLines.forEach((l, i) => {
      const end = series[series.length - 1];
      g.append("text")
        .attr("x", margin.left + innerW - 2)
        .attr("y", y(end[l.key]) - i * 14)
        .attr("text-anchor", "end")
        .attr("fill", l.color)
        .attr("font-size", 12)
        .text(`${l.label}: ${end[l.key].toFixed(1)}%`);
    });

    const hoverLine = g
      .append("line")
      .attr("stroke", "rgba(255,255,255,0.7)")
      .attr("stroke-dasharray", "4 4")
      .attr("y1", margin.top)
      .attr("y2", margin.top + innerH)
      .style("opacity", 0);

    const hoverDots = g
      .selectAll("circle.story-hover-dot")
      .data(visibleLines, (d) => d.key)
      .join("circle")
      .attr("class", "story-hover-dot")
      .attr("r", 4)
      .attr("fill", (d) => d.color)
      .style("opacity", 0);

    function setFocus(year, event) {
      const d = getYearData(year);
      if (!d) return;
      hoverLine.attr("x1", x(year)).attr("x2", x(year)).style("opacity", 1);
      hoverDots
        .attr("cx", x(year))
        .attr("cy", (l) => y(d[l.key]))
        .style("opacity", 1);

      const rows = visibleLines
        .map((l) => {
          const prev = previousValue(year, l.key);
          const delta = prev == null ? "n/a" : `${d[l.key] - prev >= 0 ? "+" : ""}${(d[l.key] - prev).toFixed(2)} pp`;
          return `${l.label}: ${d[l.key].toFixed(2)}% (${delta})`;
        })
        .join("<br>");
      tooltip
        .style("display", "block")
        .style("left", `${event.pageX + 12}px`)
        .style("top", `${event.pageY - 14}px`)
        .html(`Year ${year}<br>${rows}<br><em>Click to sync top chart</em>`);
    }

    g.append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", innerW)
      .attr("height", innerH)
      .attr("fill", "transparent")
      .on("mousemove", (event) => {
        const [mx] = d3.pointer(event);
        const year = Math.max(1995, Math.min(2023, Math.round(x.invert(mx))));
        setFocus(year, event);
      })
      .on("mouseleave", () => {
        hoverLine.style("opacity", 0);
        hoverDots.style("opacity", 0);
        hideTooltip();
      })
      .on("click", (event) => {
        const [mx] = d3.pointer(event);
        const year = Math.max(1995, Math.min(2023, Math.round(x.invert(mx))));
        renderMain(year, currentView);
      });
  }

  function drawTreemap(svg, year) {
    const width = 500;
    const height = 360;
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    const d = getYearData(year);
    if (!d) return;
    const groups = groupSeries(d, true);
    const root = d3
      .hierarchy({ children: groups.map((g) => ({ ...g })) })
      .sum((x) => x.value);
    d3.treemap().size([width, height]).padding(4)(root);
    const leaves = root.leaves();

    const blocks = svg.selectAll("g.story-tree-node").data(leaves, (n) => n.data.key).join((enter) => {
      const g = enter.append("g").attr("class", "story-tree-node");
      g.append("rect");
      g.append("text").attr("class", "tree-label");
      return g;
    });

    blocks
      .select("rect")
      .on("mousemove", (event, n) => showTooltip(event, year, n.data))
      .on("mouseleave", hideTooltip)
      .transition()
      .duration(transitionMs)
      .ease(ease)
      .attr("x", (n) => n.x0)
      .attr("y", (n) => n.y0)
      .attr("width", (n) => n.x1 - n.x0)
      .attr("height", (n) => n.y1 - n.y0)
      .attr("fill", (n) => n.data.color);

    blocks
      .select("text.tree-label")
      .transition()
      .duration(transitionMs)
      .ease(ease)
      .attr("x", (n) => n.x0 + 6)
      .attr("y", (n) => n.y0 + 18)
      .attr("fill", "#202124")
      .attr("font-size", 12)
      .text((n) => `${n.data.label} ${n.data.value.toFixed(1)}%`);
  }

  function drawStacked(svg, year) {
    const width = 760;
    const height = 180;
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    const d = getYearData(year);
    if (!d) return;
    const groups = groupSeries(d, true);
    const x = d3.scaleLinear().domain([0, 100]).range([0, width - 40]);
    let cursor = 20;
    const segments = groups.map((g) => {
      const w = x(g.value);
      const out = { ...g, x: cursor, w };
      cursor += w;
      return out;
    });

    svg
      .selectAll("rect.story-stack")
      .data(segments, (s) => s.key)
      .join("rect")
      .attr("class", "story-stack")
      .attr("y", 62)
      .attr("height", 54)
      .on("mousemove", (event, s) => showTooltip(event, year, s))
      .on("mouseleave", hideTooltip)
      .transition()
      .duration(transitionMs)
      .ease(ease)
      .attr("x", (s) => s.x)
      .attr("width", (s) => s.w)
      .attr("fill", (s) => s.color);

    svg
      .selectAll("text.story-stack-label")
      .data(segments, (s) => s.key)
      .join("text")
      .attr("class", "story-stack-label")
      .transition()
      .duration(transitionMs)
      .ease(ease)
      .attr("x", (s) => s.x + 6)
      .attr("y", 93)
      .attr("fill", "#202124")
      .attr("font-size", 12)
      .text((s) => `${s.label}: ${s.value.toFixed(1)}%`);
  }

  function renderMain(year, view) {
    currentYear = year;
    currentView = view;
    yearLabel.textContent = String(year);
    phase2YearText.textContent = String(year);
    phase2YearSlider.value = String(year);
    chartSvg.selectAll("*").remove();

    if (view === "diverging") {
      drawDivergingBars(chartSvg, year, 720, 420, false);
    } else if (view === "treemap") {
      drawTreemap(chartSvg, year);
    } else if (view === "stacked") {
      drawStacked(chartSvg, year);
    }
  }

  function renderCompare() {
    if (!compareMode) return;
    const yearA = Number(compareYearA.value);
    const yearB = Number(compareYearB.value);
    const svgA = d3.select("#compare-chart-a");
    const svgB = d3.select("#compare-chart-b");
    drawDivergingBars(svgA, yearA, 420, 300, true);
    drawDivergingBars(svgB, yearB, 420, 300, true);
  }

  function showPhase2() {
    phase2Panel.classList.add("active");
  }

  function activateStep(stepEl) {
    document.querySelectorAll(".story-step").forEach((node) => node.classList.remove("active"));
    stepEl.classList.add("active");
    const stepYear = Number(stepEl.getAttribute("data-story-year"));
    renderMain(stepYear, "diverging");
    if (stepYear === 2023) {
      showPhase2();
    }
  }

  function setupScroll() {
    const steps = d3.selectAll(".story-step");
    if (window.scrollama) {
      const scroller = window.scrollama();
      scroller
        .setup({
          step: ".story-step",
          offset: 0.5
        })
        .onStepEnter((resp) => {
          activateStep(resp.element);
        });
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) activateStep(entry.target);
          });
        },
        { threshold: 0.5 }
      );
      steps.nodes().forEach((node) => io.observe(node));
    }
  }

  phase2YearSlider.addEventListener("input", () => {
    renderMain(Number(phase2YearSlider.value), phase2View.value);
  });

  phase2View.addEventListener("change", () => {
    renderMain(Number(phase2YearSlider.value), phase2View.value);
  });

  phase2Play.addEventListener("click", () => {
    if (phase2Timer) {
      window.clearInterval(phase2Timer);
      phase2Timer = null;
      phase2Play.textContent = "Play";
      return;
    }
    phase2Play.textContent = "Pause";
    phase2Timer = window.setInterval(() => {
      let y = Number(phase2YearSlider.value);
      y = y >= 2023 ? 1995 : y + 1;
      renderMain(y, phase2View.value);
    }, 900);
  });

  compareButton.addEventListener("click", () => {
    compareMode = !compareMode;
    compareWrap.classList.toggle("active", compareMode);
    compareButton.textContent = compareMode ? "Exit Compare" : "Compare Two Years";
    renderCompare();
  });

  compareYearA.addEventListener("change", renderCompare);
  compareYearB.addEventListener("change", renderCompare);

  renderMain(1995, "diverging");
  renderTrendLine();
  setupScroll();
}

async function loadBillionaireData() {
  const rows = await d3.csv("./data/Billionaires.csv");
  billionaireData = rows
    .filter((r) => String(r["Country | Territory"]).trim() === "Sweden")
    .map((r) => ({
      rank: Number(r.Rank),
      name: r.Name,
      country: r["Country | Territory"],
      industry: r.Industry,
      source: r.Source,
      netWorthB: parseNetWorthToBillions(r["Net Worth"])
    }))
    .filter((d) => d.name && Number.isFinite(d.netWorthB))
    .sort((a, b) => b.netWorthB - a.netWorthB);
}

function initBillionaireViz() {
  const selector = document.getElementById("billionaire-view");
  const svg = d3.select("#billionaire-chart");
  const tooltip = d3.select("#billionaire-tooltip");
  if (!selector || !svg.node() || !billionaireData.length) return;

  function showTip(event, d) {
    tooltip
      .style("display", "block")
      .style("left", `${event.pageX + 12}px`)
      .style("top", `${event.pageY - 14}px`)
      .html(`<strong>${d.name}</strong><br>Net worth: $${d.netWorthB.toFixed(1)}B<br>${d.country} - ${d.industry}`);
  }

  function hideTip() {
    tooltip.style("display", "none");
  }

  function renderBar() {
    const width = 980;
    const height = 430;
    const margin = { top: 24, right: 24, bottom: 110, left: 64 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove();

    const x = d3
      .scaleBand()
      .domain(billionaireData.map((d) => d.name))
      .range([margin.left, margin.left + innerW])
      .padding(0.2);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(billionaireData, (d) => d.netWorthB) * 1.12])
      .nice()
      .range([margin.top + innerH, margin.top]);

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${margin.top + innerH})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-38)")
      .attr("text-anchor", "end")
      .attr("dx", "-0.6em")
      .attr("dy", "0.3em");

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(8).tickFormat((v) => `$${v}B`));

    svg
      .selectAll("rect.b-bar")
      .data(billionaireData, (d) => d.name)
      .join("rect")
      .attr("class", "b-bar")
      .attr("x", (d) => x(d.name))
      .attr("y", margin.top + innerH)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", "#5f74df")
      .on("mousemove", showTip)
      .on("mouseleave", hideTip)
      .transition()
      .duration(600)
      .attr("y", (d) => y(d.netWorthB))
      .attr("height", (d) => margin.top + innerH - y(d.netWorthB));

    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", margin.top - 6)
      .attr("fill", "#5f6368")
      .attr("font-size", 12)
      .text("All Swedish billionaires by net worth (billions USD)");
  }

  function renderPie() {
    const width = 820;
    const height = 480;
    const radius = Math.min(width, height) * 0.36;
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove();

    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2 + 8})`);
    const color = d3.scaleOrdinal(d3.schemeTableau10).domain(billionaireData.map((d) => d.name));
    const pie = d3.pie().value((d) => d.netWorthB).sort(null);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const labelArc = d3.arc().innerRadius(radius + 12).outerRadius(radius + 12);
    const arcs = g.selectAll("g.slice").data(pie(billionaireData)).join("g").attr("class", "slice");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.name))
      .attr("stroke", "#dadce0")
      .attr("stroke-width", 1)
      .on("mousemove", (event, d) => showTip(event, d.data))
      .on("mouseleave", hideTip);

    arcs
      .filter((d) => d.endAngle - d.startAngle > 0.22)
      .append("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", (d) => ((d.startAngle + d.endAngle) / 2 > Math.PI ? "end" : "start"))
      .attr("fill", "#5f6368")
      .attr("font-size", 11)
      .text((d) => d.data.name.split(" ")[0]);

    const total = d3.sum(billionaireData, (d) => d.netWorthB);
    g.append("text").attr("text-anchor", "middle").attr("fill", "#202124").attr("font-size", 16).attr("font-weight", 700).text(`$${total.toFixed(1)}B`);
    g.append("text").attr("text-anchor", "middle").attr("y", 18).attr("fill", "#5f6368").attr("font-size", 11).text("Total (Sweden)");
  }

  function render() {
    if (selector.value === "pie") {
      renderPie();
    } else {
      renderBar();
    }
  }

  selector.addEventListener("change", render);
  render();
}

async function loadWIDData() {
  const raw = await d3.text("./data/WID_data_SE.csv");
  const rows = d3.dsvFormat(";").parse(raw);

  const filtered = rows.filter(
    (r) =>
      r.variable === "shwealj992" &&
      ["p0p50", "p90p100", "p99p100"].includes(r.percentile) &&
      Number(r.year) >= 1990 &&
      Number(r.year) <= 2023
  );

  const grouped = d3.group(filtered, (r) => Number(r.year));

  wealthSeries = Array.from(grouped, ([year, items]) => {
    const byPct = new Map(items.map((it) => [it.percentile, Number(it.value) * 100]));
    return {
      year,
      bottom50: byPct.get("p0p50") ?? NaN,
      top10: byPct.get("p90p100") ?? NaN,
      top1: byPct.get("p99p100") ?? NaN
    };
  })
    .filter((d) => Number.isFinite(d.bottom50) && Number.isFinite(d.top10) && Number.isFinite(d.top1))
    .sort((a, b) => a.year - b.year);

  wealthSeries = wealthSeries.filter((d) => d.year >= 1995 && d.year <= 2023 || d.year === 1990);
  seriesByYear = new Map(wealthSeries.map((d) => [d.year, d]));
}

/* ══════════════════════════════════════════════════════════════════�?   Income Distribution visualisations  (income_SE dataset)
   ══════════════════════════════════════════════════════════════════�?*/

const INCOME_COLORS = {
  bottom50: "#4dabf7",
  top10ex:  "#fcc419",
  top1:     "#ff6b6b",
  other:    "#e0e0e0"
};

const INCOME_GROUPS = [
  { key: "bottom50", label: "Bottom 50%",  color: INCOME_COLORS.bottom50, pop: 50 },
  { key: "top10ex",  label: "Top 10% (excl. 1%)", color: INCOME_COLORS.top10ex, pop: 9 },
  { key: "top1",     label: "Top 1%",      color: INCOME_COLORS.top1, pop: 1 }
];

const POP_STROKE = { bottom50: 8, top10ex: 3, top1: 1.2 };

const INCOME_JUX_YEARS = [1980, 1990, 2000, 2010, 2023];

let incomeSeries = [];
let incomeByYear = new Map();
let incomeBarTimer = null;
let incomeWaffleTimer = null;

async function loadIncomeData() {
  const raw = await d3.text("./data/income_SE/WID_Data_25032026-101149.csv");
  const lines = raw.split("\n").slice(2);
  const parsed = [];
  for (const line of lines) {
    const [pct, yearStr, valStr] = line.split(";");
    if (!pct || !yearStr) continue;
    const year = Number(yearStr);
    const value = valStr ? Number(valStr.trim()) : NaN;
    if (Number.isFinite(year)) parsed.push({ pct: pct.trim(), year, value });
  }

  const grouped = d3.group(
    parsed.filter((r) => ["p90p100", "p99p100", "p0p50"].includes(r.pct) && Number.isFinite(r.value)),
    (r) => r.year
  );

  incomeSeries = Array.from(grouped, ([year, items]) => {
    const byPct = new Map(items.map((it) => [it.pct, it.value * 100]));
    const top10 = byPct.get("p90p100") ?? NaN;
    const top1 = byPct.get("p99p100") ?? NaN;
    const bottom50 = byPct.get("p0p50") ?? NaN;
    const top10ex = top10 - top1;
    return { year, bottom50, top10ex, top1 };
  })
    .filter((d) =>
      Number.isFinite(d.bottom50) &&
      Number.isFinite(d.top10ex) && Number.isFinite(d.top1)
    )
    .sort((a, b) => a.year - b.year);

  incomeSeries = incomeSeries.filter((d) => d.year >= 1980 && d.year <= 2023);
  incomeByYear = new Map(incomeSeries.map((d) => [d.year, d]));
}

function incomeTooltip() {
  return d3.select("#income-tooltip");
}

function showIncomeTip(event, html) {
  incomeTooltip()
    .style("display", "block")
    .style("left", `${event.pageX + 12}px`)
    .style("top", `${event.pageY - 14}px`)
    .html(html);
}

function hideIncomeTip() {
  incomeTooltip().style("display", "none");
}

function incomeRoundToCells(values) {
  const target = Math.round(d3.sum(values));
  const floors = values.map(Math.floor);
  let remain = target - d3.sum(floors);
  const fracs = values.map((v, i) => ({ i, frac: v - Math.floor(v) })).sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < fracs.length && remain > 0; k++) {
    floors[fracs[k].i] += 1;
    remain -= 1;
  }
  return floors;
}

/* ── Tab navigation ── */

function initIncomeTabs() {
  const tabs = document.querySelectorAll(".income-tab");
  const panels = document.querySelectorAll(".income-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`panel-${tab.dataset.tab}`).classList.add("active");
    });
  });
}

/* ── 1. Line Chart ── */

function renderIncomeLineChart() {
  const svg = d3.select("#income-line-chart");
  const width = 980, height = 440;
  const margin = { top: 24, right: 130, bottom: 40, left: 54 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  svg.attr("viewBox", `0 0 ${width} ${height}`).selectAll("*").remove();
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain(d3.extent(incomeSeries, (d) => d.year)).range([0, innerW]);
  const y = d3.scaleLinear()
    .domain([0, d3.max(incomeSeries, (d) => Math.max(d.bottom50, d.top10ex, d.top1)) + 3])
    .nice().range([innerH, 0]);

  g.append("g").attr("class", "axis").attr("transform", `translate(0,${innerH})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));
  g.append("g").attr("class", "axis").call(d3.axisLeft(y).tickFormat((v) => `${v}%`));

  INCOME_GROUPS.forEach((grp) => {
    const lineGen = d3.line().curve(d3.curveMonotoneX)
      .x((d) => x(d.year)).y((d) => y(d[grp.key]));

    g.append("path").datum(incomeSeries)
      .attr("fill", "none").attr("stroke", grp.color)
      .attr("stroke-width", POP_STROKE[grp.key])
      .attr("stroke-opacity", 0.8)
      .attr("d", lineGen);

    const last = incomeSeries[incomeSeries.length - 1];
    g.append("text")
      .attr("x", innerW + 6).attr("y", y(last[grp.key]))
      .attr("dy", "0.35em").attr("fill", grp.color).attr("font-size", 11)
      .text(`${grp.label}: ${last[grp.key].toFixed(1)}%`);
  });

  const hoverLine = g.append("line")
    .attr("stroke", "rgba(0,0,0,0.3)").attr("stroke-dasharray", "4 4")
    .attr("y1", 0).attr("y2", innerH).style("opacity", 0);

  g.append("rect").attr("width", innerW).attr("height", innerH).attr("fill", "transparent")
    .on("mousemove", (event) => {
      const [mx] = d3.pointer(event);
      const yr = Math.max(1980, Math.min(2023, Math.round(x.invert(mx))));
      const d = incomeByYear.get(yr);
      if (!d) return;
      hoverLine.attr("x1", x(yr)).attr("x2", x(yr)).style("opacity", 1);
      const rows = INCOME_GROUPS.map((g) => `${g.label} <span style="color:#9aa0a6">(${g.pop}% pop.)</span>: ${d[g.key].toFixed(2)}%`).join("<br>");
      showIncomeTip(event, `<strong>${yr}</strong><br>${rows}`);
    })
    .on("mouseleave", () => { hoverLine.style("opacity", 0); hideIncomeTip(); });
}

/* ── 2. Stacked Area Chart ── */

function renderIncomeStackedArea() {
  const svg = d3.select("#income-stacked-area");
  const width = 1100, height = 440;
  const margin = { top: 24, right: 220, bottom: 40, left: 60 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  svg.attr("viewBox", `0 0 ${width} ${height}`).selectAll("*").remove();
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const keys = INCOME_GROUPS.map((grp) => grp.key);
  const stack = d3.stack().keys(keys).order(d3.stackOrderNone).offset(d3.stackOffsetNone);
  const stacked = stack(incomeSeries);

  const x = d3.scaleLinear().domain(d3.extent(incomeSeries, (d) => d.year)).range([0, innerW]);
  const y = d3.scaleLinear().domain([0, 100]).range([innerH, 0]);
  const yTicks = d3.range(0, 101, 10);

  /* Horizontal gridlines */
  g.selectAll("line.hgrid").data(yTicks).join("line")
    .attr("class", "hgrid")
    .attr("x1", 0).attr("x2", innerW)
    .attr("y1", (v) => y(v)).attr("y2", (v) => y(v))
    .attr("stroke", "#e8eaed").attr("stroke-width", 0.8);

  /* Axes */
  g.append("g").attr("class", "axis").attr("transform", `translate(0,${innerH})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(10));
  g.append("g").attr("class", "axis")
    .call(d3.axisLeft(y).tickValues(yTicks).tickFormat((v) => `${v}%`));

  /* Stacked areas */
  const colorMap = new Map(INCOME_GROUPS.map((grp) => [grp.key, grp.color]));
  const areaGen = d3.area().curve(d3.curveMonotoneX)
    .x((d) => x(d.data.year)).y0((d) => y(d[0])).y1((d) => y(d[1]));

  g.selectAll("path.income-area")
    .data(stacked).join("path").attr("class", "income-area")
    .attr("d", areaGen)
    .attr("fill", (d) => colorMap.get(d.key))
    .attr("opacity", 0.85);

  /* Right-edge labels */
  stacked.forEach((layer) => {
    const last = layer[layer.length - 1];
    const mid = (last[0] + last[1]) / 2;
    const grp = INCOME_GROUPS.find((grp) => grp.key === layer.key);
    g.append("text")
      .attr("x", innerW + 6).attr("y", y(mid))
      .attr("dy", "0.35em").attr("fill", grp.color).attr("font-size", 11).attr("font-weight", 600)
      .text(grp.label);
  });

  /* Population bar: Top 1% → Top 9% → Bottom 50% → Middle 40% (from top) */
  const popCol = g.append("g").attr("transform", `translate(${innerW + 130}, 0)`);
  const popW = 30;
  popCol.append("text").attr("x", popW / 2).attr("y", -10)
    .attr("text-anchor", "middle").attr("fill", "#5f6368").attr("font-size", 10)
    .text("Population");

  const popSegs = [
    ...INCOME_GROUPS.slice().reverse().map((grp) => ({ label: `${grp.pop}%`, pop: grp.pop, color: grp.color })),
    { label: "40%", pop: 40, color: INCOME_COLORS.other, textColor: "#5f6368", opacity: 0.5 }
  ];
  let popY0 = 0;
  popSegs.forEach((seg) => {
    const h = (seg.pop / 100) * innerH;
    popCol.append("rect")
      .attr("x", 0).attr("y", popY0).attr("width", popW).attr("height", h)
      .attr("fill", seg.color).attr("opacity", seg.opacity ?? 0.7)
      .attr("stroke", "#fff").attr("stroke-width", 0.5);
    if (h > 14) {
      popCol.append("text")
        .attr("x", popW / 2).attr("y", popY0 + h / 2)
        .attr("dy", "0.35em").attr("text-anchor", "middle")
        .attr("fill", seg.textColor ?? "#202124").attr("font-size", 10)
        .text(seg.label);
    }
    popY0 += h;
  });

  /* Invisible overlay for tooltip */
  g.append("rect").attr("width", innerW).attr("height", innerH).attr("fill", "transparent")
    .on("mousemove", (event) => {
      const [mx] = d3.pointer(event);
      const yr = Math.max(1980, Math.min(2023, Math.round(x.invert(mx))));
      const d = incomeByYear.get(yr);
      if (!d) return;
      const rows = INCOME_GROUPS.map((grp) => `${grp.label}: ${d[grp.key].toFixed(1)}%`).join("<br>");
      showIncomeTip(event, `<strong>${yr}</strong><br>${rows}`);
    })
    .on("mouseleave", hideIncomeTip);
}

/* ── 3a. Bar Chart �?Juxtaposition (small multiples) ── */
/* Linked brushing: hovering a group highlights the same group in every card
   (Gleicher's juxtaposition + explicit encoding hybrid; Tominski's "mark" behaviour) */

function renderIncomeBarJux() {
  const root = d3.select("#income-bar-jux");
  root.selectAll("*").remove();

  INCOME_JUX_YEARS.forEach((year) => {
    const d = incomeByYear.get(year);
    if (!d) return;

    const card = root.append("div").attr("class", "income-sm-card");
    card.append("h4").text(String(year));

    const w = 300, h = 210;
    const margin = { top: 8, right: 50, bottom: 24, left: 10 };
    const innerW = w - margin.left - margin.right;
    const innerH = h - margin.top - margin.bottom;

    const svg = card.append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const totalPop = d3.sum(INCOME_GROUPS, (g) => g.pop);
    const popScale = d3.scaleLinear().domain([0, totalPop]).range([0, innerH]);
    const x = d3.scaleLinear().domain([0, 55]).range([0, innerW]);

    let cumY = 0;
    INCOME_GROUPS.forEach((grp) => {
      const val = d[grp.key];
      const barH = Math.max(popScale(grp.pop) - 3, 4);
      g.append("rect")
        .attr("y", cumY).attr("x", 0)
        .attr("width", x(val)).attr("height", barH)
        .attr("fill", grp.color).attr("rx", 3)
        .attr("class", `jux-bar jux-bar-${grp.key}`)
        .on("mouseenter", () => {
          root.selectAll(".jux-bar").attr("opacity", 0.25);
          root.selectAll(`.jux-bar-${grp.key}`).attr("opacity", 1);
        })
        .on("mouseleave", () => {
          root.selectAll(".jux-bar").attr("opacity", 1);
        });
      g.append("text")
        .attr("x", x(val) + 4).attr("y", cumY + barH / 2)
        .attr("dy", "0.35em").attr("fill", "#202124").attr("font-size", 10)
        .text(`${val.toFixed(1)}%`);
      cumY += popScale(grp.pop);
    });

    g.append("g").attr("class", "axis").attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(4).tickFormat((v) => `${v}%`));
  });
}

/* ── 3b. Bar Chart �?Superposition (grouped bars) ── */
/* Explicit encoding hybrid: dashed baseline reference lines from 1980 show
   computed differences �?Gleicher's "explicit encoding + juxtaposition" */

function renderIncomeBarSuper() {
  const svg = d3.select("#income-bar-super");
  const width = 980, height = 440;
  const margin = { top: 24, right: 20, bottom: 50, left: 54 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  svg.attr("viewBox", `0 0 ${width} ${height}`).selectAll("*").remove();
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const years = INCOME_JUX_YEARS;
  const baseline = incomeByYear.get(1980);
  const totalPop = d3.sum(INCOME_GROUPS, (g) => g.pop);
  const x0 = d3.scaleBand().domain(years).range([0, innerW]).paddingInner(0.2);
  const y = d3.scaleLinear().domain([0, 55]).nice().range([innerH, 0]);

  g.append("g").attr("class", "axis").attr("transform", `translate(0,${innerH})`)
    .call(d3.axisBottom(x0).tickFormat(d3.format("d")));
  g.append("g").attr("class", "axis").call(d3.axisLeft(y).tickFormat((v) => `${v}%`));

  years.forEach((year) => {
    const d = incomeByYear.get(year);
    if (!d) return;
    const yg = g.append("g").attr("transform", `translate(${x0(year)},0)`);

    const bandW = x0.bandwidth();
    const gap = 2;
    let cx = 0;
    INCOME_GROUPS.forEach((grp) => {
      const bw = Math.max((grp.pop / totalPop) * bandW - gap, 4);
      yg.append("rect")
        .attr("x", cx).attr("y", y(d[grp.key]))
        .attr("width", bw).attr("height", innerH - y(d[grp.key]))
        .attr("fill", grp.color).attr("rx", 2)
        .on("mousemove", (event) => {
          const delta = baseline ? (d[grp.key] - baseline[grp.key]).toFixed(2) : "n/a";
          const sign = baseline && d[grp.key] - baseline[grp.key] >= 0 ? "+" : "";
          showIncomeTip(event,
            `<strong>${year}</strong><br>${grp.label} (${grp.pop}% of pop.): ${d[grp.key].toFixed(2)}%<br>Change from 1980: ${sign}${delta} pp`);
        })
        .on("mouseleave", hideIncomeTip);

      if (baseline && year !== 1980) {
        yg.append("line")
          .attr("x1", cx).attr("x2", cx + bw)
          .attr("y1", y(baseline[grp.key])).attr("y2", y(baseline[grp.key]))
          .attr("stroke", "#202124").attr("stroke-width", 1.5)
          .attr("stroke-dasharray", "4 3").attr("opacity", 0.5);
      }
      cx += bw + gap;
    });
  });
}

/* ── 3c. Animated Bar Chart (racing horizontal bars) ── */

function initIncomeBarAnim() {
  const svg = d3.select("#income-bar-anim");
  const width = 700, height = 340;
  const margin = { top: 24, right: 70, bottom: 34, left: 160 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  svg.attr("viewBox", `0 0 ${width} ${height}`).selectAll("*").remove();
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const totalPop = d3.sum(INCOME_GROUPS, (g) => g.pop);
  const popScale = d3.scaleLinear().domain([0, totalPop]).range([0, innerH]);
  const x = d3.scaleLinear().domain([0, 55]).range([0, innerW]);

  const barLayout = [];
  let cumY = 0;
  INCOME_GROUPS.forEach((grp) => {
    const h = Math.max(popScale(grp.pop) - 4, 6);
    barLayout.push({ ...grp, barY: cumY, barH: h });
    cumY += popScale(grp.pop);
  });

  const xAxisG = g.append("g").attr("class", "axis").attr("transform", `translate(0,${innerH})`)
    .call(d3.axisBottom(x).ticks(6).tickFormat((v) => `${v}%`));

  barLayout.forEach((bl) => {
    g.append("text")
      .attr("x", -6).attr("y", bl.barY + bl.barH / 2)
      .attr("dy", "0.35em").attr("text-anchor", "end")
      .attr("fill", "#202124").attr("font-size", 11)
      .text(`${bl.label} (${bl.pop}%)`);
  });

  const bars = g.selectAll("rect.inc-bar")
    .data(barLayout, (d) => d.key).join("rect").attr("class", "inc-bar")
    .attr("y", (d) => d.barY).attr("height", (d) => d.barH).attr("rx", 3);

  const labels = g.selectAll("text.inc-val")
    .data(barLayout, (d) => d.key).join("text").attr("class", "inc-val")
    .attr("dy", "0.35em").attr("fill", "#202124").attr("font-size", 12);

  function frame(year) {
    const d = incomeByYear.get(year);
    if (!d) return;
    document.getElementById("income-bar-year-label").textContent = String(year);
    document.getElementById("income-bar-year").value = String(year);

    bars.transition().duration(400)
      .attr("x", 0).attr("width", (grp) => x(d[grp.key]))
      .attr("fill", (grp) => grp.color);
    labels.transition().duration(400)
      .attr("x", (grp) => x(d[grp.key]) + 6)
      .attr("y", (grp) => grp.barY + grp.barH / 2)
      .text((grp) => `${d[grp.key].toFixed(1)}%`);
  }

  const slider = document.getElementById("income-bar-year");
  const playBtn = document.getElementById("income-bar-play");
  const speedSlider = document.getElementById("income-bar-speed");
  const speedLabel = document.getElementById("income-bar-speed-label");
  const stepBack = document.getElementById("income-bar-step-back");
  const stepFwd = document.getElementById("income-bar-step-fwd");

  function nextYear(yr) { yr = yr >= 2023 ? 1980 : yr + 1; while (!incomeByYear.has(yr) && yr < 2023) yr++; return yr; }
  function prevYear(yr) { yr = yr <= 1980 ? 2023 : yr - 1; while (!incomeByYear.has(yr) && yr > 1980) yr--; return yr; }

  slider.addEventListener("input", () => frame(Number(slider.value)));
  speedSlider.addEventListener("input", () => {
    speedLabel.textContent = `${speedSlider.value}ms`;
    if (incomeBarTimer) { clearInterval(incomeBarTimer); incomeBarTimer = setInterval(tick, Number(speedSlider.value)); }
  });
  stepBack.addEventListener("click", () => frame(prevYear(Number(slider.value))));
  stepFwd.addEventListener("click", () => frame(nextYear(Number(slider.value))));

  function tick() { frame(nextYear(Number(slider.value))); }

  playBtn.addEventListener("click", () => {
    if (incomeBarTimer) {
      clearInterval(incomeBarTimer);
      incomeBarTimer = null;
      playBtn.textContent = "Play";
      return;
    }
    playBtn.textContent = "Pause";
    incomeBarTimer = setInterval(tick, Number(speedSlider.value));
  });

  frame(1980);
}

/* ── 4. Waffle helpers ── */

function buildWaffleCells(size, padding, cellSize) {
  return d3.range(100).map((i) => {
    const col = i % 10;
    const row = Math.floor(i / 10);
    return { i, x: padding + col * cellSize, y: padding + (9 - row) * cellSize };
  });
}

/** One horizontal strip: segment widths = exact population % (Top 1% visible). */
function incomeAppendPopulationShareLine(svgParent, x, y, innerWidth, barH) {
  const segs = [
    { pop: 50, color: INCOME_COLORS.bottom50 },
    { pop: 40, color: INCOME_COLORS.other },
    { pop: 9, color: INCOME_COLORS.top10ex },
    { pop: 1, color: INCOME_COLORS.top1 }
  ];
  let cx = x;
  segs.forEach((s) => {
    const w = (s.pop / 100) * innerWidth;
    svgParent.append("rect")
      .attr("x", cx).attr("y", y)
      .attr("width", Math.max(w, 0.25)).attr("height", barH)
      .attr("fill", s.color).attr("rx", 2)
      .attr("stroke", "#dadce0").attr("stroke-width", 0.5);
    cx += w;
  });
}

function wafflePopFillOrder() {
  return (cellIdx) => {
    if (cellIdx < 1) return INCOME_COLORS.top1;
    if (cellIdx < 10) return INCOME_COLORS.top10ex;
    if (cellIdx < 50) return INCOME_COLORS.other;
    return INCOME_COLORS.bottom50;
  };
}

function waffleFillOrder(d) {
  const counts = incomeRoundToCells([d.top1, d.top10ex, d.bottom50]);
  const colored = counts[0] + counts[1] + counts[2];
  return (cellIdx) => {
    if (cellIdx < counts[0]) return INCOME_COLORS.top1;
    if (cellIdx < counts[0] + counts[1]) return INCOME_COLORS.top10ex;
    if (cellIdx < colored) return INCOME_COLORS.bottom50;
    return INCOME_COLORS.other;
  };
}

/* ── 5. Waffle �?Juxtaposition (one grid per group, side by side) ── */

function renderIncomeWaffleJux() {
  const root = d3.select("#income-waffle-jux");
  root.selectAll("*").remove();

  INCOME_JUX_YEARS.forEach((year) => {
    const d = incomeByYear.get(year);
    if (!d) return;

    const row = root.append("div").attr("class", "waffle-jux-row");
    row.append("h3").text(String(year)).style("width", "100%").style("margin", "0.6rem 0 0.2rem")
      .style("font-size", "1rem").style("color", "#202124");

    const groupCells = [
      { label: "Bottom 50%", count: Math.round(d.bottom50), color: INCOME_COLORS.bottom50, pop: 50 },
      { label: "Top 10% (excl. 1%)", count: Math.round(d.top10ex), color: INCOME_COLORS.top10ex, pop: 9 },
      { label: "Top 1%", count: Math.round(d.top1), color: INCOME_COLORS.top1, pop: 1 }
    ];

    groupCells.forEach((grp) => {
      const card = row.append("div").attr("class", "income-sm-card");
      card.append("h4").text(grp.label);

      const size = 220, padding = 6;
      const svgEl = card.append("svg").attr("viewBox", `0 0 ${size} ${size / 2 + padding + 8}`);

      const halfSize = (size - padding * 2) / 2;
      const halfCell = halfSize / 10;
      const incG = svgEl.append("g").attr("transform", `translate(0,0)`);
      const popG = svgEl.append("g").attr("transform", `translate(${halfSize + padding + 4},0)`);

      /* Income share mini-waffle (left) */
      incG.append("text").attr("x", padding + halfSize / 2).attr("y", padding - 1)
        .attr("text-anchor", "middle").attr("font-size", 7).attr("fill", "#9aa0a6")
        .text("Income");
      for (let i = 0; i < 100; i++) {
        const col = i % 10, r = Math.floor(i / 10);
        incG.append("rect")
          .attr("x", padding + col * halfCell).attr("y", padding + 4 + (9 - r) * halfCell)
          .attr("width", halfCell - 1).attr("height", halfCell - 1).attr("rx", 1.5)
          .attr("fill", i < grp.count ? grp.color : INCOME_COLORS.other)
          .attr("stroke", "#dadce0").attr("stroke-width", 0.3);
      }

      /* Population share mini-waffle (right) */
      popG.append("text").attr("x", halfSize / 2).attr("y", padding - 1)
        .attr("text-anchor", "middle").attr("font-size", 7).attr("fill", "#9aa0a6")
        .text("Population");
      for (let i = 0; i < 100; i++) {
        const col = i % 10, r = Math.floor(i / 10);
        popG.append("rect")
          .attr("x", col * halfCell).attr("y", 4 + (9 - r) * halfCell)
          .attr("width", halfCell - 1).attr("height", halfCell - 1).attr("rx", 1.5)
          .attr("fill", i < grp.pop ? grp.color : INCOME_COLORS.other)
          .attr("stroke", "#dadce0").attr("stroke-width", 0.3);
      }

      card.append("p").style("text-align", "center").style("margin", "0.2rem 0 0")
        .style("font-size", "0.75rem").style("color", "#5f6368")
        .text(`Income: ${grp.count}% · Population: ${grp.pop}%`);
    });
  });
}

/* ── 6. Waffle �?Superposition (all groups in one grid, 5 years side by side) ── */

function renderIncomeWaffleSuper() {
  const root = d3.select("#income-waffle-super");
  root.selectAll("*").remove();

  INCOME_JUX_YEARS.forEach((year) => {
    const d = incomeByYear.get(year);
    if (!d) return;

    const card = root.append("div").attr("class", "income-sm-card");
    card.append("h4").text(String(year));

    const size = 260, padding = 8, cellSize = (size - padding * 2) / 10;
    const totalH = size + 46;
    const svgEl = card.append("svg").attr("viewBox", `0 0 ${size} ${totalH}`);
    const cells = buildWaffleCells(size, padding, cellSize);
    const colorFn = waffleFillOrder(d);

    svgEl.append("text").attr("x", size / 2).attr("y", 8)
      .attr("text-anchor", "middle").attr("font-size", 9).attr("fill", "#9aa0a6").text("Income share");

    svgEl.selectAll("rect.inc-w")
      .data(cells).join("rect").attr("class", "inc-w")
      .attr("x", (c) => c.x).attr("y", (c) => c.y)
      .attr("width", cellSize - 2).attr("height", cellSize - 2)
      .attr("rx", 3)
      .attr("fill", (c) => colorFn(c.i))
      .attr("stroke", "#dadce0").attr("stroke-width", 0.5);

    /* Population strip (1 row below) */
    const stripY = size + 6;
    svgEl.append("text").attr("x", size / 2).attr("y", stripY - 2)
      .attr("text-anchor", "middle").attr("font-size", 9).attr("fill", "#9aa0a6").text("Population share");
    incomeAppendPopulationShareLine(svgEl, padding, stripY + 2, size - 2 * padding, 14);
  });
}

/* ── 7. Waffle �?Animation ── */

function initIncomeWaffleAnim() {
  const svg = d3.select("#income-waffle-anim");
  const size = 440, padding = 20, cellSize = (size - padding * 2) / 10;
  const totalH = size + 56;

  svg.attr("viewBox", `0 0 ${size} ${totalH}`).selectAll("*").remove();

  svg.append("text").attr("x", size / 2).attr("y", 14)
    .attr("text-anchor", "middle").attr("font-size", 11).attr("fill", "#9aa0a6").text("Income share");

  /* Static population strip at bottom */
  const popStripY = size + 10;
  svg.append("text").attr("x", size / 2).attr("y", popStripY - 2)
    .attr("text-anchor", "middle").attr("font-size", 11).attr("fill", "#9aa0a6").text("Population share");
  incomeAppendPopulationShareLine(svg, padding, popStripY + 4, size - 2 * padding, 16);
  const cells = buildWaffleCells(size, padding, cellSize);

  svg.selectAll("rect.w-cell")
    .data(cells).join("rect").attr("class", "w-cell")
    .attr("x", (c) => c.x).attr("y", (c) => c.y)
    .attr("width", cellSize - 3).attr("height", cellSize - 3)
    .attr("rx", 4).attr("fill", "#e8eaed")
    .attr("stroke", "#dadce0").attr("stroke-width", 0.5);

  function frame(year) {
    const d = incomeByYear.get(year);
    if (!d) return;
    document.getElementById("income-waffle-year-label").textContent = String(year);
    document.getElementById("income-waffle-year").value = String(year);
    const colorFn = waffleFillOrder(d);
    svg.selectAll("rect.w-cell").data(cells)
      .transition().duration(350)
      .attr("fill", (c) => colorFn(c.i));
  }

  const slider = document.getElementById("income-waffle-year");
  const playBtn = document.getElementById("income-waffle-play");
  const speedSlider = document.getElementById("income-waffle-speed");
  const speedLabel = document.getElementById("income-waffle-speed-label");
  const stepBack = document.getElementById("income-waffle-step-back");
  const stepFwd = document.getElementById("income-waffle-step-fwd");

  function nextYear(yr) { yr = yr >= 2023 ? 1980 : yr + 1; while (!incomeByYear.has(yr) && yr < 2023) yr++; return yr; }
  function prevYear(yr) { yr = yr <= 1980 ? 2023 : yr - 1; while (!incomeByYear.has(yr) && yr > 1980) yr--; return yr; }

  slider.addEventListener("input", () => frame(Number(slider.value)));
  speedSlider.addEventListener("input", () => {
    speedLabel.textContent = `${speedSlider.value}ms`;
    if (incomeWaffleTimer) { clearInterval(incomeWaffleTimer); incomeWaffleTimer = setInterval(tick, Number(speedSlider.value)); }
  });
  stepBack.addEventListener("click", () => frame(prevYear(Number(slider.value))));
  stepFwd.addEventListener("click", () => frame(nextYear(Number(slider.value))));

  function tick() { frame(nextYear(Number(slider.value))); }

  playBtn.addEventListener("click", () => {
    if (incomeWaffleTimer) {
      clearInterval(incomeWaffleTimer);
      incomeWaffleTimer = null;
      playBtn.textContent = "Play";
      return;
    }
    playBtn.textContent = "Pause";
    incomeWaffleTimer = setInterval(tick, Number(speedSlider.value));
  });

  frame(1980);
}

/* ── Income legend ── */

function initIncomeLegend() {
  document.getElementById("income-legend").innerHTML = INCOME_GROUPS
    .map((g) => legendItem(g.color, g.label)).join("")
    + legendItem(INCOME_COLORS.other, "Other (Middle 40%)");
}

/* ── Bootstrap Income ── */

function initIncomeViz() {
  initIncomeTabs();
  initIncomeLegend();
  renderIncomeLineChart();
  renderIncomeStackedArea();
  renderIncomeBarJux();
  renderIncomeBarSuper();
  initIncomeBarAnim();
  renderIncomeWaffleJux();
  renderIncomeWaffleSuper();
  initIncomeWaffleAnim();
}

/* ══════════════════════════════════════════════════════════════════�?   NET WEALTH COMPARISON  (Data_AverageWealth)
   Average net wealth per person (SEK) by percentile group
   ══════════════════════════════════════════════════════════════════�?*/

const W_GROUPS = [
  { key: "bottom50",  label: "Bottom 50%",      color: "#4dabf7", pop: 50 },
  { key: "top10",     label: "Top 10%",          color: "#fcc419", pop: 10 },
  { key: "top1",      label: "Top 1%",           color: "#ff8787", pop: 1 },
  { key: "top01",     label: "Top 0.1%",         color: "#e599f7", pop: 0.1 },
  { key: "top001",    label: "Top 0.01%",        color: "#ff6b6b", pop: 0.01 },
  { key: "top0001",   label: "Top 0.001%",       color: "#c92a2a", pop: 0.001 }
];

const W_JUX_YEARS = [1980, 1990, 2000, 2010, 2024];

const wPopStroke = d3.scaleSqrt().domain([0.001, 50]).range([0.6, 6]);

/** Horizontal bar rows: height �?√population share. */
function wPropLayout(iH) {
  const gap = 4;
  const totalGap = gap * (W_GROUPS.length - 1);
  const sqrts = W_GROUPS.map((g) => Math.sqrt(g.pop));
  const totalSqrt = d3.sum(sqrts);
  const usable = Math.max(0, iH - totalGap);
  let y0 = 0;
  return W_GROUPS.map((g, i) => {
    const h = (sqrts[i] / totalSqrt) * usable;
    const row = { key: g.key, grp: g, y: y0, h };
    y0 += h + gap;
    return row;
  });
}

let wAvgSeries = [];
let wAvgByYear = new Map();
let wealthBarTimer = null;

async function loadWealthData() {
  const raw = await d3.text("./data/wealth_avg.csv");
  const lines = raw.split("\n");
  const header = lines[0].split(",");
  const keyMap = {
    "Bottom 50": "bottom50", "Middle 40": "mid40",
    "Top 10": "top10", "Top 1": "top1", "Top 0.1": "top01",
    "Top 0.01": "top001", "Top 0.001": "top0001"
  };

  wAvgSeries = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    if (cols.length < header.length) continue;
    const year = Number(cols[0]);
    if (!Number.isFinite(year)) continue;
    const d = { year };
    let valid = true;
    for (let c = 1; c < header.length; c++) {
      const k = keyMap[header[c].trim()];
      if (!k) continue;
      const v = Number(cols[c]);
      if (!Number.isFinite(v)) { valid = false; break; }
      d[k] = v;
    }
    if (valid && d.bottom50 !== undefined) wAvgSeries.push(d);
  }
  wAvgSeries.sort((a, b) => a.year - b.year);
  wAvgByYear = new Map(wAvgSeries.map((d) => [d.year, d]));
}

let iAvgSeries = [];
let iAvgByYear = new Map();

async function loadIncomeAvgData() {
  const raw = await d3.text("./data/income_avg.csv");
  const lines = raw.split("\n");
  const header = lines[0].split(",");
  const keyMap = {
    "Bottom 50": "bottom50", "Middle 40": "mid40",
    "Top 10": "top10", "Top 1": "top1", "Top 0.1": "top01",
    "Top 0.01": "top001", "Top 0.001": "top0001"
  };
  iAvgSeries = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    if (cols.length < 2) continue;
    const year = Number(cols[0]);
    if (!Number.isFinite(year)) continue;
    const d = { year };
    for (let c = 1; c < header.length; c++) {
      const k = keyMap[header[c].trim()];
      if (!k) continue;
      d[k] = Number(cols[c]) || 0;
    }
    if (d.bottom50 !== undefined) iAvgSeries.push(d);
  }
  iAvgSeries.sort((a, b) => a.year - b.year);
  iAvgByYear = new Map(iAvgSeries.map((d) => [d.year, d]));
}

function wTooltip() { return d3.select("#wealth-tooltip"); }
function showWTip(event, html) {
  wTooltip().style("display", "block")
    .style("left", `${event.pageX + 12}px`)
    .style("top", `${event.pageY - 14}px`)
    .html(html);
}
function hideWTip() { wTooltip().style("display", "none"); }

function fmtSEK(v) {
  const abs = Math.abs(v);
  if (abs >= 1e9) return (v / 1e9).toFixed(1) + "B";
  if (abs >= 1e6) return (v / 1e6).toFixed(1) + "M";
  if (abs >= 1e3) return (v / 1e3).toFixed(0) + "K";
  return v.toFixed(0);
}

function fmtSEKExact(v) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(v);
}

function fmtPctExact(v) {
  if (v >= 1) return `${v}%`;
  if (v >= 0.1) return `${v.toFixed(1)}%`;
  if (v >= 0.01) return `${v.toFixed(2)}%`;
  return `${v.toFixed(3)}%`;
}

function fmtSEKAxis(v) {
  const abs = Math.abs(v);
  const fmt = (scaled, suffix) => {
    const s = scaled.toFixed(scaled >= 10 ? 0 : 1);
    return (s.endsWith(".0") ? s.slice(0, -2) : s) + suffix;
  };
  if (abs >= 1e9) return fmt(v / 1e9, "B");
  if (abs >= 1e6) return fmt(v / 1e6, "M");
  if (abs >= 1e3) return fmt(v / 1e3, "K");
  return `${Math.round(v)}`;
}

function cwiTooltip() { return d3.select("#cwi-tooltip"); }
function showCwiTip(event, html) {
  cwiTooltip().style("display", "block")
    .style("left", `${event.pageX + 12}px`)
    .style("top", `${event.pageY - 14}px`)
    .html(html);
}
function hideCwiTip() { cwiTooltip().style("display", "none"); }

/* ── Wealth tab navigation ── */

function initWealthTabs() {
  const tabs = document.querySelectorAll("#wealth-tabs-nav .income-tab");
  const panels = document.querySelectorAll("#wealth-panel-wrap .income-panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`wpanel-${tab.dataset.wtab}`).classList.add("active");
    });
  });
}

function initWealthLegend() {
  document.getElementById("wealth-legend").innerHTML = W_GROUPS
    .map((g) => legendItem(g.color, g.label)).join("");
}

/* ── W1. Line Chart �?Split Tier ── */
/* Upper panel: Top 0.001% and Top 0.01%  (billions range)
   Lower panel: remaining 5 groups        (millions/thousands range)
   Each tier gets its own y-axis so all lines are readable. */

const W_UPPER = W_GROUPS.filter((g) => ["top0001", "top001"].includes(g.key));
const W_LOWER = W_GROUPS.filter((g) => !["top0001", "top001"].includes(g.key));

function drawWealthTier(svgSel, groups, titleText, showXAxis) {
  const width = 1020, height = 260;
  const margin = { top: 28, right: 170, bottom: showXAxis ? 36 : 10, left: 80 };
  const iW = width - margin.left - margin.right;
  const iH = height - margin.top - margin.bottom;

  svgSel.attr("viewBox", `0 0 ${width} ${height}`).selectAll("*").remove();
  const g = svgSel.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain(d3.extent(wAvgSeries, (d) => d.year)).range([0, iW]);
  const allVals = wAvgSeries.flatMap((d) => groups.map((gr) => d[gr.key]));
  const yMin = d3.min(allVals);
  const yMax = d3.max(allVals);
  const pad = (yMax - yMin) * 0.08;
  const y = d3.scaleLinear().domain([yMin - pad, yMax + pad]).nice().range([iH, 0]);

  if (showXAxis) {
    g.append("g").attr("class", "axis").attr("transform", `translate(0,${iH})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));
  }
  g.append("g").attr("class", "axis").call(d3.axisLeft(y).tickFormat((v) => fmtSEK(v)));

  if (yMin < 0 && yMax > 0) {
    g.append("line").attr("x1", 0).attr("x2", iW)
      .attr("y1", y(0)).attr("y2", y(0))
      .attr("stroke", "#9aa0a6").attr("stroke-dasharray", "4 3").attr("opacity", 0.5);
  }

  g.append("text").attr("x", 4).attr("y", -12)
    .attr("fill", "#5f6368").attr("font-size", 11).attr("font-weight", 600)
    .text(titleText);

  groups.forEach((grp) => {
    const lineGen = d3.line().curve(d3.curveMonotoneX)
      .x((d) => x(d.year)).y((d) => y(d[grp.key]));
    g.append("path").datum(wAvgSeries)
      .attr("fill", "none").attr("stroke", grp.color)
      .attr("stroke-width", wPopStroke(grp.pop)).attr("stroke-linecap", "round")
      .attr("stroke-opacity", 0.85).attr("d", lineGen);

    const last = wAvgSeries[wAvgSeries.length - 1];
    g.append("text").attr("x", iW + 6).attr("y", y(last[grp.key]))
      .attr("dy", "0.35em").attr("fill", grp.color).attr("font-size", 10)
      .text(`${grp.label}: ${fmtSEK(last[grp.key])}`);
  });

  const hoverLine = g.append("line")
    .attr("stroke", "rgba(0,0,0,0.3)").attr("stroke-dasharray", "4 4")
    .attr("y1", 0).attr("y2", iH).style("opacity", 0);

  g.append("rect").attr("width", iW).attr("height", iH).attr("fill", "transparent")
    .on("mousemove", (event) => {
      const [mx] = d3.pointer(event);
      const yr = Math.round(x.invert(mx));
      const d = wAvgByYear.get(yr);
      if (!d) return;
      hoverLine.attr("x1", x(yr)).attr("x2", x(yr)).style("opacity", 1);
      const rows = groups.map((g) => `${g.label}: ${fmtSEK(d[g.key])} SEK`).join("<br>");
      showWTip(event, `<strong>${yr}</strong><br>${rows}`);
    })
    .on("mouseleave", () => { hoverLine.style("opacity", 0); hideWTip(); });
}

function renderWealthLineChart() {
  drawWealthTier(d3.select("#wealth-line-upper"), W_UPPER,
    "Upper tier �?Top 0.01% & Top 0.001% (billions SEK)", false);
  drawWealthTier(d3.select("#wealth-line-lower"), W_LOWER,
    "Lower tier �?Bottom 50% to Top 0.1% (thousands to millions SEK)", true);
}

/* ── W1b. Small Multiples �?one mini-chart per group ── */

function renderWealthSmallMultiples() {
  const root = d3.select("#wealth-sm");
  root.selectAll("*").remove();

  W_GROUPS.forEach((grp) => {
    const card = root.append("div").attr("class", "income-sm-card");
    card.append("h4").text(grp.label);

    const w = 280, h = 170;
    const margin = { top: 10, right: 8, bottom: 24, left: 56 };
    const iW = w - margin.left - margin.right;
    const iH = h - margin.top - margin.bottom;

    const svg = card.append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain(d3.extent(wAvgSeries, (d) => d.year)).range([0, iW]);
    const vals = wAvgSeries.map((d) => d[grp.key]);
    const yMin = d3.min(vals), yMax = d3.max(vals);
    const pad = (yMax - yMin) * 0.1 || Math.abs(yMax) * 0.1;
    const y = d3.scaleLinear().domain([yMin - pad, yMax + pad]).nice().range([iH, 0]);

    g.append("g").attr("class", "axis").attr("transform", `translate(0,${iH})`)
      .call(d3.axisBottom(x).ticks(4).tickFormat(d3.format("d")));
    g.append("g").attr("class", "axis")
      .call(d3.axisLeft(y).ticks(4).tickFormat((v) => fmtSEK(v)));

    if (yMin < 0 && yMax > 0) {
      g.append("line").attr("x1", 0).attr("x2", iW)
        .attr("y1", y(0)).attr("y2", y(0))
        .attr("stroke", "#9aa0a6").attr("stroke-dasharray", "3 3").attr("opacity", 0.5);
    }

    const lineGen = d3.line().curve(d3.curveMonotoneX)
      .x((d) => x(d.year)).y((d) => y(d[grp.key]));
    g.append("path").datum(wAvgSeries)
      .attr("fill", "none").attr("stroke", grp.color)
      .attr("stroke-width", wPopStroke(grp.pop)).attr("stroke-linecap", "round")
      .attr("d", lineGen);

    const area = d3.area().curve(d3.curveMonotoneX)
      .x((d) => x(d.year))
      .y0(yMin < 0 ? y(0) : iH)
      .y1((d) => y(d[grp.key]));
    g.append("path").datum(wAvgSeries)
      .attr("fill", grp.color).attr("opacity", 0.12).attr("d", area);

    const last = wAvgSeries[wAvgSeries.length - 1];
    card.append("p").style("text-align", "center").style("margin", "0.2rem 0 0")
      .style("font-size", "0.75rem").style("color", "#5f6368")
      .text(`2024: ${fmtSEK(last[grp.key])} SEK · Pop: ${grp.pop}%`);
  });
}

/* ── W2. Bar �?Juxtaposition (small multiples) ── */

function renderWealthBarJux() {
  const root = d3.select("#wealth-bar-jux");
  root.selectAll("*").remove();

  W_JUX_YEARS.forEach((year) => {
    const d = wAvgByYear.get(year);
    if (!d) return;

    const card = root.append("div").attr("class", "income-sm-card");
    card.append("h4").text(String(year));

    const w = 340, h = 280;
    const margin = { top: 8, right: 60, bottom: 24, left: 10 };
    const iW = w - margin.left - margin.right;
    const iH = h - margin.top - margin.bottom;

    const svg = card.append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const layout = wPropLayout(iH);
    const vals = W_GROUPS.map((g) => d[g.key]);
    const xMax = d3.max(vals.filter((v) => v > 0));
    const xMin = d3.min(vals.filter((v) => v < 0)) || 0;
    const x = d3.scaleSymlog().constant(1e6).domain([xMin * 1.1, xMax * 1.05]).range([0, iW]);

    g.append("line").attr("x1", x(0)).attr("x2", x(0))
      .attr("y1", 0).attr("y2", iH)
      .attr("stroke", "#9aa0a6").attr("stroke-width", 1);

    layout.forEach((row) => {
      const grp = row.grp;
      const val = d[grp.key];
      const bx = val >= 0 ? x(0) : x(val);
      const bwidth = Math.abs(x(val) - x(0));
      g.append("rect")
        .attr("y", row.y).attr("x", bx)
        .attr("width", Math.max(bwidth, 2)).attr("height", row.h)
        .attr("fill", grp.color).attr("rx", 2).attr("opacity", 0.85);
      g.append("text")
        .attr("x", val >= 0 ? x(val) + 3 : x(val) - 3)
        .attr("y", row.y + row.h / 2)
        .attr("dy", "0.35em").attr("text-anchor", val >= 0 ? "start" : "end")
        .attr("fill", "#202124").attr("font-size", 9)
        .text(fmtSEK(val));
    });

    const xTicks = [-1e6, 0, 1e6, 1e8, 1e10];
    g.append("g").attr("class", "axis").attr("transform", `translate(0,${iH})`)
      .call(d3.axisBottom(x).tickValues(xTicks).tickFormat((v) => fmtSEK(v)));
  });
}

/* ── W3. Bar �?Superposition (grouped, all years) ── */

function renderWealthBarSuper() {
  const svg = d3.select("#wealth-bar-super");
  const width = 1020, height = 520;
  const margin = { top: 24, right: 20, bottom: 50, left: 90 };
  const iW = width - margin.left - margin.right;
  const iH = height - margin.top - margin.bottom;

  svg.attr("viewBox", `0 0 ${width} ${height}`).selectAll("*").remove();
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const years = W_JUX_YEARS;
  const x0 = d3.scaleBand().domain(years).range([0, iW]).paddingInner(0.2);

  const allVals = years.flatMap((yr) => {
    const d = wAvgByYear.get(yr);
    return d ? W_GROUPS.map((g) => d[g.key]) : [];
  });
  const yMax = d3.max(allVals.filter((v) => v > 0));
  const yMin = d3.min(allVals.filter((v) => v < 0)) || 0;
  const y = d3.scaleSymlog().constant(1e6).domain([yMin * 1.1, yMax * 1.05]).range([iH, 0]);

  const yTicks = [-1e6, 0, 1e6, 1e7, 1e8, 1e9, 5e9, 1e10, 2.5e10];
  g.append("g").attr("class", "axis").attr("transform", `translate(0,${iH})`)
    .call(d3.axisBottom(x0).tickFormat(d3.format("d")));
  g.append("g").attr("class", "axis")
    .call(d3.axisLeft(y).tickValues(yTicks).tickFormat((v) => fmtSEK(v)));

  g.append("line").attr("x1", 0).attr("x2", iW)
    .attr("y1", y(0)).attr("y2", y(0))
    .attr("stroke", "#9aa0a6").attr("stroke-dasharray", "4 3");

  const bandW = x0.bandwidth();
  const sqrts = W_GROUPS.map((gr) => Math.sqrt(gr.pop));
  const tsqrt = d3.sum(sqrts);

  years.forEach((year) => {
    const d = wAvgByYear.get(year);
    if (!d) return;
    const yg = g.append("g").attr("transform", `translate(${x0(year)},0)`);
    let cx = 0;
    W_GROUPS.forEach((grp, i) => {
      const barW = (sqrts[i] / tsqrt) * bandW;
      const val = d[grp.key];
      const by = val >= 0 ? y(val) : y(0);
      const bh = Math.abs(y(val) - y(0));
      yg.append("rect")
        .attr("x", cx).attr("y", by)
        .attr("width", Math.max(barW, 1)).attr("height", Math.max(bh, 1))
        .attr("fill", grp.color).attr("rx", 2).attr("opacity", 0.85)
        .on("mousemove", (event) => {
          showWTip(event, `<strong>${year}</strong><br>${grp.label}: ${fmtSEK(val)} SEK`);
        })
        .on("mouseleave", hideWTip);
      cx += barW;
    });
  });
}

/* ── W4. Animated Bar Chart ── */

function initWealthBarAnim() {
  const svg = d3.select("#wealth-bar-anim");
  const width = 900, height = 380;
  const margin = { top: 24, right: 100, bottom: 34, left: 120 };
  const iW = width - margin.left - margin.right;
  const iH = height - margin.top - margin.bottom;

  svg.attr("viewBox", `0 0 ${width} ${height}`).selectAll("*").remove();
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const allVals = wAvgSeries.flatMap((d) => W_GROUPS.map((gr) => d[gr.key]));
  const xMax = d3.max(allVals.filter((v) => v > 0));
  const xMin = d3.min(allVals.filter((v) => v < 0)) || 0;
  const x = d3.scaleSymlog().constant(1e6).domain([xMin * 1.1, xMax * 1.05]).range([0, iW]);
  const layout = wPropLayout(iH);

  const xTicks = [-1e6, 0, 1e6, 1e7, 1e8, 1e9, 1e10, 2.5e10];
  g.append("g").attr("class", "axis").attr("transform", `translate(0,${iH})`)
    .call(d3.axisBottom(x).tickValues(xTicks).tickFormat((v) => fmtSEK(v)));

  g.append("line").attr("x1", x(0)).attr("x2", x(0))
    .attr("y1", 0).attr("y2", iH).attr("stroke", "#9aa0a6").attr("stroke-width", 1);

  layout.forEach((row) => {
    g.append("text")
      .attr("x", -6).attr("y", row.y + row.h / 2)
      .attr("dy", "0.35em").attr("text-anchor", "end")
      .attr("fill", "#202124").attr("font-size", 10).text(row.grp.label);
  });

  const bars = g.selectAll("rect.wb")
    .data(layout, (r) => r.key).join("rect").attr("class", "wb")
    .attr("y", (r) => r.y).attr("height", (r) => r.h).attr("rx", 3);

  const labels = g.selectAll("text.wv")
    .data(layout, (r) => r.key).join("text").attr("class", "wv")
    .attr("dy", "0.35em").attr("fill", "#202124").attr("font-size", 11);

  function frame(year) {
    const d = wAvgByYear.get(year);
    if (!d) return;
    document.getElementById("wealth-bar-year-label").textContent = String(year);
    document.getElementById("wealth-bar-year").value = String(year);

    bars.transition().duration(400)
      .attr("x", (r) => { const v = d[r.key]; return v >= 0 ? x(0) : x(v); })
      .attr("width", (r) => Math.max(Math.abs(x(d[r.key]) - x(0)), 2))
      .attr("fill", (r) => r.grp.color);

    labels.transition().duration(400)
      .attr("x", (r) => { const v = d[r.key]; return v >= 0 ? x(v) + 6 : x(v) - 6; })
      .attr("y", (r) => r.y + r.h / 2)
      .attr("text-anchor", (r) => d[r.key] >= 0 ? "start" : "end")
      .text((r) => fmtSEK(d[r.key]) + " SEK");
  }

  const slider = document.getElementById("wealth-bar-year");
  const playBtn = document.getElementById("wealth-bar-play");
  const speedSlider = document.getElementById("wealth-bar-speed");
  const speedLabel = document.getElementById("wealth-bar-speed-label");
  const stepBack = document.getElementById("wealth-bar-step-back");
  const stepFwd = document.getElementById("wealth-bar-step-fwd");

  function nextYear(yr) { yr = yr >= 2024 ? 1980 : yr + 1; while (!wAvgByYear.has(yr) && yr < 2024) yr++; return yr; }
  function prevYear(yr) { yr = yr <= 1980 ? 2024 : yr - 1; while (!wAvgByYear.has(yr) && yr > 1980) yr--; return yr; }

  slider.addEventListener("input", () => frame(Number(slider.value)));
  speedSlider.addEventListener("input", () => {
    speedLabel.textContent = `${speedSlider.value}ms`;
    if (wealthBarTimer) { clearInterval(wealthBarTimer); wealthBarTimer = setInterval(tick, Number(speedSlider.value)); }
  });
  stepBack.addEventListener("click", () => frame(prevYear(Number(slider.value))));
  stepFwd.addEventListener("click", () => frame(nextYear(Number(slider.value))));

  function tick() { frame(nextYear(Number(slider.value))); }

  playBtn.addEventListener("click", () => {
    if (wealthBarTimer) {
      clearInterval(wealthBarTimer); wealthBarTimer = null;
      playBtn.textContent = "Play"; return;
    }
    playBtn.textContent = "Pause";
    wealthBarTimer = setInterval(tick, Number(speedSlider.value));
  });

  frame(1980);
}

/* ── Wealth Bootstrap ── */

function initWealthViz() {
  initWealthTabs();
  initWealthLegend();
  renderWealthLineChart();
  renderWealthSmallMultiples();
  renderWealthBarJux();
  renderWealthBarSuper();
  initWealthBarAnim();
}

/* ══════════════════════════════════════════════════════════════════�?   WEALTH vs INCOME  �?Direct Comparison Section
   ══════════════════════════════════════════════════════════════════�?*/

const CWI_GROUPS = [
  { key: "bottom50",  label: "Bottom 50%",  color: "#4dabf7", pop: 50 },
  { key: "top10",     label: "Top 10%",     color: "#fcc419", pop: 10 },
  { key: "top1",      label: "Top 1%",      color: "#ff8787", pop: 1 },
  { key: "top01",     label: "Top 0.1%",    color: "#e599f7", pop: 0.1 },
  { key: "top001",    label: "Top 0.01%",   color: "#ff6b6b", pop: 0.01 },
  { key: "top0001",   label: "Top 0.001%",  color: "#c92a2a", pop: 0.001 }
];

// keep backward-compat aliases used by waffle/bar helpers
const CWI_INC_GROUPS = CWI_GROUPS;
const CWI_W_GROUPS   = CWI_GROUPS;

function getCwiYear() { return Number(document.getElementById("cwi-year").value); }

function getCwiData() {
  const yr = getCwiYear();
  return { yr, inc: iAvgByYear.get(yr), w: wAvgByYear.get(yr) };
}

/* ── Separate tables ── */

function renderCwiTables() {
  const { inc, w } = getCwiData();
  const incTb = document.getElementById("cwi-tbl-inc");
  const wTb = document.getElementById("cwi-tbl-w");

  if (inc) {
    incTb.innerHTML = CWI_GROUPS.map((g) =>
      `<tr><td>${g.label}</td><td>${g.pop}%</td><td>${fmtSEK(inc[g.key])} SEK</td></tr>`
    ).join("");
  }
  if (w) {
    wTb.innerHTML = CWI_GROUPS.map((g) =>
      `<tr><td>${g.label}</td><td>${g.pop}%</td><td>${fmtSEK(w[g.key])} SEK</td></tr>`
    ).join("");
  }
}

/* ── Proportional bar layout helper ──
   Bar heights scale with sqrt(population) so large groups dominate
   visually while small groups remain readable. */
function cwiPropLayout(iH) {
  const gap = 4;
  const totalGap = gap * (CWI_GROUPS.length - 1);
  const sqrts = CWI_GROUPS.map((g) => Math.sqrt(g.pop));
  const totalSqrt = d3.sum(sqrts);
  const usable = iH - totalGap;
  let y = 0;
  return CWI_GROUPS.map((g, i) => {
    const h = (sqrts[i] / totalSqrt) * usable;
    const row = { key: g.key, y, h };
    y += h + gap;
    return row;
  });
}

/* ── Bar charts ── */

function renderCwiBar(svgSel, vals, xDomain, xTicks, xFmt, zeroline) {
  const width = 520, height = 340;
  const margin = { top: 8, right: 80, bottom: 32, left: 130 };
  const iW = width - margin.left - margin.right;
  const iH = height - margin.top - margin.bottom;

  svgSel.attr("viewBox", `0 0 ${width} ${height}`).selectAll("*").remove();
  const g = svgSel.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const layout = cwiPropLayout(iH);
  const x = d3.scaleSymlog().constant(1e5).domain(xDomain).range([0, iW]);

  if (zeroline) {
    g.append("line").attr("x1", x(0)).attr("x2", x(0)).attr("y1", 0).attr("y2", iH)
      .attr("stroke", "#9aa0a6").attr("stroke-width", 1);
  }

  layout.forEach((row, i) => {
    const c = CWI_GROUPS[i];
    const val = vals[i];
    const midY = row.y + row.h / 2;

    g.append("text").attr("x", -6).attr("y", midY)
      .attr("dy", "0.35em").attr("text-anchor", "end")
      .attr("fill", "#202124").attr("font-size", 11).text(c.label);

    const bx = val >= 0 ? x(0) : x(val);
    const bw = Math.max(Math.abs(x(val) - x(0)), 2);
    g.append("rect").attr("x", bx).attr("y", row.y)
      .attr("width", bw).attr("height", row.h)
      .attr("fill", c.color).attr("rx", 2).attr("opacity", 0.85);

    g.append("text")
      .attr("x", val >= 0 ? x(val) + 4 : x(0) + 4)
      .attr("y", midY).attr("dy", "0.35em")
      .attr("text-anchor", "start").attr("fill", "#202124").attr("font-size", 11)
      .text(xFmt(val));
  });

  g.append("g").attr("class", "axis").attr("transform", `translate(0,${iH})`)
    .call(d3.axisBottom(x).tickValues(xTicks).tickFormat((v) => fmtSEK(v)));
}

function renderCwiBarIncome() {
  const { inc } = getCwiData();
  if (!inc) return;
  const vals = CWI_GROUPS.map((c) => inc[c.key]);
  const xMax = d3.max(vals);
  const xTicks = [0, 1e5, 1e6, 1e7, 1e8].filter((v) => v <= xMax * 1.15);
  renderCwiBar(d3.select("#cwi-bar-income"), vals,
    [0, xMax * 1.15], xTicks, (v) => fmtSEK(v), false);
}

function renderCwiBarWealth() {
  const { w } = getCwiData();
  if (!w) return;
  const vals = CWI_GROUPS.map((c) => w[c.key]);
  const xMax = d3.max(vals.filter((v) => v > 0));
  const xMin = d3.min(vals.filter((v) => v < 0)) || 0;
  const xTicks = [-1e6, 0, 1e7, 1e8, 1e9, 1e10].filter((v) => v >= xMin * 1.2 && v <= xMax * 1.15);
  renderCwiBar(d3.select("#cwi-bar-wealth"), vals,
    [xMin * 1.2, xMax * 1.15], xTicks, (v) => fmtSEK(v), true);
}

/* ── Side-by-side: Population vs. Values ── */

function renderCwiSideBySideBars(svgSel, vals, isWealth) {
  const width = 520, height = 380;
  const margin = { top: 16, right: 8, bottom: 32, left: 160 };
  const iW = width - margin.left - margin.right;
  const iH = height - margin.top - margin.bottom;

  svgSel.attr("viewBox", `0 0 ${width} ${height}`).selectAll("*").remove();
  
  // Create main group
  const g = svgSel.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  // Create equal-height layout for all groups
  const gap = 3;
  const totalGap = gap * (CWI_GROUPS.length - 1);
  const barH = (iH - totalGap) / CWI_GROUPS.length;
  const layout = CWI_GROUPS.map((grp, i) => ({
    key: grp.key,
    y: i * (barH + gap),
    h: barH
  }));
  
  // Linear scale for population share (%) so bar widths match true proportions (50 vs 10 = 5�?).
  const leftCenterX = iW / 2 - 10;
  const xLeft = d3.scaleLinear().domain([0, 50]).range([0, leftCenterX]);

  // Scale for right side (values) - use symlog to handle negative wealth
  const xRightMax = d3.max(vals.filter((v) => v > 0)) || 1;
  const xRightMin = d3.min(vals.filter((v) => v < 0)) || 0;
  const xRight = isWealth 
    ? d3.scaleSymlog().constant(1e5).domain([xRightMin * 1.2, xRightMax * 1.15]).range([iW / 2 + 10, iW])
    : d3.scaleLinear().domain([0, xRightMax * 1.15]).range([iW / 2 + 10, iW]);

  // Draw a vertical center line for right side (zero line for wealth)
  if (isWealth) {
    g.append("line").attr("x1", xRight(0)).attr("x2", xRight(0)).attr("y1", 0).attr("y2", iH)
      .attr("stroke", "#9aa0a6").attr("stroke-width", 1);
  }

  // Draw divider line between left and right
  g.append("line").attr("x1", iW / 2).attr("x2", iW / 2).attr("y1", 0).attr("y2", iH)
    .attr("stroke", "#d0d0d0").attr("stroke-width", 2);

  // Create tooltip for population detail chart
  const popTooltip = d3.select("body").append("div")
    .attr("class", `pop-detail-tooltip-${isWealth ? "wealth" : "income"}`)
    .style("position", "fixed")
    .style("display", "none")
    .style("background", "#ffffff")
    .style("border", "1px solid #d0d0d0")
    .style("border-radius", "4px")
    .style("padding", "8px")
    .style("z-index", "1000")
    .style("box-shadow", "0 2px 12px rgba(0,0,0,0.15)")
    .style("pointer-events", "auto");

  // Render bars for each group
  layout.forEach((row, i) => {
    const c = CWI_GROUPS[i];
    const val = vals[i];
    const midY = row.y + row.h / 2;

    // Group label (left side)
    g.append("text").attr("x", -6).attr("y", midY)
      .attr("dy", "0.35em").attr("text-anchor", "end")
      .attr("fill", "#202124").attr("font-size", 9).attr("font-weight", 500)
      .text(c.label);

    // Left bar (population) �?width �?share (%). Floor only when linear width < 1px (smallest groups).
    const rawPopW = xLeft(c.pop);
    const leftBw = Math.max(rawPopW, rawPopW < 1 ? 0.75 : 0);
    const leftBx = leftCenterX - leftBw;
    const leftBar = g.append("rect").attr("x", leftBx).attr("y", row.y)
      .attr("width", leftBw).attr("height", row.h)
      .attr("fill", c.color).attr("opacity", 0.5).attr("rx", 2)
      .style("cursor", "pointer");

    // Add hover interaction for population detail
    leftBar.on("mouseenter", function() {
      showPopulationDetailChart(popTooltip, CWI_GROUPS, isWealth);
      popTooltip.style("left", (d3.event.clientX + 10) + "px")
        .style("top", (d3.event.clientY - 10) + "px");
    }).on("mouseleave", () => {
      popTooltip.style("display", "none");
    });

    // Right bar (value)
    const rightBx = val >= 0 ? xRight(0) : xRight(val);
    const rightBw = Math.max(Math.abs(xRight(val) - xRight(0)), 2);
    g.append("rect").attr("x", rightBx).attr("y", row.y)
      .attr("width", rightBw).attr("height", row.h)
      .attr("fill", c.color).attr("opacity", 0.85).attr("rx", 2);

    // Right label (value)
    g.append("text")
      .attr("x", val >= 0 ? xRight(val) + 4 : xRight(0) + 4)
      .attr("y", midY).attr("dy", "0.35em")
      .attr("text-anchor", "start")
      .attr("fill", "#202124").attr("font-size", 8)
      .text(fmtSEK(val));
  });

  // Bottom axis labels: left = linear population share; right = value
  g.append("text").attr("x", leftCenterX / 2).attr("y", iH + 20)
    .attr("text-anchor", "middle")
    .attr("fill", "#5f6368").attr("font-size", 8)
    .text("Population share (%)");
  g.append("text").attr("x", (iW / 2 + iW) / 2 + 4).attr("y", iH + 20)
    .attr("text-anchor", "middle")
    .attr("fill", "#5f6368").attr("font-size", 8)
    .text("Avg " + (isWealth ? "Wealth" : "Income") + " (SEK)");
}

/* ── Population detail chart with scrollable view ── */

function showPopulationDetailChart(tooltip, groups, isWealth) {
  const chartWidth = 360, chartHeight = 600;
  const margin = { top: 12, right: 12, bottom: 32, left: 120 };
  const iW = chartWidth - margin.left - margin.right;
  const iH = chartHeight - margin.top - margin.bottom;

  tooltip.style("display", "block")
    .style("width", chartWidth + "px")
    .style("max-height", "600px")
    .style("overflow-y", "auto")
    .html(`
      <div style="font-weight:600;margin-bottom:4px;font-size:12px;color:#202124;">Population share (%, linear scale)</div>
      <svg id="pop-detail-chart-${isWealth ? "w" : "i"}" width="${chartWidth}" height="${chartHeight}" style="display:block;"></svg>
    `);

  const svg = d3.select(`#pop-detail-chart-${isWealth ? "w" : "i"}`);
  
  const popData = groups.map((g) => ({
    label: g.label,
    pop: g.pop,
    color: g.color
  }));

  svg.attr("viewBox", `0 0 ${chartWidth} ${chartHeight}`).selectAll("*").remove();
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleLinear().domain([0, 50]).range([0, iW]);

  // Draw background with vertical gridlines by population share (%)
  g.append("rect").attr("width", iW).attr("height", iH)
    .attr("fill", "#f9fafb").attr("rx", 2);

  [0, 10, 25, 50].forEach((val) => {
    const x = xScale(val);
    g.append("line").attr("x1", x).attr("x2", x)
      .attr("y1", 0).attr("y2", iH)
      .attr("stroke", val === 0 || val === 50 ? "#d0d0d0" : "#e8eaed")
      .attr("stroke-width", val === 0 || val === 50 ? 1 : 0.5);

    g.append("text").attr("x", x).attr("y", iH + 14)
      .attr("text-anchor", "middle")
      .attr("fill", "#5f6368").attr("font-size", 9)
      .text(val === 0 ? "0%" : val + "%");
  });

  // Draw bars for each group (equal row height; bar width �?%)
  const rowH = Math.max(iH / popData.length - 2, 8);
  popData.forEach((d, i) => {
    const y = (i + 0.5) * (iH / popData.length);
    const barW = xScale(d.pop);

    g.append("rect")
      .attr("x", 0).attr("y", y - rowH / 2)
      .attr("width", barW).attr("height", rowH)
      .attr("fill", d.color).attr("opacity", 0.6)
      .attr("rx", 2);

    g.append("text").attr("x", -6).attr("y", y)
      .attr("dy", "0.35em").attr("text-anchor", "end")
      .attr("fill", "#202124").attr("font-size", 10).attr("font-weight", 500)
      .text(d.label);

    const pctLabel = d.pop < 0.1 ? d.pop.toFixed(3) + "%" : d.pop + "%";
    g.append("text").attr("x", barW + 4).attr("y", y)
      .attr("dy", "0.35em").attr("text-anchor", "start")
      .attr("fill", "#5f6368").attr("font-size", 9)
      .text(pctLabel);
  });

  g.append("text").attr("x", iW / 2).attr("y", iH + 28)
    .attr("text-anchor", "middle")
    .attr("fill", "#5f6368").attr("font-size", 9)
    .text("Population share (%)");
}

function renderCwiSideBySideIncome() {
  const { inc } = getCwiData();
  if (!inc) return;
  const vals = CWI_GROUPS.map((c) => inc[c.key]);
  renderCwiSideBySideBars(d3.select("#cwi-sidebyside-income"), vals, false);
}

function renderCwiSideBySideWealth() {
  const { w } = getCwiData();
  if (!w) return;
  const vals = CWI_GROUPS.map((c) => w[c.key]);
  renderCwiSideBySideBars(d3.select("#cwi-sidebyside-wealth"), vals, true);
}

function getCwiScatterX(innerW) {
  const xTicks = [0.001, 0.01, 0.1, 1, 10, 50];
  const xPositions = [0.05, 0.16, 0.28, 0.42, 0.56, 1.0];
  const xPos = (value) => {
    if (value <= xTicks[0]) return xPositions[0] * innerW;
    if (value >= xTicks[xTicks.length - 1]) return xPositions[xPositions.length - 1] * innerW;

    for (let i = 0; i < xTicks.length - 1; i++) {
      const leftTick = xTicks[i];
      const rightTick = xTicks[i + 1];
      if (value >= leftTick && value <= rightTick) {
        const localT = (Math.log10(value) - Math.log10(leftTick)) / (Math.log10(rightTick) - Math.log10(leftTick));
        const blended = xPositions[i] + localT * (xPositions[i + 1] - xPositions[i]);
        return blended * innerW;
      }
    }

    return innerW;
  };
  return { xTicks, xPos };
}

function getCwiScatterY(values, isWealth, innerH) {
  const positiveVals = values.filter((v) => v > 0);
  const negativeVals = values.filter((v) => v < 0);
  const yTicks = isWealth
    ? [-1e6, 0, 1e6, 1e7, 1e8, 1e9, 1e10].filter((v) => v >= (negativeVals.length ? d3.min(negativeVals) * 1.2 : 0) && v <= ((d3.max(positiveVals) || 1) * 1.15))
    : [1e5, 5e5, 1e6, 5e6, 1e7, 5e7, 1e8, 5e8].filter((v) => v >= Math.max((d3.min(positiveVals) || 1) * 0.8, 1) && v <= ((d3.max(positiveVals) || 1) * 1.15));
  const y = isWealth
    ? d3.scaleSymlog()
        .constant(1e5)
        .domain([
          negativeVals.length ? d3.min(negativeVals) * 1.2 : 0,
          (d3.max(positiveVals) || 1) * 1.15
        ])
        .range([innerH, 0])
    : d3.scaleLog()
        .domain([
          Math.max((d3.min(positiveVals) || 1) * 0.8, 1),
          (d3.max(positiveVals) || 1) * 1.15
        ])
        .range([innerH, 0]);

  return { y, yTicks };
}

function bindCwiScatterPointEvents(points, isWealth) {
  points
    .style("cursor", "pointer")
    .on("mouseenter", function(event, d) {
      d3.select(this).select("circle")
        .attr("stroke", "#202124")
        .attr("stroke-width", 2.5);
      showCwiTip(
        event,
        `<strong>${d.label}</strong><br>` +
        `Population share: ${fmtPctExact(d.pop)}<br>` +
        `${isWealth ? "Average wealth" : "Average income"}: ${fmtSEKExact(d.value)} SEK`
      );
    })
    .on("mousemove", function(event, d) {
      showCwiTip(
        event,
        `<strong>${d.label}</strong><br>` +
        `Population share: ${fmtPctExact(d.pop)}<br>` +
        `${isWealth ? "Average wealth" : "Average income"}: ${fmtSEKExact(d.value)} SEK`
      );
    })
    .on("mouseleave", function() {
      d3.select(this).select("circle")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 1.5);
      hideCwiTip();
    });
}

function renderCwiPopulationScatter(svgSel, vals, isWealth) {
  const width = 520, height = 360;
  const margin = { top: 18, right: 18, bottom: 52, left: 78 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  svgSel.attr("viewBox", `0 0 ${width} ${height}`).selectAll("*").remove();

  const data = CWI_GROUPS.map((group, i) => ({ ...group, value: vals[i] }));
  const g = svgSel.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const { xTicks, xPos } = getCwiScatterX(innerW);
  const { y, yTicks } = getCwiScatterY(data.map((d) => d.value), isWealth, innerH);

  g.append("g")
    .selectAll("line")
    .data(xTicks)
    .join("line")
    .attr("x1", (d) => xPos(d))
    .attr("x2", (d) => xPos(d))
    .attr("y1", 0)
    .attr("y2", innerH)
    .attr("stroke", "#e8eaed")
    .attr("stroke-dasharray", "3,3");

  g.append("g")
    .selectAll("line")
    .data(yTicks)
    .join("line")
    .attr("x1", 0)
    .attr("x2", innerW)
    .attr("y1", (d) => y(d))
    .attr("y2", (d) => y(d))
    .attr("stroke", "#e8eaed")
    .attr("stroke-dasharray", "3,3");

  if (isWealth && y.domain()[0] < 0) {
    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerW)
      .attr("y1", y(0))
      .attr("y2", y(0))
      .attr("stroke", "#9aa0a6")
      .attr("stroke-width", 1);
  }

  g.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${innerH})`)
    .call(
      d3.axisBottom(d3.scaleLinear().domain([0, innerW]).range([0, innerW]))
        .tickValues(xTicks.map((d) => xPos(d)))
        .tickFormat((_, i) => fmtPctExact(xTicks[i]))
    );

  g.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y).tickValues(yTicks).tickFormat((v) => fmtSEKAxis(v)));

  const points = g.append("g")
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", (d) => `translate(${xPos(d.pop)},${y(d.value)})`);

  bindCwiScatterPointEvents(points, isWealth);

  points.append("circle")
    .attr("r", (d) => d.pop >= 10 ? 10 : d.pop >= 1 ? 8 : 6)
    .attr("fill", (d) => d.color)
    .attr("fill-opacity", 0.85)
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 1.5);

  points.append("text")
    .attr("x", (d) => d.pop >= 10 ? -14 : 10)
    .attr("y", (d) => d.pop >= 10 ? -12 : 4)
    .attr("text-anchor", (d) => d.pop >= 10 ? "end" : "start")
    .attr("fill", "#202124")
    .attr("font-size", 10)
    .attr("font-weight", 600)
    .text((d) => d.label);

  g.append("text")
    .attr("x", innerW / 2)
    .attr("y", innerH + 40)
    .attr("text-anchor", "middle")
    .attr("fill", "#5f6368")
    .attr("font-size", 11)
    .text("Population share of total population (%)");

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerH / 2)
    .attr("y", -56)
    .attr("text-anchor", "middle")
    .attr("fill", "#5f6368")
    .attr("font-size", 11)
    .text(isWealth ? "Average net wealth per person (SEK, symlog scale)" : "Average annual income per person (SEK, log scale)");
}

function renderCwiScatterIncome() {
  const { inc } = getCwiData();
  if (!inc) return;
  const vals = CWI_GROUPS.map((c) => inc[c.key]);
  renderCwiPopulationScatter(d3.select("#cwi-scatter-income"), vals, false);
}

function renderCwiScatterWealth() {
  const { w } = getCwiData();
  if (!w) return;
  const vals = CWI_GROUPS.map((c) => w[c.key]);
  renderCwiPopulationScatter(d3.select("#cwi-scatter-wealth"), vals, true);
}

/* ── Ratio / multiplier display ── */

function renderCwiRatios() {
  const { yr, inc, w } = getCwiData();
  if (!inc || !w) return;
  const container = document.getElementById("cwi-ratio-cards");

  const pairs = [
    { incKey: "top1", wKey: "top1", label: "Top 1% vs Bottom 50%" },
    { incKey: "top10ex", wKey: "top10", label: "Top 10% vs Bottom 50%" }
  ];

  container.innerHTML = pairs.map((p) => {
    const incA = inc[p.incKey], incB = inc.bottom50;
    const wA = w[p.wKey], wB = w.bottom50;
    const incRatio = (incA / incB).toFixed(1);
    const wRatio = wB !== 0 ? (wA / Math.abs(wB)).toFixed(0) : "N/A";
    const maxBar = 300;
    const wRatioNum = wB !== 0 ? wA / Math.abs(wB) : Infinity;
    const incBarW = isFinite(wRatioNum) && wRatioNum > 0
      ? Math.max(Math.min((incA / incB) / wRatioNum * maxBar, maxBar), 4) : 4;

    return `<div class="cwi-ratio-card">
      <h4>${p.label} (${yr})</h4>
      <div class="cwi-ratio-bar-wrap">
        <span class="cwi-ratio-label">Income</span>
        <div class="cwi-ratio-bar" style="width:${incBarW}px;background:#4dabf7;opacity:0.6;"></div>
        <span class="cwi-ratio-val">${incRatio}x</span>
      </div>
      <div class="cwi-ratio-bar-wrap">
        <span class="cwi-ratio-label">Wealth</span>
        <div class="cwi-ratio-bar" style="width:${maxBar}px;background:#ff6b6b;"></div>
        <span class="cwi-ratio-val">${wRatio}x</span>
      </div>
      <p style="margin:0.4rem 0 0;font-size:0.8rem;color:#5f6368;">
        Wealth gap is <strong>${isFinite(wRatioNum) ? (wRatioNum / (incA / incB)).toFixed(0) : "N/A"}x</strong> larger than the income gap.
      </p>
    </div>`;
  }).join("");
}

/* ── Condition visibility ── */

function applyCwiCondition() {
  const cond = document.getElementById("cwi-condition").value;
  const nums = document.getElementById("cwi-panel-numbers");
  const bars = document.getElementById("cwi-panel-bars");

  nums.style.display = "none";
  bars.style.display = "none";

  if (cond === "all" || cond === "numbers") nums.style.display = "";
  if (cond === "all" || cond === "bars") bars.style.display = "";
}

/* ── Render all comparison panels ── */

function renderAllCwi() {
  renderCwiTables();
  renderCwiBarIncome();
  renderCwiBarWealth();
  renderCwiSideBySideIncome();
  renderCwiSideBySideWealth();
  renderCwiScatterIncome();
  renderCwiScatterWealth();
  applyCwiCondition();
}

/* ── Temporal: sliding table ── */

function renderCwiTempTable(yr) {
  const inc = iAvgByYear.get(yr);
  const w = wAvgByYear.get(yr);
  const incTb = document.getElementById("cwi-temp-tbl-inc");
  const wTb = document.getElementById("cwi-temp-tbl-w");

  if (inc) {
    incTb.innerHTML = CWI_GROUPS.map((g) =>
      `<tr><td>${g.label}</td><td>${g.pop}%</td><td>${fmtSEK(inc[g.key])} SEK</td></tr>`
    ).join("");
  }
  if (w) {
    wTb.innerHTML = CWI_GROUPS.map((g) =>
      `<tr><td>${g.label}</td><td>${g.pop}%</td><td>${fmtSEK(w[g.key])} SEK</td></tr>`
    ).join("");
  }
}

let cwiTempTimer = null;

function initCwiTempSlider() {
  const slider = document.getElementById("cwi-temp-slider");
  const label = document.getElementById("cwi-temp-year-label");
  const playBtn = document.getElementById("cwi-temp-play");

  slider.addEventListener("input", () => {
    const yr = Number(slider.value);
    label.textContent = yr;
    renderCwiTempTable(yr);
  });

  playBtn.addEventListener("click", () => {
    if (cwiTempTimer) {
      clearInterval(cwiTempTimer);
      cwiTempTimer = null;
      playBtn.textContent = "Play";
      return;
    }
    playBtn.textContent = "Pause";
    cwiTempTimer = setInterval(() => {
      let yr = Number(slider.value) + 1;
      if (yr > 2024) yr = 1980;
      slider.value = yr;
      label.textContent = yr;
      renderCwiTempTable(yr);
    }, 500);
  });

  renderCwiTempTable(Number(slider.value));
}

/* ── Temporal: line charts ── */

// sqrt-scaled stroke width: bottom50 �?~6px, top0001 �?~0.5px
const cwiStrokeW = d3.scaleSqrt().domain([0.001, 50]).range([0.6, 6]);

function renderCwiLineIncome() {
  const svg = d3.select("#cwi-line-income");
  const data = iAvgSeries.filter((d) => d.year >= 1980 && d.year <= 2024);
  if (data.length === 0) return;

  const width = 700, height = 340;
  const margin = { top: 16, right: 100, bottom: 46, left: 70 };
  const iW = width - margin.left - margin.right;
  const iH = height - margin.top - margin.bottom;

  svg.attr("viewBox", `0 0 ${width} ${height}`).selectAll("*").remove();
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const allVals = data.flatMap((d) => CWI_GROUPS.map((c) => d[c.key]));
  const yMax = d3.max(allVals);
  const x = d3.scaleLinear().domain([1980, 2024]).range([0, iW]);
  const y = d3.scaleSymlog().constant(1e5).domain([0, yMax * 1.1]).range([iH, 0]);

  g.append("g").attr("class", "axis").attr("transform", `translate(0,${iH})`)
    .call(d3.axisBottom(x).ticks(8).tickFormat(d3.format("d")));
  const yTicks = [0, 1e5, 1e6, 1e7, 1e8].filter((v) => v <= yMax * 1.1);
  g.append("g").attr("class", "axis")
    .call(d3.axisLeft(y).tickValues(yTicks).tickFormat((v) => fmtSEK(v)));

  CWI_GROUPS.forEach((grp) => {
    const sw = cwiStrokeW(grp.pop);
    const line = d3.line().defined((d) => d[grp.key] != null)
      .x((d) => x(d.year)).y((d) => y(d[grp.key]));
    g.append("path").datum(data).attr("fill", "none")
      .attr("stroke", grp.color).attr("stroke-width", sw)
      .attr("stroke-linecap", "round")
      .attr("d", line);
    const last = data[data.length - 1];
    if (last[grp.key] != null) {
      g.append("text").attr("x", iW + 6).attr("y", y(last[grp.key]))
        .attr("dy", "0.35em").attr("fill", grp.color)
        .attr("font-size", 10).attr("font-weight", 600).text(grp.label);
    }
  });
}

function renderCwiLineWealth() {
  const svg = d3.select("#cwi-line-wealth");
  const data = wAvgSeries.filter((d) => d.year >= 1980 && d.year <= 2024);
  if (data.length === 0) return;

  const width = 700, height = 340;
  const margin = { top: 16, right: 100, bottom: 46, left: 70 };
  const iW = width - margin.left - margin.right;
  const iH = height - margin.top - margin.bottom;

  svg.attr("viewBox", `0 0 ${width} ${height}`).selectAll("*").remove();
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const allVals = data.flatMap((d) => CWI_GROUPS.map((c) => d[c.key]));
  const yMin = d3.min(allVals);
  const yMax = d3.max(allVals);
  const x = d3.scaleLinear().domain([1980, 2024]).range([0, iW]);
  const y = d3.scaleSymlog().constant(1e6).domain([yMin * 1.1, yMax * 1.1]).range([iH, 0]);

  g.append("g").attr("class", "axis").attr("transform", `translate(0,${iH})`)
    .call(d3.axisBottom(x).ticks(8).tickFormat(d3.format("d")));
  const yTicks = [yMin, 0, 1e6, 1e7, 1e8, 1e9, 1e10].filter((v) => v >= yMin * 1.1 && v <= yMax * 1.1);
  g.append("g").attr("class", "axis")
    .call(d3.axisLeft(y).tickValues(yTicks).tickFormat((v) => fmtSEK(v)));

  g.append("line").attr("x1", 0).attr("x2", iW)
    .attr("y1", y(0)).attr("y2", y(0))
    .attr("stroke", "#dadce0").attr("stroke-dasharray", "3 3");

  CWI_GROUPS.forEach((grp) => {
    const sw = cwiStrokeW(grp.pop);
    const line = d3.line().defined((d) => d[grp.key] != null)
      .x((d) => x(d.year)).y((d) => y(d[grp.key]));
    g.append("path").datum(data).attr("fill", "none")
      .attr("stroke", grp.color).attr("stroke-width", sw)
      .attr("stroke-linecap", "round")
      .attr("d", line);
    const last = data[data.length - 1];
    if (last[grp.key] != null) {
      g.append("text").attr("x", iW + 6).attr("y", y(last[grp.key]))
        .attr("dy", "0.35em").attr("fill", grp.color)
        .attr("font-size", 10).attr("font-weight", 600).text(grp.label);
    }
  });
}

/* ─────────────────────────────────────────────────────────────────
   RACE BAR
   ───────────────────────────────────────────────────────────────── */

let cwiRaceTimer = null;
let cwiScatterTimer = null;

function renderCwiRaceFrame(yr) {
  const inc = iAvgByYear.get(yr);
  const w = wAvgByYear.get(yr);
  if (inc) {
    const vals = CWI_GROUPS.map((c) => inc[c.key]);
    const xMax = d3.max(vals);
    const xTicks = [0, 1e5, 1e6, 1e7, 1e8].filter((v) => v <= xMax * 1.15);
    renderCwiBar(d3.select("#cwi-race-inc"), vals, [0, xMax * 1.15], xTicks, fmtSEK, false);
  }
  if (w) {
    const vals = CWI_GROUPS.map((c) => w[c.key]);
    const xMax = d3.max(vals.filter((v) => v > 0));
    const xMin = d3.min(vals.filter((v) => v < 0)) || 0;
    const xTicks = [-1e6, 0, 1e7, 1e8, 1e9, 1e10].filter((v) => v >= xMin * 1.2 && v <= xMax * 1.15);
    renderCwiBar(d3.select("#cwi-race-w"), vals, [xMin * 1.2, xMax * 1.15], xTicks, fmtSEK, true);
  }
}

function initCwiRaceBar() {
  const slider = document.getElementById("cwi-race-slider");
  const label  = document.getElementById("cwi-race-year-label");
  const btn    = document.getElementById("cwi-race-play");

  slider.addEventListener("input", () => {
    const yr = Number(slider.value);
    label.textContent = yr;
    renderCwiRaceFrame(yr);
  });
  btn.addEventListener("click", () => {
    if (cwiRaceTimer) {
      clearInterval(cwiRaceTimer); cwiRaceTimer = null;
      btn.textContent = "Play"; return;
    }
    btn.textContent = "Pause";
    cwiRaceTimer = setInterval(() => {
      let yr = Number(slider.value) + 1;
      if (yr > 2024) yr = 1980;
      slider.value = yr; label.textContent = yr;
      renderCwiRaceFrame(yr);
    }, 500);
  });
  renderCwiRaceFrame(Number(slider.value));
}

function ensureCwiScatterScene(svgSel, isWealth) {
  const node = svgSel.node();
  if (node && node.__cwiScatterScene) return node.__cwiScatterScene;

  const width = 520, height = 360;
  const margin = { top: 18, right: 18, bottom: 52, left: 78 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const allValues = (isWealth ? wAvgSeries : iAvgSeries)
    .flatMap((d) => CWI_GROUPS.map((c) => d[c.key]))
    .filter((v) => v != null);
  const { xTicks, xPos } = getCwiScatterX(innerW);
  const { y, yTicks } = getCwiScatterY(allValues, isWealth, innerH);

  svgSel.attr("viewBox", `0 0 ${width} ${height}`).selectAll("*").remove();
  const g = svgSel.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .selectAll("line")
    .data(xTicks)
    .join("line")
    .attr("x1", (d) => xPos(d))
    .attr("x2", (d) => xPos(d))
    .attr("y1", 0)
    .attr("y2", innerH)
    .attr("stroke", "#e8eaed")
    .attr("stroke-dasharray", "3,3");

  g.append("g")
    .selectAll("line")
    .data(yTicks)
    .join("line")
    .attr("x1", 0)
    .attr("x2", innerW)
    .attr("y1", (d) => y(d))
    .attr("y2", (d) => y(d))
    .attr("stroke", "#e8eaed")
    .attr("stroke-dasharray", "3,3");

  if (isWealth && y.domain()[0] < 0) {
    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerW)
      .attr("y1", y(0))
      .attr("y2", y(0))
      .attr("stroke", "#9aa0a6")
      .attr("stroke-width", 1);
  }

  g.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${innerH})`)
    .call(
      d3.axisBottom(d3.scaleLinear().domain([0, innerW]).range([0, innerW]))
        .tickValues(xTicks.map((d) => xPos(d)))
        .tickFormat((_, i) => fmtPctExact(xTicks[i]))
    );

  g.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y).tickValues(yTicks).tickFormat((v) => fmtSEKAxis(v)));

  g.append("text")
    .attr("x", innerW / 2)
    .attr("y", innerH + 40)
    .attr("text-anchor", "middle")
    .attr("fill", "#5f6368")
    .attr("font-size", 11)
    .text("Population share of total population (%)");

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerH / 2)
    .attr("y", -56)
    .attr("text-anchor", "middle")
    .attr("fill", "#5f6368")
    .attr("font-size", 11)
    .text(isWealth ? "Average net wealth per person (SEK, symlog scale)" : "Average annual income per person (SEK, log scale)");

  const points = g.append("g")
    .selectAll("g")
    .data(CWI_GROUPS.map((group) => ({ ...group, value: 0 })))
    .join("g")
    .attr("transform", (d) => `translate(${xPos(d.pop)},${y(Math.max(d.value, 1))})`);

  points.append("circle")
    .attr("r", (d) => d.pop >= 10 ? 10 : d.pop >= 1 ? 8 : 6)
    .attr("fill", (d) => d.color)
    .attr("fill-opacity", 0.85)
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 1.5);

  points.append("text")
    .attr("x", (d) => d.pop >= 10 ? -14 : 10)
    .attr("y", (d) => d.pop >= 10 ? -12 : 4)
    .attr("text-anchor", (d) => d.pop >= 10 ? "end" : "start")
    .attr("fill", "#202124")
    .attr("font-size", 10)
    .attr("font-weight", 600)
    .text((d) => d.label);

  bindCwiScatterPointEvents(points, isWealth);

  const scene = { y, xPos, points };
  if (node) node.__cwiScatterScene = scene;
  return scene;
}

function updateCwiScatterScene(svgSel, vals, isWealth) {
  const scene = ensureCwiScatterScene(svgSel, isWealth);
  const data = CWI_GROUPS.map((group, i) => ({ ...group, value: vals[i] }));

  const points = scene.points.data(data, (d) => d.key);
  bindCwiScatterPointEvents(points, isWealth);

  points.transition()
    .duration(320)
    .ease(d3.easeCubicOut)
    .attr("transform", (d) => `translate(${scene.xPos(d.pop)},${scene.y(d.value)})`);
}

function renderCwiScatterFrame(yr) {
  const inc = iAvgByYear.get(yr);
  const w = wAvgByYear.get(yr);
  if (inc) {
    const incVals = CWI_GROUPS.map((c) => inc[c.key]);
    updateCwiScatterScene(d3.select("#cwi-temp-scatter-income"), incVals, false);
  }
  if (w) {
    const wealthVals = CWI_GROUPS.map((c) => w[c.key]);
    updateCwiScatterScene(d3.select("#cwi-temp-scatter-wealth"), wealthVals, true);
  }
}

function initCwiScatterAnim() {
  const slider = document.getElementById("cwi-scatter-slider");
  const label = document.getElementById("cwi-scatter-year-label");
  const btn = document.getElementById("cwi-scatter-play");
  if (!slider || !label || !btn) return;

  slider.addEventListener("input", () => {
    const yr = Number(slider.value);
    label.textContent = yr;
    renderCwiScatterFrame(yr);
  });

  btn.addEventListener("click", () => {
    if (cwiScatterTimer) {
      clearInterval(cwiScatterTimer);
      cwiScatterTimer = null;
      btn.textContent = "Play";
      return;
    }
    btn.textContent = "Pause";
    cwiScatterTimer = setInterval(() => {
      let yr = Number(slider.value) + 1;
      if (yr > 2024) yr = 1980;
      slider.value = yr;
      label.textContent = yr;
      renderCwiScatterFrame(yr);
    }, 500);
  });

  renderCwiScatterFrame(Number(slider.value));
}

function initCwiTempExtraSelect() {
  const sel = document.getElementById("cwi-temp-view");
  const lineEl = document.getElementById("cwi-temp-extra-line");
  const raceEl = document.getElementById("cwi-temp-extra-race");
  const scatterEl = document.getElementById("cwi-temp-extra-scatter");
  if (!sel || !lineEl || !raceEl || !scatterEl) return;

  const apply = () => {
    const v = sel.value;
    lineEl.style.display = v === "line" ? "block" : "none";
    raceEl.style.display = v === "race" ? "block" : "none";
    scatterEl.style.display = v === "scatter" ? "block" : "none";
    if (v === "line") {
      renderCwiLineIncome();
      renderCwiLineWealth();
    }
    if (v === "race") {
      const rs = document.getElementById("cwi-race-slider");
      renderCwiRaceFrame(rs ? Number(rs.value) : 2024);
    }
    if (v === "scatter") {
      const ss = document.getElementById("cwi-scatter-slider");
      renderCwiScatterFrame(ss ? Number(ss.value) : 2024);
    }
  };
  sel.addEventListener("change", apply);
  apply();
}

/* ── Bootstrap comparison section ── */

function initCompareWI_Legacy() {
  const yearSel = document.getElementById("cwi-year");
  const commonYears = wAvgSeries
    .filter((d) => iAvgByYear.has(d.year))
    .map((d) => d.year);
  if (commonYears.length === 0) return;
  commonYears.forEach((yr) => yearSel.appendChild(new Option(yr, yr)));
  yearSel.value = String(commonYears.includes(2024) ? 2024 : commonYears[commonYears.length - 1]);

  yearSel.addEventListener("change", renderAllCwi);
  document.getElementById("cwi-condition").addEventListener("change", applyCwiCondition);
  renderAllCwi();
  initCwiTempSlider();
  initCwiRaceBar();
  initCwiScatterAnim();
  initCwiTempExtraSelect();
}

/* ══════════════════════════════════════════════════════════════════�?*/

async function init() {
  await Promise.all([loadWealthData(), loadIncomeAvgData()]);
  initCompareWI();
}

init();

/* Compare WI matrix explorer */
const CWI_MATRIX_DEFAULT_YEARS = [1980, 1990, 2000, 2010, 2020, 2024];
const CWI_MATRIX_GROUPS = [
  { key: "bottom50", label: "Bottom 50%", pop: 50,    color: "#4dabf7" },
  { key: "top9",     label: "Top 10%",    pop: 9,     color: "#ffd43b" },
  { key: "top0_9",   label: "Top 1%",     pop: 0.9,   color: "#ff922b" },
  { key: "top0_09",  label: "Top 0.1%",   pop: 0.09,  color: "#f06595" },
  { key: "top0_009", label: "Top 0.01%",  pop: 0.009, color: "#e64980" },
  { key: "top0_001", label: "Top 0.001%", pop: 0.001, color: "#c92a2a" }
];
// All disjoint keys including middle40, used only for accurate share denominators
const CWI_ALL_KEYS = ["bottom50", "middle40", "top9", "top0_9", "top0_09", "top0_009", "top0_001"];

// Log-normalized width for population encoding. Maps pop (0.001–50) to [minW, maxW]
// using log10 so each order-of-magnitude step gets equal visual weight.
function cwiPopWidth(pop, minW, maxW) {
  const logMin = Math.log10(0.001); // -3
  const logMax = Math.log10(50);    // ~1.699
  const t = (Math.log10(Math.max(pop, 0.0001)) - logMin) / (logMax - logMin);
  return minW + t * (maxW - minW);
}

// Fixed stroke/bar widths per population tier (line charts and bar charts)
function cwiPopWidthFixed(pop) {
  if (pop >= 40)   return 12;   // Bottom 50%
  if (pop >= 5)    return 8;    // Top 10%
  if (pop >= 0.5)  return 4;    // Top 1%
  if (pop >= 0.05) return 2;    // Top 0.1%
  if (pop >= 0.005) return 0.8; // Top 0.01%
  return 0.4;                   // Top 0.001%
}

let cwiMatrixIncomeSeries = [];
let cwiMatrixWealthSeries = [];
let cwiMatrixIncomeByYear = new Map();
let cwiMatrixWealthByYear = new Map();
let cwiMatrixAnimTimer = null;

function cwiMatrixBuildDisjointRow(raw) {
  if (!raw) return null;
  const totals = {
    bottom50: raw.bottom50 * 50,
    middle40: raw.mid40 * 40,
    top10: raw.top10 * 10,
    top1: raw.top1 * 1,
    top01: raw.top01 * 0.1,
    top001: raw.top001 * 0.01,
    top0001: raw.top0001 * 0.001
  };
  return {
    year: raw.year,
    values: {
      bottom50: raw.bottom50,
      middle40: raw.mid40,
      top9: (totals.top10 - totals.top1) / 9,
      top0_9: (totals.top1 - totals.top01) / 0.9,
      top0_09: (totals.top01 - totals.top001) / 0.09,
      top0_009: (totals.top001 - totals.top0001) / 0.009,
      top0_001: raw.top0001
    },
    totals: {
      bottom50: totals.bottom50,
      middle40: totals.middle40,
      top9: totals.top10 - totals.top1,
      top0_9: totals.top1 - totals.top01,
      top0_09: totals.top01 - totals.top001,
      top0_009: totals.top001 - totals.top0001,
      top0_001: totals.top0001
    }
  };
}

function cwiMatrixInitData() {
  if (cwiMatrixIncomeSeries.length && cwiMatrixWealthSeries.length) return;
  cwiMatrixIncomeSeries = iAvgSeries.map(cwiMatrixBuildDisjointRow).filter(Boolean);
  cwiMatrixWealthSeries = wAvgSeries.map(cwiMatrixBuildDisjointRow).filter(Boolean);
  cwiMatrixIncomeByYear = new Map(cwiMatrixIncomeSeries.map((d) => [d.year, d]));
  cwiMatrixWealthByYear = new Map(cwiMatrixWealthSeries.map((d) => [d.year, d]));
}

function cwiMatrixCommonYears() {
  return cwiMatrixIncomeSeries.map((d) => d.year).filter((year) => cwiMatrixWealthByYear.has(year));
}

// Fixed 6-year sequence used by all animation controls
function cwiMatrixAnimYears() {
  const available = new Set(cwiMatrixCommonYears());
  return [1980, 1990, 2000, 2010, 2020, 2024].filter((y) => available.has(y));
}

function cwiMatrixParseYears(raw) {
  const available = new Set(cwiMatrixCommonYears());
  const parsed = Array.from(new Set(String(raw).match(/\d{4}/g)?.map(Number) || []))
    .filter((year) => available.has(year))
    .sort((a, b) => a - b);
  return parsed.length ? parsed : CWI_MATRIX_DEFAULT_YEARS.filter((year) => available.has(year));
}

function cwiMatrixSnapshot(metric, year) {
  return (metric === "income" ? cwiMatrixIncomeByYear : cwiMatrixWealthByYear).get(year);
}

function cwiMatrixSeries(metric) {
  return metric === "income" ? cwiMatrixIncomeSeries : cwiMatrixWealthSeries;
}

function cwiMatrixMetricValue(snapshot, group, _popEncoded) {
  // Data values are always average per-person (SEK). popEncoded only affects visual dimensions.
  return snapshot.values[group.key];
}

function cwiMatrixFormatValue(value) {
  return `${fmtSEK(value)} SEK`;
}

function cwiMatrixMakeCard(parent, title) {
  const card = document.createElement("div");
  card.className = "cwi-card";
  if (title) {
    const h = document.createElement("h3");
    h.textContent = title;
    card.appendChild(h);
  }
  parent.appendChild(card);
  return card;
}

// Returns power-of-10 tick values within a d3.scaleLog's domain
function cwiLogTicks(scale) {
  const [lo, hi] = scale.domain();
  const ticks = [];
  for (let e = Math.ceil(Math.log10(lo)); e <= Math.floor(Math.log10(hi)); e++)
    ticks.push(Math.pow(10, e));
  return ticks.length ? ticks : [lo, hi];
}

function cwiMatrixRenderAnimatedYears(root, years, renderYear, title) {
  const controls = document.createElement("div");
  controls.className = "cwi-anim-bar";
  controls.innerHTML = `<button type="button" id="cwi-matrix-play">Play</button><input type="range" id="cwi-matrix-year" min="0" max="${years.length - 1}" step="1" value="0"><span id="cwi-matrix-year-label">${years[0]}</span>`;
  root.appendChild(controls);
  const card = cwiMatrixMakeCard(root, title);
  card.style.maxWidth = "360px";
  const host = document.createElement("div");
  card.appendChild(host);
  const slider = controls.querySelector("#cwi-matrix-year");
  const play = controls.querySelector("#cwi-matrix-play");
  const label = controls.querySelector("#cwi-matrix-year-label");
  const draw = (index) => {
    const year = years[index];
    label.textContent = String(year);
    renderYear(year, host);
  };
  slider.addEventListener("input", () => draw(Number(slider.value)));
  play.addEventListener("click", () => {
    if (cwiMatrixAnimTimer) {
      clearInterval(cwiMatrixAnimTimer);
      cwiMatrixAnimTimer = null;
      play.textContent = "Play";
      return;
    }
    play.textContent = "Pause";
    cwiMatrixAnimTimer = setInterval(() => {
      const next = (Number(slider.value) + 1) % years.length;
      slider.value = String(next);
      draw(next);
    }, 900);
  });
  draw(0);
}

function cwiMatrixRenderTable(root, years, comparison, popEncoded, metrics) {
  const showInc = metrics.includes("income");
  const showW   = metrics.includes("wealth");
  const headCols = `${showInc ? "<th>Income</th>" : ""}${showW ? "<th>Wealth</th>" : ""}`;
  const makeRowHtml = (group, inc, wealth) => {
    const pop = popEncoded ? `<td>${fmtPctExact(group.pop)}</td>` : "";
    const incCell = showInc ? `<td>${cwiMatrixFormatValue(inc.values[group.key])}</td>` : "";
    const wCell   = showW   ? `<td>${cwiMatrixFormatValue(wealth.values[group.key])}</td>` : "";
    return `<tr><td>${group.label}</td>${pop}${incCell}${wCell}</tr>`;
  };
  if (comparison === "juxtaposition") {
    const grid = document.createElement("div");
    grid.className = "cwi-years-grid";
    root.appendChild(grid);
    years.forEach((year) => {
      const card = cwiMatrixMakeCard(grid, String(year));
      const table = document.createElement("table");
      table.className = "cwi-table";
      table.innerHTML = `<thead><tr><th>Group</th>${popEncoded ? "<th>Pop.</th>" : ""}${headCols}</tr></thead><tbody>${CWI_MATRIX_GROUPS.map((group) => makeRowHtml(group, cwiMatrixSnapshot("income", year), cwiMatrixSnapshot("wealth", year))).join("")}</tbody>`;
      card.appendChild(table);
    });
    return;
  }
  if (comparison === "superposition") {
    const card = cwiMatrixMakeCard(root, "Combined table across selected years");
    const table = document.createElement("table");
    table.className = "cwi-table";
    const colSpan = metrics.length;
    const topHead = `<tr><th rowspan="2">Group</th>${popEncoded ? '<th rowspan="2">Pop.</th>' : ''}${years.map((year) => `<th colspan="${colSpan}">${year}</th>`).join("")}</tr>`;
    const secondHead = `<tr>${years.map(() => `${showInc ? "<th>Income</th>" : ""}${showW ? "<th>Wealth</th>" : ""}`).join("")}</tr>`;
    const body = CWI_MATRIX_GROUPS.map((group) => {
      const cells = years.map((year) => {
        const inc = cwiMatrixSnapshot("income", year);
        const wealth = cwiMatrixSnapshot("wealth", year);
        return `${showInc ? `<td>${cwiMatrixFormatValue(inc.values[group.key])}</td>` : ""}${showW ? `<td>${cwiMatrixFormatValue(wealth.values[group.key])}</td>` : ""}`;
      }).join("");
      return `<tr><td>${group.label}</td>${popEncoded ? `<td>${fmtPctExact(group.pop)}</td>` : ""}${cells}</tr>`;
    }).join("");
    table.innerHTML = `<thead>${topHead}${secondHead}</thead><tbody>${body}</tbody>`;
    card.appendChild(table);
    return;
  }
  cwiMatrixRenderAnimatedYears(root, cwiMatrixAnimYears(), (year, host) => {
    host.innerHTML = "";
    const table = document.createElement("table");
    table.className = "cwi-table";
    table.innerHTML = `<thead><tr><th>Group</th>${popEncoded ? "<th>Pop.</th>" : ""}${headCols}</tr></thead><tbody>${CWI_MATRIX_GROUPS.map((group) => makeRowHtml(group, cwiMatrixSnapshot("income", year), cwiMatrixSnapshot("wealth", year))).join("")}</tbody>`;
    host.appendChild(table);
  }, "Animated table");
}

// Vertical bar chart for a single year — supports 4 Y-axis scale types.
function cwiMatrixDrawBarsVertical(svgNode, snapshot, metric, popEncoded, yOverride, yScaleType = "linear-zoom") {
  if (!snapshot) return;
  const svg = d3.select(svgNode);
  const width = 340, height = 300;
  const margin = { top: 24, right: 12, bottom: 36, left: 72 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const n = CWI_MATRIX_GROUPS.length;
  const gap = 4;

  // Bar widths proportional to fixed pop tiers when popEncoded, otherwise equal
  const logW = CWI_MATRIX_GROUPS.map((g) => cwiPopWidthFixed(g.pop));
  const sumW = d3.sum(logW);
  const bxPos = [], bxW = [];
  if (popEncoded) {
    let cx = 0;
    logW.forEach((w) => {
      const bw = Math.max(2, (w / sumW) * (innerW - gap * (n - 1)));
      bxPos.push(cx); bxW.push(bw); cx += bw + gap;
    });
  } else {
    const bw = (innerW - gap * (n - 1)) / n;
    CWI_MATRIX_GROUPS.forEach((_, i) => { bxPos.push(i * (bw + gap)); bxW.push(bw); });
  }

  const vals = CWI_MATRIX_GROUPS.map((g) => cwiMatrixMetricValue(snapshot, g, popEncoded));
  const dataMin = d3.min(vals);
  const dataMax = d3.max(vals);

  svg.attr("class", "cwi-svg").attr("viewBox", `0 0 ${width} ${height}`);
  svg.selectAll("*").remove();
  const defs = svg.append("defs");
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  const tooltip = d3.select("#cwi-tooltip");

  const addXLabels = () => CWI_MATRIX_GROUPS.forEach((grp, i) => {
    g.append("text").attr("x", bxPos[i] + bxW[i] / 2).attr("y", innerH + 18)
      .attr("text-anchor", "middle").attr("font-size", 7).attr("fill", "#495057").text(grp.label);
  });

  const barTip = (grp, v) => (ev) => {
    tooltip.html(`<strong style="color:${grp.color}">${grp.label}</strong><br>${fmtSEKAxis(v)}`)
      .style("display", "block").style("left", (ev.clientX + 14) + "px").style("top", (ev.clientY - 36) + "px");
  };
  const tipMove = (ev) => tooltip.style("left", (ev.clientX + 14) + "px").style("top", (ev.clientY - 36) + "px");
  const tipOut  = () => tooltip.style("display", "none");

  const drawRect = (parent, i, grp, v, barTop, barH) => {
    parent.append("rect")
      .attr("x", bxPos[i]).attr("y", barTop).attr("width", bxW[i]).attr("height", Math.max(1, barH))
      .attr("fill", grp.color).attr("rx", 2).style("cursor", "crosshair")
      .on("mouseover", barTip(grp, v)).on("mousemove", tipMove).on("mouseleave", tipOut);
  };

  // ── Scale break ──────────────────────────────────────────────────────
  if (yScaleType === "break") {
    // Use all-time data so every year snapshot shares identical break points and full domain
    const allDataRows = cwiMatrixSeries(metric);
    const allDataVals = allDataRows.flatMap((row) =>
      CWI_MATRIX_GROUPS.map((g) => cwiMatrixMetricValue(row, g, popEncoded))
    ).filter(Number.isFinite);
    const secondGrpB  = CWI_MATRIX_GROUPS[CWI_MATRIX_GROUPS.length - 2];
    const secondMax   = Math.max(0, d3.max(allDataRows.map((row) => cwiMatrixMetricValue(row, secondGrpB, popEncoded)).filter(Number.isFinite)) || 0);
    const breakLow    = secondMax * 1.15;
    const breakHigh   = secondMax * 1.80;
    const yMinFull    = Math.min(0, d3.min(allDataVals));
    const yMaxFull    = (d3.max(allDataVals) || dataMax) * 1.05;
    const breakPx   = 14;
    // Lower section gets 70% of height (like reference image), upper 30% compressed
    const splitY    = Math.round(innerH * 0.30);
    const yLo = d3.scaleLinear().domain([yMinFull, breakLow]).range([innerH, splitY + Math.ceil(breakPx / 2)]);
    const yHi = d3.scaleLinear().domain([breakHigh, yMaxFull]).range([splitY - Math.floor(breakPx / 2), 0]);
    const loId = `bvb-lo-${Math.random().toString(36).slice(2)}`;
    const hiId = `bvb-hi-${Math.random().toString(36).slice(2)}`;
    defs.append("clipPath").attr("id", loId).append("rect").attr("x", 0)
      .attr("y", splitY + Math.ceil(breakPx / 2)).attr("width", innerW)
      .attr("height", innerH - splitY - Math.ceil(breakPx / 2));
    defs.append("clipPath").attr("id", hiId).append("rect").attr("x", 0).attr("y", 0)
      .attr("width", innerW).attr("height", splitY - Math.floor(breakPx / 2));
    g.append("g").call(d3.axisLeft(yLo).ticks(5).tickFormat(fmtSEKAxis)).call((ax) => ax.select(".domain").remove());
    g.append("g").call(d3.axisLeft(yHi).ticks(2).tickFormat(fmtSEKAxis)).call((ax) => ax.select(".domain").remove());
    g.append("line").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", splitY - Math.floor(breakPx / 2)).attr("stroke", "#495057").attr("stroke-width", 1.5);
    g.append("line").attr("x1", 0).attr("x2", 0).attr("y1", splitY + Math.ceil(breakPx / 2)).attr("y2", innerH).attr("stroke", "#495057").attr("stroke-width", 1.5);
    const zigRow = (base) => [-8, 0, 8, 0, -8].map((dx, k) => `${dx},${base - 4 + k * 2}`).join(" ");
    g.append("polyline").attr("points", zigRow(splitY)).attr("fill", "none").attr("stroke", "#868e96").attr("stroke-width", 1.8).attr("stroke-linecap", "round");
    g.append("polyline").attr("points", zigRow(splitY + 8)).attr("fill", "none").attr("stroke", "#868e96").attr("stroke-width", 1.8).attr("stroke-linecap", "round");
    addXLabels();
    CWI_MATRIX_GROUPS.forEach((grp, i) => {
      const v = vals[i]; if (!Number.isFinite(v)) return;
      // Lower section: actual bar when v≤breakLow; stub bar to breakLow when v>breakLow
      // (stub shows that the bar continues above the break, matching reference-image convention)
      {
        const loV = Math.max(yMinFull, Math.min(breakLow, v));
        const bot = yLo(Math.min(0, yMinFull));
        const top = yLo(loV);
        if (Math.abs(top - bot) >= 1)
          drawRect(g.append("g").attr("clip-path", `url(#${loId})`), i, grp, v, Math.min(top, bot), Math.abs(top - bot));
      }
      // Upper section: only when value actually exceeds breakHigh
      if (v >= breakHigh) {
        const barTop = yHi(Math.min(yMaxFull, v));
        drawRect(g.append("g").attr("clip-path", `url(#${hiId})`), i, grp, v, barTop, yHi(breakHigh) - barTop);
      }
    });
    return;
  }

  // ── Logarithmic ──────────────────────────────────────────────────────
  if (yScaleType === "log") {
    const posVals = vals.filter((v) => Number.isFinite(v) && v > 0);
    const posMin = posVals.length ? Math.min(...posVals) * 0.5 : 1;
    // Use all-time max across every year so the axis is consistent per-year
    const allTimeMax = d3.max(
      cwiMatrixSeries(metric).flatMap((row) =>
        CWI_MATRIX_GROUPS.map((g) => cwiMatrixMetricValue(row, g, popEncoded))
      ).filter((v) => v > 0)
    ) || dataMax;
    const domainMax = Math.pow(10, Math.ceil(Math.log10(allTimeMax)));
    const y = d3.scaleLog().domain([Math.max(1, posMin), domainMax]).range([innerH, 0]).clamp(true);
    const clipId = `bvl-log-${Math.random().toString(36).slice(2)}`;
    defs.append("clipPath").attr("id", clipId).append("rect").attr("width", innerW).attr("height", innerH);
    g.append("g").call(d3.axisLeft(y).tickValues(cwiLogTicks(y)).tickFormat(fmtSEKAxis));
    addXLabels();
    const barsG = g.append("g").attr("clip-path", `url(#${clipId})`);
    CWI_MATRIX_GROUPS.forEach((grp, i) => {
      const v = vals[i]; if (!Number.isFinite(v) || v <= 0) return;
      drawRect(barsG, i, grp, v, y(v), innerH - y(v));
    });
    return;
  }

  // ── Linear (full range, zoom, or shared juxtaposition domain) ──────────
  const yMin = (yOverride?.min != null) ? yOverride.min : Math.min(0, dataMin);
  const yMax = (yOverride?.max != null) ? yOverride.max : dataMax * 1.05;
  const y = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]);
  const clipId = `bvl-lin-${Math.random().toString(36).slice(2)}`;
  defs.append("clipPath").attr("id", clipId).append("rect").attr("width", innerW).attr("height", innerH);
  g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(fmtSEKAxis));
  if (yMin < 0 && yMax > 0)
    g.append("line").attr("x1", 0).attr("x2", innerW).attr("y1", y(0)).attr("y2", y(0)).attr("stroke", "#adb5bd").attr("stroke-dasharray", "4 3");
  addXLabels();
  const barsG = g.append("g").attr("clip-path", `url(#${clipId})`);
  CWI_MATRIX_GROUPS.forEach((grp, i) => {
    const v = vals[i]; if (!Number.isFinite(v)) return;
    const cTop = Math.max(yMin, Math.min(yMax, v));
    const cBot = Math.max(yMin, Math.min(yMax, 0));
    drawRect(barsG, i, grp, v, y(Math.max(cTop, cBot)), Math.abs(y(cTop) - y(cBot)));
  });
}

function cwiMatrixRenderBars(root, years, comparison, popEncoded, metrics, axisOverride, yScaleType = "linear-zoom") {
  const makePair = (parent) => {
    if (metrics.length === 1) return parent;
    const d = document.createElement("div"); d.className = "cwi-grid-2"; parent.appendChild(d); return d;
  };

  // Juxtaposition: one vertical bar card per year — all cards share the same Y domain
  if (comparison === "juxtaposition") {
    // Shared domain across all selected years so bars are directly comparable
    const sharedVals = metrics.flatMap((m) =>
      years.flatMap((yr) => {
        const s = cwiMatrixSnapshot(m, yr);
        return s ? CWI_MATRIX_GROUPS.map((g) => cwiMatrixMetricValue(s, g, popEncoded)) : [];
      })
    ).filter(Number.isFinite);
    const sharedMin = Math.min(0, d3.min(sharedVals));
    const sharedMax = d3.max(sharedVals) * 1.05;
    // Zoom override only for linear-zoom; otherwise force shared domain
    const juxtaOverride = (yScaleType === "linear-zoom" && axisOverride?.max != null)
      ? axisOverride : { min: sharedMin, max: sharedMax };

    const grid = document.createElement("div");
    grid.className = "cwi-years-grid";
    root.appendChild(grid);
    years.forEach((year) => {
      const card = cwiMatrixMakeCard(grid, String(year));
      const pair = makePair(card);
      metrics.forEach((metric) => {
        const wrap = document.createElement("div");
        wrap.innerHTML = `<p class="cwi-chart-title">${metric === "income" ? "Income" : "Wealth"}</p>`;
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        wrap.appendChild(svg);
        pair.appendChild(wrap);
        cwiMatrixDrawBarsVertical(svg, cwiMatrixSnapshot(metric, year), metric, popEncoded, juxtaOverride, yScaleType);
      });
    });
    return;
  }

  // Superposition: all years as grouped vertical bars in one chart
  if (comparison === "superposition") {
    const pair = makePair(root);
    metrics.forEach((metric) => {
      const title = metric === "income" ? "Income by year (SEK)" : "Wealth by year (SEK)";
      const card  = cwiMatrixMakeCard(pair, title);
      const getValue = (snap, grp) => (!snap ? 0 : cwiMatrixMetricValue(snap, grp, popEncoded));
      const allVals = years.flatMap((yr) => CWI_MATRIX_GROUPS.map((g) => getValue(cwiMatrixSnapshot(metric, yr), g)));
      const dataMax = d3.max(allVals.map(Math.abs));
      const dataMin = Math.min(0, d3.min(allVals));

      const width = 700, height = 360;
      const margin = { top: 24, right: 16, bottom: 44, left: 78 };
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;
      const svgSel = d3.select(card).append("svg").attr("class", "cwi-svg").attr("viewBox", `0 0 ${width} ${height}`);
      const defs   = svgSel.append("defs");
      const g      = svgSel.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
      const x0     = d3.scaleBand().domain(years).range([0, innerW]).paddingInner(0.2);
      const tooltip = d3.select("#cwi-tooltip");

      g.append("g").attr("transform", `translate(0,${innerH})`).call(d3.axisBottom(x0).tickFormat(d3.format("d")));

      const gap        = 2;
      const n          = CWI_MATRIX_GROUPS.length;
      const logWeights = CWI_MATRIX_GROUPS.map((grp) => cwiPopWidthFixed(grp.pop));
      const sumLogW    = d3.sum(logWeights);

      const drawBandLinear = (clipId, y, yMin, yMax) => {
        const barsG = g.append("g").attr("clip-path", `url(#${clipId})`);
        years.forEach((yr) => {
          const snap = cwiMatrixSnapshot(metric, yr); if (!snap) return;
          const bandW  = x0.bandwidth();
          const availW = bandW - gap * n;
          let cx = x0(yr);
          CWI_MATRIX_GROUPS.forEach((grp, gi) => {
            const bw  = popEncoded ? Math.max((logWeights[gi] / sumLogW) * availW, 3) : Math.max(availW / n, 3);
            const val = getValue(snap, grp);
            const cTop = Math.max(yMin, Math.min(yMax, val));
            const cBot = Math.max(yMin, Math.min(yMax, 0));
            const barTop = y(Math.max(cTop, cBot));
            const barH   = Math.max(1, Math.abs(y(cTop) - y(cBot)));
            barsG.append("rect").attr("x", cx).attr("y", barTop).attr("width", bw).attr("height", barH)
              .attr("fill", grp.color).attr("rx", 2).attr("opacity", 0.85).style("cursor", "crosshair")
              .on("mouseover", (ev) => tooltip.html(`<strong style="color:${grp.color}">${grp.label}</strong><br>${yr}<br>${fmtSEKAxis(val)}`).style("display","block").style("left",(ev.clientX+14)+"px").style("top",(ev.clientY-36)+"px"))
              .on("mousemove", (ev) => tooltip.style("left",(ev.clientX+14)+"px").style("top",(ev.clientY-36)+"px"))
              .on("mouseleave", () => tooltip.style("display","none"));
            cx += bw + gap;
          });
        });
      };

      if (yScaleType === "break") {
        const secondGrp = CWI_MATRIX_GROUPS[CWI_MATRIX_GROUPS.length - 2];
        const secondMax = d3.max(years, (yr) => { const s = cwiMatrixSnapshot(metric, yr); return s ? cwiMatrixMetricValue(s, secondGrp, popEncoded) : 0; });
        const breakLow  = Math.max(0, secondMax) * 1.15;
        const breakHigh = Math.max(0, secondMax) * 1.80;
        const yMinFull  = Math.min(0, dataMin);
        const yMaxFull  = dataMax * 1.05;
        const breakPx   = 14;
        const splitY    = Math.round(innerH * 0.30);
        const yLo = d3.scaleLinear().domain([yMinFull, breakLow]).range([innerH, splitY + Math.ceil(breakPx / 2)]);
        const yHi = d3.scaleLinear().domain([breakHigh, yMaxFull]).range([splitY - Math.floor(breakPx / 2), 0]);
        const loId = `sp-brk-lo-${Math.random().toString(36).slice(2)}`;
        const hiId = `sp-brk-hi-${Math.random().toString(36).slice(2)}`;
        defs.append("clipPath").attr("id", loId).append("rect").attr("x", 0).attr("y", splitY + Math.ceil(breakPx / 2)).attr("width", innerW).attr("height", innerH - splitY - Math.ceil(breakPx / 2));
        defs.append("clipPath").attr("id", hiId).append("rect").attr("x", 0).attr("y", 0).attr("width", innerW).attr("height", splitY - Math.floor(breakPx / 2));
        g.append("g").call(d3.axisLeft(yLo).ticks(4).tickFormat(fmtSEKAxis)).call((ax) => ax.select(".domain").remove());
        g.append("g").call(d3.axisLeft(yHi).ticks(2).tickFormat(fmtSEKAxis)).call((ax) => ax.select(".domain").remove());
        g.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",splitY - Math.floor(breakPx/2)).attr("stroke","#495057").attr("stroke-width",1.5);
        g.append("line").attr("x1",0).attr("x2",0).attr("y1",splitY + Math.ceil(breakPx/2)).attr("y2",innerH).attr("stroke","#495057").attr("stroke-width",1.5);
        const zigRow = (base) => [-8,0,8,0,-8].map((dx,k)=>`${dx},${base-4+k*2}`).join(" ");
        g.append("polyline").attr("points",zigRow(splitY)).attr("fill","none").attr("stroke","#868e96").attr("stroke-width",1.8).attr("stroke-linecap","round");
        g.append("polyline").attr("points",zigRow(splitY+8)).attr("fill","none").attr("stroke","#868e96").attr("stroke-width",1.8).attr("stroke-linecap","round");
        drawBandLinear(loId, yLo, yMinFull, breakLow);
        drawBandLinear(hiId, yHi, breakHigh, yMaxFull);
      } else if (yScaleType === "log") {
        const posVals = allVals.filter((v) => v > 0);
        const posMin = posVals.length ? Math.min(...posVals) * 0.5 : 1;
        const allTimeMax = d3.max(
          cwiMatrixSeries(metric).flatMap((row) =>
            CWI_MATRIX_GROUPS.map((g) => cwiMatrixMetricValue(row, g, popEncoded))
          ).filter((v) => v > 0)
        ) || dataMax;
        const domainMax = Math.pow(10, Math.ceil(Math.log10(allTimeMax)));
        const y = d3.scaleLog().domain([Math.max(1, posMin), domainMax]).range([innerH, 0]).clamp(true);
        const clipId = `sp-log-${Math.random().toString(36).slice(2)}`;
        defs.append("clipPath").attr("id", clipId).append("rect").attr("width", innerW).attr("height", innerH);
        g.append("g").call(d3.axisLeft(y).tickValues(cwiLogTicks(y)).tickFormat(fmtSEKAxis));
        const barsG = g.append("g").attr("clip-path", `url(#${clipId})`);
        years.forEach((yr) => {
          const snap = cwiMatrixSnapshot(metric, yr); if (!snap) return;
          const bandW = x0.bandwidth(); const availW = bandW - gap * n;
          let cx = x0(yr);
          CWI_MATRIX_GROUPS.forEach((grp, gi) => {
            const bw  = popEncoded ? Math.max((logWeights[gi] / sumLogW) * availW, 3) : Math.max(availW / n, 3);
            const val = getValue(snap, grp);
            if (val > 0) {
              const barTop = y(val);
              barsG.append("rect").attr("x", cx).attr("y", barTop).attr("width", bw).attr("height", Math.max(1, innerH - barTop))
                .attr("fill", grp.color).attr("rx", 2).attr("opacity", 0.85).style("cursor", "crosshair")
                .on("mouseover", (ev) => tooltip.html(`<strong style="color:${grp.color}">${grp.label}</strong><br>${yr}<br>${fmtSEKAxis(val)}`).style("display","block").style("left",(ev.clientX+14)+"px").style("top",(ev.clientY-36)+"px"))
                .on("mousemove", (ev) => tooltip.style("left",(ev.clientX+14)+"px").style("top",(ev.clientY-36)+"px"))
                .on("mouseleave", () => tooltip.style("display","none"));
            }
            cx += bw + gap;
          });
        });
      } else {
        const yMin2 = (yScaleType === "linear-zoom" && axisOverride?.min != null) ? axisOverride.min : Math.min(0, dataMin);
        const yMax2 = (yScaleType === "linear-zoom" && axisOverride?.max != null) ? axisOverride.max : dataMax * 1.1;
        const y = d3.scaleLinear().domain([yMin2, yMax2]).range([innerH, 0]);
        const clipId = `sp-lin-${Math.random().toString(36).slice(2)}`;
        defs.append("clipPath").attr("id", clipId).append("rect").attr("width", innerW).attr("height", innerH);
        g.append("g").call(d3.axisLeft(y).ticks(6).tickFormat(fmtSEKAxis));
        if (yMin2 < 0 && yMax2 > 0)
          g.append("line").attr("x1",0).attr("x2",innerW).attr("y1",y(0)).attr("y2",y(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3");
        drawBandLinear(clipId, y, yMin2, yMax2);
      }
    });
    return;
  }

  // Animation: shared Y domain across all 6 animation years for consistent comparison
  const animYears = cwiMatrixAnimYears();
  const animVals = metrics.flatMap((m) =>
    animYears.flatMap((yr) => {
      const s = cwiMatrixSnapshot(m, yr);
      return s ? CWI_MATRIX_GROUPS.map((g) => cwiMatrixMetricValue(s, g, popEncoded)) : [];
    })
  ).filter(Number.isFinite);
  const animMin = Math.min(0, d3.min(animVals));
  const animMax = d3.max(animVals) * 1.05;
  const animOverride = (yScaleType === "linear-zoom" && axisOverride?.max != null)
    ? axisOverride : { min: animMin, max: animMax };

  cwiMatrixRenderAnimatedYears(root, animYears, (year, host) => {
    host.innerHTML = "";
    const pair = makePair(host);
    metrics.forEach((metric) => {
      const wrap = document.createElement("div");
      wrap.innerHTML = `<p class="cwi-chart-title">${metric === "income" ? "Income" : "Wealth"}</p>`;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      wrap.appendChild(svg);
      pair.appendChild(wrap);
      cwiMatrixDrawBarsVertical(svg, cwiMatrixSnapshot(metric, year), metric, popEncoded, animOverride, yScaleType);
    });
  }, "Animated bars");
}

// 4 clean power-of-10 tick values spread across [0, yMax] on a symlog scale
function cwiLineTicks(yMin, yMax) {
  const ticks = [];
  if (yMin < 0) ticks.push(yMin);
  ticks.push(0);
  if (yMax <= 0) return ticks;
  const loExp = Math.max(3, Math.log10(yMax) - 3);
  const hiExp = Math.log10(yMax);
  for (let i = 1; i <= 3; i++) {
    const v = Math.pow(10, Math.round(loExp + (hiExp - loExp) * i / 4));
    if (!ticks.includes(v) && v < yMax * 0.95) ticks.push(v);
  }
  return ticks;
}

// Small-multiples helper: shared Y domain, clean explicit symlog ticks
// Linear Y axis — shares the same [yMin, yMax] viewport as the superposition view.
function cwiMatrixDrawGroupLines(svgNode, group, metrics, popEncoded, highlightYears, yDomain, isOverride, yScaleType = "linear") {
  const svg = d3.select(svgNode);
  const width = 400, height = 250;
  const margin = { top: 14, right: 58, bottom: 30, left: 70 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const allYears = cwiMatrixCommonYears();
  const x = d3.scaleLinear().domain(d3.extent(allYears)).range([0, innerW]);

  // ── Scale break ──────────────────────────────────────────────────
  if (yScaleType === "break") {
    const refData   = cwiMatrixSeries(metrics[0]);
    const secondGrp = CWI_MATRIX_GROUPS[CWI_MATRIX_GROUPS.length - 2]; // Top 0.01%
    const secondMax = d3.max(refData, row => { const v = cwiMatrixMetricValue(row, secondGrp, popEncoded); return Number.isFinite(v) ? v : -Infinity; });
    const [rawMin, rawMax] = yDomain;
    const breakLow  = Math.max(0, secondMax) * 1.15;
    const breakHigh = Math.max(0, secondMax) * 1.80;
    const yMinFull  = Math.min(0, rawMin);
    const yMaxFull  = rawMax * 1.05;
    const breakPx = 14;
    const splitY  = Math.round(innerH * 0.62);
    const yLo = d3.scaleLinear().domain([yMinFull, breakLow]).range([innerH, splitY + Math.ceil(breakPx / 2)]);
    const yHi = d3.scaleLinear().domain([breakHigh, yMaxFull]).range([splitY - Math.floor(breakPx / 2), 0]);
    const yMap = (v) => {
      if (!Number.isFinite(v)) return null;
      if (v <= breakLow)  return yLo(Math.max(yMinFull, Math.min(breakLow, v)));
      if (v >= breakHigh) return yHi(Math.max(breakHigh, Math.min(yMaxFull, v)));
      return null;
    };
    svg.attr("class", "cwi-svg").attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove();
    const defs = svg.append("defs");
    const loId = `gl-lo-${group.key}-${Math.random().toString(36).slice(2)}`;
    const hiId = `gl-hi-${group.key}-${Math.random().toString(36).slice(2)}`;
    defs.append("clipPath").attr("id", loId).append("rect").attr("x", 0).attr("y", splitY + Math.ceil(breakPx / 2)).attr("width", innerW).attr("height", innerH - splitY - Math.ceil(breakPx / 2));
    defs.append("clipPath").attr("id", hiId).append("rect").attr("x", 0).attr("y", 0).attr("width", innerW).attr("height", splitY - Math.floor(breakPx / 2));
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    g.append("g").attr("transform", `translate(0,${innerH})`).call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d"))).call(ax => ax.selectAll("text").attr("font-size", 10));
    g.append("g").call(d3.axisLeft(yLo).ticks(3).tickFormat(fmtSEKAxis)).call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("text").attr("font-size", 10));
    g.append("g").call(d3.axisLeft(yHi).ticks(2).tickFormat(fmtSEKAxis)).call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("text").attr("font-size", 10));
    g.append("line").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", splitY - Math.floor(breakPx / 2)).attr("stroke", "#495057").attr("stroke-width", 1.5);
    g.append("line").attr("x1", 0).attr("x2", 0).attr("y1", splitY + Math.ceil(breakPx / 2)).attr("y2", innerH).attr("stroke", "#495057").attr("stroke-width", 1.5);
    const z1 = [-8,0,8,0,-8].map((dx,i) => `${dx},${splitY-5+i*2.5}`).join(" ");
    const z2 = [-8,0,8,0,-8].map((dx,i) => `${dx},${splitY+1+i*2.5}`).join(" ");
    g.append("polyline").attr("points", z1).attr("fill","none").attr("stroke","#868e96").attr("stroke-width",1.5).attr("stroke-linecap","round");
    g.append("polyline").attr("points", z2).attr("fill","none").attr("stroke","#868e96").attr("stroke-width",1.5).attr("stroke-linecap","round");
    if (yMinFull < 0) { const zy = yLo(0); if (zy > splitY && zy <= innerH) g.append("line").attr("x1",0).attr("x2",innerW).attr("y1",zy).attr("y2",zy).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"); }
    g.selectAll(".yr-mark").data(highlightYears).join("line").attr("class","yr-mark").attr("x1",d=>x(d)).attr("x2",d=>x(d)).attr("y1",0).attr("y2",innerH).attr("stroke","#dee2e6").attr("stroke-width",1.5);
    const sw = popEncoded ? cwiPopWidthFixed(group.pop) : 1.8;
    metrics.forEach((metric, mi) => {
      const data = cwiMatrixSeries(metric);
      const dash = mi === 1 ? "5 3" : null;
      const loLine = d3.line().defined(d => { const v = cwiMatrixMetricValue(d, group, popEncoded); return Number.isFinite(v) && v <= breakLow; }).x(d=>x(d.year)).y(d=>yLo(cwiMatrixMetricValue(d,group,popEncoded)));
      const hiLine = d3.line().defined(d => { const v = cwiMatrixMetricValue(d, group, popEncoded); return Number.isFinite(v) && v >= breakHigh; }).x(d=>x(d.year)).y(d=>yHi(cwiMatrixMetricValue(d,group,popEncoded)));
      g.append("path").datum(data).attr("fill","none").attr("stroke",group.color).attr("stroke-width",sw).attr("stroke-dasharray",dash).attr("d",loLine).attr("clip-path",`url(#${loId})`);
      g.append("path").datum(data).attr("fill","none").attr("stroke",group.color).attr("stroke-width",sw).attr("stroke-dasharray",dash).attr("d",hiLine).attr("clip-path",`url(#${hiId})`);
    });
    const lastRow = cwiMatrixSeries(metrics[0]).at(-1);
    if (lastRow) { const v = cwiMatrixMetricValue(lastRow, group, popEncoded); const ly = yMap(v); if (ly !== null) g.append("text").attr("x",innerW+4).attr("y",ly).attr("dy","0.35em").attr("font-size",10).attr("fill",group.color).text(fmtSEKAxis(v)); }
    const tip2   = d3.select("#cwi-tooltip");
    const allD   = cwiMatrixSeries(metrics[0]);
    const bis2   = d3.bisector(d=>d.year).left;
    const guide2 = g.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",innerH).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");
    g.append("rect").attr("width",innerW).attr("height",innerH).attr("fill","none").style("pointer-events","all").style("cursor","crosshair")
      .on("mousemove", event => {
        const [mx] = d3.pointer(event);
        const xVal = x.invert(mx);
        const i = bis2(allD, xVal);
        const d0 = allD[Math.max(0, i-1)], d1 = allD[Math.min(allD.length-1, i)];
        const row = (d1 && Math.abs(xVal-d1.year) < Math.abs(xVal-d0.year)) ? d1 : d0;
        if (!row) return;
        guide2.attr("x1",x(row.year)).attr("x2",x(row.year)).style("display",null);
        const lines = metrics.map(m => { const snap = cwiMatrixSeries(m).find(r=>r.year===row.year); const v = snap ? cwiMatrixMetricValue(snap,group,popEncoded) : null; return `${m}: ${v!=null?fmtSEKAxis(v):"n/a"}`; });
        tip2.html(`<strong style="color:${group.color}">${group.label}</strong> · ${row.year}<br>${lines.join("<br>")}`).style("display","block").style("left",(event.clientX+16)+"px").style("top",(event.clientY-50)+"px");
      })
      .on("mouseleave", () => { guide2.style("display","none"); tip2.style("display","none"); });
    return;
  }

  const [rawMin, rawMax] = yDomain;
  let y, yTicks, hasNeg;
  if (yScaleType === "log") {
    y = d3.scaleLog().domain([Math.max(1, rawMin), rawMax]).range([innerH, 0]).clamp(true);
    yTicks = cwiLogTicks(y);
    hasNeg = false;
  } else {
    const yMin = isOverride ? rawMin : Math.min(0, rawMin);
    const yMax = isOverride ? rawMax : rawMax * 1.08;
    hasNeg = yMin < 0;
    y = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]);
    yTicks = y.ticks(4);
  }

  svg.attr("class", "cwi-svg").attr("viewBox", `0 0 ${width} ${height}`);
  svg.selectAll("*").remove();
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  g.selectAll("line.hg").data(yTicks).join("line").attr("class", "hg")
    .attr("x1", 0).attr("x2", innerW).attr("y1", (v) => y(v)).attr("y2", (v) => y(v))
    .attr("stroke", "#e8eaed").attr("stroke-width", 0.8);

  g.append("g").attr("transform", `translate(0,${innerH})`)
    .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")))
    .call((ax) => ax.selectAll("text").attr("font-size", 10));
  g.append("g")
    .call(d3.axisLeft(y).tickValues(yTicks).tickFormat(fmtSEKAxis))
    .call((ax) => ax.selectAll("text").attr("font-size", 10));

  if (hasNeg) {
    g.append("line").attr("x1", 0).attr("x2", innerW).attr("y1", y(0)).attr("y2", y(0))
      .attr("stroke", "#adb5bd").attr("stroke-dasharray", "4 3");
  }

  g.selectAll(".yr-mark").data(highlightYears).join("line").attr("class", "yr-mark")
    .attr("x1", (d) => x(d)).attr("x2", (d) => x(d)).attr("y1", 0).attr("y2", innerH)
    .attr("stroke", "#dee2e6").attr("stroke-width", 1.5);

  const sw = popEncoded ? cwiPopWidthFixed(group.pop) : 1.8;
  metrics.forEach((metric, mi) => {
    const data = cwiMatrixSeries(metric);
    const lineGen = d3.line()
      .defined((d) => { const v = cwiMatrixMetricValue(d, group, popEncoded); return Number.isFinite(v) && (yScaleType !== "log" || v > 0); })
      .x((d) => x(d.year)).y((d) => y(cwiMatrixMetricValue(d, group, popEncoded)));
    g.append("path").datum(data).attr("fill", "none")
      .attr("stroke", group.color).attr("stroke-width", sw)
      .attr("stroke-dasharray", mi === 1 ? "5 3" : null).attr("d", lineGen);
  });

  const lastRow = cwiMatrixSeries(metrics[0]).at(-1);
  if (lastRow) {
    const v = cwiMatrixMetricValue(lastRow, group, popEncoded);
    if (Number.isFinite(v)) {
      g.append("text").attr("x", innerW + 4).attr("y", y(v)).attr("dy", "0.35em")
        .attr("font-size", 10).attr("fill", group.color).text(fmtSEKAxis(v));
    }
  }

  // ── Crosshair + tooltip ──────────────────────────────────────────────
  const tooltip2 = d3.select("#cwi-tooltip");
  const allData  = cwiMatrixSeries(metrics[0]);
  const bisect2  = d3.bisector((d) => d.year).left;
  const guide2   = g.append("line")
    .attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", innerH)
    .attr("stroke", "#6c757d").attr("stroke-dasharray", "3 3")
    .attr("pointer-events", "none").style("display", "none");
  g.append("rect")
    .attr("width", innerW).attr("height", innerH)
    .attr("fill", "none").style("pointer-events", "all").style("cursor", "crosshair")
    .on("mousemove", (event) => {
      const [mx] = d3.pointer(event);
      const xVal = x.invert(mx);
      const i   = bisect2(allData, xVal);
      const d0  = allData[Math.max(0, i - 1)];
      const d1  = allData[Math.min(allData.length - 1, i)];
      const row = (d1 && Math.abs(xVal - d1.year) < Math.abs(xVal - d0.year)) ? d1 : d0;
      if (!row) return;
      guide2.attr("x1", x(row.year)).attr("x2", x(row.year)).style("display", null);
      const lines = metrics.map((m) => {
        const snap = cwiMatrixSeries(m).find((r) => r.year === row.year);
        const v    = snap ? cwiMatrixMetricValue(snap, group, popEncoded) : null;
        return `${m}: ${v != null ? fmtSEKAxis(v) : "n/a"}`;
      });
      tooltip2.html(`<strong style="color:${group.color}">${group.label}</strong> · ${row.year}<br>${lines.join("<br>")}`)
        .style("display", "block")
        .style("left", (event.clientX + 16) + "px").style("top", (event.clientY - 50) + "px");
    })
    .on("mouseleave", () => { guide2.style("display", "none"); tooltip2.style("display", "none"); });
}

// Linear Y axis — caller may supply a viewport window {min, max}.
// Lines are clipped to the window so off-screen groups don't distort ticks.
function cwiMatrixDrawLines(svgNode, metric, popEncoded, highlightYears, yDomainOverride, yScaleType = "linear") {
  const data = cwiMatrixSeries(metric);
  const svg = d3.select(svgNode);
  const width = 620, height = 340;
  const margin = { top: 20, right: 110, bottom: 28, left: 80 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const allValues = data.flatMap((row) =>
    CWI_MATRIX_GROUPS.map((group) => cwiMatrixMetricValue(row, group, popEncoded))
  ).filter(Number.isFinite);
  const dataMin = d3.min(allValues);
  const dataMax = d3.max(allValues);

  // ── Scale break mode ──────────────────────────────────────────────
  if (yScaleType === "break") {
    // Break strategy: lower section shows every group except T0.001%,
    // upper section shows only T0.001% in its high-value range.
    // breakLow  = 15% above the 2nd-richest group's all-time peak (T0.01%)
    // breakHigh = 80% above that same peak — narrow gap keeps T0.001% visible
    const secondGrp = CWI_MATRIX_GROUPS[CWI_MATRIX_GROUPS.length - 2]; // T0.01%
    const secondMax = d3.max(data, (row) => {
      const v = cwiMatrixMetricValue(row, secondGrp, popEncoded);
      return Number.isFinite(v) ? v : -Infinity;
    });
    const breakLow  = Math.max(0, secondMax) * 1.15;
    const breakHigh = Math.max(0, secondMax) * 1.80;
    const yMinFull  = Math.min(0, dataMin);
    const yMaxFull  = dataMax * 1.05;

    const breakPx = 14;
    const splitY  = Math.round(innerH * 0.62); // lower section gets 62% of height
    const yLo = d3.scaleLinear().domain([yMinFull, breakLow]).range([innerH, splitY + Math.ceil(breakPx / 2)]);
    const yHi = d3.scaleLinear().domain([breakHigh, yMaxFull]).range([splitY - Math.floor(breakPx / 2), 0]);

    const yMap = (v) => {
      if (!Number.isFinite(v)) return null;
      if (v <= breakLow)  return yLo(Math.max(yMinFull, Math.min(breakLow, v)));
      if (v >= breakHigh) return yHi(Math.max(breakHigh, Math.min(yMaxFull, v)));
      return null;
    };

    svg.attr("class", "cwi-svg").attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove();
    const defs = svg.append("defs");
    const loClipId = `brk-lo-${metric}`;
    defs.append("clipPath").attr("id", loClipId)
      .append("rect").attr("x", 0).attr("y", splitY + Math.ceil(breakPx / 2))
      .attr("width", innerW).attr("height", innerH - splitY - Math.ceil(breakPx / 2));
    const hiClipId = `brk-hi-${metric}`;
    defs.append("clipPath").attr("id", hiClipId)
      .append("rect").attr("x", 0).attr("y", 0)
      .attr("width", innerW).attr("height", splitY - Math.floor(breakPx / 2));

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    const x = d3.scaleLinear().domain(d3.extent(data, (d) => d.year)).range([0, innerW]);

    g.append("g").attr("transform", `translate(0,${innerH})`).call(d3.axisBottom(x).tickFormat(d3.format("d")));
    g.append("g").call(d3.axisLeft(yLo).ticks(4).tickFormat(fmtSEKAxis))
      .call((ax) => ax.select(".domain").remove());
    g.append("g").call(d3.axisLeft(yHi).ticks(3).tickFormat(fmtSEKAxis))
      .call((ax) => ax.select(".domain").remove());

    // Y axis: two segments with a visible gap between them
    g.append("line").attr("x1", 0).attr("x2", 0).attr("y1", 0)
      .attr("y2", splitY - Math.floor(breakPx / 2)).attr("stroke", "#495057").attr("stroke-width", 1.5);
    g.append("line").attr("x1", 0).attr("x2", 0)
      .attr("y1", splitY + Math.ceil(breakPx / 2)).attr("y2", innerH).attr("stroke", "#495057").attr("stroke-width", 1.5);

    // Zig-zag break indicator on the Y-axis (standard scale break symbol)
    const zigY = splitY;
    const zigPts = [-10, 0, 10, 0, -10].map((dx, i) => `${dx},${zigY - 6 + i * 3}`).join(" ");
    const zigPts2 = [-10, 0, 10, 0, -10].map((dx, i) => `${dx},${zigY + 1 + i * 3}`).join(" ");
    g.append("polyline").attr("points", zigPts).attr("fill", "none")
      .attr("stroke", "#868e96").attr("stroke-width", 1.8).attr("stroke-linecap", "round");
    g.append("polyline").attr("points", zigPts2).attr("fill", "none")
      .attr("stroke", "#868e96").attr("stroke-width", 1.8).attr("stroke-linecap", "round");

    if (yMinFull < 0) {
      const zeroY = yLo(0);
      if (zeroY > splitY && zeroY <= innerH)
        g.append("line").attr("x1", 0).attr("x2", innerW).attr("y1", zeroY).attr("y2", zeroY)
          .attr("stroke", "#adb5bd").attr("stroke-dasharray", "4 3");
    }
    g.selectAll(".yr-mark").data(highlightYears).join("line").attr("class", "yr-mark")
      .attr("x1", (d) => x(d)).attr("x2", (d) => x(d)).attr("y1", 0).attr("y2", innerH)
      .attr("stroke", "#f1f3f5");

    CWI_MATRIX_GROUPS.forEach((group) => {
      const sw = popEncoded ? cwiPopWidthFixed(group.pop) : 2;
      const loLine = d3.line()
        .defined((d) => { const v = cwiMatrixMetricValue(d, group, popEncoded); return Number.isFinite(v) && v <= breakLow; })
        .x((d) => x(d.year)).y((d) => yLo(cwiMatrixMetricValue(d, group, popEncoded)));
      g.append("path").datum(data).attr("fill", "none").attr("stroke", group.color)
        .attr("stroke-width", sw).attr("d", loLine).attr("clip-path", `url(#${loClipId})`);

      const hiLine = d3.line()
        .defined((d) => { const v = cwiMatrixMetricValue(d, group, popEncoded); return Number.isFinite(v) && v >= breakHigh; })
        .x((d) => x(d.year)).y((d) => yHi(cwiMatrixMetricValue(d, group, popEncoded)));
      g.append("path").datum(data).attr("fill", "none").attr("stroke", group.color)
        .attr("stroke-width", sw).attr("d", hiLine).attr("clip-path", `url(#${hiClipId})`);

      const last = data[data.length - 1];
      const labelY = yMap(cwiMatrixMetricValue(last, group, popEncoded));
      if (labelY !== null)
        g.append("text").attr("x", innerW + 5).attr("y", labelY).attr("dy", "0.35em")
          .attr("font-size", 10).attr("fill", group.color).text(group.label);
    });

    const tooltip = d3.select("#cwi-tooltip");
    const bisect  = d3.bisector((d) => d.year).left;
    const guide   = g.append("line").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", innerH)
      .attr("stroke", "#6c757d").attr("stroke-dasharray", "3 3").attr("pointer-events", "none").style("display", "none");
    g.append("rect").attr("width", innerW).attr("height", innerH)
      .attr("fill", "none").style("pointer-events", "all").style("cursor", "crosshair")
      .on("mousemove", (event) => {
        const [mx] = d3.pointer(event);
        const xVal = x.invert(mx);
        const i  = bisect(data, xVal);
        const d0 = data[Math.max(0, i - 1)];
        const d1 = data[Math.min(data.length - 1, i)];
        const row = (d1 && Math.abs(xVal - d1.year) < Math.abs(xVal - d0.year)) ? d1 : d0;
        if (!row) return;
        guide.attr("x1", x(row.year)).attr("x2", x(row.year)).style("display", null);
        const html = `<strong>${row.year}</strong><br>` +
          CWI_MATRIX_GROUPS.map((grp) => {
            const v = cwiMatrixMetricValue(row, grp, popEncoded);
            return `<span style="color:${grp.color}">${grp.label}</span>: ${fmtSEKAxis(v)}`;
          }).join("<br>");
        tooltip.html(html).style("display", "block")
          .style("left", (event.clientX + 16) + "px").style("top", (event.clientY - 60) + "px");
      })
      .on("mouseleave", () => { guide.style("display", "none"); tooltip.style("display", "none"); });
    return;
  }
  // ── Logarithmic scale mode ─────────────────────────────────────────
  if (yScaleType === "log") {
    const posVals = allValues.filter((v) => Number.isFinite(v) && v > 0);
    const posMin = posVals.length ? Math.min(...posVals) * 0.5 : 1;
    const allTimeMax = d3.max(
      cwiMatrixSeries(metric).flatMap((row) =>
        CWI_MATRIX_GROUPS.map((g) => cwiMatrixMetricValue(row, g, popEncoded))
      ).filter((v) => v > 0)
    ) || dataMax;
    const domainMax = Math.pow(10, Math.ceil(Math.log10(allTimeMax)));
    const x = d3.scaleLinear().domain(d3.extent(data, (d) => d.year)).range([0, innerW]);
    const y = d3.scaleLog().domain([Math.max(1, posMin), domainMax]).range([innerH, 0]).clamp(true);
    svg.attr("class", "cwi-svg").attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove();
    const defs = svg.append("defs");
    const clipId = `clip-log-ln-${metric}-${Math.random().toString(36).slice(2)}`;
    defs.append("clipPath").attr("id", clipId).append("rect").attr("width", innerW).attr("height", innerH);
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    g.append("g").attr("transform", `translate(0,${innerH})`).call(d3.axisBottom(x).tickFormat(d3.format("d")));
    g.append("g").call(d3.axisLeft(y).tickValues(cwiLogTicks(y)).tickFormat(fmtSEKAxis));
    g.selectAll(".year-mark").data(highlightYears).join("line").attr("class", "year-mark")
      .attr("x1", (d) => x(d)).attr("x2", (d) => x(d)).attr("y1", 0).attr("y2", innerH).attr("stroke", "#f1f3f5");
    const linesG = g.append("g").attr("clip-path", `url(#${clipId})`);
    CWI_MATRIX_GROUPS.forEach((group) => {
      const lineGen = d3.line()
        .defined((d) => { const v = cwiMatrixMetricValue(d, group, popEncoded); return Number.isFinite(v) && v > 0; })
        .x((d) => x(d.year)).y((d) => y(cwiMatrixMetricValue(d, group, popEncoded)));
      linesG.append("path").datum(data).attr("fill", "none").attr("stroke", group.color)
        .attr("stroke-width", popEncoded ? cwiPopWidthFixed(group.pop) : 2).attr("d", lineGen);
      const last = data[data.length - 1];
      const lastVal = cwiMatrixMetricValue(last, group, popEncoded);
      if (Number.isFinite(lastVal) && lastVal > 0)
        g.append("text").attr("x", innerW + 5).attr("y", y(lastVal)).attr("dy", "0.35em")
          .attr("font-size", 10).attr("fill", group.color).text(group.label);
    });
    const tooltip = d3.select("#cwi-tooltip");
    const bisect  = d3.bisector((d) => d.year).left;
    const guide   = g.append("line").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", innerH)
      .attr("stroke", "#6c757d").attr("stroke-dasharray", "3 3").attr("pointer-events", "none").style("display", "none");
    g.append("rect").attr("width", innerW).attr("height", innerH)
      .attr("fill", "none").style("pointer-events", "all").style("cursor", "crosshair")
      .on("mousemove", (event) => {
        const [mx] = d3.pointer(event);
        const xVal = x.invert(mx);
        const i  = bisect(data, xVal);
        const d0 = data[Math.max(0, i - 1)];
        const d1 = data[Math.min(data.length - 1, i)];
        const row = (d1 && Math.abs(xVal - d1.year) < Math.abs(xVal - d0.year)) ? d1 : d0;
        if (!row) return;
        guide.attr("x1", x(row.year)).attr("x2", x(row.year)).style("display", null);
        const html = `<strong>${row.year}</strong><br>` +
          CWI_MATRIX_GROUPS.map((grp) => {
            const v = cwiMatrixMetricValue(row, grp, popEncoded);
            return `<span style="color:${grp.color}">${grp.label}</span>: ${Number.isFinite(v) && v > 0 ? fmtSEKAxis(v) : "≤ 0 (not on log scale)"}`;
          }).join("<br>");
        tooltip.html(html).style("display", "block")
          .style("left", (event.clientX + 16) + "px").style("top", (event.clientY - 60) + "px");
      })
      .on("mouseleave", () => { guide.style("display", "none"); tooltip.style("display", "none"); });
    return;
  }

  // ── Linear scale mode (existing code below) ──────────────────────

  // Viewport: override or natural full range
  const yMin = yDomainOverride?.min != null ? yDomainOverride.min : Math.min(0, dataMin);
  const yMax = yDomainOverride?.max != null ? yDomainOverride.max : dataMax * 1.05;

  // Always linear — the user zooms the window, not the scale
  const x = d3.scaleLinear().domain(d3.extent(data, (d) => d.year)).range([0, innerW]);
  const y = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]);

  svg.attr("class", "cwi-svg").attr("viewBox", `0 0 ${width} ${height}`);
  svg.selectAll("*").remove();
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  // Clip rect so lines outside the window are hidden
  const clipId = `clip-line-${metric}`;
  svg.append("defs").append("clipPath").attr("id", clipId)
    .append("rect").attr("width", innerW).attr("height", innerH);

  g.append("g").attr("transform", `translate(0,${innerH})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));
  g.append("g").call(d3.axisLeft(y).ticks(6).tickFormat(fmtSEKAxis));

  // Zero line (relevant for wealth with negative bottom50)
  if (yMin < 0 && yMax > 0) {
    g.append("line")
      .attr("x1", 0).attr("x2", innerW)
      .attr("y1", y(0)).attr("y2", y(0))
      .attr("stroke", "#adb5bd").attr("stroke-dasharray", "4 3");
  }

  g.selectAll(".year-mark").data(highlightYears).join("line")
    .attr("x1", (d) => x(d)).attr("x2", (d) => x(d))
    .attr("y1", 0).attr("y2", innerH).attr("stroke", "#f1f3f5");

  const linesG = g.append("g").attr("clip-path", `url(#${clipId})`);
  CWI_MATRIX_GROUPS.forEach((group) => {
    const lineGen = d3.line()
      .defined((d) => Number.isFinite(cwiMatrixMetricValue(d, group, popEncoded)))
      .x((d) => x(d.year))
      .y((d) => y(cwiMatrixMetricValue(d, group, popEncoded)));
    linesG.append("path").datum(data)
      .attr("fill", "none").attr("stroke", group.color)
      .attr("stroke-width", popEncoded ? cwiPopWidthFixed(group.pop) : 2)
      .attr("d", lineGen);
    // End label — only when the 2024 value is within the current window
    const last = data[data.length - 1];
    const lastVal = cwiMatrixMetricValue(last, group, popEncoded);
    if (Number.isFinite(lastVal) && lastVal >= yMin && lastVal <= yMax) {
      g.append("text")
        .attr("x", innerW + 5).attr("y", y(lastVal))
        .attr("dy", "0.35em").attr("font-size", 10).attr("fill", group.color)
        .text(group.label);
    }
  });

  // ── Crosshair + tooltip ──────────────────────────────────────────────
  const tooltip = d3.select("#cwi-tooltip");
  const bisect  = d3.bisector((d) => d.year).left;
  const guide   = g.append("line")
    .attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", innerH)
    .attr("stroke", "#6c757d").attr("stroke-dasharray", "3 3")
    .attr("pointer-events", "none").style("display", "none");
  g.append("rect")
    .attr("width", innerW).attr("height", innerH)
    .attr("fill", "none").style("pointer-events", "all").style("cursor", "crosshair")
    .on("mousemove", (event) => {
      const [mx] = d3.pointer(event);
      const xVal = x.invert(mx);
      const i  = bisect(data, xVal);
      const d0 = data[Math.max(0, i - 1)];
      const d1 = data[Math.min(data.length - 1, i)];
      const row = (d1 && Math.abs(xVal - d1.year) < Math.abs(xVal - d0.year)) ? d1 : d0;
      if (!row) return;
      guide.attr("x1", x(row.year)).attr("x2", x(row.year)).style("display", null);
      const html = `<strong>${row.year}</strong><br>` +
        CWI_MATRIX_GROUPS.map((grp) => {
          const v = cwiMatrixMetricValue(row, grp, popEncoded);
          return `<span style="color:${grp.color}">${grp.label}</span>: ${fmtSEKAxis(v)}`;
        }).join("<br>");
      tooltip.html(html).style("display", "block")
        .style("left", (event.clientX + 16) + "px").style("top", (event.clientY - 60) + "px");
    })
    .on("mouseleave", () => { guide.style("display", "none"); tooltip.style("display", "none"); });
}

function cwiMatrixRenderLines(root, years, comparison, popEncoded, metrics, yDomainOverride, yScaleType = "linear") {
  const makePair = (parent) => {
    if (metrics.length === 1) return parent;
    const d = document.createElement("div"); d.className = "cwi-grid-2"; parent.appendChild(d); return d;
  };
  if (comparison === "juxtaposition") {
    // Small multiples: one panel per group, all sharing the same Y axis domain
    const incData = metrics.includes("income") ? cwiMatrixSeries("income") : [];
    const wData   = metrics.includes("wealth")  ? cwiMatrixSeries("wealth")  : [];
    const allVals = [
      ...incData.flatMap((row) => CWI_MATRIX_GROUPS.map((g) => cwiMatrixMetricValue(row, g, popEncoded))),
      ...wData.flatMap((row)   => CWI_MATRIX_GROUPS.map((g) => cwiMatrixMetricValue(row, g, popEncoded)))
    ].filter(Number.isFinite);
    const dataMin = d3.min(allVals);
    const dataMax = d3.max(allVals);
    // Apply user overrides for the shared Y domain
    let isOv, yDomain;
    if (yScaleType === "log") {
      const posVals = allVals.filter((v) => v > 0);
      const posMin = posVals.length ? Math.min(...posVals) : 1;
      const posMax = d3.max(posVals) || 1;
      const domainMax = Math.pow(10, Math.ceil(Math.log10(posMax)));
      yDomain = [Math.max(1, posMin * 0.8), domainMax];
      isOv = true;
    } else {
      isOv = yDomainOverride?.min != null || yDomainOverride?.max != null;
      yDomain = [
        yDomainOverride?.min != null ? yDomainOverride.min : dataMin,
        yDomainOverride?.max != null ? yDomainOverride.max : dataMax
      ];
    }
    if (metrics.length > 1) {
      const hint = document.createElement("p");
      hint.className = "cwi-note";
      hint.textContent = "Solid line = income · Dashed line = wealth. All panels share the same Y axis.";
      root.appendChild(hint);
    }
    const grid = document.createElement("div");
    grid.className = "cwi-sm-grid";
    root.appendChild(grid);
    CWI_MATRIX_GROUPS.forEach((group) => {
      const card = cwiMatrixMakeCard(grid, group.label);
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      card.appendChild(svg);
      cwiMatrixDrawGroupLines(svg, group, metrics, popEncoded, years, yDomain, isOv, yScaleType);
    });
    return;
  }
  if (metrics.length === 1) {
    const card = cwiMatrixMakeCard(root, metrics[0] === "income" ? "Income over time" : "Wealth over time");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    card.appendChild(svg);
    cwiMatrixDrawLines(svg, metrics[0], popEncoded, years, yDomainOverride, yScaleType);
    return;
  }
  // superposition + both metrics: indexed comparison
  const card = cwiMatrixMakeCard(root, "Superposed indexed lines (income solid, wealth dashed)");
  const legend = document.createElement("div");
  legend.className = "cwi-inline-legend";
  legend.innerHTML = '<span><i style="background:#495057"></i><span>Income solid</span></span><span><i style="background:#ffffff;border:2px dashed #495057"></i><span>Wealth dashed, indexed to 100</span></span>';
  card.appendChild(legend);
  const svg = d3.select(card).append("svg").attr("class", "cwi-svg tall");
  const width = 840;
  const height = 380;
  const margin = { top: 20, right: 120, bottom: 28, left: 70 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const yearsAll = cwiMatrixCommonYears();
  const rows = yearsAll.map((year) => ({ year, income: cwiMatrixSnapshot("income", year), wealth: cwiMatrixSnapshot("wealth", year) }));
  const x = d3.scaleLinear().domain(d3.extent(yearsAll)).range([0, innerW]);
  const y = d3.scaleLinear().domain([0, 260]).range([innerH, 0]);
  svg.attr("viewBox", `0 0 ${width} ${height}`);
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  g.append("g").attr("transform", `translate(0,${innerH})`).call(d3.axisBottom(x).tickFormat(d3.format("d")));
  g.append("g").call(d3.axisLeft(y).ticks(6).tickFormat((d) => `${Math.round(d)}%`));
  CWI_MATRIX_GROUPS.forEach((group) => {
    const baseIncome = Math.abs(cwiMatrixMetricValue(rows[0].income, group, popEncoded)) || 1;
    const baseWealth = Math.abs(cwiMatrixMetricValue(rows[0].wealth, group, popEncoded)) || 1;
    const incomeLine = d3.line().x((d) => x(d.year)).y((d) => y((Math.abs(cwiMatrixMetricValue(d.income, group, popEncoded)) / baseIncome) * 100));
    const wealthLine = d3.line().x((d) => x(d.year)).y((d) => y((Math.abs(cwiMatrixMetricValue(d.wealth, group, popEncoded)) / baseWealth) * 100));
    const sw = popEncoded ? cwiPopWidth(group.pop, 1, 7) : 2;
    g.append("path").datum(rows).attr("fill", "none").attr("stroke", group.color).attr("stroke-width", sw).attr("d", incomeLine);
    g.append("path").datum(rows).attr("fill", "none").attr("stroke", group.color).attr("stroke-width", sw).attr("stroke-dasharray", "5 4").attr("opacity", 0.85).attr("d", wealthLine);
  });
}

function cwiMatrixDrawGroupArea(svgNode, group, metrics, popEncoded, highlightYears, yDomain, isOverride) {
  const svg = d3.select(svgNode);
  const width = 400, height = 250;
  const margin = { top: 14, right: 58, bottom: 30, left: 70 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const allYears = cwiMatrixCommonYears();
  const x = d3.scaleLinear().domain(d3.extent(allYears)).range([0, innerW]);

  const [rawMin, rawMax] = yDomain;
  const yMin = isOverride ? rawMin : Math.min(0, rawMin);
  const yMax = isOverride ? rawMax : rawMax * 1.08;
  const y = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]);
  const yTicks = y.ticks(4);

  svg.attr("class", "cwi-svg").attr("viewBox", `0 0 ${width} ${height}`);
  svg.selectAll("*").remove();

  const clipId = `clip-ga-${group.key}-${Math.random().toString(36).slice(2)}`;
  svg.append("defs").append("clipPath").attr("id", clipId)
    .append("rect").attr("width", innerW).attr("height", innerH);

  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  g.selectAll("line.hg").data(yTicks).join("line").attr("class", "hg")
    .attr("x1", 0).attr("x2", innerW).attr("y1", (v) => y(v)).attr("y2", (v) => y(v))
    .attr("stroke", "#e8eaed").attr("stroke-width", 0.8);

  g.append("g").attr("transform", `translate(0,${innerH})`)
    .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")))
    .call((ax) => ax.selectAll("text").attr("font-size", 10));
  g.append("g")
    .call(d3.axisLeft(y).tickValues(yTicks).tickFormat(fmtSEKAxis))
    .call((ax) => ax.selectAll("text").attr("font-size", 10));

  if (yMin < 0 && yMax > 0) {
    g.append("line").attr("x1", 0).attr("x2", innerW).attr("y1", y(0)).attr("y2", y(0))
      .attr("stroke", "#adb5bd").attr("stroke-dasharray", "4 3");
  }

  g.selectAll(".yr-mark").data(highlightYears).join("line").attr("class", "yr-mark")
    .attr("x1", (d) => x(d)).attr("x2", (d) => x(d)).attr("y1", 0).attr("y2", innerH)
    .attr("stroke", "#dee2e6").attr("stroke-width", 1.5);

  const areasG = g.append("g").attr("clip-path", `url(#${clipId})`);
  metrics.forEach((metric, mi) => {
    const data = cwiMatrixSeries(metric);
    const areaFn = d3.area()
      .x((d) => x(d.year))
      .y0(y(Math.max(yMin, Math.min(yMax, 0))))
      .y1((d) => y(Math.max(yMin, Math.min(yMax, d.values[group.key] || 0))));
    areasG.append("path").datum(data)
      .attr("fill", group.color)
      .attr("opacity", mi === 0 ? 0.72 : 0.42)
      .attr("stroke-dasharray", mi === 1 ? "5 3" : null)
      .attr("d", areaFn);
  });

  const lastRow = cwiMatrixSeries(metrics[0]).at(-1);
  if (lastRow) {
    const v = lastRow.values[group.key] || 0;
    if (Number.isFinite(v) && v >= yMin && v <= yMax) {
      g.append("text").attr("x", innerW + 4).attr("y", y(v)).attr("dy", "0.35em")
        .attr("font-size", 10).attr("fill", group.color).text(fmtSEKAxis(v));
    }
  }

  // Tooltip
  const tooltip = d3.select("#cwi-tooltip");
  const allData = cwiMatrixSeries(metrics[0]);
  const bisect  = d3.bisector((d) => d.year).left;
  const guide   = g.append("line")
    .attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", innerH)
    .attr("stroke", "#6c757d").attr("stroke-dasharray", "3 3")
    .attr("pointer-events", "none").style("display", "none");
  g.append("rect")
    .attr("width", innerW).attr("height", innerH)
    .attr("fill", "none").style("pointer-events", "all").style("cursor", "crosshair")
    .on("mousemove", (event) => {
      const [mx] = d3.pointer(event);
      const xVal = x.invert(mx);
      const i   = bisect(allData, xVal);
      const d0  = allData[Math.max(0, i - 1)];
      const d1  = allData[Math.min(allData.length - 1, i)];
      const row = (d1 && Math.abs(xVal - d1.year) < Math.abs(xVal - d0.year)) ? d1 : d0;
      if (!row) return;
      guide.attr("x1", x(row.year)).attr("x2", x(row.year)).style("display", null);
      const lines = metrics.map((m) => {
        const snap = cwiMatrixSeries(m).find((r) => r.year === row.year);
        const v    = snap ? (snap.values[group.key] || 0) : null;
        return `${m}: ${v != null ? fmtSEKAxis(v) : "n/a"}`;
      });
      tooltip.html(`<strong style="color:${group.color}">${group.label}</strong> · ${row.year}<br>${lines.join("<br>")}`)
        .style("display", "block")
        .style("left", (event.clientX + 16) + "px").style("top", (event.clientY - 50) + "px");
    })
    .on("mouseleave", () => { guide.style("display", "none"); tooltip.style("display", "none"); });
}

function cwiMatrixRenderStacked(root, years, comparison, popEncoded, metrics, yDomainOverride) {
  // Cumulative stacking: each group's band goes from the running cumulative sum
  // to cumsum + its per-person value. The chart top = sum of all groups' values.
  // No middle40 band — only the 6 named groups are shown.
  const getStacks = (row) => {
    let cum = 0;
    return CWI_MATRIX_GROUPS.map((grp) => {
      const v = row.values[grp.key] || 0;
      const y0 = cum;
      cum += v;
      return { grp, y0, y1: cum };
    });
  };

  const drawAreas = (svgNode, metric) => {
    const data = cwiMatrixSeries(metric);
    const lastRow = data[data.length - 1];

    // Y domain from cumulative stacked values
    const allStackVals = data.flatMap((row) =>
      getStacks(row).flatMap((s) => [s.y0, s.y1])
    );
    const rawMin = d3.min(allStackVals);
    const rawMax = d3.max(allStackVals);
    const naturalYMin = Math.min(0, rawMin * 1.05);
    const naturalYMax = rawMax * 1.05;
    const yMin = yDomainOverride?.min != null ? yDomainOverride.min : naturalYMin;
    const yMax = yDomainOverride?.max != null ? yDomainOverride.max : naturalYMax;

    const width  = 700;
    const height = 340;
    const popBarW = 22;
    const rMargin = popEncoded ? 168 : 112;
    const margin  = { top: 20, right: rMargin, bottom: 28, left: 80 };
    const innerW  = width  - margin.left - margin.right;
    const innerH  = height - margin.top  - margin.bottom;

    const svg = d3.select(svgNode);
    svg.attr("class", "cwi-svg").attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove();

    const x = d3.scaleLinear().domain(d3.extent(data, (d) => d.year)).range([0, innerW]);
    const y = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]);

    const clipId = `clip-area-${metric}-${Math.random().toString(36).slice(2)}`;
    svg.append("defs").append("clipPath").attr("id", clipId)
      .append("rect").attr("width", innerW).attr("height", innerH);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g").attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));
    g.append("g").call(d3.axisLeft(y).ticks(6).tickFormat(fmtSEKAxis));

    if (yMin < 0 && yMax > 0) {
      g.append("line")
        .attr("x1", 0).attr("x2", innerW).attr("y1", y(0)).attr("y2", y(0))
        .attr("stroke", "#adb5bd").attr("stroke-dasharray", "4 3");
    }

    g.selectAll(".yr-ref").data(years).join("line")
      .attr("x1", (d) => x(d)).attr("x2", (d) => x(d))
      .attr("y1", 0).attr("y2", innerH).attr("stroke", "#e9ecef");

    // Draw each band: largest groups first (background), Bottom 50% last (foreground).
    // This ensures the blue negative band is painted on top of yellow where they
    // share pixel space below the zero line.
    const areasG = g.append("g").attr("clip-path", `url(#${clipId})`);
    for (let gi = CWI_MATRIX_GROUPS.length - 1; gi >= 0; gi--) {
      const grp = CWI_MATRIX_GROUPS[gi];
      const areaFn = d3.area()
        .x((d) => x(d.year))
        .y0((d) => y(Math.max(yMin, Math.min(yMax, getStacks(d)[gi].y0))))
        .y1((d) => y(Math.max(yMin, Math.min(yMax, getStacks(d)[gi].y1))));
      areasG.append("path").datum(data)
        .attr("fill", grp.color).attr("opacity", 0.88)
        .attr("d", areaFn);
    }

    // Right-side labels at the midpoint of each group's final band
    getStacks(lastRow).forEach(({ grp, y0, y1 }) => {
      const mid = (y0 + y1) / 2;
      if (mid >= yMin && mid <= yMax) {
        g.append("text")
          .attr("x", innerW + 5).attr("y", y(mid))
          .attr("dy", "0.35em").attr("font-size", 10).attr("fill", grp.color)
          .text(grp.label);
      }
    });

    // ── Population bar (proportional scale + zoom slider) ───────────
    if (popEncoded) {
      const bx = innerW + 104;
      const sliderX = bx + popBarW + 7;
      const sliderW = 8;
      const thumbH  = 16;

      // Proportional cumulative ranges
      const totalPop = d3.sum(CWI_MATRIX_GROUPS, (gr) => gr.pop);
      let cumPop = 0;
      const groupRanges = CWI_MATRIX_GROUPS.map((gr) => {
        const start = cumPop; cumPop += gr.pop;
        return { gr, start, end: cumPop };
      });

      // Viewport state — always anchored to the end (tiny groups)
      let visStart = 0, visEnd = totalPop;
      const minRange = 0.002;

      // Clip the pop bar to its column
      const popBarClipId = `clip-pbz-${Math.random().toString(36).slice(2)}`;
      svg.select("defs").append("clipPath").attr("id", popBarClipId)
        .append("rect").attr("x", bx - 1).attr("y", 0)
        .attr("width", popBarW + 2).attr("height", innerH);
      const popG = g.append("g").attr("clip-path", `url(#${popBarClipId})`);

      const drawPopBar = () => {
        popG.selectAll("*").remove();
        const visRange = visEnd - visStart;
        groupRanges.forEach(({ gr, start, end }) => {
          const oStart = Math.max(start, visStart);
          const oEnd   = Math.min(end, visEnd);
          if (oEnd <= oStart) return;
          const barY = (oStart - visStart) / visRange * innerH;
          const barH = Math.max(1, (oEnd - oStart) / visRange * innerH);
          popG.append("rect")
            .attr("x", bx).attr("y", barY).attr("width", popBarW).attr("height", barH)
            .attr("rx", 2).attr("fill", gr.color).attr("opacity", 0.9);
          if (barH >= 10) {
            popG.append("text")
              .attr("x", bx + popBarW / 2).attr("y", barY + barH / 2)
              .attr("dy", "0.35em").attr("text-anchor", "middle")
              .attr("font-size", Math.min(8, barH * 0.45)).attr("fill", "#fff")
              .attr("pointer-events", "none").text(`${gr.pop}%`);
          }
        });
      };

      drawPopBar();

      // "Pop." label above bar
      g.append("text")
        .attr("x", bx + popBarW / 2).attr("y", -7)
        .attr("text-anchor", "middle").attr("font-size", 9).attr("fill", "#6c757d")
        .text("Pop.");

      // Slider: drag thumb upward to zoom into tiny groups
      g.append("text")
        .attr("x", sliderX + sliderW / 2).attr("y", -7)
        .attr("text-anchor", "middle").attr("font-size", 8).attr("fill", "#adb5bd")
        .text("+");
      g.append("text")
        .attr("x", sliderX + sliderW / 2).attr("y", innerH + 10)
        .attr("text-anchor", "middle").attr("font-size", 8).attr("fill", "#adb5bd")
        .text("−");

      // Track
      g.append("rect")
        .attr("x", sliderX + 2).attr("y", 0)
        .attr("width", sliderW - 4).attr("height", innerH)
        .attr("rx", 3).attr("fill", "#e9ecef");

      // Thumb — starts at bottom (fully zoomed out)
      const maxThumbY = innerH - thumbH;
      let thumbY = maxThumbY;

      const thumb = g.append("rect")
        .attr("x", sliderX).attr("y", thumbY)
        .attr("width", sliderW).attr("height", thumbH)
        .attr("rx", 3).attr("fill", "#868e96").style("cursor", "ns-resize");

      const applyZoom = (ty) => {
        // ty=maxThumbY → zoomed out (t=0); ty=0 → zoomed in (t=1)
        const t = 1 - ty / maxThumbY;
        const logMin = Math.log10(minRange);
        const logMax = Math.log10(totalPop);
        const rangeSize = Math.pow(10, logMax + t * (logMin - logMax));
        visStart = Math.max(0, totalPop - rangeSize);
        visEnd   = totalPop;
        drawPopBar();
      };

      const drag = d3.drag()
        .on("start", () => thumb.attr("fill", "#495057"))
        .on("drag", (event) => {
          thumbY = Math.max(0, Math.min(maxThumbY, thumbY + event.dy));
          thumb.attr("y", thumbY);
          applyZoom(thumbY);
        })
        .on("end", () => thumb.attr("fill", "#868e96"));

      thumb.call(drag);

      // Click on track to jump
      g.append("rect")
        .attr("x", sliderX).attr("y", 0)
        .attr("width", sliderW).attr("height", innerH)
        .attr("fill", "none").style("pointer-events", "all")
        .on("click", (event) => {
          const [, cy] = d3.pointer(event);
          thumbY = Math.max(0, Math.min(maxThumbY, cy - thumbH / 2));
          thumb.attr("y", thumbY);
          applyZoom(thumbY);
        });
    }

    // ── Crosshair + tooltip ──────────────────────────────────────────────
    const tooltip = d3.select("#cwi-tooltip");
    const bisect  = d3.bisector((d) => d.year).left;
    const guide   = g.append("line")
      .attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", innerH)
      .attr("stroke", "#6c757d").attr("stroke-dasharray", "3 3")
      .attr("pointer-events", "none").style("display", "none");
    g.append("rect")
      .attr("width", innerW).attr("height", innerH)
      .attr("fill", "none").style("pointer-events", "all").style("cursor", "crosshair")
      .on("mousemove", (event) => {
        const [mx] = d3.pointer(event);
        const xVal = x.invert(mx);
        const i  = bisect(data, xVal);
        const d0 = data[Math.max(0, i - 1)];
        const d1 = data[Math.min(data.length - 1, i)];
        const row = (d1 && Math.abs(xVal - d1.year) < Math.abs(xVal - d0.year)) ? d1 : d0;
        if (!row) return;
        guide.attr("x1", x(row.year)).attr("x2", x(row.year)).style("display", null);
        const html = `<strong>${row.year}</strong><br>` +
          CWI_MATRIX_GROUPS.map((grp) => {
            const v = row.values[grp.key] || 0;
            return `<span style="color:${grp.color}">${grp.label}</span>: ${fmtSEKAxis(v)}`;
          }).join("<br>");
        tooltip.html(html).style("display", "block")
          .style("left", (event.clientX + 16) + "px").style("top", (event.clientY - 60) + "px");
      })
      .on("mouseleave", () => { guide.style("display", "none"); tooltip.style("display", "none"); });
  };

  if (comparison === "juxtaposition") {
    // Small multiples: one panel per group, shared Y domain
    const allVals = metrics.flatMap((m) =>
      cwiMatrixSeries(m).flatMap((row) => CWI_MATRIX_GROUPS.map((g) => row.values[g.key] || 0))
    ).filter(Number.isFinite);
    const dataMin = d3.min(allVals);
    const dataMax = d3.max(allVals);
    const isOv = yDomainOverride?.max != null;
    const yDomain = [
      Math.min(0, dataMin),
      yDomainOverride?.max != null ? yDomainOverride.max : dataMax
    ];
    if (metrics.length > 1) {
      const hint = document.createElement("p");
      hint.className = "cwi-note";
      hint.textContent = "Solid fill = income · Translucent dashed fill = wealth. All panels share the same Y axis.";
      root.appendChild(hint);
    }
    const grid = document.createElement("div");
    grid.className = "cwi-sm-grid";
    root.appendChild(grid);
    CWI_MATRIX_GROUPS.forEach((group) => {
      const card = cwiMatrixMakeCard(grid, group.label);
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      card.appendChild(svg);
      cwiMatrixDrawGroupArea(svg, group, metrics, popEncoded, years, yDomain, isOv);
    });
    return;
  }

  // Superposition / animation: full overlapping-area chart per metric
  const makePair = (parent) => {
    if (metrics.length === 1) return parent;
    const d = document.createElement("div"); d.className = "cwi-grid-2"; parent.appendChild(d); return d;
  };

  const pair = makePair(root);
  metrics.forEach((metric) => {
    const title = metric === "income"
      ? "Average pre-tax income per person (SEK, linear scale, gray = Middle 40%)"
      : "Average net wealth per person (SEK, linear scale, gray = Middle 40%, below 0 = net debt)";
    const card = cwiMatrixMakeCard(pair, title);
    const svg  = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    card.appendChild(svg);
    drawAreas(svg, metric);
  });
}

function cwiMatrixIncomeContributionCounts(year) {
  const snapshot = cwiMatrixSnapshot("income", year);
  const grandTotal = d3.sum(CWI_ALL_KEYS, (k) => Math.max(0, snapshot.totals[k] || 0));
  const displayedTotals = CWI_MATRIX_GROUPS.map((g) => Math.max(0, snapshot.totals[g.key] || 0));
  return roundToCells(displayedTotals.map((v) => grandTotal > 0 ? (v / grandTotal) * 100 : 0));
}

// Raw fractional cell counts — no rounding, preserves decimals (e.g. 1.3, 0.07)
function cwiMatrixIncomeFractionalCounts(year) {
  const snapshot = cwiMatrixSnapshot("income", year);
  const grandTotal = d3.sum(CWI_ALL_KEYS, (k) => Math.max(0, snapshot.totals[k] || 0));
  return CWI_MATRIX_GROUPS.map((g) => {
    const v = Math.max(0, snapshot.totals[g.key] || 0);
    return grandTotal > 0 ? (v / grandTotal) * 100 : 0;
  });
}

// Draws a waffle with fractional cell fills.
// fracCounts: float values per group. Cells fill bottom→top, left→right.
// A fractional boundary within a cell is shown as a partial fill (bottom portion = filled fraction).
function renderFractionalWaffle(svgSel, cells, cellW, cellH, fracCounts, colors, bgColor) {
  // Background: all cells gray
  cells.forEach((cell) => {
    svgSel.append("rect")
      .attr("x", cell.x).attr("y", cell.y)
      .attr("width", cellW).attr("height", cellH)
      .attr("rx", 3).attr("fill", bgColor);
  });

  // Build accumulated segments [start, end) per group
  let acc = 0;
  const segments = fracCounts.map((frac, gi) => {
    const seg = { start: acc, end: acc + frac, color: colors[gi] };
    acc += frac;
    return seg;
  });

  // For each segment, draw its colored portion in each relevant cell
  segments.forEach((seg) => {
    cells.forEach((cell) => {
      const overlapStart = Math.max(cell.i, seg.start);
      const overlapEnd   = Math.min(cell.i + 1, seg.end);
      if (overlapEnd <= overlapStart + 0.001) return;

      const relStart = overlapStart - cell.i; // 0..1 within the cell
      const relEnd   = overlapEnd   - cell.i;
      const isFullCell = relEnd - relStart >= 0.999;

      // Fill from the bottom of the cell upward
      const yTop = cell.y + cellH * (1 - relEnd);
      const h    = Math.max(1, cellH * (relEnd - relStart));

      svgSel.append("rect")
        .attr("x", cell.x).attr("y", yTop)
        .attr("width", cellW).attr("height", h)
        .attr("rx", isFullCell ? 3 : 1)
        .attr("fill", seg.color);
    });
  });
}

// Returns rows where each group value = % share of total income (including middle40 in denominator)
function cwiMatrixShareRows(metric) {
  return cwiMatrixSeries(metric).map((row) => {
    const grandTotal = d3.sum(CWI_ALL_KEYS, (k) => Math.max(0, row.totals[k] || 0));
    const out = { year: row.year };
    CWI_MATRIX_GROUPS.forEach((g) => {
      out[g.key] = grandTotal > 0 ? Math.max(0, row.totals[g.key] || 0) / grandTotal * 100 : 0;
    });
    // Middle 40%'s residual share fills the "other" layer to reach 100%
    out._other = Math.max(0, 100 - d3.sum(CWI_MATRIX_GROUPS, (g) => out[g.key]));
    return out;
  });
}

// Wealth shares: allows negative for bottom50 (net debt). Uses true net total as denominator.
function cwiMatrixWealthShareRows() {
  return cwiMatrixSeries("wealth").map((row) => {
    const grandTotal = d3.sum(CWI_ALL_KEYS, (k) => row.totals[k] || 0);
    const out = { year: row.year };
    CWI_MATRIX_GROUPS.forEach((g) => {
      out[g.key] = grandTotal !== 0 ? (row.totals[g.key] || 0) / grandTotal * 100 : 0;
    });
    // Middle 40% share (always positive) shown as gray "other"
    out._other = grandTotal !== 0 ? Math.max(0, (row.totals.middle40 || 0) / grandTotal * 100) : 0;
    return out;
  });
}

function cwiMatrixDrawWaffle(svgNode, year, popEncoded) {
  const svg = d3.select(svgNode);
  const width = 250;
  const height = popEncoded ? 290 : 240;
  const cellSize = 20;
  const fracs = cwiMatrixIncomeFractionalCounts(year);
  svg.attr("class", "cwi-svg").attr("viewBox", `0 0 ${width} ${height}`);
  svg.selectAll("*").remove();
  const cells = d3.range(100).map((i) => ({ i, x: 15 + (i % 10) * 22, y: 15 + (9 - Math.floor(i / 10)) * 22 }));
  const g = svg.append("g");
  renderFractionalWaffle(g, cells, cellSize, cellSize, fracs, CWI_MATRIX_GROUPS.map((grp) => grp.color), "#eef1ea");
  if (popEncoded) {
    // Include middle40 (40%) as gray so population strip fills all 100 cells accurately
    const allPops   = [...CWI_MATRIX_GROUPS.map((g) => g.pop), 40];
    const allColors = [...CWI_MATRIX_GROUPS.map((g) => g.color), "#dee2e6"];
    const popCounts = roundToCells(allPops);
    let cursor = 0;
    svg.append("text").attr("x", 15).attr("y", 255).attr("font-size", 10).attr("fill", "#5f6368").text("Population strip (gray = Middle 40%)");
    popCounts.forEach((count, idx) => {
      for (let i = 0; i < count; i += 1) {
        svg.append("rect").attr("x", 15 + cursor * 2.05).attr("y", 265).attr("width", 1.8).attr("height", 10).attr("rx", 1).attr("fill", allColors[idx]).attr("opacity", 0.75);
        cursor += 1;
      }
    });
  }
}

function cwiMatrixRenderWaffles(root, years, comparison, popEncoded) {
  const note = document.createElement("div");
  note.className = "cwi-note";
  note.textContent = "Income waffle shares: population share × average income for each disjoint group. Wealth excluded (negative values).";
  root.appendChild(note);

  if (comparison === "juxtaposition") {
    // Groups × years grid: each row = one group, each column = one year
    CWI_MATRIX_GROUPS.forEach((group, gi) => {
      const section = document.createElement("div");
      section.style.cssText = "margin-bottom:1.2rem;";
      const hdr = document.createElement("h4");
      hdr.textContent = group.label;
      hdr.style.cssText = `font-size:0.95rem;font-weight:700;color:${group.color};margin:0 0 0.4rem;`;
      section.appendChild(hdr);
      const row = document.createElement("div");
      row.style.cssText = "display:flex;flex-wrap:wrap;gap:0.6rem;";
      years.forEach((year) => {
        const card = cwiMatrixMakeCard(row, String(year));
        card.style.minWidth = "170px";
        const groupFracs = cwiMatrixIncomeFractionalCounts(year);
        const rawFrac = groupFracs[gi];
        const svg = d3.select(card).append("svg")
          .attr("class", "cwi-svg").attr("viewBox", "0 0 240 240");
        const cells = d3.range(100).map((i) => ({ i, x: 10 + (i % 10) * 22, y: 10 + (9 - Math.floor(i / 10)) * 22 }));
        const gSel = svg.append("g");
        renderFractionalWaffle(gSel, cells, 20, 20, [rawFrac], [group.color], "#e9ecef");
        const lbl = document.createElement("p");
        lbl.textContent = `${rawFrac.toFixed(2)}%`;
        lbl.style.cssText = "text-align:center;font-size:0.8rem;color:#5f6368;margin:0.2rem 0 0;";
        card.appendChild(lbl);
      });
      section.appendChild(row);
      root.appendChild(section);
    });
    return;
  }

  if (comparison === "superposition") {
    // All groups together in one waffle per year (multi-color, years side by side)
    const grid = document.createElement("div");
    grid.className = "cwi-years-grid";
    // Shared legend for group colors
    const legend = document.createElement("div");
    legend.className = "cwi-inline-legend";
    legend.style.marginBottom = "0.6rem";
    CWI_MATRIX_GROUPS.forEach((g) => {
      const item = document.createElement("span");
      item.innerHTML = `<i style="background:${g.color}"></i><span>${g.label}</span>`;
      legend.appendChild(item);
    });
    root.appendChild(legend);
    root.appendChild(grid);
    years.forEach((year) => {
      const card = cwiMatrixMakeCard(grid, String(year));
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      card.appendChild(svg);
      cwiMatrixDrawWaffle(svg, year, popEncoded);
    });
    return;
  }

  cwiMatrixRenderAnimatedYears(root, cwiMatrixAnimYears(), (year, host) => {
    host.innerHTML = "";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    host.appendChild(svg);
    cwiMatrixDrawWaffle(svg, year, popEncoded);
  }, "Animated income waffle");
}

function initCompareWI() {
  cwiMatrixInitData();
  const yearsInput = document.getElementById("cwi-years-input");
  const representation = document.getElementById("cwi-representation");
  const comparison = document.getElementById("cwi-comparison");
  const metricSel  = document.getElementById("cwi-metric");
  const popEncoding = document.getElementById("cwi-pop-encoding");
  const root = document.getElementById("cwi-render-root");
  if (!yearsInput || !representation || !comparison || !metricSel || !popEncoding || !root) return;

  // ── Y-axis scale type (line and bar charts) ────────────────────
  const yscaleCtrl       = document.getElementById("cwi-yscale-ctrl");
  const yscaleLinearZoom = document.getElementById("cwi-yscale-linear-zoom");
  const yscaleLinear     = document.getElementById("cwi-yscale-linear");
  const yscaleBreak      = document.getElementById("cwi-yscale-break");
  const yscaleLog        = document.getElementById("cwi-yscale-log");
  const yscaleLogOpt     = document.getElementById("cwi-yscale-log-opt");
  let yScaleType = "linear-zoom";
  yscaleLinearZoom?.addEventListener("change", () => { yScaleType = "linear-zoom"; render(); });
  yscaleLinear?.addEventListener("change",     () => { yScaleType = "linear";      render(); });
  yscaleBreak?.addEventListener("change",      () => { yScaleType = "break";       render(); });
  yscaleLog?.addEventListener("change",        () => { yScaleType = "log";         render(); });

  // ── Axis zoom controls ──────────────────────────────────────────
  const yview      = document.getElementById("cwi-yview");
  const yMaxSlider = document.getElementById("cwi-ymax-slider");
  const yMaxValEl  = document.getElementById("cwi-ymax-val");
  const yviewReset = document.getElementById("cwi-yview-reset");

  let yOverride = { min: null, max: null };
  let lastDataMax = 1;

  const computeDataMax = (mets) => {
    const vals = mets.flatMap((m) =>
      cwiMatrixSeries(m).flatMap((row) =>
        CWI_MATRIX_GROUPS.map((g) => row.values[g.key] || 0)
      )
    ).filter(Number.isFinite);
    return d3.max(vals);
  };

  const sliderToMax = (sv) => {
    const lo = Math.max(5.0, Math.log10(Math.abs(lastDataMax)) - 4.5);
    const hi = Math.log10(Math.abs(lastDataMax));
    return Math.pow(10, lo + (hi - lo) * sv / 1000);
  };
  const maxToSlider = (v) => {
    const lo = Math.max(5.0, Math.log10(Math.abs(lastDataMax)) - 4.5);
    const hi = Math.log10(Math.abs(lastDataMax));
    return Math.max(0, Math.min(1000, Math.round((Math.log10(Math.max(v, 1)) - lo) / (hi - lo) * 1000)));
  };

  const updateLabel = () => {
    const curMax = yOverride.max != null ? yOverride.max : lastDataMax;
    yMaxValEl.textContent = fmtSEKAxis(curMax);
  };
  const syncSlider = () => {
    const curMax = yOverride.max != null ? yOverride.max : lastDataMax;
    yMaxSlider.value = maxToSlider(curMax);
    updateLabel();
  };

  yMaxSlider.addEventListener("input", () => {
    yOverride.max = sliderToMax(Number(yMaxSlider.value));
    updateLabel();
    render();
  });
  yviewReset.addEventListener("click", () => {
    yOverride = { min: null, max: null };
    syncSlider();
    render();
  });

  const render = () => {
    if (cwiMatrixAnimTimer) {
      clearInterval(cwiMatrixAnimTimer);
      cwiMatrixAnimTimer = null;
    }
    const years = cwiMatrixParseYears(yearsInput.value);
    const rep = representation.value;
    const popEncoded = popEncoding.value === "with";

    metricSel.disabled = rep === "waffle";
    if (rep === "waffle") metricSel.value = "income";
    const metrics = metricSel.value === "both" ? ["income", "wealth"] : [metricSel.value];

    Array.from(comparison.options).forEach((option) => {
      option.disabled = (rep === "line" || rep === "stacked") && option.value === "animation";
    });
    if ((rep === "line" || rep === "stacked") && comparison.value === "animation") comparison.value = "juxtaposition";
    const cmp = comparison.value;

    // Y-axis scale selector: line and bar charts
    if (rep === "line" || rep === "bar") {
      yscaleCtrl.classList.remove("hidden");
      if (yscaleLogOpt) yscaleLogOpt.style.display = (rep === "bar" || rep === "line") ? "" : "none";
    } else {
      yscaleCtrl.classList.add("hidden");
      yScaleType = "linear-zoom";
      if (yscaleLinearZoom) yscaleLinearZoom.checked = true;
    }

    // Axis zoom: stacked always; line/bar only when scale is "linear-zoom"
    const showZoom = rep === "stacked" || (yScaleType === "linear-zoom" && (rep === "line" || rep === "bar"));
    if (showZoom) {
      yview.classList.remove("hidden");
      lastDataMax = computeDataMax(metrics);
      syncSlider();
    } else {
      yview.classList.add("hidden");
      yOverride = { min: null, max: null };
    }

    // Only "linear-zoom" uses the zoom override; others get full range or their own scale
    const lineYOverride = yScaleType === "linear-zoom" ? yOverride : { min: null, max: null };
    const barYOverride  = yScaleType === "linear-zoom" ? yOverride : { min: null, max: null };

    root.innerHTML = "";
    if (rep === "table")   cwiMatrixRenderTable(root, years, cmp, popEncoded, metrics);
    if (rep === "bar")     cwiMatrixRenderBars(root, years, cmp, popEncoded, metrics, barYOverride, yScaleType);
    if (rep === "line")    cwiMatrixRenderLines(root, years, cmp, popEncoded, metrics, lineYOverride, yScaleType);
    if (rep === "stacked") cwiMatrixRenderStacked(root, years, cmp, popEncoded, metrics, yOverride);
    if (rep === "waffle")  cwiMatrixRenderWaffles(root, years, cmp, popEncoded);
  };

  representation.addEventListener("change", render);
  comparison.addEventListener("change", render);
  metricSel.addEventListener("change", render);
  popEncoding.addEventListener("change", render);
  yearsInput.addEventListener("change", render);
  yearsInput.addEventListener("blur", render);
  render();
}


