'use client'
import Link from 'next/link'


const projects = [
  {
    name: 'cognitive-mesh',
    tagline: 'Orchestration Framework',
    desc: 'Unified orchestration layer bridging I2C, BLE, and TCP/IP protocols with federated ML agent communication. The core research prototype for the PhD programme.',
    lang: 'Rust',
    langColor: '#f87171',
    stars: '–',
    status: 'Active',
    statusColor: '#14b8a6',
    tags: ['Edge AI', 'Federated Learning', 'IoT', 'Multi-agent'],
    highlights: [
      '5-crate Cargo workspace',
      'Typed envelope protocol (data + gradients)',
      'HAL traits: I2C, BLE, TCP/IP, SPI',
      'FedAvg aggregation — 98.2% loss reduction',
      'Swap sim drivers for real hardware (rppal, btleplug)',
    ],
    github: 'https://github.com/asolinks/cognitive-mesh',
    docs: '/research#prototype',
    featured: true,
  },
  {
    name: 'cm-hal',
    tagline: 'Hardware Abstraction Layer',
    desc: 'Protocol-agnostic HAL traits for embedded systems. Implements CmRead, CmWrite, CmTransport for I2C, SPI, UART, TCP/IP and BLE. no_std compatible via embedded-hal.',
    lang: 'Rust',
    langColor: '#f87171',
    stars: '–',
    status: 'Active',
    statusColor: '#14b8a6',
    tags: ['embedded-hal', 'IoT', 'no_std'],
    highlights: ['I2C / SPI / UART drivers', 'Sim drivers for testing', 'embedded-hal compatible', 'RPi + STM32 ready'],
    github: 'https://github.com/asolinks/cognitive-mesh/tree/main/crates/cm-hal',
    docs: null,
    featured: false,
  },
  {
    name: 'cm-broker',
    tagline: 'Message Broker',
    desc: 'Typed envelope format and routing engine. Protocol translation layer that normalises I2C, TCP, and BLE frames into unified envelopes carrying data or ML payloads.',
    lang: 'Rust',
    langColor: '#f87171',
    stars: '–',
    status: 'Active',
    statusColor: '#14b8a6',
    tags: ['Messaging', 'Protocol', 'Serialisation'],
    highlights: ['serde + bincode serialisation', 'Broadcast + unicast routing', 'Typed payload enum', 'Zero ML knowledge at L3'],
    github: 'https://github.com/asolinks/cognitive-mesh/tree/main/crates/cm-broker',
    docs: null,
    featured: false,
  },
  {
    name: 'cm-agent',
    tagline: 'Agent Orchestration Layer',
    desc: 'Federated learning agent lifecycle — local training, gradient broadcast, FedAvg aggregation. Swap LocalModel for any neural net via the same trait interface.',
    lang: 'Rust',
    langColor: '#f87171',
    stars: '–',
    status: 'Active',
    statusColor: '#14b8a6',
    tags: ['Federated Learning', 'Agents', 'ML'],
    highlights: ['FedAvg aggregator', 'Gradient + weight exchange', 'Model-agnostic trait', 'Works with tch-rs / candle'],
    github: 'https://github.com/asolinks/cognitive-mesh/tree/main/crates/cm-agent',
    docs: null,
    featured: false,
  },
  {
    name: 'cm-weights',
    tagline: 'Weighted Interface Layer',
    desc: 'Cross-layer routing surface with node capability registry. Routes data and ML weights to the correct protocol without callers knowing the transport mechanism.',
    lang: 'Rust',
    langColor: '#f87171',
    stars: '–',
    status: 'Active',
    statusColor: '#14b8a6',
    tags: ['Routing', 'Capability Registry'],
    highlights: ['NodeCapability registry', 'Payload type validation', 'Protocol-agnostic routing', 'Constrained device protection'],
    github: 'https://github.com/asolinks/cognitive-mesh/tree/main/crates/cm-weights',
    docs: null,
    featured: false,
  },
  {
    name: 'cognitivemeshlab.fi',
    tagline: 'This Website',
    desc: 'The lab website — Next.js 14, Tailwind, TypeScript. Static export deployable to any CDN. Full source available.',
    lang: 'TypeScript',
    langColor: '#5a6ef5',
    stars: '–',
    status: 'Live',
    statusColor: '#14b8a6',
    tags: ['Next.js', 'Website', 'Open Source'],
    highlights: ['Next.js 14 App Router', 'Static export', 'Vercel deploy', 'Animated mesh canvas'],
    github: 'https://github.com/asolinks/cognitivemeshlab',
    docs: null,
    featured: false,
  },
]

