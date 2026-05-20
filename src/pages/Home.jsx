import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight, Leaf, Zap, Sprout, Shield,
  Cog, Rocket, Building2, GraduationCap,
  Microscope, Network, CheckCircle2, Phone, Mail, Send,
  FlaskConical, Globe
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import '../styles/Home.css'

/* ── Intersection observer hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
      className={className}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main>
      <HeroSection scrollTo={scrollTo} />
      <WhoWeAreSection />
      <CoreDomainsSection />
      <ResearchDeploySection />
      <SolutionsSection />
      <CollabEcosystem scrollTo={scrollTo} />
      <ProjectsPilots />
      <InsightsSection />
      <ContactSection />
    </main>
  )
}

/* ══════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════ */
function HeroSection({ scrollTo }) {
  const [loaded, setLoaded] = useState(false)
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  /* Topology canvas animation */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = canvas.width = canvas.offsetWidth
    let H = canvas.height = canvas.offsetHeight

    const handleResize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      /* Re-scatter nodes on resize */
      nodes.forEach(n => {
        n.x = Math.random() * W
        n.y = Math.random() * H
      })
    }
    window.addEventListener('resize', handleResize)

    const NODE_COUNT = 55
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.8,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(127,176,105,0.75)'
        ctx.fill()

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]
          const dx = n.x - m.x
          const dy = n.y - m.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 150) {
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.strokeStyle = `rgba(79,163,165,${(1 - d / 150) * 0.65})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section id="hero" className={`hero ${loaded ? 'hero--loaded' : ''}`}>
      {/* Cinematic background image */}
      <div className="hero__bg-image" />
      <div className="hero__bg-overlay" />

      {/* Topology canvas */}
      <div className="hero__topology">
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* Atmospheric fog layers */}
      <div className="hero__fog">
        <div className="hero__fog-1" />
        <div className="hero__fog-2" />
        <div className="hero__fog-3" />
      </div>

      <div className="container">
        <div className="hero__content">
          <div className="hero__pill">
            <span className="hero__pill-dot" />
            Sustainability · Energy · Agriculture
          </div>

          <h1 className="hero__headline">
            Sustainability Meets<br />
            <span className="hero__headline-accent">Strategic Innovation</span>
          </h1>

          <p className="hero__body">
            Lab-to-field sustainability systems across energy, agriculture, industrial
            ecosystems, and strategic sectors through applied R&amp;D, pilot implementation,
            and scalable innovation pathways.
          </p>

          <div className="hero__cta-row">
            <button onClick={() => scrollTo('contact')} className="btn btn-primary">
              Explore Collaboration <ArrowRight size={15} />
            </button>
            <button onClick={() => scrollTo('domains')} className="btn btn-outline">
              View Innovation Domains
            </button>
          </div>
          <div className="hero__bottom">
            <div className="hero-vision">
              <span className="vm-label">Our Vision</span>
              <p>To strengthen national resilience through sustainable innovation for energy, agriculture and strategic sectors. </p>
            </div>
            <div className="hero-mission">
              <span className="vm-label">Our Mission</span>
              <p>We create sustainability-led technologies and systems that support environmental stewardship, energy, security, agricultural resilience and strategic capability.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   SECTION 2 — WHO WE ARE
══════════════════════════════════════ */
function WhoWeAreSection() {
  return (
    <section className="section who">
      <div className="who__bg-image" />
      <div className="who__bg-accent" />
      <div className="container">
        <div className="who__grid">
          <FadeUp>
            <div className="who__left-sticky">
              <span className="tag">Who We Are</span>
              <h2 className="section-heading who__heading">
                Building Applied <br />Sustainability<br />Systems
              </h2>
              <div className="who__divider" />
            </div>
          </FadeUp>

          <FadeUp delay={0.14}>
            <div>
              <p className="who__para">
               SEA-Tech Innovations LLP is a sustainability innovation and deployment platform focused on applied R&D, pilot systems, and scalable sustainability technologies.
              </p>
              <p className="who__para">
                We operate at the intersection of sustainability, clean energy, advanced agriculture, industrial ecosystems, and strategic infrastructure through research-driven execution and collaborative innovation.
              </p>
              <p className="who__para">
                 Our approach integrates:
              </p>

              <div className="who__checklist">
                {[
                  'Research & Development', 'Systems Design',
                  'Pilot Implementation', 'Commercialization',
                  'Operational Execution', 'Collaborative Innovation',
                ].map(item => (
                  <div key={item} className="who__check-item">
                    <CheckCircle2 size={16} color="#7FB069" style={{ flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   SECTION 3 — CORE DOMAINS
══════════════════════════════════════ */
const domains = [
  {
    id: 'sustainability', label: 'Sustainability', Icon: Leaf, path: '/sustainability',
    color: '#0B3D2E', light: 'rgba(11,61,46,0.08)',
    desc: 'Circular systems, ESG frameworks, carbon management, climate resilience, environmental technologies, and sustainable industrial ecosystems.',
    themes: ['Circular economy', 'Decarbonization', 'ESG systems', 'Climate resilience', 'Sustainable materials', 'Smart sustainability'],
  },
  {
    id: 'energy', label: 'Sustainable Energy', Icon: Zap, path: '/energy',
    color: '#0E5C5A', light: 'rgba(14,92,90,0.08)',
    desc: 'Advanced bioenergy systems, sustainable fuels, waste-to-energy pathways, renewable integration, and future-ready energy ecosystems.',
    themes: ['Sustainable aviation fuel', 'Bioenergy systems', 'Waste-to-energy', 'Green hydrogen', 'Renewable fuels', 'Carbon integration'],
  },
  {
    id: 'agriculture', label: 'Sustainable Agriculture', Icon: Sprout, path: '/agriculture',
    color: '#2d6a4f', light: 'rgba(45,106,79,0.08)',
    desc: 'Climate-smart agriculture systems, regenerative ecosystems, agri-energy integration, soil carbon systems, and resource-efficient cultivation.',
    themes: ['Climate-smart systems', 'Soil carbon', 'Biomass utilization', 'Precision agriculture', 'Controlled environment', 'Circular farm systems'],
  },
  {
    id: 'strategic', label: 'Strategic Systems', Icon: Shield, path: '/strategic-systems',
    color: '#334E68', light: 'rgba(51,78,104,0.08)',
    desc: 'Resilient sustainability systems for energy security, remote infrastructure, circular logistics, resource optimization, and sustainable operational environments.',
    themes: ['Energy security', 'Remote sustainability', 'Resource optimization', 'Sustainable infrastructure', 'Smart monitoring', 'Circular logistics'],
  },
]

function CoreDomainsSection() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="domains" className="section domains">
      
      <div className="container">
        <div className='domains__bg-image' />
        <FadeUp>
          <div className="domains__header">
            <span className="tag">Innovation Domains</span>
            <h2 className="section-heading">Core Innovation Domains</h2>
            <p className="section-sub" style={{ margin: '10px auto 0' }}>
              Four interconnected pillars driving real-world sustainability systems
            </p>
          </div>
        </FadeUp>

        <div className="domains__grid">
          {domains.map((d, i) => {
            const Icon = d.Icon
            const isHov = hovered === d.id
            return (
              <FadeUp key={d.id} delay={i * 0.09}>
                <Link to={d.path} style={{ display: 'block', textDecoration: 'none' }}>
                  <div
                    className={`domain-card ${isHov ? 'domain-card--hovered' : 'domain-card--default'}`}
                    style={{
                      background: isHov ? d.color : '#fff',
                      borderColor: isHov ? d.color : 'rgba(0,0,0,0.07)',
                    }}
                    onMouseEnter={() => setHovered(d.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div
                      className="domain-card__icon-wrap"
                      style={{ background: isHov ? 'rgba(255,255,255,0.14)' : d.light }}
                    >
                      <Icon size={22} color={isHov ? '#fff' : d.color} />
                    </div>

                    <h3
                      className="domain-card__title"
                      style={{ color: isHov ? '#fff' : d.color }}
                    >
                      {d.label}
                    </h3>

                    <p
                      className="domain-card__desc"
                      style={{ color: isHov ? 'rgba(255,255,255,0.78)' : '#607080' }}
                    >
                      {d.desc}
                    </p>

                    <div className="domain-card__themes">
                      {d.themes.map(t => (
                        <span
                          key={t}
                          className="theme-pill"
                          style={{
                            background: isHov ? 'rgba(255,255,255,0.13)' : d.light,
                            color: isHov ? '#fff' : d.color,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div
                      className="domain-card__explore"
                      style={{ color: isHov ? 'rgba(255,255,255,0.85)' : d.color }}
                    >
                      Explore <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   SECTION 4 — RESEARCH TO DEPLOYMENT
══════════════════════════════════════ */
const stages = [
  { label: 'Research', icon: FlaskConical, desc: 'Applied R&D and scientific exploration' },
  { label: 'Design', icon: Cog, desc: 'Systems architecture and technology design' },
  { label: 'Pilot', icon: Microscope, desc: 'Prototype testing and field validation' },
  { label: 'Operate', icon: Network, desc: 'Real-world operational deployment' },
  { label: 'Scale', icon: Rocket, desc: 'Commercialization and scaled impact' },
]

function ResearchDeploySection() {
  const [ref, visible] = useInView(0.1)
  const [active, setActive] = useState(null)

  return (
    <section className="section pipeline">
      <div className="pipeline__grid-overlay" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <FadeUp>
          <div className="pipeline__header">
            <span className="tag">Our Model</span>
            <h2 className="section-heading light">From Research to Deployment</h2>
            <p className="section-sub light" style={{ margin: '10px auto 0' }}>
             SEA-Tech Innovations LLP bridges the gap between scientific innovation and deployable sustainability systems.
             </p>
          </div>
        </FadeUp>

        <div ref={ref} className="pipeline__stages">
          {stages.map((s, i) => {
            const Icon = s.icon
            const isActive = active === i
            return (
              <div
                key={s.label}
                className="pipeline__stage"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(22px)',
                  transition: `all 0.6s ease ${i * 0.11}s`,
                }}
              >
                <div
                  className={`pipeline__stage-card ${isActive ? 'pipeline__stage-card--active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                >
                  <div
                    className="pipeline__stage-icon-wrap"
                    style={{
                      background: isActive
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(127,176,105,0.14)',
                    }}
                  >
                    <s.icon size={20} color={isActive ? '#fff' : '#7FB069'} />
                  </div>
                  <div className="pipeline__stage-num">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="pipeline__stage-label">{s.label}</div>
                  <div className="pipeline__stage-desc">{s.desc}</div>
                </div>
                
              </div>
              
            )
          })}
        </div>

        {/* <div className="pipeline__flow">
          {stages.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="pipeline__flow-label">{s.label}</span>
              {i < stages.length - 1 && (
                <ArrowRight size={13} color="rgba(127,176,105,0.45)" />
              )}
            </div>
          ))}
        </div> */}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   SECTION 5 — SOLUTIONS
