import Link from 'next/link'

const stats = [
  { value: '4yr', label: 'PhD Programme', sub: 'University of Oulu' },
  { value: '5', label: 'Crate Architecture', sub: 'Rust workspace' },
  { value: '98%', label: 'Loss reduction', sub: 'MVP simulation' },
  { value: '∞', label: 'Edge nodes', sub: 'Target scale' },
]

const researchAreas = [
  { icon: '⬡', label: 'Multi-Agent Systems', color: '#5a6ef5', tag: 'tag-blue' },
  { icon: '⟳', label: 'Federated Learning', color: '#14b8a6', tag: 'tag-teal' },
  { icon: '◈', label: 'Edge AI / 5G', color: '#f59e0b', tag: 'tag-amber' },
  { icon: '⊕', label: 'Signal-Native Learning', color: '#f87171', tag: 'tag-coral' },
  { icon: '⬡', label: 'Distributed Systems', color: '#5a6ef5', tag: 'tag-blue' },
  { icon: '◈', label: 'Sovereign Agent Identity', color: '#14b8a6', tag: 'tag-teal' },
]

const roles = [
  {
    icon: '🎓',
    title: 'PhD Researcher',
    org: 'University of Oulu',
    dept: 'Center for Ubiquitous Computing',
    desc: 'Investigating emergent collective intelligence in sovereign multi-agent edge systems under proposed supervision of Dr. Lauri Lovén.',
    href: '/research',
    color: '#5a6ef5',
  },
  {
    icon: '⚗️',
    title: 'Project Researcher',
    org: 'UBICOMP Lab',
    dept: 'Future Computing Group',
    desc: 'Working on edge AI orchestration, distributed inference, and resource-aware adaptive systems at the 5G network edge.',
    href: '/research#ubicomp',
    color: '#14b8a6',
  },
  {
    icon: '🔬',
    title: 'Founder',
    org: 'Cognitive Mesh Lab',
    dept: 'Toiminimi → Oy (Oulu)',
    desc: 'Building the research infrastructure, products, and services arm of the Cognitive Mesh ecosystem. Education → Community → Innovation.',
    href: '/lab',
    color: '#f59e0b',
  },
]

const latestPosts = [
  {
    date: 'Mar 2026',
    title: 'Building a Rust Orchestration Framework for Heterogeneous IoT + ML Systems',
    excerpt: 'How we unified I2C, BLE, and TCP/IP under a single typed envelope format while enabling gradient exchange between autonomous agents.',
    tags: ['Rust', 'Edge AI', 'Federated Learning'],
    href: '/blog/rust-orchestration-framework',
  },
  {
    date: 'Feb 2026',
    title: 'The Cognitive Mesh: Why Intelligence Should Be a Property of the System, Not the Model',
    excerpt: 'The case for emergence-first distributed AI — moving from model-centric to agent-collective-centric intelligence design.',
    tags: ['Theory', 'Multi-agent', 'Edge AI'],
    href: '/blog/cognitive-mesh-theory',
  },
  {
    date: 'Jan 2026',
    title: 'From Toiminimi to PhD: Structuring a Research Venture in Finland',
    excerpt: 'Practical notes on running a Finnish sole trader research practice while pursuing doctoral research — legal structure, funding, and time.',
    tags: ['Entrepreneurship', 'Finland', 'PhD Life'],
    href: '/blog/toiminimi-to-phd',
  },
]

