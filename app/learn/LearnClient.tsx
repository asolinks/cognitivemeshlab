'use client'
import Link from 'next/link'


const tracks = [
  {
    id: 'rust-systems',
    color: '#f87171',
    icon: '⚙️',
    tag: 'tag-coral',
    title: 'Rust for Systems Engineers',
    level: 'Intermediate',
    lessons: 8,
    desc: 'Memory-safe systems programming for IoT, embedded, and distributed infrastructure. From ownership model to building a HAL layer.',
    topics: ['Ownership & borrowing', 'async/await with tokio', 'embedded-hal traits', 'Building CLI tools', 'Serialisation with serde'],
    status: 'Coming Q2 2026',
  },
  {
    id: 'federated-learning',
    color: '#14b8a6',
    icon: '⟳',
    tag: 'tag-teal',
    title: 'Federated Learning from Scratch',
    level: 'Intermediate',
    lessons: 10,
    desc: 'How agents learn collectively without sharing raw data. FedAvg, FedProx, Byzantine robustness, and differential privacy — with working code.',
    topics: ['FedAvg implementation', 'Non-IID data challenges', 'Gradient compression', 'FLTrust robustness', 'Privacy-preserving ML'],
    status: 'Coming Q2 2026',
  },
  {
    id: 'edge-ai',
    color: '#5a6ef5',
    icon: '◈',
    tag: 'tag-blue',
    title: 'Edge AI Architecture',
    level: 'Advanced',
    lessons: 12,
    desc: 'Designing and deploying ML systems at the network edge — from model compression to 5G MEC deployment with real hardware.',
    topics: ['MEC architecture', 'Model quantisation', 'On-device training', '5G network slicing', 'QoS-aware inference'],
    status: 'Coming Q3 2026',
  },
  {
    id: 'multi-agent',
    color: '#a78bfa',
    icon: '⬡',
    tag: 'tag-blue',
    title: 'Multi-Agent Systems',
    level: 'Advanced',
    lessons: 10,
    desc: 'Formal agent architectures, coordination protocols, coalition formation, and the theory of emergent collective intelligence.',
    topics: ['BDI agent model', 'FIPA-ACL protocols', 'Coalition formation', 'Mechanism design', 'Emergence measurement'],
    status: 'Coming Q3 2026',
  },
  {
    id: 'distributed-systems',
    color: '#fbbf24',
    icon: '⊕',
    tag: 'tag-amber',
    title: 'Distributed Systems Fundamentals',
    level: 'Beginner–Intermediate',
    lessons: 8,
    desc: 'CAP theorem to Raft consensus. Building reliable distributed applications from first principles with practical examples in Rust and Python.',
    topics: ['CAP theorem', 'Consensus algorithms', 'Fault tolerance', 'Clock synchronisation', 'Distributed tracing'],
    status: 'Coming Q1 2026',
  },
  {
    id: 'cognitive-mesh',
    color: '#14b8a6',
    icon: '🔬',
    tag: 'tag-teal',
    title: 'Building the Cognitive Mesh',
    level: 'Advanced',
    lessons: 15,
    desc: 'End-to-end walkthrough of the Cognitive Mesh architecture — from typed envelope format to federated agents to the weighted interface layer. Based on the PhD research prototype.',
    topics: ['HAL design patterns', 'Typed envelope protocol', 'Agent lifecycle', 'FedAvg aggregation', 'Weighted interface layer', 'Hardware migration (RPi, ESP32)'],
    status: 'Coming Q4 2026',
  },
]

const freebies = [
  { title: 'What is Federated Learning? (10 min explainer)', type: 'Video', href: '#', tag: 'tag-teal' },
  { title: 'Rust Ownership in 5 Minutes', type: 'Video', href: '#', tag: 'tag-coral' },
  { title: 'How I2C Works — for AI Engineers', type: 'Article', href: '/blog/i2c-for-ai-engineers', tag: 'tag-amber' },
  { title: 'Setting up a Rust Cargo Workspace', type: 'Article', href: '/blog/rust-workspace-setup', tag: 'tag-blue' },
  { title: 'Running cm-sim: Cognitive Mesh MVP walkthrough', type: 'Video', href: '#', tag: 'tag-blue' },
]

export default function LearnClient() {
  return (
    <div style={{ paddingTop: 100, padding: '100px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <span className="tag tag-teal" style={{ marginBottom: 16, display: 'inline-block' }}>Open Education</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 60px)', color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.02em' }}>
          Learn
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 640 }}>
          Tutorials, courses, and explainers on edge AI, federated learning, distributed systems, and Rust.
          Built from real research — not toy examples.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="https://youtube.com/@cognitivemeshlab" target="_blank" rel="noopener" className="btn-primary" style={{ fontSize: 13 }}>
            YouTube Channel ↗
          </a>
          <a href="#tracks" className="btn-outline" style={{ fontSize: 13 }}>Browse tracks</a>
        </div>
      </div>

      {/* Free resources */}
      <div style={{ marginBottom: 64, background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.2)', borderRadius: 16, padding: 32 }}>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)', letterSpacing: '0.1em', marginBottom: 16 }}>FREE — START HERE</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text-primary)', marginBottom: 20 }}>Free Resources</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {freebies.map((f, i) => (
            <Link key={i} href={f.href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', background: 'rgba(8,12,24,0.5)', borderRadius: 8, border: '1px solid var(--border)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(8,12,24,0.5)'; }}>
              <span className={`tag ${f.tag}`} style={{ fontSize: 10, minWidth: 52, textAlign: 'center' }}>{f.type}</span>
              <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{f.title}</span>
              <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: 14 }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Course tracks */}
      <div id="tracks" style={{ marginBottom: 64 }}>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', letterSpacing: '0.1em', marginBottom: 8 }}>COURSE TRACKS</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 8 }}>Learning Paths</h2>
        <div className="section-divider" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {tracks.map((t, i) => (
            <div key={i} className="card" style={{ padding: 28, borderTop: `3px solid ${t.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>{t.icon}</span>
                <span className="tag tag-gray" style={{ fontSize: 10 }}>{t.status}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                <span className={`tag ${t.tag}`} style={{ fontSize: 11 }}>{t.level}</span>
                <span className="tag tag-gray" style={{ fontSize: 11 }}>{t.lessons} lessons</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.3 }}>{t.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 16 }}>{t.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {t.topics.map(tp => (
                  <span key={tp} style={{
                    fontSize: 11, fontFamily: 'var(--font-mono)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border)',
                    borderRadius: 4, padding: '3px 8px',
                    color: 'var(--text-muted)',
                  }}>{tp}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(90,110,245,0.08), rgba(20,184,166,0.06))',
        border: '1px solid var(--border-bright)', borderRadius: 16,
        padding: '48px 40px', textAlign: 'center',
      }}>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', letterSpacing: '0.1em', marginBottom: 12 }}>STAY UPDATED</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text-primary)', marginBottom: 12 }}>Get notified when courses launch</h2>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 28, maxWidth: 440, margin: '0 auto 28px' }}>
          No spam. Just a short email when new tutorials, videos, or course modules go live.
        </p>
        <form style={{ display: 'flex', gap: 12, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}
          onSubmit={(e) => e.preventDefault()}>
          <input
            type="email" placeholder="your@email.com" required
            style={{
              flex: 1, minWidth: 220,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-bright)',
              borderRadius: 8, padding: '11px 16px',
              color: 'var(--text-primary)', fontSize: 14,
              fontFamily: 'var(--font-body)',
              outline: 'none',
            }}
          />
          <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
            Notify me
          </button>
        </form>
      </div>
    </div>
  )
}
