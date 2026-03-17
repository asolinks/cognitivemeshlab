'use client'
import Link from 'next/link'


const posts = [
  {
    slug: 'rust-orchestration-framework',
    date: 'March 2026',
    readTime: '12 min read',
    title: 'Building a Rust Orchestration Framework for Heterogeneous IoT + ML Systems',
    excerpt: 'How we unified I2C, BLE, and TCP/IP under a single typed envelope format while enabling gradient and weight exchange between autonomous agents. A walkthrough of the Cognitive Mesh MVP codebase.',
    tags: ['Rust', 'Edge AI', 'Federated Learning', 'IoT'],
    category: 'Technical',
    categoryColor: '#f87171',
    featured: true,
  },
  {
    slug: 'cognitive-mesh-theory',
    date: 'February 2026',
    readTime: '8 min read',
    title: 'The Cognitive Mesh: Why Intelligence Should Be a Property of the System, Not the Model',
    excerpt: 'The case for emergence-first distributed AI — moving from model-centric to agent-collective-centric intelligence design. Why centralisation is a structural limitation, not an engineering problem.',
    tags: ['Theory', 'Multi-agent', 'Emergence', 'Edge AI'],
    category: 'Research',
    categoryColor: '#5a6ef5',
    featured: true,
  },
  {
    slug: 'toiminimi-to-phd',
    date: 'January 2026',
    readTime: '6 min read',
    title: 'From Toiminimi to PhD: Structuring a Research Venture in Finland',
    excerpt: 'Practical notes on running a Finnish sole trader research practice while pursuing doctoral research — legal structure, YEL considerations, tax, and managing the split between billable work and academic output.',
    tags: ['Entrepreneurship', 'Finland', 'PhD Life', 'Toiminimi'],
    category: 'Life',
    categoryColor: '#f59e0b',
    featured: false,
  },
  {
    slug: 'flstrust-byzantine',
    date: 'January 2026',
    readTime: '10 min read',
    title: 'FLTrust vs Krum vs Bulyan: Choosing a Byzantine-Robust Aggregation Algorithm',
    excerpt: 'A practical comparison of Byzantine-robust federated aggregation algorithms for non-IID, signal-native edge environments. Why I chose FLTrust for the Cognitive Mesh and what the tradeoffs are.',
    tags: ['Federated Learning', 'Security', 'Research'],
    category: 'Research',
    categoryColor: '#5a6ef5',
    featured: false,
  },
  {
    slug: 'i2c-for-ai-engineers',
    date: 'December 2025',
    readTime: '7 min read',
    title: 'How I2C Works — for AI Engineers Who Have Never Touched Embedded Hardware',
    excerpt: 'A ground-up explanation of the I2C protocol for software/ML engineers crossing into embedded systems. Addressing, timing, the master-slave model, and why it matters for edge AI.',
    tags: ['I2C', 'Embedded', 'Edge AI', 'Tutorial'],
    category: 'Tutorial',
    categoryColor: '#14b8a6',
    featured: false,
  },
  {
    slug: 'rust-workspace-setup',
    date: 'November 2025',
    readTime: '5 min read',
    title: 'Setting up a Multi-Crate Rust Workspace for Systems Research',
    excerpt: 'How to structure a Rust workspace with multiple crates, enforce layered dependencies, and organise research code so the architecture is visible in the file system.',
    tags: ['Rust', 'Tutorial', 'Systems'],
    category: 'Tutorial',
    categoryColor: '#14b8a6',
    featured: false,
  },
  {
    slug: 'wifi-csi-har',
    date: 'October 2025',
    readTime: '9 min read',
    title: 'WiFi CSI-Based Human Activity Recognition: The Signal-Native Benchmark',
    excerpt: 'Why WiFi Channel State Information is a compelling modality for edge AI — no cameras, no explicit consent, ground truth from physical activity. Setting up the HAR benchmark for the Cognitive Mesh evaluation.',
    tags: ['WiFi CSI', 'HAR', 'Signal Processing', 'Research'],
    category: 'Research',
    categoryColor: '#5a6ef5',
    featured: false,
  },
]

const categories = ['All', 'Research', 'Technical', 'Tutorial', 'Life']

export default function BlogClient() {
  const featured = posts.filter(p => p.featured)
  const rest = posts.filter(p => !p.featured)

  return (
    <div style={{ paddingTop: 100, padding: '100px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <span className="tag tag-amber" style={{ marginBottom: 16, display: 'inline-block' }}>Lab Notes</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 60px)', color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.02em' }}>
          Blog
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 580 }}>
          Research notes, technical essays, tutorials, and dispatches from the PhD journey.
          Written to be useful to other researchers and engineers.
        </p>
      </div>

      {/* Category filter (visual only — future: client component) */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap' }}>
        {categories.map((c, i) => (
          <button key={c} style={{
            padding: '7px 16px', borderRadius: 100,
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            background: i === 0 ? 'rgba(90,110,245,0.15)' : 'transparent',
            color: i === 0 ? '#7c95fa' : 'var(--text-muted)',
            border: i === 0 ? '1px solid rgba(90,110,245,0.3)' : '1px solid var(--border)',
            fontFamily: 'var(--font-body)',
            transition: 'all 0.2s',
          }}>
            {c}
          </button>
        ))}
      </div>

      {/* Featured posts */}
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', letterSpacing: '0.1em', marginBottom: 20 }}>FEATURED</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          {featured.map((p, i) => (
            <Link key={i} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 28, height: '100%', borderLeft: `3px solid ${p.categoryColor}` }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: p.categoryColor }}>{p.category.toUpperCase()}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{p.date}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{p.readTime}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 21, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.35 }}>{p.title}</h2>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>{p.excerpt}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.tags.map(t => <span key={t} className="tag tag-gray" style={{ fontSize: 10 }}>{t}</span>)}
                </div>
                <div style={{ marginTop: 16, fontSize: 13, color: p.categoryColor }}>Read →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* All posts list */}
      <div>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', letterSpacing: '0.1em', marginBottom: 20 }}>ALL POSTS</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {rest.map((p, i) => (
            <Link key={i} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 24, padding: '20px 16px',
                borderBottom: '1px solid var(--border)',
                transition: 'background 0.2s',
                borderRadius: 8,
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ minWidth: 80, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', paddingTop: 4 }}>{p.date}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: p.categoryColor }}>{p.category}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{p.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.35 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.excerpt}</p>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 10 }}>
                    {p.tags.slice(0, 3).map(t => <span key={t} className="tag tag-gray" style={{ fontSize: 10 }}>{t}</span>)}
                  </div>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: 18, paddingTop: 4 }}>→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