══════════════════════════════════════ */
const solutions = [
  {
    title: 'Agri-Waste to Energy Systems',
    desc: 'Integrated pathways for converting agricultural residues into scalable energy and fuel systems through biomass conversion, gasification, and pyrolysis.',
    tags: ['Biomass', 'Bioenergy', 'Waste Valorization'],
    accent: '#0B3D2E',
  },
  {
    title: 'Sustainable Fuel Ecosystems',
    desc: 'Research-driven systems for sustainable aviation fuel, biofuels, renewable fuel integration, and low-carbon energy pathways for strategic sectors.',
    tags: ['SAF', 'Biofuels', 'Renewable Fuels'],
    accent: '#0E5C5A',
  },
  {
    title: 'Circular Industrial Systems',
    desc: 'Resource optimization, waste valorization, circular logistics, and sustainable industrial systems designed for real-world operational deployment.',
    tags: ['Circular Economy', 'Waste-to-Value', 'Industrial'],
    accent: '#334E68',
  },
  {
    title: 'Climate-Smart Agriculture',
    desc: 'Advanced agriculture systems integrating resilience, resource efficiency, soil health, agri-energy integration, and regenerative farming approaches.',
    tags: ['Climate Resilience', 'Soil Carbon', 'Precision Ag'],
    accent: '#2d6a4f',
  },
  {
    title: 'Strategic Sustainability Systems',
    desc: 'Sustainable infrastructure and resilient systems for advanced operational environments, remote energy security, and resource-efficient strategic operations.',
    tags: ['Energy Security', 'Remote Systems', 'Infrastructure'],
    accent: '#1a4a6e',
  },
]

