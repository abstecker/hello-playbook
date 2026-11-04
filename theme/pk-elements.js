// EPIC-18 M2: the sample book's figures as vanilla custom elements.
//
// <pk-gate src="figures/data/gate.json" state="ch02"></pk-gate> and
// <pk-range-grid src="figures/data/ranges.json" state="btn"></pk-range-grid>
// draw with divs, as the design-tool panel they were lifted from does
// (docs/spikes/component_library/…dc.html:156-175). Each hides the image link
// after it, which is what script-off and paper still show.
//
// The file is also a CommonJS module: export-m2.cjs requires it and calls
// gateSvg / gridSvg to write the static SVGs. That is M2's second renderer —
// the cost the scorecard's C5 records.
(function () {
  "use strict";
  const FILL = { btn: { 1: "#2f855a", 0.5: "#9ae6b4" }, bb: { 1: "#b7791f", 0.5: "#f6e05e" } };
  const esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const weight = (w) => (w >= 1 ? "1" : w > 0 ? "0.5" : "0");

  function presentAt(gate, state) {
    const now = gate.states.indexOf(state);
    if (now < 0) return [];
    return gate.nodes.filter((n) => { const i = gate.states.indexOf(n.from); return i >= 0 && i <= now; });
  }

  function svgNode(cls, n, x, y, width, fill, ink) {
    const cx = x + width / 2;
    return `  <g class="${cls}" data-node="${esc(n.id)}" data-detail="${esc(n.detail)}">\n` +
      `    <rect x="${x}" y="${y}" width="${width}" height="40" rx="6" fill="${fill}" stroke="#2d3748"/>\n` +
      `    <text x="${cx}" y="${y + 25}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="${ink}">${esc(n.id)}</text>\n` +
      `  </g>\n`;
  }

  function gateSvg(gate, state) {
    const nodes = presentAt(gate, state), n = nodes.length;
    const w = Math.max(n * 130 + 30, 300), row = n * 130 - 30, start = (w - row) / 2, mid = w / 2;
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 190" width="${w}" height="190" class="pk-figure" data-figure="gate" data-state="${esc(state)}" data-states="${esc(gate.states.join(" "))}" role="img" aria-label="The gate at ${esc(state)}: ${esc(gate.root.id)} depends on ${esc(nodes.map((x) => x.id).join(", "))}">\n`;
    for (let k = 0; k < n; k++) {
      s += `  <line class="edge" x1="${mid}" y1="60" x2="${start + k * 130 + 50}" y2="130" stroke="#718096" stroke-width="2"/>\n`;
    }
    s += svgNode("node root", gate.root, mid - 60, 20, 120, "#2d3748", "#ffffff");
    nodes.forEach((c, k) => { s += svgNode("node", c, start + k * 130, 130, 100, "#edf2f7", "#1a202c"); });
    return s + "</svg>\n";
  }

  function gridSvg(ranges, view) {
    const label = (ranges.views.find((v) => v.id === view) || { label: view }).label;
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 388 388" width="388" height="388" class="pk-figure" data-figure="grid" data-state="${esc(view)}" data-states="${esc(ranges.views.map((v) => v.id).join(" "))}" role="img" aria-label="Hand range grid, ${esc(label)}">\n`;
    ranges.cells.forEach((c, k) => {
      const x = 30 * (k % 13), y = 30 * Math.floor(k / 13), w = weight(c.weights[view] || 0);
      const fill = w === "0" ? "#edf2f7" : FILL[view === "bb" ? "bb" : "btn"][w];
      const ink = w === "1" ? "#ffffff" : "#1a202c";
      s += `  <g class="cell" data-hand="${esc(c.hand)}" data-combos="${c.combos}" data-weight="${w}">\n` +
        `    <rect x="${x}" y="${y}" width="28" height="28" rx="3" fill="${fill}"/>\n` +
        `    <text x="${x + 14}" y="${y + 18}" text-anchor="middle" font-family="sans-serif" font-size="9" fill="${ink}">${esc(c.hand)}</text>\n` +
        `  </g>\n`;
    });
    return s + "</svg>\n";
  }

  const api = { gateSvg, gridSvg, presentAt };
  if (typeof module === "object" && module.exports) {
    module.exports = api;
    return;
  }

  const root = typeof path_to_root === "string" ? path_to_root : "";
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };

  class PkFigure extends HTMLElement {
    async connectedCallback() {
      if (this.started) return;
      this.started = true;
      try {
        const res = await fetch(new URL(root + this.getAttribute("src"), document.baseURI));
        if (!res.ok) throw new Error("HTTP " + res.status);
        this.data = await res.json();
      } catch (e) {
        console.warn("pk-elements: keeping the picture —", e.message);
        return;
      }
      this.state = this.getAttribute("state");
      // mdBook wraps a one-line element in its own <p>; the picture is the
      // next block after that <p>, not after the element.
      const up = this.parentElement;
      const host = up && up.tagName === "P" && up.childElementCount === 1 ? up : this;
      const next = host.nextElementSibling;
      if (next && next.querySelector('img[src*="figures/m2/"]')) next.hidden = true;
      this.render();
    }

    frame(states) {
      this.textContent = "";
      const bar = el("div", "pk-chips");
      for (const s of states) {
        const b = el("button", "", s);
        b.type = "button";
        b.setAttribute("aria-pressed", String(s === this.state));
        b.addEventListener("click", () => {
          this.state = s;
          this.render();
          const again = this.querySelector('.pk-chips button[aria-pressed="true"]');
          if (again) again.focus();
        });
        bar.appendChild(b);
      }
      const body = el("div", "pk-m2-body");
      const detail = el("p", "pk-detail");
      detail.setAttribute("aria-live", "polite");
      this.append(bar, body, detail);
      return { body, detail };
    }

    target(box, text, detail) {
      box.tabIndex = 0;
      const show = () => { detail.textContent = text; };
      box.addEventListener("mouseenter", show);
      box.addEventListener("focus", show);
      return box;
    }
  }

  class PkGate extends PkFigure {
    render() {
      const g = this.data;
      const { body, detail } = this.frame(g.states);
      body.className = "pk-m2-gate";
      const top = el("div", "pk-m2-row");
      top.appendChild(this.target(el("div", "pk-m2-node pk-m2-root", g.root.id), g.root.id + " — " + g.root.detail, detail));
      const bottom = el("div", "pk-m2-row");
      for (const n of presentAt(g, this.state)) {
        bottom.appendChild(this.target(el("div", "pk-m2-node", n.id), n.id + " — " + n.detail, detail));
      }
      body.append(top, bottom);
    }
  }

  class PkRangeGrid extends PkFigure {
    render() {
      const r = this.data;
      const { body, detail } = this.frame(r.views.map((v) => v.id));
      body.className = "pk-m2-grid";
      for (const c of r.cells) {
        const w = weight(c.weights[this.state] || 0);
        const cell = el("div", "pk-m2-cell", c.hand);
        if (w !== "0") cell.style.background = FILL[this.state === "bb" ? "bb" : "btn"][w];
        if (w === "1") cell.style.color = "#ffffff";
        body.appendChild(this.target(cell, c.hand + " · " + c.combos + " combos · weight " + w, detail));
      }
    }
  }

  customElements.define("pk-gate", PkGate);
  customElements.define("pk-range-grid", PkRangeGrid);
})();
