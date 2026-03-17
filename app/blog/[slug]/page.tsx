import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return [
    { slug: 'rust-orchestration-framework' },
    { slug: 'cognitive-mesh-theory' },
    { slug: 'toiminimi-to-phd' },
    { slug: 'flstrust-byzantine' },
    { slug: 'i2c-for-ai-engineers' },
    { slug: 'rust-workspace-setup' },
    { slug: 'wifi-csi-har' },
  ]
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
  }
}

// Minimal post content for the featured post — in production this comes from MDX files
const postContent: Record<string, { title: string; date: string; readTime: string; category: string; categoryColor: string; tags: string[]; content: string }> = {
  'rust-orchestration-framework': {
    title: 'Building a Rust Orchestration Framework for Heterogeneous IoT + ML Systems',
    date: 'March 2026',
    readTime: '12 min read',
    category: 'Technical',
    categoryColor: '#f87171',
    tags: ['Rust', 'Edge AI', 'Federated Learning', 'IoT'],
    content: `
The central problem in edge AI is that the devices that generate the most valuable data are the ones furthest from where ML models live. A temperature sensor on I2C, a smartphone over BLE, and a laptop over TCP/IP speak completely different languages — and no existing framework speaks all three while also enabling ML gradient exchange between them.

This post walks through the architecture of the **Cognitive Mesh Orchestration Framework v0.1** — a Rust prototype I built as the proof-of-concept for my PhD research proposal.

## The Core Insight: Gradients Are Just Payloads

The key architectural decision that makes everything work is treating ML gradients as a first-class payload type alongside conventional data bytes. Most distributed ML frameworks treat the communication layer as a transport concern below the ML logic. We inverted this.

\`\`\`rust
pub enum Payload {
    Data(Vec<u8>),          // sensor readings, commands
    Gradient(Vec<f32>),     // ML gradient vector
    WeightDelta(Vec<f32>),  // federated weight update
    Control(String),        // ping, register, ack
}
\`\`\`

Once you have a \`Payload\` enum, you can wrap it in a typed \`Envelope\` and route it through any protocol — I2C, BLE, or TCP/IP — without the upper layers knowing or caring which transport was used.

## The Five-Crate Architecture

The workspace is split into five crates with strict upward-only dependencies:

- **cm-hal** — Hardware Abstraction Layer. Protocol-agnostic \`CmTransport\` traits. No ML logic.
- **cm-broker** — Message Broker. Envelope format + routing engine. No agent logic.  
- **cm-agent** — Agent Layer. Local training, gradient exchange, FedAvg. No protocol knowledge.
- **cm-weights** — Final Weighted Interface. Cross-layer routing registry.
- **cm-node** — Simulation binary. Three nodes, eight rounds, 98.2% loss reduction.

The key rule: each layer can only import the layer below it. \`cm-agent\` never imports \`cm-hal\`. \`cm-hal\` never imports \`cm-broker\`. This is enforced by the Cargo dependency graph.

## The Simulation Results

Running \`cargo run --bin cm-sim\` simulates three nodes — one I2C IoT node, one BLE mobile node, one TCP laptop — learning the function \`y = 2·x₀ + 3·x₁ + 1\` through federated learning without sharing raw data.

Loss dropped from **9.45 → 0.17** across 8 rounds. The mobile node's final prediction on the test input was **6.162** against an expected **6.0** — 2.7% error from gradient exchange alone.

## Moving to Real Hardware

This is where the architecture pays off. Replacing simulated I2C with real Raspberry Pi I2C is three lines:

\`\`\`rust
// Swap this:
let transport = SimI2cTransport::new(0x48, bus.clone());

// For this (same trait, real hardware):
let i2c = rppal::i2c::I2c::new().unwrap();
let transport = RpiI2cTransport::new(0x48, i2c);
\`\`\`

The broker, agent, and weighted interface layers are completely unchanged. The architecture isolates the hardware concern exactly where it belongs.

## What's Next

The next step is extending \`cm-agent\` to use a real PyTorch HAR model via a Python FFI bridge — replacing the linear regression placeholder with a neural network classifying WiFi CSI human activity data across a real Raspberry Pi + Android + laptop mesh over the CWC 5G testbed.

The full source is available at [github.com/cognitive-mesh-lab/cognitive-mesh](https://github.com/cognitive-mesh-lab/cognitive-mesh).
    `,
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = postContent[params.slug]

  if (!post) {
    return (
      <div style={{ paddingTop: 140, padding: '140px 24px 80px', maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--text-primary)', marginBottom: 16 }}>Coming Soon</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>This post is being written. Check back soon or subscribe to get notified.</p>
        <Link href="/blog" className="btn-outline">← Back to blog</Link>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 100, padding: '100px 24px 80px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Back */}
        <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14, marginBottom: 40 }}>
          ← Blog
        </Link>

        {/* Meta */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: post.categoryColor }}>{post.category.toUpperCase()}</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{post.date}</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{post.readTime}</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)',
          color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 20,
          letterSpacing: '-0.02em',
        }}>{post.title}</h1>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 40 }}>
          {post.tags.map(t => <span key={t} className="tag tag-gray" style={{ fontSize: 11 }}>{t}</span>)}
        </div>

        <hr />

        {/* Content */}
        <div className="prose" style={{ marginTop: 40 }}
          dangerouslySetInnerHTML={{ __html: post.content
            .replace(/\n\n/g, '</p><p>')
            .replace(/^/, '<p>')
            .replace(/$/, '</p>')
            .replace(/## (.*)/g, '</p><h2>$1</h2><p>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
          }}
        />

        <hr style={{ margin: '48px 0 32px' }} />

        {/* Author */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{
            width: 48, height: 48,
            background: 'linear-gradient(135deg, #5a6ef5, #14b8a6)',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontFamily: 'var(--font-mono)',
            fontSize: 16, fontWeight: 700, color: 'white', flexShrink: 0,
          }}>SA</div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>Stanley Amaechi</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>AI Researcher · Founder, Cognitive Mesh Lab · Prospective PhD applicant, University of Oulu</p>
          </div>
        </div>

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Link href="/blog" className="btn-outline" style={{ fontSize: 13 }}>← All posts</Link>
        </div>
      </div>
    </div>
  )
}
