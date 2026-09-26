import { useEffect, useRef, useState } from "react";
import "./Portfolio.css";
import ChatWidget from "./ChatWidget.jsx";
import CursorGlow from "./CursorGlow.jsx";

import {
  LINKS, PERSONAL, TYPED_PHRASES, NAV_ITEMS, ABOUT_CARDS, SKILLS,
  FEATURED_PROJECTS, OTHER_PROJECTS, EXPERIENCE, EDUCATION, ACHIEVEMENTS, LEARNING,
} from "./content.js";


/* ============================================================
   HOOKS
   ============================================================ */

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

function useTypewriter(phrases, { typingSpeed = 65, deletingSpeed = 35, pauseTime = 1500, gapTime = 400 } = {}) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const reducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion.current) {
      setText(phrases[0]);
      return;
    }
    const current = phrases[phraseIndex];
    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && text === current) {
      delay = pauseTime;
    } else if (isDeleting && text === "") {
      delay = gapTime;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting && text === current) {
        setIsDeleting(true);
        return;
      }
      if (isDeleting && text === "") {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
        return;
      }
      setText((t) => (isDeleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)));
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime, gapTime]);

  return text;
}

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

function HeroAvatar() {
  return (
    <div className="hero-avatar">
      <div className="hero-avatar-frame">
        {/* PLACEHOLDER: swap for a head-and-shoulders photo, facing camera, plain background */}
        <img src="/pp.png" alt="Muhammad Umar Shaikh" width="300" height="355" loading="eager" />
      </div>
    </div>
  );
}

function Tag({ children }) {
  return <span className="tag">{children}</span>;
}

