"use client";

import { useEffect, useMemo, useState } from "react";
import katex from "katex";
import { correspondence, exposition } from "./exposition";

const leanKeywords = new Set([
  "abbrev", "apply", "by", "calc", "classical", "def", "end", "exact",
  "have", "import", "infer_instance", "instance", "lemma", "let", "namespace",
  "noncomputable", "open", "refine", "scoped", "simpa", "simp", "sorry",
  "theorem", "try", "unfold", "using", "where", "with"
]);

const leanConstants = new Set([
  "Decidable", "Even", "Fin", "Fintype", "I", "Matrix", "Measure", "Nat",
  "Prop", "Real", "SimpleGraph", "Sym2", "Type", "ℕ", "ℝ"
]);

function renderMath(html) {
  const options = { throwOnError: false, strict: "ignore" };
  return html
    .replace(/\\\[([\s\S]*?)\\\]/gu, (_, expression) =>
      katex.renderToString(expression, { ...options, displayMode: true }))
    .replace(/\\\(([\s\S]*?)\\\)/gu, (_, expression) =>
      katex.renderToString(expression, { ...options, displayMode: false }));
}

function tokenizeCode(lines) {
  let inComment = false;
  return lines.map((line) => {
    const tokens = [];
    let cursor = 0;
    const push = (text, kind = "plain") => {
      if (text) tokens.push({ text, kind });
    };

    while (cursor < line.length) {
      if (inComment) {
        const end = line.indexOf("-/", cursor);
        if (end === -1) {
          push(line.slice(cursor), "comment");
          cursor = line.length;
        } else {
          push(line.slice(cursor, end + 2), "comment");
          cursor = end + 2;
          inComment = false;
        }
        continue;
      }

      if (line.startsWith("/-", cursor)) {
        const end = line.indexOf("-/", cursor + 2);
        if (end === -1) {
          push(line.slice(cursor), "comment");
          inComment = true;
          cursor = line.length;
        } else {
          push(line.slice(cursor, end + 2), "comment");
          cursor = end + 2;
        }
        continue;
      }

      if (line.startsWith("--", cursor)) {
        push(line.slice(cursor), "comment");
        break;
      }

      const rest = line.slice(cursor);
      const whitespace = rest.match(/^\s+/u);
      if (whitespace) {
        push(whitespace[0]);
        cursor += whitespace[0].length;
        continue;
      }

      const word = rest.match(/^[\p{L}_][\p{L}\p{N}_'.]*/u);
      if (word) {
        const value = word[0];
        const kind = value === "sorry"
          ? "sorry"
          : leanKeywords.has(value)
            ? "keyword"
            : leanConstants.has(value) || /^\p{Lu}/u.test(value)
              ? "constant"
              : "identifier";
        push(value, kind);
        cursor += value.length;
        continue;
      }

      const number = rest.match(/^\d+/u);
      if (number) {
        push(number[0], "number");
        cursor += number[0].length;
        continue;
      }

      const operator = rest.match(/^(:=|≤|≥|≠|→|↦|∧|∃|∀|∂|∫|•|\^|\*|\+|-|=|:|,|\.|<|>|\(|\)|\{|\}|\[|\]|⟨|⟩)/u);
      if (operator) {
        push(operator[0], "operator");
        cursor += operator[0].length;
        continue;
      }

      push(rest[0]);
      cursor += 1;
    }
    return tokens;
  });
}

function sentenceProps(map, side, setHovered, togglePinned) {
  return {
    "data-map": map,
    "data-side": side,
    onPointerEnter: () => setHovered([map]),
    onPointerLeave: () => setHovered([]),
    onClick: () => togglePinned(map, side)
  };
}

function Sentence({ item, active, setHovered, togglePinned }) {
  return (
    <span
      className={`mapped sentence ${active.has(item.map) ? "is-active" : ""}`}
      {...sentenceProps(item.map, "prose", setHovered, togglePinned)}
      dangerouslySetInnerHTML={{ __html: renderMath(item.html) }}
    />
  );
}

function ProseContent({ content, active, setHovered, togglePinned }) {
  return content.map((item, index) => (
    <Sentence
      key={`${item.map}-${index}`}
      item={item}
      active={active}
      setHovered={setHovered}
      togglePinned={togglePinned}
    />
  ));
}

function Formula({ block, active, setHovered, togglePinned }) {
  return (
    <div
      className={`mapped formula ${active.has(block.map) ? "is-active" : ""}`}
      {...sentenceProps(block.map, "prose", setHovered, togglePinned)}
      dangerouslySetInnerHTML={{ __html: renderMath(block.html) }}
    />
  );
}

function ExpositionBlock({ block, active, setHovered, togglePinned }) {
  if (block.kind === "paragraph") {
    return (
      <p>
        <ProseContent
          content={block.content}
          active={active}
          setHovered={setHovered}
          togglePinned={togglePinned}
        />
      </p>
    );
  }

  if (block.kind === "formula") {
    return (
      <Formula
        block={block}
        active={active}
        setHovered={setHovered}
        togglePinned={togglePinned}
      />
    );
  }

  if (block.kind === "proof") {
    return (
      <div className="proof-block">
        <div className="proof-label">{block.label}</div>
        <ol className="proof-steps">
          {block.steps.map((step) => (
            <li
              key={step.number}
              className={`mapped proof-step ${active.has(step.map) ? "is-active" : ""}`}
              {...sentenceProps(step.map, "prose", setHovered, togglePinned)}
            >
              <span className="step-number">{step.number}</span>
              <span dangerouslySetInnerHTML={{ __html: renderMath(step.html) }} />
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const className = block.kind === "theorem"
    ? "statement theorem-block"
    : block.kind === "definition"
      ? "statement definition-block"
      : "statement lemma-block";

  return (
    <div className={className}>
      <div className="statement-heading">
        <span className="statement-label">{block.label}</span>
        {block.title ? <h3>{block.title}</h3> : null}
      </div>
      <div className="statement-copy">
        <ProseContent
          content={block.content}
          active={active}
          setHovered={setHovered}
          togglePinned={togglePinned}
        />
      </div>
      {block.formula ? (
        <Formula
          block={{ map: block.map, html: block.formula }}
          active={active}
          setHovered={setHovered}
          togglePinned={togglePinned}
        />
      ) : null}
      {block.proof ? (
        <div className="proof-sketch">
          <span className="proof-sketch-label">Proof sketch.</span>
          <ProseContent
            content={block.proof}
            active={active}
            setHovered={setHovered}
            togglePinned={togglePinned}
          />
        </div>
      ) : null}
    </div>
  );
}

export default function Explorer({ source }) {
  const lines = useMemo(() => source.replace(/\n$/, "").split("\n"), [source]);
  const tokenizedLines = useMemo(() => tokenizeCode(lines), [lines]);
  const mappingByLine = useMemo(() => {
    const result = Array.from({ length: lines.length }, () => []);
    correspondence.forEach((entry) => {
      entry.ranges.forEach(([start, end]) => {
        for (let line = start; line <= Math.min(end, lines.length); line += 1) {
          result[line - 1].push(entry.id);
        }
      });
    });
    const unmapped = result
      .map((ids, index) => ({ ids, index }))
      .filter(({ ids, index }) => lines[index].trim() && ids.length === 0)
      .map(({ index }) => index + 1);
    if (unmapped.length) {
      throw new Error(`Unmapped nonblank Lean lines: ${unmapped.join(", ")}`);
    }
    let previous = ["license"];
    return result.map((ids) => {
      if (ids.length) previous = ids;
      return ids.length ? ids : previous;
    });
  }, [lines.length]);

  const [hovered, setHovered] = useState([]);
  const [pinned, setPinned] = useState([]);
  const active = useMemo(
    () => new Set(hovered.length ? hovered : pinned),
    [hovered, pinned]
  );

  useEffect(() => {
    const clearPin = (event) => {
      if (event.key === "Escape") {
        setPinned([]);
        setHovered([]);
      }
    };
    window.addEventListener("keydown", clearPin);
    return () => window.removeEventListener("keydown", clearPin);
  }, []);

  const togglePinned = (map, side) => {
    const isPinned = pinned.length === 1 && pinned[0] === map;
    setPinned(isPinned ? [] : [map]);
    if (isPinned) return;
    window.setTimeout(() => {
      const otherSide = side === "code" ? "prose" : "code";
      const target = document.querySelector(
        `[data-side="${otherSide}"][data-map~="${map}"]`
      );
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 20);
  };

  const toneForLine = (ids) => {
    const match = correspondence.find((entry) => ids.includes(entry.id));
    return match?.tone ?? "slate";
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">R</div>
        <div className="title-group">
          <div className="overline">LEAN ↔ MATHEMATICS</div>
          <h1>Independent Rademacher matrices</h1>
        </div>
        <div className="target">
          <span className="target-label">TARGET</span>
          <span className="target-math">E‖M‖ ≤ C √n √log n</span>
        </div>
        <div className="interaction-key">
          <span className="key-dot" />
          <span>Hover to trace · click to pin</span>
          {pinned.length ? (
            <button type="button" onClick={() => setPinned([])}>Clear</button>
          ) : null}
        </div>
      </header>

      <div className="workspace">
        <section className="pane code-pane" aria-label="Lean source">
          <div className="pane-header code-header">
            <div>
              <span className="pane-kicker">FORMAL</span>
              <strong>IndependentRademacher.lean</strong>
            </div>
            <span className="line-count">{lines.length} lines · fully mapped</span>
          </div>
          <div className="code-scroll">
            <pre className="code-list" aria-label="Lean code">
              {tokenizedLines.map((tokens, index) => {
                const ids = mappingByLine[index];
                const isActive = ids.some((id) => active.has(id));
                return (
                  <span
                    key={index}
                    className={`code-line mapped tone-${toneForLine(ids)} ${isActive ? "is-active" : ""}`}
                    data-map={ids.join(" ")}
                    data-side="code"
                    onPointerEnter={() => setHovered(ids)}
                    onPointerLeave={() => setHovered([])}
                    onClick={() => togglePinned(ids[0], "code")}
                  >
                    <span className="line-number">{String(index + 1).padStart(3, " ")}</span>
                    <code>
                      {tokens.length
                        ? tokens.map((token, tokenIndex) => (
                            <span key={tokenIndex} className={`syntax-${token.kind}`}>
                              {token.text}
                            </span>
                          ))
                        : " "}
                    </code>
                    <span className="mapping-tick" />
                  </span>
                );
              })}
            </pre>
          </div>
        </section>

        <article className="pane prose-pane" aria-label="Mathematical exposition">
          <div className="pane-header prose-header">
            <div>
              <span className="pane-kicker">MATHEMATICAL</span>
              <strong>The trace-moment argument</strong>
            </div>
            <span className="reading-note">Definitions · lemmas · proof</span>
          </div>
          <div className="prose-scroll">
            <div className="article">
              <div className="article-lead">
                <p className="lead mapped"
                  data-map="overview"
                  data-side="prose"
                  onPointerEnter={() => setHovered(["overview"])}
                  onPointerLeave={() => setHovered([])}
                  onClick={() => togglePinned("overview", "prose")}
                >
                  A short formalization of the moment method, with the analytic
                  and combinatorial inputs isolated as lemmas.
                </p>
              </div>
              {exposition.map((section) => (
                <section className="exposition-section" key={section.number}>
                  <div className="section-index">{section.number}</div>
                  <div className="section-body">
                    <div className="section-heading">
                      <span>{section.eyebrow}</span>
                      <h2>{section.title}</h2>
                    </div>
                    {section.blocks.map((block, index) => (
                      <ExpositionBlock
                        key={`${section.number}-${index}`}
                        block={block}
                        active={active}
                        setHovered={setHovered}
                        togglePinned={togglePinned}
                      />
                    ))}
                  </div>
                </section>
              ))}
              <div className="article-end">
                <span>□</span>
                <span>Four deferred lemmas · one checked deduction</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
