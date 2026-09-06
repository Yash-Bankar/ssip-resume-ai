"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import styles from "./page.module.css";

const INITIAL_FORM = {
  workDescription: "",
  currentJobTitle: "",
  industry: "",
  targetRole: "",
  targetJobDescription: "",
};

const LEAD_LABELS = {
  story: "Story-Led",
  skills: "Skills-Led",
  impact: "Impact-Led",
};

const SSIp_LABELS = {
  story: "Story",
  skill: "Skill",
  impact: "Impact",
  positioning: "Positioning",
};

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const helper = document.createElement("textarea");
  helper.value = text;
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  helper.select();
  document.execCommand("copy");
  helper.remove();
  return Promise.resolve();
}

export default function GeneratorPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  const [apiError, setApiError] = useState("");
  const [result, setResult] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const descriptionRef = useRef(null);

  const isBusy = status === "loading";
  const hasResult = Boolean(result);

  function handleChange(key) {
    return (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    setApiError("");

    if (!form.workDescription.trim()) {
      setFormError("Add a few words about the work first — messy is fine.");
      descriptionRef.current?.focus();
      return;
    }

    setStatus("loading");
    setResult(null);
    setCopiedIndex(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.error || "Something went wrong. Please try again.");
      }
      setResult(payload);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setStatus("idle");
    }
  }

  async function handleCopy(index) {
    const bullet = result?.bullets?.[index];
    if (!bullet) return;
    try {
      await copyText(bullet.text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex((current) => (current === index ? null : current)), 1600);
    } catch {
      setApiError("Copy did not work in this browser. Select the text and copy it manually.");
    }
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setResult(null);
    setFormError("");
    setApiError("");
    setStatus("idle");
    setCopiedIndex(null);
    requestAnimationFrame(() => descriptionRef.current?.focus());
  }

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>
      <main className={styles.workbench}>
        <header className={styles.masthead}>
          <div className={styles.brand}>
            <span className={styles.brandMark}>SSIP</span>
            <span className={styles.brandText}>Resume Bullet Strategist</span>
          </div>
          <h1 className={styles.headline}>
            Turn the <span className={styles.highlight}>work you actually do</span> into resume bullets.
          </h1>
          <p className={styles.subhead}>
            Describe what you did. We find the impact, the skills, and the story behind it — then hand you three
            bullets you can paste straight into your resume.
          </p>
        </header>

        <section className={styles.intake} aria-label="Describe your work">
          <form onSubmit={handleSubmit} noValidate>
            <label className={styles.mainLabel} htmlFor="workDescription">
              What you did
            </label>
            <textarea
              id="workDescription"
              ref={descriptionRef}
              className={styles.mainTextarea}
              rows={7}
              placeholder="Tell me what you did at work — messy is fine."
              value={form.workDescription}
              onChange={handleChange("workDescription")}
              disabled={isBusy}
              maxLength={4000}
            />
            <p className={styles.hint}>Plain words are perfect. No resume jargon needed.</p>

            <div className={styles.optional}>
              <p className={styles.optionalTitle}>Optional — points these at your next role</p>
              <div className={styles.optionalGrid}>
                <div className={styles.field}>
                  <label htmlFor="currentJobTitle">Current job title</label>
                  <input
                    id="currentJobTitle"
                    type="text"
                    placeholder="e.g. Shift supervisor"
                    value={form.currentJobTitle}
                    onChange={handleChange("currentJobTitle")}
                    disabled={isBusy}
                    maxLength={120}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="industry">Industry</label>
                  <input
                    id="industry"
                    type="text"
                    placeholder="e.g. Hospitality"
                    value={form.industry}
                    onChange={handleChange("industry")}
                    disabled={isBusy}
                    maxLength={100}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="targetRole">Target role</label>
                  <input
                    id="targetRole"
                    type="text"
                    placeholder="e.g. Operations Coordinator"
                    value={form.targetRole}
                    onChange={handleChange("targetRole")}
                    disabled={isBusy}
                    maxLength={120}
                  />
                </div>
                <div className={styles.fieldWide}>
                  <label htmlFor="targetJobDescription">Target job description</label>
                  <textarea
                    id="targetJobDescription"
                    rows={3}
                    placeholder="Paste the posting text, if you have it."
                    value={form.targetJobDescription}
                    onChange={handleChange("targetJobDescription")}
                    disabled={isBusy}
                    maxLength={20000}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className={styles.generate} disabled={isBusy}>
              {isBusy ? "Reading your work…" : "Generate 3 Resume Bullets"}
            </button>
            {formError && (
              <p className={styles.formError} role="alert">
                {formError}
              </p>
            )}
          </form>
        </section>

        <section className={styles.result} aria-live="polite" aria-busy={isBusy}>
          {isBusy ? (
            <div className={styles.skeletonGroup} aria-hidden="true">
              <div className={styles.skeletonCard} />
              <div className={styles.skeletonCard} />
              <div className={styles.skeletonCard} />
            </div>
          ) : apiError && !hasResult ? (
            <div className={styles.errorPanel} role="alert">
              <p className={styles.errorTitle}>Could not generate your bullets</p>
              <p className={styles.errorBody}>{apiError}</p>
            </div>
          ) : hasResult ? (
            <div className={styles.resultInner}>
              <ul className={styles.bulletList}>
                {result.bullets.map((bullet, index) => (
                  <li
                    key={`${bullet.lead}-${index}`}
                    className={styles.bulletCard}
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div className={styles.bulletHead}>
                      <span className={styles.leadChip}>{LEAD_LABELS[bullet.lead] || "Bullet"}</span>
                      <button
                        type="button"
                        className={styles.copyBtn}
                        onClick={() => handleCopy(index)}
                        aria-label={`Copy bullet ${index + 1}`}
                      >
                        {copiedIndex === index ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <p className={styles.bulletText}>{bullet.text}</p>
                    <details className={styles.whyPanel}>
                      <summary>Why this works</summary>
                      <dl className={styles.whyList}>
                        {Object.entries(bullet.ssiP || {}).map(([key, value]) => (
                          <div key={key} className={styles.whyRow}>
                            <dt>{SSIp_LABELS[key] || key}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </details>
                  </li>
                ))}
              </ul>

              {result.skills?.length > 0 && (
                <div className={styles.skillsBox}>
                  <p className={styles.boxLabel}>Skills detected</p>
                  <ul className={styles.skillChips}>
                    {result.skills.map((skill) => (
                      <li key={skill} className={styles.skillChip}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.coachingNote && (
                <div className={styles.coachCard}>
                  <p className={styles.boxLabel}>Coaching note</p>
                  <p className={styles.coachText}>{result.coachingNote}</p>
                </div>
              )}

              {result.missingInformation?.length > 0 && (
                <div className={styles.missingCard}>
                  <p className={styles.boxLabel}>What would make these stronger</p>
                  <ol className={styles.missingList}>
                    {result.missingInformation.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
              )}

              <button type="button" className={styles.anotherBtn} onClick={handleReset}>
                Try Another Task
              </button>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Your three bullets land here.</p>
              <ul className={styles.emptyList}>
                <li>
                  <strong>Story-Led</strong>
                  <span>the situation, the action, the outcome</span>
                </li>
                <li>
                  <strong>Skills-Led</strong>
                  <span>the competency the work proves</span>
                </li>
                <li>
                  <strong>Impact-Led</strong>
                  <span>what changed or improved</span>
                </li>
              </ul>
              <p className={styles.emptyFoot}>
                Every bullet carries positioning for your next role — and it never invents a number.
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className={styles.footer}>SSIP — Story · Skill · Impact · Positioning</footer>
    </div>
  );
}