function ExternalLink({ href, className, children }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function ProjectCase({ project }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="case-card">
      <div className="case-head">
        <div>
          <h3>{project.name}</h3>
          <p className="case-desc">{project.description}</p>
        </div>
        <button className="ghost-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? "Close" : "View case study"}
        </button>
      </div>
      <div className="tag-row">
        {project.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <ExternalLink href={project.link} className="text-link small">View on GitHub →</ExternalLink>
      {project.Image ? (
        <img
          src={project.Image}
          alt={project.name}
          className="media-image"
          width="1200"
          height="600"
          loading="lazy"
        />
      ) : (
        <div className="media-slot" aria-hidden="true">
          <span>Project screenshot — add image</span>
        </div>
      )}
      {open && (
        <div className="case-body">
          <div>
            <h4>Overview</h4>
            <p>{project.overview}</p>
          </div>
          <div>
            <h4>Problem</h4>
            <p>{project.problem}</p>
          </div>
          <div>
            <h4>Solution</h4>
            <p>{project.solution}</p>
          </div>
          <div>
            <h4>Technical implementation</h4>
            <p>{project.implementation}</p>
          </div>
          <div>
            <h4>Key features</h4>
            <ul>
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>What I learned</h4>
            <p>{project.learned}</p>
          </div>
          <div className="case-links">
            <ExternalLink href={project.link} className="text-link">Code on GitHub →</ExternalLink>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="tag-row">
        {project.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <ExternalLink href={project.link || LINKS.github} className="text-link small">View on GitHub →</ExternalLink>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(NAV_ITEMS.map((n) => n.id));
  const typed = useTypewriter(TYPED_PHRASES);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-root">
      <CursorGlow />
      {/* NAV */}
      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#home" className="brand">
            Umar<span className="dot">.</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeMenu}
                className={active === item.id ? "active" : ""}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-socials">
            <ExternalLink href={LINKS.github}>GitHub</ExternalLink>
            <ExternalLink href={LINKS.linkedin}>LinkedIn</ExternalLink>
          </div>

          <button className="menu-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span />
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <div className="mobile-socials">
              <ExternalLink href={LINKS.github}>GitHub</ExternalLink>
              <ExternalLink href={LINKS.linkedin}>LinkedIn</ExternalLink>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="bg-atmosphere" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="grid-overlay" />
        </div>
        <div className="hero-inner">
          <div className="hero-text">
            <p className="eyebrow-plain">{PERSONAL.role} · {PERSONAL.location}</p>
            <div className="hero-name-row">
              <h1>
                <span aria-hidden="true" className="typewriter-text">
                  {typed}
                  <span className="type-cursor">|</span>
                </span>
                <span className="sr-only">Hi, I'm {PERSONAL.firstName} — {PERSONAL.role}</span>
              </h1>
              <HeroAvatar />
            </div>
            <p className="hero-sub">{PERSONAL.sub}</p>
            <div className="hero-ctas">
              <a href="#projects" className="btn-primary">View My Projects</a>
              <a href="#contact" className="btn-secondary">Let's Connect</a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <Reveal as="h2" className="section-title">About Me</Reveal>
        <Reveal delay={80} className="about-grid">
          <p className="about-bio">
            I'm a Software Engineering student at FAST-NUCES, currently in my third semester. My work so far has been
            focused on building a solid foundation — object-oriented programming, data structures, and enough web
            development to build real, working interfaces on top of that logic. I'm most interested in software
            development, artificial intelligence, and full-stack engineering, and I'd rather spend time building
            something small and complete than something large and unfinished.
          </p>
          <div className="about-cards">
            {ABOUT_CARDS.map((c) => (
              <div className="about-card" key={c.label}>
                <span className="about-card-label">{c.label}</span>
                <span className="about-card-value">{c.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section section-alt">
        <Reveal as="h2" className="section-title">Skills</Reveal>
        <div className="skills-grid">
          {SKILLS.map((group, i) => (
            <Reveal delay={i * 60} key={group.category} className="skill-group">
              <h3>{group.category}</h3>
              <div className="tag-row">
                {group.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <Reveal as="h2" className="section-title">Selected Projects</Reveal>
        <Reveal delay={60} as="p" className="section-lead">
          A mix of coursework and personal projects — spanning data structures, object-oriented systems, and
          front-end interfaces.
        </Reveal>

        <div className="case-list">
          {FEATURED_PROJECTS.map((p, i) => (
            <Reveal delay={i * 80} key={p.name}>
              <ProjectCase project={p} />
            </Reveal>
          ))}
        </div>

        <Reveal as="h3" className="subsection-title">More Projects</Reveal>
        <div className="project-grid">
          {OTHER_PROJECTS.map((p, i) => (
            <Reveal delay={i * 60} key={p.name}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section section-alt">
        <Reveal as="h2" className="section-title">Experience & Development</Reveal>
        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <Reveal delay={i * 80} key={e.role} className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div>
                <div className="timeline-head">
                  <h3>{e.role}</h3>
                  <span className="timeline-date">{e.date}</span>
                </div>
                <p className="timeline-org">{e.org}</p>
                <p>{e.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section">
        <Reveal as="h2" className="section-title">Education</Reveal>
        <div className="education-list">
          {EDUCATION.map((ed, i) => (
            <Reveal delay={i * 80} key={ed.degree} className="education-card">
              <div className="education-head">
                <h3>{ed.degree}</h3>
                <span className="timeline-date">{ed.date}</span>
              </div>
              <p className="timeline-org">{ed.school}</p>
              <p>{ed.detail}</p>
              {ed.coursework.length > 0 && (
                <div className="tag-row">
                  {ed.coursework.map((c) => (
                    <Tag key={c}>{c}</Tag>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="section section-alt">
        <Reveal as="h2" className="section-title">Achievements & Participation</Reveal>
        <div className="achieve-grid">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal delay={i * 70} key={a.title} className="achieve-card">
              <h3>{a.title}</h3>
              <p className="timeline-org">{a.org}</p>
              <p>{a.description}</p>
              {a.image ? (
                <img src={a.image} alt={a.title} className="media-image small" width="400" height="160" loading="lazy" />
              ) : (
                <div className="media-slot small" aria-hidden="true">
                  <span>Add photo</span>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal as="h3" className="subsection-title">Currently Building</Reveal>
        <div className="learning-grid">
          {LEARNING.map((l, i) => (
            <Reveal delay={i * 70} key={l.title} className="learning-card">
              <h4>{l.title}</h4>
              <p>{l.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact-section">
        <Reveal as="h2" className="section-title">Let's Build Something</Reveal>
        <Reveal delay={60} as="p" className="section-lead">
          I'm always interested in learning, collaborating, and working on meaningful software projects.
        </Reveal>
        <Reveal delay={120} className="contact-links">
          <a href={LINKS.email} className="btn-primary">Email Me</a>
          <ExternalLink href={LINKS.github} className="btn-secondary">GitHub</ExternalLink>
          <ExternalLink href={LINKS.linkedin} className="btn-secondary">LinkedIn</ExternalLink>
        </Reveal>
        <Reveal delay={160} as="p" className="contact-direct">
          umarshk0305@gmail.com
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div>
          <p className="footer-name">{PERSONAL.name}</p>
          <p className="footer-role">Software Engineering Student</p>
        </div>
        <div className="footer-links">
          <ExternalLink href={LINKS.github}>GitHub</ExternalLink>
          <ExternalLink href={LINKS.linkedin}>LinkedIn</ExternalLink>
          <a href={LINKS.email}>Email</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} {PERSONAL.name}</p>
      </footer>

      <ChatWidget />
    </div>
  );
}
