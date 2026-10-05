import { useState, useEffect } from 'react'

const CHART_X_MIN = 10
const CHART_X_MAX = 782

function milestoneFor(value) {
  if (value < 33) return { year: '2015', label: 'Earliest data in the set' }
  if (value < 66) return { year: '2022', label: 'A structural break in the market' }
  return { year: '2026', label: 'LSTM forecast · MAPE 3.22%' }
}

const MARQUEE_ITEMS = [
  'Python', 'XGBoost', 'LSTM', 'SHAP', 'React',
  'NestJS', 'TypeScript', 'Leaflet', 'Open-Meteo', 'FinBERT',
]

const PROJECTS = [
  {
    name: 'SmartTeaAI',
    tagline: 'Dissertation · Tea auction price forecasting',
    img: '/projects/smarttea.png',
    desc: 'A forecasting system for Sri Lanka’s tea auction prices at national and elevation level. It runs ARIMA, SARIMAX, Random Forest, XGBoost and LSTM, explains predictions with SHAP, and reads market sentiment through a FinBERT pipeline — served via a NestJS API with role-based access.',
    tags: ['Python', 'LSTM', 'XGBoost', 'SHAP', 'NestJS', 'FinBERT'],
    href: 'https://github.com/MalmEEE/SmartTeaAI-',
  },
  {
    name: 'DocChat',
    tagline: 'React · FastAPI · RAG',
    img: '/projects/docChat.png',
    desc: 'Chat with your PDFs — a RAG app that answers questions from your own documents with page-level citations. Chunks and embeds documents with sentence-transformers, retrieves from ChromaDB, and generates grounded answers with Gemini.',
    tags: ['React', 'FastAPI', 'sentence-transformers', 'ChromaDB', 'Gemini'],
    href: 'https://github.com/MalmEEE/doc-chat',
  },
  {
    name: 'Cafe Finder',
    tagline: 'React · Node / Express',
    img: '/projects/cafe.png',
    desc: 'Find nearby cafes on a map — live opening hours, filters and sorting, and favourites saved locally. Built on OpenStreetMap and Leaflet.',
    tags: ['React', 'Node/Express', 'Leaflet', 'OSM'],
    href: 'https://github.com/MalmEEE/Cafe-Finder',
  },
  {
    name: 'Weather Planner',
    tagline: 'React · Node / Express',
    img: '/projects/weather.png',
    desc: 'A “what to wear, what to do” planner that turns live weather and air-quality data into one clear suggestion, using geolocation or manual search.',
    tags: ['React', 'Node/Express', 'Open-Meteo'],
    href: 'https://github.com/MalmEEE/weather-planner',
  },
  {
    name: 'Movie Recommender',
    tagline: 'React · FastAPI · Collaborative filtering',
    img: '/projects/movie-recommender.png',
    desc: 'Rate a few movies, get personalized picks — item-based collaborative filtering on MovieLens, enriched with TMDb data, served via FastAPI to a React UI.',
    tags: ['React', 'FastAPI', 'MovieLens', 'TMDb'],
    href: 'https://github.com/MalmEEE/movie-recommender',
  },
]

