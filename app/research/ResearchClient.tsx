'use client'
import Link from 'next/link'


const researchPhases = [
  { phase: 'Phase 1', year: 'Year 1', title: 'Theoretical Foundations + Signal Architecture', status: 'Active', color: '#5a6ef5',
    items: ['Formal agent model A = (I, P, S, G, π, C, R)', 'Systematic literature review', 'WiFi CSI pipeline for HAR', 'CWC 5G testbed configuration'] },
  { phase: 'Phase 2', year: 'Years 1–2', title: 'Interaction Protocol Design + Federated Learning', status: 'Planned', color: '#14b8a6',
    items: ['CMOP protocol suite design', 'FLTrust Byzantine-robust aggregation', 'Non-IID gradient handling', 'First emergence measurement'] },
  { phase: 'Phase 3', year: 'Years 2–3', title: 'Sovereign Identity + Resource Economy', status: 'Planned', color: '#f59e0b',
    items: ['Ed25519 cryptographic identity', 'Sealed-bid double auction engine', 'Reputation + trust propagation', 'Adversarial stress testing'] },
  { phase: 'Phase 4', year: 'Years 3–4', title: 'Deployment + Emergence Measurement', status: 'Planned', color: '#f87171',
    items: ['Full CWC 5G testbed deployment', 'Heterogeneous hardware validation', 'Open-source stack release', 'Thesis + 4 publications'] },
]

const publications = [
  { type: 'Proposal', year: '2026', title: 'The Cognitive Mesh: Emergent Collective Intelligence through Sovereign Agent Interaction, Signal-Native Learning, and Autonomous Resource Economies at the 5G Edge', venue: 'PhD Research Proposal — University of Oulu', status: 'Submitted to Supervisor', href: '/research/proposal' },
  { type: 'Thesis', year: '2024', title: 'Dynamics of Contextual Emotion Recognition: Multimodal Fusion Across Audio, Visual, and Text Modalities', venue: "MSc Thesis — University of Oulu", status: 'Completed', href: '#' },
]

const prototype = {
  title: 'Cognitive Mesh Orchestration Framework v0.1',
  lang: 'Rust',
  crates: 5,
  result: '98.2% loss reduction in 8 federated rounds',
  github: 'https://github.com/asolinks/cognitive-mesh',
}

