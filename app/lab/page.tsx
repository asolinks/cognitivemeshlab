import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cognitive Mesh Lab',
  description: 'The venture arm — research infrastructure, products, services, and the roadmap from Toiminimi to Oy.',
}

const roadmapYears = [
  { year: 'Year 1 (2026)', label: 'Foundation', color: '#5a6ef5', status: 'Now',
    items: ['PhD programme begins', 'Prototype public on GitHub', 'First tutorial series (YouTube)', 'Consulting services open', 'Toiminimi operational'] },
  { year: 'Year 2 (2027)', label: 'Education', color: '#14b8a6', status: 'Building',
    items: ['Course platform launch', 'First paying students', 'Community Discord active', '2 research papers submitted', 'Hire first collaborator'] },
  { year: 'Year 3 (2028)', label: 'Infrastructure', color: '#f59e0b', status: 'Planned',
    items: ['Agent orchestration SDK', 'Edge AI deployment tools', 'Research lab hub live', 'Cognitive Mesh Lab Oy formed', 'First grant funding'] },
  { year: 'Year 4–5 (2029+)', label: 'Scale', color: '#f87171', status: 'Vision',
    items: ['Full commercial products', 'International research partnerships', 'Startup incubation arm', 'Thesis submitted', 'PhD complete'] },
]

const services = [
  { icon: '⬡', title: 'AI Architecture Consulting', desc: 'Distributed AI system design, edge ML deployment, multi-agent frameworks. Priced per project via Cognitive Mesh Lab Toiminimi.', tags: ['Edge AI', 'Architecture'] },
  { icon: '◈', title: 'Technical Education', desc: 'Custom workshops and training on federated learning, distributed systems, Rust, and edge AI for teams and organisations.', tags: ['Workshops', 'Teams'] },
  { icon: '⊕', title: 'Research Collaboration', desc: 'Joint research projects, grant co-applications, and academic partnerships. Particularly interested in 5G, edge AI, and multi-agent systems.', tags: ['Research', 'Academic'] },
  { icon: '⬡', title: 'Open Source Development', desc: 'Custom Rust or Python tooling for distributed systems, edge computing infrastructure, and agent orchestration frameworks.', tags: ['Rust', 'Open Source'] },
]

export default function LabPage() {
  return (
    <div style={{ paddingTop: 100, padding: '100px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <span className="tag tag-amber">Toiminimi · Oulu</span>
          <span className="tag tag-teal">→ Cognitive Mesh Lab Oy</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 60px)', color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.02em' }}>
          Cognitive Mesh Lab
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 640 }}>
          The venture arm of the research programme. Research becomes products, tutorials become community,
          and community becomes innovation. Registered in Oulu as a Toiminimi — growing to Oy.
        </p>
      </div>

      {/* Vision */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(90,110,245,0.05))',
        border: '1px solid rgba(245,158,11,0.2)',
        borderRadius: 16, padding: 36, marginBottom: 64,
      }}>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', letterSpacing: '0.1em', marginBottom: 12 }}>MISSION</p>
        <blockquote style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.5vw, 26px)',
          color: 'var(--text-primary)', lineHeight: 1.5, fontStyle: 'italic',
          borderLeft: '3px solid var(--accent-amber)', paddingLeft: 20,
        }}>
          "To build the tools, knowledge, and community that makes distributed AI at the edge
          accessible, understandable, and deployable — by researchers and practitioners alike."
        </blockquote>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 16, fontFamily: 'var(--font-mono)' }}>
          — Stanley Amaechi, Founder
        </p>
      </div>

      {/* Five divisions */}
      <div style={{ marginBottom: 64 }}>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', letterSpacing: '0.1em', marginBottom: 8 }}>ECOSYSTEM</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 8 }}>Five Divisions</h2>
        <div className="section-divider" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { icon: '🔬', name: 'Research', desc: 'PhD + UBICOMP + open experiments', color: '#5a6ef5', href: '/research' },
            { icon: '📚', name: 'Education', desc: 'Tutorials, courses, learning portal', color: '#14b8a6', href: '/learn' },
            { icon: '👥', name: 'Community', desc: 'Discord, newsletter, events', color: '#f59e0b', href: '#community' },
            { icon: '⚙️', name: 'Innovation', desc: 'Products, SDKs, tools', color: '#f87171', href: '#products' },
            { icon: '📡', name: 'Communication', desc: 'Blog, YouTube, social', color: '#a78bfa', href: '/blog' },
          ].map((d, i) => (
            <Link key={i} href={d.href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{d.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: d.color, marginBottom: 8 }}>{d.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{d.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div id="roadmap" style={{ marginBottom: 64 }}>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)', letterSpacing: '0.1em', marginBottom: 8 }}>10-YEAR JOURNEY</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 8 }}>Roadmap</h2>
        <div className="section-divider" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {roadmapYears.map((y, i) => (
            <div key={i} className="card" style={{ padding: 24, borderTop: `3px solid ${y.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: y.color }}>{y.year}</span>
                <span className={`tag ${y.status === 'Now' ? 'tag-teal' : y.status === 'Building' ? 'tag-blue' : 'tag-gray'}`} style={{ fontSize: 10 }}>{y.status}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-primary)', marginBottom: 14 }}>{y.label}</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {y.items.map((item, j) => (
                  <li key={j} style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 7, display: 'flex', gap: 8 }}>
                    <span style={{ color: y.color, flexShrink: 0 }}>→</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div id="products" style={{ marginBottom: 64 }}>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', letterSpacing: '0.1em', marginBottom: 8 }}>SERVICES</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 8 }}>What I Offer</h2>
        <div className="section-divider" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {services.map((s, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-primary)', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 14 }}>{s.desc}</p>
              <div style={{ display: 'flex', gap: 6 }}>
                {s.tags.map(t => <span key={t} className="tag tag-gray" style={{ fontSize: 11 }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <Link href="/contact" className="btn-primary">Discuss a project →</Link>
        </div>
      </div>

      {/* Toiminimi legal note */}
      <div id="community" style={{ background: 'rgba(8,12,24,0.6)', border: '1px solid var(--border)', borderRadius: 12, padding: 28 }}>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 12 }}>LEGAL STRUCTURE</p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Cognitive Mesh Lab is a registered <strong style={{ color: 'var(--text-primary)' }}>toiminimi (sole trader)</strong> in Finland, operating under the registered business name Cognitive Mesh Lab — a direct rename of the original Stanley Amaechi sole trader registration. All consulting, education, and service revenue is invoiced through this entity.
          The roadmap targets conversion to <strong style={{ color: 'var(--text-primary)' }}>Cognitive Mesh Lab Oy</strong> by Year 3 (2028),
          enabling external investment, equity partnerships, and grant funding at institutional scale.
        </p>
      </div>
    </div>
  )
}
