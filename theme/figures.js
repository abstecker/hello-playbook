// Figures (EPIC-18): turn a figure's <img> into inline, interactive SVG.
//
// The image is the figure. This script only adds to it, and gives up
// silently — script off, fetch refused, file:// — leaving the picture that
// paper gets anyway. Every box is wired on its own, so print.html, which holds
// every chapter at once, works the same as a single page.
(function () {
  "use strict";
  const root = typeof path_to_root === "string" ? path_to_root : "";
  // Absolute, against the page: import() refuses a bare "figures/…" and, from
  // a classic script, would resolve against this file's URL, not the page's.
  const abs = (p) => new URL(root + p, document.baseURI).href;
  const SELECTOR = 'img[src*="figures/m3/"], img[src*="figures/m7/"]';
  const TARGET = "[data-node], [data-hand]";

  function parse(text, where) {
    const svg = new DOMParser().parseFromString(text, "image/svg+xml").documentElement;
    if (!svg || svg.nodeName !== "svg") throw new Error(where + ": not an SVG");
    return document.importNode(svg, true);
  }

  async function fetchSvg(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(url + ": HTTP " + res.status);
    return parse(await res.text(), url);
  }

  // M7 redraws with the Rust function that wrote the static file.
  let m7 = null;
  async function m7Draw(figure, state, hover) {
    if (!m7) {
      m7 = (async () => {
        const mod = await import(abs("figures/m7/pk_figures.js"));
        await mod.default({ module_or_path: abs("figures/m7/pk_figures_bg.wasm") });
        const [gate, ranges] = await Promise.all([
          fetch(abs("figures/data/gate.json")).then((r) => r.text()),
          fetch(abs("figures/data/ranges.json")).then((r) => r.text()),
        ]);
        return { mod, gate, ranges };
      })();
    }
    const { mod, gate, ranges } = await m7;
    const text = figure === "gate"
      ? mod.gate_svg(gate, state)
      : mod.range_grid_svg(ranges, state, hover || undefined);
    if (!text) throw new Error("m7: the drawing came back empty");
    return parse(text, "m7");
  }

  function describe(g) {
    if (g.dataset.node) return g.dataset.node + " — " + g.dataset.detail;
    return g.dataset.hand + " · " + g.dataset.combos + " combos · weight " + g.dataset.weight;
  }

  function current(box) {
    return box.querySelector("svg.pk-figure");
  }

  function install(box, svg) {
    const old = current(box);
    if (old) old.replaceWith(svg); else box.insertBefore(svg, box.querySelector(".pk-detail"));
    svg.querySelectorAll(TARGET).forEach((g) => g.setAttribute("tabindex", "0"));
    // The chips say what is drawn, whichever request drew it.
    box.querySelectorAll(".pk-chips button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.state === svg.dataset.state)));
  }

  // Swap the drawing, and give focus back to whichever cell held it at the
  // moment of the swap — not when the redraw was asked for. Keys outrun
  // redraws, so the two are often different cells.
  function installKeepingFocus(box, svg) {
    const active = document.activeElement;
    const keep = current(box).contains(active) ? active.dataset.hand : null;
    install(box, svg);
    if (!keep) return;
    const again = current(box).querySelector('[data-hand="' + keep + '"]');
    if (again) again.focus();
  }

  function wire(box, method) {
    const detail = box.querySelector(".pk-detail");
    const show = async (ev) => {
      const g = ev.target.closest(TARGET);
      if (!g || !box.contains(g)) return;
      detail.textContent = describe(g);
      if (method !== "m7" || !g.dataset.hand || box.dataset.hover === g.dataset.hand) return;
      box.dataset.hover = g.dataset.hand;
      // A hover never cancels a chip: it only yields to a newer hover, or to
      // a chip pressed after it. So a hover that fails cannot lose a click.
      const mine = (box.pkHover = (box.pkHover || 0) + 1);
      const seq = box.pkSeq;
      try {
        // The state last asked for, not the one on screen: a chip's redraw
        // may still be in flight.
        const svg = current(box);
        const next = await m7Draw(svg.dataset.figure, box.dataset.state || svg.dataset.state, g.dataset.hand);
        if (mine !== box.pkHover || seq !== box.pkSeq) return;
        installKeepingFocus(box, next);
      } catch (e) {
        console.warn("figures:", e.message);
      }
    };
    // Listen on the box, not the svg: the svg is replaced on every chip.
    box.addEventListener("mouseover", show);
    box.addEventListener("focusin", show);
  }

  function chips(box, method, src) {
    const svg = current(box);
    const states = (svg.dataset.states || "").split(/\s+/).filter(Boolean);
    if (states.length < 2) return;
    const bar = document.createElement("div");
    bar.className = "pk-chips";
    for (const s of states) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = s;
      b.dataset.state = s;
      b.setAttribute("aria-pressed", String(s === svg.dataset.state));
      b.addEventListener("click", async () => {
        const mine = (box.pkSeq = (box.pkSeq || 0) + 1);
        box.dataset.state = s;
        // Every state is also a static file beside the first; M7 falls back to
        // it when the wasm will not load, so a chip is never a dead button.
        const sibling = () => fetchSvg(src.replace(/-[a-z0-9]+\.svg(?=$|[?#])/, "-" + s + ".svg"));
        try {
          const now = current(box);
          const next = method === "m7"
            ? await m7Draw(now.dataset.figure, s, null).catch((e) => {
              console.warn("figures: m7 fell back to the static file —", e.message);
              return sibling();
            })
            : await sibling();
          if (mine !== box.pkSeq) return;
          box.dataset.hover = "";
          install(box, next);
        } catch (e) {
          console.warn("figures:", e.message);
        }
      });
      bar.appendChild(b);
    }
    box.prepend(bar);
  }

  async function upgrade(img) {
    const method = img.getAttribute("src").includes("figures/m7/") ? "m7" : "m3";
    let svg;
    try {
      svg = await fetchSvg(img.src);
    } catch (e) {
      console.warn("figures: keeping the picture —", e.message);
      return;
    }
    const box = document.createElement("div");
    box.className = "pk-figure-box";
    const detail = document.createElement("p");
    detail.className = "pk-detail";
    detail.setAttribute("aria-live", "polite");
    box.appendChild(detail);
    install(box, svg);
    img.replaceWith(box);
    wire(box, method);
    chips(box, method, img.src);
  }

  document.querySelectorAll(SELECTOR).forEach(upgrade);
})();