function SolutionsSection() {
  return (
    <section className="section solutions">
      <div className="container">
        <div className="solutions__bg-image" />
        <FadeUp>
          <div style={{ marginBottom: 52 }}>
            <span className="tag">Applied Solutions</span>
            <h2 className="section-heading">Applied Sustainability Pathways</h2>
            <p className="section-sub">
              Real-world sustainability systems built for deployment, scale, and long-term impact.
            </p>
          </div>
        </FadeUp>

        <div className="solutions__list">
          {solutions.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.07}>
              <div className="solution-card">
                <div
                  className="solution-card__band"
                  style={{
                    background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`,
                  }}
                >
                  <span className="solution-card__num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="solution-card__title">{s.title}</h3>
                </div>
                <div className="solution-card__body">
                  <p className="solution-card__desc">{s.desc}</p>
                  <div className="solution-card__tags">
                    {s.tags.map(t => (
                      <span
                        key={t}
                        className="solution-tag"
                        style={{
                          background: `${s.accent}12`,
                          color: s.accent,
                          border: `1px solid ${s.accent}30`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   SECTION 6 — COLLABORATION ECOSYSTEM
══════════════════════════════════════ */
const collabNodes = [
  { label: 'Academia', angle: 0, Icon: GraduationCap },
  { label: 'Research', angle: 60, Icon: Microscope },
  { label: 'Industry', angle: 120, Icon: Building2 },
  { label: 'Pilot Systems', angle: 180, Icon: Cog },
  { label: 'Sustainability Ecosystems', angle: 240, Icon: Globe },
  { label: 'Innovation Networks', angle: 300, Icon: Network },
]

function CollabEcosystem({ scrollTo }) {
  const [ref, visible] = useInView(0.1)
  const R = 130

  return (
    <section className="section collab">
      <div className="container">
        <div className="collab__grid">
          <FadeUp>
            <div className="collab__text">
              <span className="tag">Collaboration Model</span>
              <h2 className="section-heading" style={{ marginBottom: 18 }}>
                Collaboration-Driven Innovation
              </h2>
              <p>
                SEA-Tech Innovations LLP works through collaborative ecosystems involving:
              </p>
              <ul >
                <li>Academic institutions</li>
                <li>Research organizations</li>
                <li>Industry partners</li>
                <li>Pilot collaborations</li>
                <li>Technology ecosystems</li>
                <li>Sustainability stakeholders</li>
              </ul>
              <button onClick={() => scrollTo('contact')} className="btn btn-primary">
                Explore Collaboration Opportunities <ArrowRight size={15} />
              </button>
            </div>
          </FadeUp>

          <div ref={ref} className="collab__diagram">
            <svg viewBox="-220 -220 440 440" className="collab__svg">
              {/* Connection lines */}
              {collabNodes.map((n, i) => {
                const rad = (n.angle * Math.PI) / 180
                return (
                  <line
                    key={i}
                    x1={0} y1={0}
                    x2={Math.cos(rad) * R}
                    y2={Math.sin(rad) * R}
                    stroke="#0B3D2E" strokeWidth="1" strokeDasharray="4 4"
                    opacity={visible ? 0.28 : 0}
                    style={{ transition: `opacity 0.5s ease ${i * 0.09}s` }}
                  />
                )
              })}

              {/* Center node */}
              <circle cx={0} cy={0} r={44} fill="#0B3D2E"
                opacity={visible ? 1 : 0} style={{ transition: 'opacity 0.5s' }} />
              <circle cx={0} cy={0} r={53} fill="none" stroke="#0B3D2E"
                strokeWidth="1" strokeDasharray="3 3"
                opacity={visible ? 0.35 : 0}
                style={{ transition: 'opacity 0.5s', animation: 'spin-slow 22s linear infinite' }}
              />
              <text x={0} y={-6} textAnchor="middle" fill="#fff"
                fontFamily="Manrope" fontWeight="800" fontSize="9">SEA-Tech</text>
              <text x={0} y={8} textAnchor="middle" fill="rgba(255,255,255,0.65)"
                fontFamily="Inter" fontSize="7">Innovations LLP</text>

              {/* Outer nodes */}
              {collabNodes.map((n, i) => {
                const rad = (n.angle * Math.PI) / 180
                const x = Math.cos(rad) * R
                const y = Math.sin(rad) * R
                return (
                  <g
                    key={n.label}
                    opacity={visible ? 1 : 0}
                    style={{ transition: `opacity 0.5s ease ${0.18 + i * 0.09}s` }}
                  >
                    <circle cx={x} cy={y} r={32} fill="#fff" stroke="#0B3D2E" strokeWidth="1.5" />
                    <circle cx={x} cy={y} r={24} fill="rgba(11,61,46,0.06)" />
                    <text x={x} y={y + 4} textAnchor="middle" fill="#0B3D2E"
                      fontFamily="Manrope" fontWeight="700" fontSize="7">
                      {n.label.split(' ')[0]}
                    </text>
                    {n.label.split(' ').length > 1 && (
                      <text x={x} y={y + 13} textAnchor="middle" fill="#0E5C5A"
                        fontFamily="Inter" fontSize="6">
                        {n.label.split(' ').slice(1).join(' ')}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   SECTION 7 — PROJECTS & PILOTS
══════════════════════════════════════ */
const projects = [
  { title: 'Agri-Residue Valorization', tag: 'Bioenergy', accent: '#7FB069' },
  { title: 'Sustainable Fuel Pilot Pathways', tag: 'Sustainable Fuels', accent: '#7FB069' },
  { title: 'Climate-Smart Agriculture Systems', tag: 'Smart Agriculture', accent: '#7FB069' },
  { title: 'Circular Industrial Ecosystem Models', tag: 'Circular Systems', accent: '#7FB069' },
  { title: 'Resource Recovery Systems', tag: 'Climate Systems', accent: '#7FB069' },
  { title: 'Sustainable Infrastructure Pilots', tag: 'Infrastructure', accent: '#7FB069' },
]

function ProjectsPilots() {
  return (
    <section id="projects" className="section projects">
      <div className="grid-overlay" style={{ opacity: 0.25 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 18, marginBottom: 44 }}>
              <div>
                <span className="tag">Portfolio</span>
                <h2 className="section-heading light">Projects &amp; Pilot Systems</h2>
                <p className="section-sub light">
Our work focuses on pilot-ready sustainability systems designed for scalability, operational deployment, and commercialization pathways.                </p>
              </div>
            </div>
          </FadeUp>
        </div>

      <div className="projects__scroll-row-container">

        <div className="projects__scroll-row">
          {projects.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.07}>
              <div className="project-card">
                <div className="project-card__bar" />
                <h3 className="project-card__title">{p.title}</h3>
                <span className="project-card__tag">{p.tag}</span>
                <div className="project-card__status">Pilot-ready · Scalable</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   SECTION 8 — INSIGHTS
══════════════════════════════════════ */
const articles = [
  { cat: 'Sustainability', title: 'Circular Economy Systems: From Theory to Deployment', summary: 'How circular economy principles are being operationalized into real industrial sustainability systems.' },
  { cat: 'Energy', title: 'Sustainable Aviation Fuel Pathways and Scalability', summary: 'Research directions and pilot pathways shaping the future of sustainable aviation fuel ecosystems.' },
  { cat: 'Agriculture', title: 'Climate-Smart Agriculture and Soil Carbon Systems', summary: 'Integrating soil regeneration, carbon farming, and agri-energy systems for climate-resilient agriculture.' },
  { cat: 'Circular Systems', title: 'Waste Valorization in Industrial Ecosystems', summary: 'Advanced approaches to transforming industrial waste streams into resource and energy value chains.' },
  { cat: 'Strategic', title: 'Resilient Sustainability Systems for Remote Operations', summary: 'Designing sustainability-driven systems for energy security, resource efficiency, and field deployability.' },
  { cat: 'Energy', title: 'Green Hydrogen and Bioenergy Integration Pathways', summary: 'Convergence of green hydrogen production with bioenergy systems as future energy ecosystem components.' },
]

const catColors = {
  Sustainability: '#0B3D2E',
  Energy: '#0E5C5A',
  Agriculture: '#2d6a4f',
  'Circular Systems': '#334E68',
  Strategic: '#1a4a6e',
}

function InsightsSection() {
  return (
    <section id="insights" className="section insights">
      <div className="container">
        <div className='insights__bg-image' />
        <FadeUp>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 44 }}>
            <div>
              <span className="tag">Thought Leadership</span>
              <h2 className="section-heading">Insights &amp; Perspectives</h2>
              <p className="section-sub">
                Perspectives on sustainability, energy systems, agriculture innovation, circular
                ecosystems, and strategic infrastructure.
              </p>
            </div>
          </div>
        </FadeUp>

        <div className="insights__grid">
          {articles.map((a, i) => {
            const color = catColors[a.cat] || '#0B3D2E'
            return (
              <FadeUp key={a.title} delay={i * 0.06}>
                <div className="insight-card">
                  <div className="insight-card__meta">
                    <span
                      className="insight-card__cat"
                      style={{
                        color,
                        background: `${color}10`,
                        border: `1px solid ${color}25`,
                      }}
                    >
                      {a.cat}
                    </span>
                    <span className="insight-card__type">Perspective</span>
                  </div>
                  <h3 className="insight-card__title">{a.title}</h3>
                  <p className="insight-card__summary">{a.summary}</p>
                  {/* <div className="insight-card__read" style={{ color }}>
                    Read Perspective <ArrowRight size={12} />
                  </div> */}
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   SECTION 9 — CONTACT
══════════════════════════════════════ */
function ContactSection() {
  const [form, setForm] = useState({ name: '', org: '', email: '', interest: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4500)
    setForm({ name: '', org: '', email: '', interest: '', message: '' })
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact__grid">

          {/* Left — info */}
          <FadeUp>
            <div>
              <span className="tag">Let's Collaborate</span>
              <h2 className="section-heading light" style={{ marginBottom: 16 }}>
                Explore Collaboration
              </h2>
              <p className="contact__info-para">
                Collaborate with SEA-Tech Innovations LLP on sustainability systems, pilot projects, research initiatives, energy systems, agriculture innovation, and strategic sustainability pathways.
              </p>

              <div className="contact__links">
                <a href="tel:8828208244" className="contact__link">
                  <div className="contact__link-icon">
                    <Phone size={17} color="#7FB069" />
                  </div>
                  <div>
                    <div className="contact__link-label">Call</div>
                    <div className="contact__link-value">8828208244</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/9969608290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__link"
                >
                  <div className="contact__link-icon">
                    <FaWhatsapp size={17} color="#7FB069" />
                  </div>
                  <div>
                    <div className="contact__link-label">WhatsApp</div>
                    <div className="contact__link-value">9969608290</div>
                  </div>
                </a>

                <a href="mailto:office@seatech-innovations.com" className="contact__link">
                  <div className="contact__link-icon">
                    <Mail size={17} color="#7FB069" />
                  </div>
                  <div>
                    <div className="contact__link-label">Email</div>
                    <div className="contact__link-value">office@seatech-innovations.com</div>
                  </div>
                </a>
              </div>
            </div>
          </FadeUp>

          {/* Right — form */}
          <FadeUp delay={0.14}>
            <div className="contact__form-wrap">
              {sent ? (
                <div className="contact__success">
                  <CheckCircle2 size={46} color="#7FB069" style={{ margin: '0 auto' }} />
                  <h3 className="contact__success-title">Inquiry Sent!</h3>
                  <p className="contact__success-msg">
                    We'll get back to you shortly to explore collaboration opportunities.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact__form">
                  <h3 className="contact__form-title">Submit Your Inquiry</h3>

                  <div className="contact__form-row">
                    <input
                      required
                      placeholder="Name"
                      value={form.name}
                      onChange={set('name')}
                      className="contact__input"
                    />
                    <input
                      required
                      placeholder="Organization"
                      value={form.org}
                      onChange={set('org')}
                      className="contact__input"
                    />
                  </div>

                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={set('email')}
                    className="contact__input"
                  />

                  <select
                    required
                    value={form.interest}
                    onChange={set('interest')}
                    className="contact__select"
                    style={{ color: form.interest ? '#fff' : 'rgba(255,255,255,0.38)' }}
                  >
                    <option value="">Collaboration Interest</option>
                    <option value="sustainability">Sustainability Systems</option>
                    <option value="energy">Energy &amp; Biofuels</option>
                    <option value="agriculture">Agriculture Innovation</option>
                    <option value="strategic">Strategic Systems</option>
                    <option value="research">Research Partnership</option>
                    <option value="pilot">Pilot Collaboration</option>
                    <option value="other">Other</option>
                  </select>

                  <textarea
                    required
                    placeholder="Message — describe your collaboration interest..."
                    value={form.message}
                    onChange={set('message')}
                    rows={4}
                    className="contact__textarea"
                  />

                  <button type="submit" className="btn btn-primary contact__submit">
                    Submit Inquiry <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