export default function ResearchClient() {
  return (
    <div style={{ paddingTop: 100, padding: '100px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <span className="tag tag-blue" style={{ marginBottom: 16, display: 'inline-block' }}>PhD Research</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 60px)', color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.02em' }}>
          Research
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 640 }}>
          Proposed doctoral research at the University of Oulu's Center for Ubiquitous Computing — investigating emergent collective intelligence in sovereign multi-agent systems at the 5G edge.
        </p>
        <div style={{ marginTop: 16, fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Proposed supervisor: Dr. Lauri Lovén · Future Computing Group · CWC
        </div>
      </div>

      {/* PhD Proposal highlight */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(90,110,245,0.1), rgba(20,184,166,0.06))',
        border: '1px solid rgba(90,110,245,0.3)',
        borderRadius: 16, padding: '36px 36px', marginBottom: 64,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, alignItems: 'start' }}>
          <div>
            <span className="tag tag-blue" style={{ marginBottom: 16, display: 'inline-block' }}>PhD Proposal</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.3 }}>
              The Cognitive Mesh
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
              Emergent Collective Intelligence through Sovereign Agent Interaction, Signal-Native Learning, and Autonomous Resource Economies at the 5G Edge.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
              A = (I, P, S, G, π, C, R) &nbsp;·&nbsp; FLTrust aggregation &nbsp;·&nbsp; Sealed-bid double auction &nbsp;·&nbsp; WiFi CSI HAR benchmark
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 160 }}>
            <Link href="/research/proposal" className="btn-primary" style={{ fontSize: 13, padding: '10px 20px' }}>Read proposal</Link>
            <a href="https://github.com/asolinks/cognitive-mesh" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: 13, padding: '9px 20px' }}>
              View prototype ↗
            </a>
          </div>
        </div>
      </div>

      {/* 4-year plan */}
      <div style={{ marginBottom: 64 }}>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', letterSpacing: '0.1em', marginBottom: 8 }}>FOUR-YEAR PLAN</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 8 }}>Work Plan</h2>
        <div className="section-divider" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
          {researchPhases.map((p, i) => (
            <div key={i} className="card" style={{ padding: 24, borderLeft: `3px solid ${p.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: p.color }}>{p.phase}</span>
                <span className={`tag ${p.status === 'Active' ? 'tag-teal' : 'tag-gray'}`} style={{ fontSize: 10 }}>{p.status}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>{p.year}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text-primary)', marginBottom: 14, lineHeight: 1.3 }}>{p.title}</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {p.items.map((item, j) => (
                  <li key={j} style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'flex', gap: 8 }}>
                    <span style={{ color: p.color, flexShrink: 0 }}>·</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Prototype */}
      <div style={{ marginBottom: 64 }}>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)', letterSpacing: '0.1em', marginBottom: 8 }}>PROOF OF CONCEPT</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 8 }}>Working Prototype</h2>
        <div className="section-divider" />
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)', marginBottom: 12 }}>{prototype.title}</h3>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
                <span className="tag tag-coral">{prototype.lang}</span>
                <span className="tag tag-blue">{prototype.crates} crates</span>
                <span className="tag tag-teal">zero warnings</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 8 }}>
                Unified orchestration layer bridging I2C, BLE, and TCP/IP with federated ML gradient exchange.
              </p>
              <p style={{ fontSize: 14, color: '#2dd4bf', fontFamily: 'var(--font-mono)' }}>✓ {prototype.result}</p>
            </div>
            <a href={prototype.github} target="_blank" rel="noopener" className="btn-primary">
              GitHub ↗
            </a>
          </div>
          <pre style={{ marginTop: 20, fontSize: 12 }}>
{`cargo run --bin cm-sim

╔════════════════════════════════════╗
║  COGNITIVE MESH LAB — MVP v0.1    ║
╠════════════════════════════════════╣
║  iot-node (I2C) · mobile (BLE)    ║
║  laptop (TCP)   · FedAvg          ║
╚════════════════════════════════════╝
Round 8/8  avg loss: 0.171 ✓`}
          </pre>
        </div>
      </div>

      {/* Publications */}
      <div>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', letterSpacing: '0.1em', marginBottom: 8 }}>PUBLICATIONS & THESES</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--text-primary)', marginBottom: 8 }}>Works</h2>
        <div className="section-divider" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {publications.map((pub, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                <span className="tag tag-blue" style={{ fontSize: 11 }}>{pub.type}</span>
                <span className="tag tag-gray" style={{ fontSize: 11 }}>{pub.year}</span>
                <span className={`tag ${pub.status === 'Completed' ? 'tag-teal' : 'tag-amber'}`} style={{ fontSize: 11 }}>{pub.status}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.4 }}>{pub.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{pub.venue}</p>
            </div>
          ))}
        </div>
      </div>

      {/* UBICOMP anchor */}
      <div id="ubicomp" style={{ marginTop: 64, padding: '32px', background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(20,184,166,0.2)', borderRadius: 12 }}>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)', letterSpacing: '0.1em', marginBottom: 8 }}>PROJECT RESEARCHER</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--text-primary)', marginBottom: 12 }}>UBICOMP Lab — Future Computing Group</h2>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 640 }}>
          Contributing to edge AI orchestration research at the Center for Ubiquitous Computing, University of Oulu. Work spans resource-aware inference, distributed edge AI deployment, and QoS-aware adaptive systems — the foundational infrastructure for the Cognitive Mesh PhD programme.
        </p>
        <a href="https://www.oulu.fi/fi/yliopisto/tiedekunnat-ja-yksikot/tieto-ja-sahkotekniikan-tiedekunta/jokapaikan-tietotekniikka" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ marginTop: 20, display: 'inline-flex', fontSize: 13 }}>
          UBICOMP Lab ↗
        </a>
      </div>
    </div>
  )
}
