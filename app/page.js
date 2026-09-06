import Link from "next/link";
import { Fragment } from "react";
import styles from "./page.module.css";

const SOCIALS = [
  { icon: "▶", label: "YouTube — @EricaRiveraCareers", href: "https://www.youtube.com/@EricaRiveraCareers" },
  { icon: "◆", label: "Instagram — @ericainthemiddle", href: "https://www.instagram.com/ericainthemiddle/" },
  { icon: "◆", label: "TikTok — @ericainthemiddle", href: "https://www.tiktok.com/@ericainthemiddle" },
];

const SSIP_CARDS = [
  {
    letter: "S",
    heading: "Story",
    text: "What was actually happening? What challenge or context made the work matter? Bullets die when they list tasks. They land when they show why the work was needed.",
  },
  {
    letter: "S",
    heading: "Skills",
    text: "What capabilities did the work demonstrate — including the hidden ones and the transferable ones not listed in your job description? Glue work surfaces skills that never reach paper.",
  },
  {
    letter: "I",
    heading: "Impact",
    text: "What changed? Numbers when you have them. Qualitative truth when you don't. Real impact never needs invented percentages.",
  },
  {
    letter: "P",
    heading: "Positioning",
    text: "What does this signal about your level? The same facts can look like junior work or director-level ownership. SSIP helps you choose the positioning that is honest and strong.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Describe what you actually did",
    text: "Write in plain words. No resume jargon needed. Just explain what happened.",
  },
  {
    number: "02",
    title: "AI extracts Story, Skills, Impact, and Positioning",
    text: "Gemini 2.5 Flash applies the SSIP™ methodology to identify what your work actually demonstrates — including the parts you didn't realize were valuable.",
  },
  {
    number: "03",
    title: "Get 3 polished bullets",
    text: "Three distinct resume bullets, a coaching note, and a list of what extra information would make them even stronger.",
  },
];

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.brand} aria-label="SSIP home">
            <span className={styles.brandBox}>SSIP</span>
            <span className={styles.brandText}>Resume Bullet Strategist</span>
          </Link>
          <Link href="/generator" className={styles.navCta}>
            Try the Tool →
          </Link>
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              Turn the <span className={styles.heroUnderline}>work you actually do</span> into resume bullets.
            </h1>
            <p className={styles.heroText}>
              Describe what you did in plain words. The AI finds the Story, Skills, Impact, and Positioning — then
              hands you 3 bullets you can paste straight into your resume.
            </p>
            <div className={styles.heroActions}>
              <Link href="/generator" className={styles.primaryBtn}>
                Turn My Work Into Bullets →
              </Link>
              <a href="#how" className={styles.secondaryBtn}>
                See How It Works ↓
              </a>
            </div>
          </div>
          <aside className={styles.heroCard} aria-label="Tool facts">
            <div className={styles.heroRow}>
              <span>Framework</span>
              <strong>SSIP™ by Erica Rivera</strong>
            </div>
            <div className={styles.heroRow}>
              <span>AI Model</span>
              <strong>Gemini 2.5 Flash</strong>
            </div>
            <div className={`${styles.heroRow} ${styles.heroRowLast}`}>
              <span>Output</span>
              <strong>3 resume bullets</strong>
            </div>
          </aside>
        </div>
      </header>

      <hr className={styles.rule} />

      <section className={styles.problem}>
        <div className={styles.sectionInner}>
          <p className={styles.problemQuote}>
            “You know what you did. The hard part is explaining why it mattered.”
          </p>
          <div className={styles.problemGrid}>
            <p>
              Most professionals do far more than their job title describes. They coordinate, lead, translate, fix,
              document, and hold things together — but their resume only lists the surface. Recruiters see tasks.
              They never see the work behind the work.
            </p>
            <p>
              This is what Erica Rivera calls the <span className={styles.yellowInline}>glue person problem</span>.
              You’re carrying scope that doesn’t show up on paper. The SSIP™ framework was built to fix that. This
              tool applies it automatically, in seconds.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.sectionInner}>
          <span className={styles.badge}>The Creator</span>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutCard}>
              <p className={styles.aboutName}>Erica Rivera</p>
              <p className={styles.aboutLine}>Certified Professional Career Coach</p>
              <p className={styles.aboutLine}>Certified Professional Resume Writer</p>
              <p className={styles.aboutLine}>Former Senior Recruiter — Google &amp; Indeed</p>
            </div>
            <div className={styles.aboutCopy}>
              <p>
                After running hundreds of hiring panels at Google and Indeed, Erica Rivera left the recruiting side
                to fix the wrong-story problem from the candidate side. She built the SSIP™ framework so that the
                version of you on paper finally matches the operator you actually are. Her content has helped
                thousands of professionals stop underselling their experience.
              </p>
              <div className={styles.socialLinks}>
                {SOCIALS.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                  >
                    {social.icon} {social.label}
                  </a>
                ))}
              </div>
              <p className={styles.aboutNote}>
                The SSIP™ methodology is taught in depth on Erica’s YouTube channel. This is a fan-made AI
                implementation — not an official product.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className={styles.framework}>
        <div className={styles.sectionInner}>
          <span className={styles.badge}>The Framework</span>
          <h2 className={styles.sectionTitle}>What SSIP™ actually means.</h2>
          <div className={styles.frameworkGrid}>
            {SSIP_CARDS.map((card) => (
              <article key={card.heading} className={styles.frameworkCard}>
                <span className={styles.letterBadge}>{card.letter}</span>
                <h3 className={styles.frameworkHeading}>{card.heading}</h3>
                <p className={styles.frameworkText}>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <div className={styles.sectionInner}>
          <span className={styles.badge}>How It Works</span>
          <h2 className={styles.sectionTitle}>From messy to ready. In seconds.</h2>
          <div className={styles.stepsGrid}>
            {STEPS.map((step, index) => (
              <Fragment key={step.number}>
                {index > 0 && (
                  <span className={styles.stepArrow} aria-hidden="true">
                    →
                  </span>
                )}
                <article className={styles.stepBox}>
                  <p className={styles.stepNumber}>{step.number}</p>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </article>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.beforeAfter}>
        <div className={styles.sectionInner}>
          <span className={`${styles.badge} ${styles.badgeLight}`}>Before → After</span>
          <div className={styles.beforeAfterGrid}>
            <div>
              <p className={styles.beforeAfterLabel}>What you said</p>
              <div className={styles.beforeCard}>
                “Our project manager quit so I started tracking everyone’s tasks and running the standups even
                though I’m a designer.”
              </div>
            </div>
            <div>
              <p className={styles.beforeAfterLabel}>What your resume says</p>
              <div className={styles.afterCard}>
                “Stepped into an unassigned project management role during a critical team transition,
                independently building cross-functional task tracking and facilitating standups to maintain
                delivery alignment.”
              </div>
            </div>
          </div>
          <p className={styles.beforeAfterFoot}>
            No invented metrics. Just the real work, written at the level it was actually done.
          </p>
        </div>
      </section>

      <section className={styles.finalCta}>
        <h2 className={styles.finalCtaTitle}>Your resume should reflect the work you actually do.</h2>
        <Link href="/generator" className={styles.finalCtaBtn}>
          Turn My Work Into Bullets →
        </Link>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>
            <p className={styles.footerTitle}>SSIP Bullet Generator</p>
            <p className={styles.footerLine}>Built on the SSIP™ framework by Erica Rivera.</p>
            <p className={styles.footerDim}>An independent AI implementation.</p>
          </div>
          <div className={styles.footerRight}>
            {SOCIALS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                {social.icon} {social.label}
              </a>
            ))}
          </div>
        </div>
        <p className={styles.footerStrip}>
          Not an official Erica Rivera product. Built as an AI prototype for the Synvo Venture Studio assignment.
        </p>
      </footer>
    </div>
  );
}