export default function HomePage() {
  return (
    <div style={{ paddingTop: 64 }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        minHeight: '92vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '80px 24px 60px',
        maxWidth: 1200, margin: '0 auto',
      }}>
        {/* Status badge */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span className="tag tag-teal animate-fade-up" style={{ animationDelay: '0s' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2dd4bf', display: 'inline-block', marginRight: 6, animation: 'node-pulse 2s ease-in-out infinite' }}></span>
            PhD Research — University of Oulu
          </span>
          <span className="tag tag-blue animate-fade-up delay-100">
            Cognitive Mesh Lab — Oulu 🇫🇮
          </span>
        </div>

        {/* Main headline */}
        <h1 className="animate-fade-up delay-200" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 7vw, 88px)',
          lineHeight: 1.08,
          color: 'var(--text-primary)',
          marginBottom: 8,
          letterSpacing: '-0.02em',
          maxWidth: 900,
        }}>
          Building{' '}
          <span className="gradient-text">emergent</span>
          <br />
          collective intelligence
        </h1>
        <h2 className="animate-fade-up delay-300" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 52px)',
          lineHeight: 1.15,
          color: 'var(--text-secondary)',
          marginBottom: 32,
          fontStyle: 'italic',
          fontWeight: 400,
        }}>
          at the 5G edge.
        </h2>

        <p className="animate-fade-up delay-400" style={{
          fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7,
          maxWidth: 620, marginBottom: 40,
        }}>
          I'm <strong style={{ color: 'var(--text-primary)' }}>Stanley Amaechi</strong> — AI researcher, distributed systems engineer,
          and founder. I study how sovereign AI agents self-organise into collectively intelligent
          systems at the 5G network edge. I build the tools to make it real.
        </p>

        <div className="animate-fade-up delay-500" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 72 }}>
          <Link href="/research" className="btn-primary">
            <span>→</span> Read the Research
          </Link>
          <Link href="/projects" className="btn-outline">
            View Open Source
          </Link>
          <Link href="/contact" className="btn-outline">
            Hire / Collaborate
          </Link>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 2, maxWidth: 700,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: '20px 16px',
              borderTop: '1px solid var(--border)',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 28, fontWeight: 500,
                color: i % 2 === 0 ? '#7c95fa' : '#2dd4bf',
                marginBottom: 4,
              }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500, marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THREE ROLES ──────────────────────────────────── */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', letterSpacing: '0.1em', marginBottom: 8 }}>WHO I AM</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--text-primary)' }}>
            Three roles. One mission.
          </h2>
          <div className="section-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {roles.map((r, i) => (
            <Link key={i} href={r.href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 28, height: '100%', cursor: 'pointer' }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{r.icon}</div>
                <div style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)',
                  color: r.color, letterSpacing: '0.1em', marginBottom: 8,
                }}>{r.dept.toUpperCase()}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 22,
                  color: 'var(--text-primary)', marginBottom: 4,
                }}>{r.title}</h3>
                <p style={{ fontSize: 14, color: r.color, fontWeight: 500, marginBottom: 16 }}>{r.org}</p>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{r.desc}</p>
                <div style={{ marginTop: 20, fontSize: 13, color: r.color }}>Learn more →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── RESEARCH AREAS ───────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'rgba(8,12,24,0.6)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)', letterSpacing: '0.1em', marginBottom: 8 }}>RESEARCH FOCUS</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--text-primary)', marginBottom: 16 }}>
                The Cognitive Mesh
              </h2>
              <div className="section-divider" />
              <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>
                A self-organising network of sovereign AI agents — each grounded in physical
                signal perception — that produces emergent collective intelligence through
                federated learning, multi-faceted interaction protocols, and autonomous
                resource economies. Without centralised control.
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
                The formal agent model: <span style={{ fontFamily: 'var(--font-mono)', color: '#7c95fa' }}>A = (I, P, S, G, π, C, R)</span>
                <br />
                Working prototype: <span style={{ fontFamily: 'var(--font-mono)', color: '#2dd4bf' }}>Rust · 5 crates · 98.2% loss reduction</span>
              </p>
              <Link href="/research" className="btn-primary">
                Read the PhD Proposal →
              </Link>
            </div>
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {researchAreas.map((a, i) => (
                  <div key={i} className={`tag ${a.tag}`} style={{ fontSize: 13, padding: '8px 16px' }}>
                    {a.icon} {a.label}
                  </div>
                ))}
              </div>
              {/* Mini architecture preview */}
              <div className="card" style={{ marginTop: 24, padding: 20, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: 8 }}>// cognitive-mesh v0.1</div>
                {[
                  { label: 'L4 Agent Orchestration', color: '#7c95fa' },
                  { label: 'L3 Message Broker     ', color: '#2dd4bf' },
                  { label: 'L2 HAL (I2C·BLE·TCP)  ', color: '#fbbf24' },
                  { label: 'LW Weighted Interface  ', color: '#fca5a5' },
                ].map((l, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '6px 0',
                    borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                  }}>
                    <span style={{ color: l.color }}>▸</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{l.label}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12, color: '#2dd4bf', fontSize: 11 }}>
                  ✓ zero warnings · cargo run --bin cm-sim
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST BLOG ──────────────────────────────────── */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', letterSpacing: '0.1em', marginBottom: 8 }}>LATEST WRITING</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--text-primary)' }}>
              Lab Notes & Essays
            </h2>
          </div>
          <Link href="/blog" className="btn-outline" style={{ fontSize: 13 }}>All posts →</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {latestPosts.map((p, i) => (
            <Link key={i} href={p.href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 24, height: '100%' }}>
                <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 12 }}>{p.date}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.35 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 16 }}>{p.excerpt}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.tags.map(t => <span key={t} className="tag tag-gray" style={{ fontSize: 11 }}>{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{
          maxWidth: 800, margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(90,110,245,0.08), rgba(20,184,166,0.08))',
          border: '1px solid var(--border-bright)',
          borderRadius: 20,
          padding: '56px 48px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)', letterSpacing: '0.1em', marginBottom: 16 }}>OPEN TO COLLABORATION</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 38px)', color: 'var(--text-primary)', marginBottom: 16 }}>
            Research. Consulting. Building.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Available for AI research collaboration, distributed systems consulting, edge AI architecture, and technical education through Cognitive Mesh Lab.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Get in touch →</Link>
            <Link href="/learn" className="btn-outline">View tutorials</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