const DEVICON = (slug) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`

// invert:true -> logo is essentially black, so flip it to white on the dark UI
const TECH = [
  { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
  { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
  { name: 'Python',     slug: 'python',     color: '#3776AB' },
  { name: 'Java',       slug: 'java',       color: '#EA2D2E' },
  { name: 'C#',         slug: 'csharp',     color: '#9B4F96' },
  { name: 'C++',        slug: 'cplusplus',  color: '#00599C' },
  { name: 'R',          slug: 'r',          color: '#276DC3' },
  { name: 'React',      slug: 'react',      color: '#61DAFB' },
  { name: 'Next.js',    slug: 'nextjs',     color: '#E5E5E5', invert: true },
  { name: 'NestJS',     slug: 'nestjs',     color: '#E0234E' },
  { name: 'Express',    slug: 'express',    color: '#CFCFCF', invert: true },
  { name: 'HTML5',      slug: 'html5',      color: '#E34F26' },
  { name: 'CSS3',       slug: 'css3',       color: '#1572B6' },
  { name: 'MySQL',      slug: 'mysql',      color: '#4479A1' },
  { name: 'PostgreSQL', slug: 'postgresql', color: '#589AC7' },
  { name: 'Git',        slug: 'git',        color: '#F05032' },
  { name: 'GitHub',     slug: 'github',     color: '#E5E5E5', invert: true },
]

const DS_TOOLS = [
  { name: 'Python',       slug: 'python',      color: '#3776AB' },
  { name: 'pandas',       slug: 'pandas',      color: '#E70488' },
  { name: 'NumPy',        slug: 'numpy',       color: '#4DABCF' },
  { name: 'scikit-learn', slug: 'scikitlearn', color: '#F89939' },
  { name: 'Jupyter',      slug: 'jupyter',     color: '#F37626' },
  { name: 'R',            slug: 'r',           color: '#276DC3' },
]

const ML_METHODS = [
  'Neural Networks (LSTM)', 'Random Forest', 'XGBoost', 'Regression',
  'Time Series (ARIMA/SARIMAX)', 'SHAP Explainability', 'Network Analysis (igraph)', 'Feature Engineering',
]

const GIS_BI = ['QGIS', 'Power BI', 'PostGIS']
const PRACTICES = ['Agile', 'OOP', 'REST APIs']

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'talk', label: 'Contact' },
]

const ROLES = ['Full-Stack Developer', 'Data Science Student', 'React & Python Dev', 'Problem Solver']

function RotatingRole() {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = ROLES[i]
    let delay = deleting ? 45 : 90
    if (!deleting && text === full) delay = 1500
    if (deleting && text === '') delay = 350

    const timer = setTimeout(() => {
      if (!deleting && text === full) { setDeleting(true); return }
      if (deleting && text === '') { setDeleting(false); setI((n) => (n + 1) % ROLES.length); return }
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(timer)
  }, [text, deleting, i])

  return (
    <span className="role-text">{text}<span className="caret" aria-hidden="true">|</span></span>
  )
}

function TechTile({ t }) {
  return (
    <div className="tech-tile" style={{ '--c': t.color }}>
      <span className="logo-chip">
        <img
          src={DEVICON(t.slug)}
          alt={t.name}
          className={t.invert ? 'logo invert' : 'logo'}
          width="34" height="34" loading="lazy"
        />
      </span>
      <span className="mono tech-name">{t.name}</span>
    </div>
  )
}

function ProjectCard({ p, featured }) {
  return (
    <article className={`project-card${featured ? ' featured' : ''}`}>
      <div className="project-media">
        <span className="project-fallback" aria-hidden="true">{p.name}</span>
        <img src={p.img} alt={`${p.name} preview`} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} />
      </div>
      <div className="project-body">
        <div className="project-head">
          <h3 className="display project-name">{p.name}</h3>
          <span className="mono project-tagline">{p.tagline}</span>
        </div>
        <p className="project-desc">{p.desc}</p>
        <div className="pill-row">
          {p.tags.map((tag) => <span className="pill" key={tag}>{tag}</span>)}
        </div>
        {p.href && (
          <a className="mono code-link" href={p.href} target="_blank" rel="noopener noreferrer">View the code</a>
        )}
      </div>
    </article>
  )
}

function Chevron({ open }) {
  return (
    <svg
      className={`chev${open ? ' open' : ''}`}
      width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
    >
      <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function App() {
  const [scrub, setScrub] = useState(0)
  const [open, setOpen] = useState({ smarttea: false, cafe: false, weather: false })

  const milestone = milestoneFor(scrub)
  const markerX = CHART_X_MIN + (CHART_X_MAX - CHART_X_MIN) * (scrub / 100)

  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }))

  const [active, setActive] = useState('')
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    NAV.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <header className="nav">
        <div className="wrap">
          <div className="navbar">
            <a href="#top" className="mono navname">Malmi<span className="nav-dot">.</span></a>
            <nav className="navlinks">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'active' : ''}>{n.label}</a>
              ))}
            </nav>
            <a href="#talk" className="nav-cta">Let's talk</a>
          </div>
        </div>
      </header>

      <main>
        <section id="top" className="hero">
          <div className="hero-bg">
            <img src="/portrait.png" alt="Illustration of Malmi at her desk, working across coding, data dashboards and a laptop" />
            <div className="hero-scrim" aria-hidden="true" />
          </div>
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="status-pill"><span className="status-dot" aria-hidden="true" />Available for work</div>
              <div className='social-row'>
                <a href="https://github.com/MalmEEE" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>
                </a>
                <a href="https://linkedin.com/in/malmi-wimalaweera-ba4071315" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z"/></svg>
                </a>
                <a href="mailto:m.wimalaweera01@gmail.com" aria-label="Email">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                </a>
              </div>
              <h1 className='display greet'>Hi, I'm <span className='gradient-text'>Malmi</span></h1>
              <div className='mono role'><RotatingRole /></div>
              <p className="lede">
                I'm a full-stack developer and final-year Data Science student who loves turning ideas into working products. I build full-stack web apps with React, Next.js, NestJS and TypeScript, and use Python for data science and machine learning.
              </p>
              <div className="hero-actions">
                <a href="/Malmi_Wimalaweera_CV.pdf" download className="glow-btn">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/></svg>
                  Download CV
                </a>
                <a href="#talk" className="ghost-btn">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                  Hire Me
                </a>
              </div>
            </div>
          </div>
        </section>


        <div className="marquee-wrap">
          <div className="marquee-track mono">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>

        <section id="about" className="section">
          <div className="wrap grid-2 about-grid">
            <div className="about-copy">
              <span className="mono eyebrow">About me</span>
              <h2 className="display">From full-stack to forecasting</h2>
              <p>
                I spent the past year as a trainee full-stack developer at Toyota Lanka (Pvt) Ltd, where I designed
                and built an internal enterprise web application end to end, and contributed to several
                other internal systems for performance management, company communications and sales
                tracking. I also kept live production platforms healthy with bug fixes and change requests —
                all in React, Next.js, NestJS and Express, with MySQL underneath, inside an Agile team.
              </p>
              <p>
                I'm now finishing a BSc in Data Science, where I've built dashboards in Power BI, run
                regression and network analysis in R, mapped geospatial data in QGIS, and placed well in a
                Kaggle competition with XGBoost. What ties it together is the same instinct from the
                full-stack years: take a real, messy problem and build something that actually works.
              </p>
            </div>

            <div className="about-side">
              <div className="about-profile">
                <div className="avatar">
                  <span className="avatar-initials" aria-hidden="true">MW</span>
                  <img src="/me.jpg" alt="Malmi Wimalaweera" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                </div>
                <div className="display ap-name">Malmi Wimalaweera</div>
                <div className="mono ap-role">Full-Stack Developer · Data Science</div>
                <div className="ap-stats">
                  <div className="ap-stat"><span className="display ap-num">1 yr</span><span className="ap-lbl">Industry experience</span></div>
                  <div className="ap-stat"><span className="display ap-num">BSc</span><span className="ap-lbl">Data Science, final year</span></div>
                  <div className="ap-stat"><span className="display ap-num">SL</span><span className="ap-lbl">Based in Sri Lanka</span></div>
                </div>
              </div>

              <div className="edu-card">
                <div className="edu-head">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5" /></svg>
                  <span className="edu-title">Education</span>
                </div>
                <div className="edu-timeline">
                  <div className="edu-item">
                    <span className="edu-dot" aria-hidden="true" />
                    <div className="edu-degree">BSc (Hons) in Data Science</div>
                    <div className="edu-org">ICBT Campus · Cardiff Metropolitan University</div>
                    <span className="mono edu-year">2024 – Present · Final Year</span>
                  </div>
                  <div className="edu-item">
                    <span className="edu-dot" aria-hidden="true" />
                    <div className="edu-degree">Higher Diploma in Software Engineering</div>
                    <div className="edu-org">ICBT Campus</div>
                    <span className="mono edu-year">2022 – 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section">
          <div className="wrap">
            <h2 className="display">What I've been building</h2>
            <p className="hint">A few projects I've built recently.</p>
            <div className="projects">
              <ProjectCard p={PROJECTS[0]} featured />
              <div className="projects-grid">
                {PROJECTS.slice(1).map((p) => <ProjectCard p={p} key={p.name} />)}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="wrap">
            <h2 className="display">What I work with</h2>
            <p className="hint">Languages, frameworks and tools I build with day to day.</p>
            <div className="tech-grid">
              {TECH.map((t) => <TechTile t={t} key={t.name} />)}
            </div>

            <h3 className="display subhead">Data science &amp; ML</h3>
            <div className="tech-grid ds-grid">
              {DS_TOOLS.map((t) => <TechTile t={t} key={t.name} />)}
            </div>
            <div className="pill-row methods-row">
              {ML_METHODS.map((m) => <span className="pill" key={m}>{m}</span>)}
            </div>

            <div className="concept-groups two">
              <div className="concept-group">
                <div className="mono group-label">GIS &amp; BI</div>
                <div className="pill-row">
                  {GIS_BI.map((item) => <span className="pill" key={item}>{item}</span>)}
                </div>
              </div>
              <div className="concept-group">
                <div className="mono group-label">Practices</div>
                <div className="pill-row">
                  {PRACTICES.map((item) => <span className="pill" key={item}>{item}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="talk" className="section talk">
          <div className="wrap talk-inner">
            <h2 className="display">Let's talk</h2>
            <p>Happy to talk about full-stack engineering, data science, or anything in between.</p>
            <a href="mailto:m.wimalaweera01@gmail.com" className="glow-btn">m.wimalaweera01@gmail.com</a>
            <div className="talk-links">
              <a href="https://github.com/MalmEEE" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/malmi-wimalaweera-ba4071315" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap mono">© 2026 Malmi Wimalaweera</div>
      </footer>
    </>
  )
}