const upcoming = [
  { name: 'cmop-identity', desc: 'Ed25519 cryptographic identity for edge agents — Layer 1 of CMOP', lang: 'Rust', eta: 'Q3 2026' },
  { name: 'cmop-auction', desc: 'Sealed-bid double auction engine for agent resource economy', lang: 'Rust', eta: 'Q4 2026' },
  { name: 'cm-pytorch-bridge', desc: 'Python FFI bridge for using PyTorch models with cm-agent', lang: 'Python + Rust', eta: 'Q2 2026' },
  { name: 'csi-har-dataset', desc: 'WiFi CSI human activity recognition dataset from CWC testbed', lang: 'Dataset', eta: '2027' },
]

export default function ProjectsClient() {
  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <div style={{ paddingTop: 100, padding: '100px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <span className="tag tag-coral" style={{ marginBottom: 16, display: 'inline-block' }}>Open Source</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 60px)', color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.02em' }}>
          Projects
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 620 }}>
          Open-source infrastructure, research tools, and experiments from Cognitive Mesh Lab.
          All production code, no toy examples.
        </p>
        <a href="https://github.com/cognitive-mesh-lab" target="_blank" rel="noopener noreferrer"
          className="btn-primary" style={{ marginTop: 20, display: 'inline-flex', fontSize: 13 }}>
          GitHub: cognitive-mesh-lab ↗
        </a>
      </div>

      {/* Featured project */}
      {featured.map((p, i) => (
        <div key={i} style={{
          marginBottom: 48,
          background: 'linear-gradient(135deg, rgba(248,113,113,0.06), rgba(90,110,245,0.06))',
          border: '1px solid rgba(248,113,113,0.3)',
          borderRadius: 16, padding: 36,
        }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--text-primary)', fontWeight: 500 }}>{p.name}</span>
            <span className="tag tag-teal" style={{ fontSize: 10 }}>{p.status}</span>
            <span className="tag tag-amber" style={{ fontSize: 10 }}>Featured</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
            <div>
              <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.08em' }}>{p.tagline.toUpperCase()}</p>
              <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                {p.tags.map(t => <span key={t} className="tag tag-gray" style={{ fontSize: 11 }}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <a href={p.github} target="_blank" rel="noopener" className="btn-primary" style={{ fontSize: 13 }}>GitHub ↗</a>
                {p.docs && <Link href={p.docs} className="btn-outline" style={{ fontSize: 13 }}>Docs</Link>}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: p.langColor, marginBottom: 12 }}>// {p.lang}</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {p.highlights.map((h, j) => (
                  <li key={j} style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 8, display: 'flex', gap: 10 }}>
                    <span style={{ color: '#2dd4bf', flexShrink: 0 }}>✓</span>{h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      {/* All crates grid */}
      <div style={{ marginBottom: 64 }}>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', letterSpacing: '0.1em', marginBottom: 8 }}>ALL CRATES & REPOS</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 8 }}>Repository Index</h2>
        <div className="section-divider" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {rest.map((p, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--text-primary)', fontWeight: 500 }}>{p.name}</span>
                <span className="tag tag-teal" style={{ fontSize: 10 }}>{p.status}</span>
              </div>
              <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: p.langColor, marginBottom: 8 }}>{p.lang}</p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
                {p.tags.map(t => <span key={t} className="tag tag-gray" style={{ fontSize: 10 }}>{t}</span>)}
              </div>
              <a href={p.github} target="_blank" rel="noopener" style={{ fontSize: 13, color: '#7c95fa', textDecoration: 'none' }}>View on GitHub →</a>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <div>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', letterSpacing: '0.1em', marginBottom: 8 }}>COMING SOON</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 8 }}>In Development</h2>
        <div className="section-divider" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {upcoming.map((u, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 20,
              padding: '16px 20px', background: 'var(--bg-card)',
              border: '1px solid var(--border)', borderRadius: 10,
              flexWrap: 'wrap',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-primary)', minWidth: 200 }}>{u.name}</span>
              <span className="tag tag-gray" style={{ fontSize: 10 }}>{u.lang}</span>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', flex: 1 }}>{u.desc}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-amber)', whiteSpace: 'nowrap' }}>{u.eta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
